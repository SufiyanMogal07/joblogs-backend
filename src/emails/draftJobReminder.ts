export const draftReminderEmail = (
  companyName: string,
  jobPosition: string,
  jobUrl: string,
) => ({
  subject: `You have an unfinished application at ${companyName}`,
  html: ` <div style=" margin: 0; padding: 40px 20px; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; "> <div style=" max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 10px; padding: 32px; border: 1px solid #e5e5e5; "> <h2 style=" margin: 0 0 12px; color: #222222; font-size: 22px; "> Your application is still waiting </h2> <p style=" margin: 0 0 24px; color: #555555; font-size: 15px; line-height: 1.6; "> You started an application 3 days ago but haven't updated it yet. </p> <div style=" background: #f8f8f8; border-radius: 8px; padding: 18px; margin-bottom: 24px; "> <p style=" margin: 0 0 6px; color: #777777; font-size: 13px; "> Company </p> <p style=" margin: 0 0 14px; color: #222222; font-size: 16px; font-weight: 600; "> ${companyName} </p> <p style=" margin: 0 0 6px; color: #777777; font-size: 13px; "> Position </p> <p style=" margin: 0; color: #222222; font-size: 16px; font-weight: 600; "> ${jobPosition} </p> </div> <a href="${jobUrl}" style=" display: inline-block; padding: 12px 20px; background-color: #d4a052; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600; " > Continue Application </a> <p style=" margin: 28px 0 0; color: #888888; font-size: 12px; line-height: 1.5; "> You can update the application's status, add notes, or continue managing it from your JobLog dashboard. </p> </div> </div> `,
});
