import { prisma } from "../db/dbConfig";
import { ghostJobReminder } from "../emails/ghostJobReminder";
import { sendEmail } from "../utils/email/mailer";
import { indexCron } from "./index.cron";

indexCron(async () => {
  try {
    console.log("Ghost Job reminder cron running...");
    const now = new Date();
    const sixtyDaysAgo = new Date(now);
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    let jobs = await prisma.job.findMany({
      where: {
        status: "applied",
        updatedAt: {
          lte: sixtyDaysAgo,
        },
        user: {
          emailNotification: true,
        },
      },
      include: {
        user: true,
      },
    });

    for (const job of jobs) {
      const isEmailSent = await prisma.jobReminder.findFirst({
        where: { jobId: job.id, type: "GHOST_60_DAYS"},
      });

      if (!isEmailSent) {
        const user = job.user;

        if (!user?.name || !user.email) {
          console.log("User name or email not provided!");
          continue;
        }

        let jobUrlBase = process.env.CLIENT_URL || "";

        let draftEmail = ghostJobReminder(
          job.companyName,
          job.position,
          jobUrlBase + `/dashboard/jobs/${job.id}`,
        );

        const emailConfig = {
          receiverMail: user.email,
          receiverName: user.name,
          ...draftEmail,
        };

        let info = await sendEmail(emailConfig);

        if (info) {
          await prisma.jobReminder.create({
            data: {
              jobId: job.id,
              type: "GHOST_60_DAYS",
            },
          });
           console.log("Email sent successfully to ", user.email);
        }
      } else {
        console.log("Email already sent skipping..!");
      }
    }
  } catch (error) {
    console.error("Error while scheduling ghost reminder email", error);
  }
});
