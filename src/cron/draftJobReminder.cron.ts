import { sendEmail } from "../utils/email/mailer";
import { draftReminderEmail } from "../emails/draftJobReminder";
import { prisma } from "../db/dbConfig";
import { indexCron } from "./index.cron";

indexCron(async () => {
  try {
    console.log("Draft Job reminder cron running...");
    const now = new Date();
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 2);

    let jobs = await prisma.job.findMany({
      where: {
        status: "draft",
        updatedAt: {
          lte: threeDaysAgo,
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
        where: { jobId: job.id, type: "DRAFT_3_DAYS" },
      });

      if (!isEmailSent) {
        const user = job.user;

        if (!user?.name || !user.email) {
          console.log("User name or email not provided!");
          continue;
        }

        let jobUrlBase = process.env.CLIENT_URL || "";

        let draftEmail = draftReminderEmail(
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
              type: "DRAFT_3_DAYS",
            },
          });
          console.log("Email sent successfully to ", user.email);
        }
      } else {
        console.log("Email already sent skipping..!");
      }
    }

    console.log("Draft reminder cron job end..");
  } catch (error) {
    console.error("Error while scheduling draft reminder email", error);
  }
});
