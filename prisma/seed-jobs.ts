import { prisma } from "../src/db/dbConfig";

const jobs = [
  { "companyName": "Google", "position": "Software Engineer", "status": "interviewing", "source": "linkedin", "priority": true, "notes": "Met recruiter at career fair.", "appliedAt": "2026-03-01T10:00:00Z" },
  { "companyName": "Meta", "position": "Frontend Developer", "status": "applied", "source": "referral", "priority": true, "notes": "Referral from college friend.", "appliedAt": "2026-03-02T14:30:00Z" },
  { "companyName": "Amazon", "position": "Backend Engineer", "status": "draft", "source": "indeed", "priority": false, "notes": "Need to update resume for this one.", "appliedAt": null },
  { "companyName": "Netflix", "position": "Fullstack Dev", "status": "rejected", "source": "company_website", "priority": false, "notes": "Position closed.", "appliedAt": "2026-02-15T09:15:00Z" },
  { "companyName": "Apple", "position": "iOS Engineer", "status": "offer", "source": "linkedin", "priority": true, "notes": "Negotiating salary.", "appliedAt": "2026-02-20T11:00:00Z" },
  { "companyName": "Microsoft", "position": "Azure Consultant", "status": "interviewing", "source": "referral", "priority": true, "notes": "Round 2 on Friday.", "appliedAt": "2026-02-28T16:00:00Z" },
  { "companyName": "Stripe", "position": "API Engineer", "status": "applied", "source": "other", "priority": false, "notes": "Applied via Twitter post.", "appliedAt": "2026-03-03T08:00:00Z" },
  { "companyName": "Airbnb", "position": "Product Designer", "status": "draft", "source": "linkedin", "priority": false, "notes": null, "appliedAt": null },
  { "companyName": "Uber", "position": "Data Scientist", "status": "interviewing", "source": "company_website", "priority": true, "notes": "Technical screening done.", "appliedAt": "2026-02-25T13:45:00Z" },
  { "companyName": "Tesla", "position": "Autopilot Engineer", "status": "rejected", "source": "indeed", "priority": false, "notes": "Too far from home.", "appliedAt": "2026-01-10T10:30:00Z" },
  { "companyName": "Spotify", "position": "Backend Developer", "status": "applied", "source": "linkedin", "priority": true, "notes": "Cool culture.", "appliedAt": "2026-03-02T19:00:00Z" },
  { "companyName": "Twitter", "position": "Site Reliability Engineer", "status": "draft", "source": "referral", "priority": false, "notes": "Wait for referral link.", "appliedAt": null },
  { "companyName": "Adobe", "position": "UI Engineer", "status": "offer", "source": "company_website", "priority": true, "notes": "Signing next week!", "appliedAt": "2026-02-12T12:00:00Z" },
  { "companyName": "Salesforce", "position": "Cloud Architect", "status": "interviewing", "source": "indeed", "priority": false, "notes": "Hiring manager call scheduled.", "appliedAt": "2026-03-01T15:20:00Z" },
  { "companyName": "Dropbox", "position": "Security Engineer", "status": "applied", "source": "linkedin", "priority": false, "notes": null, "appliedAt": "2026-03-03T11:10:00Z" },
  { "companyName": "Slack", "position": "Integration Dev", "status": "draft", "source": "other", "priority": false, "notes": "Researching team structure.", "appliedAt": null },
  { "companyName": "Pinterest", "position": "Growth Engineer", "status": "rejected", "source": "referral", "priority": false, "notes": "Ghosted after first round.", "appliedAt": "2026-01-20T09:00:00Z" },
  { "companyName": "Lyft", "position": "Mobile Engineer", "status": "applied", "source": "company_website", "priority": true, "notes": "Referral from ex-colleague.", "appliedAt": "2026-03-02T21:45:00Z" },
  { "companyName": "NVIDIA", "position": "CUDA Developer", "status": "interviewing", "source": "linkedin", "priority": true, "notes": "Deep learning focus.", "appliedAt": "2026-02-27T10:00:00Z" },
  { "companyName": "Discord", "position": "Infrastructure Lead", "status": "draft", "source": "indeed", "priority": true, "notes": "Drafting cover letter.", "appliedAt": null }
];
const userId = 7;

const main = async () => {
    try {
        const jobsWithUser = jobs.map((job) => ({
            ...job,
            userId: userId
        }))

        await prisma.jobs.createMany({
            data: jobsWithUser,
            skipDuplicates: true
        })
    } catch(error) {

    }
};
