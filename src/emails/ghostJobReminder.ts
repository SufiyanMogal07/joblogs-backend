export const ghostJobReminder = (
  companyName: string,
  jobPosition: string,
  jobUrl: string,
) => ({
  subject: `No update on your application at ${companyName}`,

  html: `
    <div style="
      margin:0;
      padding:40px 20px;
      background:#f6f7f9;
      font-family:Arial,Helvetica,sans-serif;
    ">
      <div style="
        max-width:560px;
        margin:0 auto;
        background:#ffffff;
        border:1px solid #e6e7eb;
        border-radius:12px;
        overflow:hidden;
      ">

        <!-- Header -->
        <div style="
          padding:22px 28px;
          border-bottom:1px solid #eeeeee;
        ">
          <div style="
            font-size:20px;
            font-weight:700;
            color:#222222;
          ">
            JobLog
          </div>
        </div>

        <!-- Content -->
        <div style="padding:30px 28px;">

          <p style="
            margin:0 0 8px;
            color:#888888;
            font-size:13px;
            font-weight:600;
            text-transform:uppercase;
            letter-spacing:0.5px;
          ">
            Application reminder
          </p>

          <h2 style="
            margin:0 0 12px;
            color:#222222;
            font-size:24px;
            line-height:1.3;
          ">
            No update on your application
          </h2>

          <p style="
            margin:0 0 24px;
            color:#555555;
            font-size:15px;
            line-height:1.6;
          ">
            You haven't received an update on this application
            for 60 days. It may be worth checking whether you've
            received a response or want to mark it as ghosted.
          </p>

          <!-- Job Details -->
          <div style="
            background:#fafafa;
            border:1px solid #eeeeee;
            border-radius:9px;
            padding:18px;
            margin-bottom:24px;
          ">

            <p style="
              margin:0 0 5px;
              color:#888888;
              font-size:12px;
            ">
              COMPANY
            </p>

            <p style="
              margin:0 0 16px;
              color:#222222;
              font-size:16px;
              font-weight:600;
            ">
              ${companyName}
            </p>

            <p style="
              margin:0 0 5px;
              color:#888888;
              font-size:12px;
            ">
              POSITION
            </p>

            <p style="
              margin:0;
              color:#222222;
              font-size:16px;
              font-weight:600;
            ">
              ${jobPosition}
            </p>

          </div>

          <!-- CTA -->
          <a
            href="${jobUrl}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#d4a052;
              color:#ffffff;
              text-decoration:none;
              border-radius:7px;
              font-size:14px;
              font-weight:600;
            "
          >
            Review Application
          </a>

          <p style="
            margin:24px 0 0;
            color:#888888;
            font-size:12px;
            line-height:1.5;
          ">
            If you haven't heard back, you can update the application's
            status to ghosted from your JobLog dashboard.
          </p>

        </div>

        <!-- Footer -->
        <div style="
          padding:18px 28px;
          background:#fafafa;
          border-top:1px solid #eeeeee;
        ">
          <p style="
            margin:0;
            color:#999999;
            font-size:11px;
            line-height:1.5;
          ">
            You're receiving this reminder because this application
            hasn't been updated for 60 days.
          </p>
        </div>

      </div>
    </div>
  `,
});