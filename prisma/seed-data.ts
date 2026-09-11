import { prisma } from "../src/db/dbConfig";
import { Prisma } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";

const demoJobs: Omit<Prisma.JobCreateManyInput, "userId">[] = [
  {
    companyName: "Google",
    position: "Software Engineer",
    status: "interviewing",
    source: "linkedin",
    priority: true,
    jobDescription:
      "Design distributed systems and ship reliable product features across web and backend surfaces.",
    jobUrl: "https://www.linkedin.com/jobs/view/382910471",
    notes: "Met recruiter at career fair.",
    appliedAt: "2026-03-01T10:00:00Z",
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-05T14:20:00Z",
  },
  {
    companyName: "Meta",
    position: "Frontend Developer",
    status: "applied",
    source: "referral",
    priority: true,
    jobDescription:
      "Build product experiences with React, design systems, and data-heavy interfaces.",
    jobUrl: "https://www.metacareers.com/v2/jobs/918273645",
    notes: "Referral from college friend.",
    appliedAt: "2026-03-02T14:30:00Z",
    createdAt: "2026-03-02T14:30:00Z",
    updatedAt: "2026-03-02T14:30:00Z",
  },
  {
    companyName: "Amazon",
    position: "Backend Engineer",
    status: "draft",
    source: "indeed",
    priority: false,
    jobDescription:
      "Build scalable services and handle high-throughput backend infrastructure.",
    jobUrl: "https://www.indeed.com/viewjob?jk=a1b2c3d4e5f6",
    notes: "Need to update resume for this one.",
    appliedAt: null,
    createdAt: "2026-03-04T09:00:00Z",
    updatedAt: "2026-03-04T09:00:00Z",
  },
  {
    companyName: "Netflix",
    position: "Fullstack Developer",
    status: "rejected",
    source: "company_website",
    priority: false,
    jobDescription:
      "Work on customer-facing product surfaces and supporting backend services.",
    jobUrl: "https://jobs.netflix.com/jobs/88219034",
    notes: "Position closed.",
    appliedAt: "2026-02-15T09:15:00Z",
    createdAt: "2026-02-15T09:15:00Z",
    updatedAt: "2026-02-28T11:00:00Z",
  },
  {
    companyName: "Apple",
    position: "iOS Engineer",
    status: "offer",
    source: "linkedin",
    priority: true,
    jobDescription:
      "Build polished mobile experiences for iOS and iPadOS users.",
    jobUrl: "https://www.linkedin.com/jobs/view/449102938",
    notes: "Negotiating salary.",
    appliedAt: "2026-02-20T11:00:00Z",
    createdAt: "2026-02-20T11:00:00Z",
    updatedAt: "2026-03-06T16:45:00Z",
  },
  {
    companyName: "Microsoft",
    position: "Azure Consultant",
    status: "interviewing",
    source: "referral",
    priority: true,
    jobDescription:
      "Advise enterprise customers on cloud migration and platform adoption.",
    jobUrl: "https://careers.microsoft.com/us/en/job/1627384",
    notes: "Round 2 on Friday.",
    appliedAt: "2026-02-28T16:00:00Z",
    createdAt: "2026-02-28T16:00:00Z",
    updatedAt: "2026-03-04T10:15:00Z",
  },
  {
    companyName: "Stripe",
    position: "API Engineer",
    status: "applied",
    source: "other",
    priority: false,
    jobDescription:
      "Design dependable APIs and improve developer-facing platform workflows.",
    jobUrl: "https://stripe.com/jobs/listing/api-engineer/5019283",
    notes: "Applied via Twitter post.",
    appliedAt: "2026-03-03T08:00:00Z",
    createdAt: "2026-03-03T08:00:00Z",
    updatedAt: "2026-03-03T08:00:00Z",
  },
  {
    companyName: "Airbnb",
    position: "Product Designer",
    status: "draft",
    source: "linkedin",
    priority: false,
    jobDescription:
      "Own product design for onboarding flows and collaborative host experiences.",
    jobUrl: "https://www.linkedin.com/jobs/view/291038472",
    notes: null,
    appliedAt: null,
    createdAt: "2026-03-05T11:30:00Z",
    updatedAt: "2026-03-05T11:30:00Z",
  },
  {
    companyName: "Uber",
    position: "Data Scientist",
    status: "interviewing",
    source: "company_website",
    priority: true,
    jobDescription:
      "Develop models and analytics to improve routing, pricing, and marketplace quality.",
    jobUrl: "https://www.uber.com/global/en/careers/list/102938/",
    notes: "Technical screening done.",
    appliedAt: "2026-02-25T13:45:00Z",
    createdAt: "2026-02-25T13:45:00Z",
    updatedAt: "2026-03-02T15:00:00Z",
  },
  {
    companyName: "Tesla",
    position: "Autopilot Engineer",
    status: "rejected",
    source: "indeed",
    priority: false,
    jobDescription:
      "Work on perception and control systems for vehicle automation.",
    jobUrl: "https://www.indeed.com/viewjob?jk=9988776655",
    notes: "Too far from home.",
    appliedAt: "2026-01-10T10:30:00Z",
    createdAt: "2026-01-10T10:30:00Z",
    updatedAt: "2026-01-24T09:00:00Z",
  },
  {
    companyName: "Spotify",
    position: "Backend Developer",
    status: "applied",
    source: "linkedin",
    priority: true,
    jobDescription:
      "Build scalable recommendation and playback services for music products.",
    jobUrl: "https://www.linkedin.com/jobs/view/554433221",
    notes: "Cool culture.",
    appliedAt: "2026-03-02T19:00:00Z",
    createdAt: "2026-03-02T19:00:00Z",
    updatedAt: "2026-03-02T19:00:00Z",
  },
  {
    companyName: "Twitter",
    position: "Site Reliability Engineer",
    status: "draft",
    source: "referral",
    priority: false,
    jobDescription:
      "Operate large-scale infrastructure and improve service reliability.",
    jobUrl: "https://careers.x.com/en/jobs/401928",
    notes: "Wait for referral link.",
    appliedAt: null,
    createdAt: "2026-03-01T12:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z",
  },
  {
    companyName: "Adobe",
    position: "UI Engineer",
    status: "offer",
    source: "company_website",
    priority: true,
    jobDescription:
      "Bring complex creative tools to the web with a strong focus on interaction design.",
    jobUrl: "https://careers.adobe.com/us/en/job/R10293",
    notes: "Signing next week!",
    appliedAt: "2026-02-12T12:00:00Z",
    createdAt: "2026-02-12T12:00:00Z",
    updatedAt: "2026-03-05T09:30:00Z",
  },
  {
    companyName: "Salesforce",
    position: "Cloud Architect",
    status: "interviewing",
    source: "indeed",
    priority: false,
    jobDescription:
      "Design enterprise SaaS architecture and guide customers through implementation.",
    jobUrl: "https://www.indeed.com/viewjob?jk=7766554433",
    notes: "Hiring manager call scheduled.",
    appliedAt: "2026-03-01T15:20:00Z",
    createdAt: "2026-03-01T15:20:00Z",
    updatedAt: "2026-03-03T14:00:00Z",
  },
  {
    companyName: "Dropbox",
    position: "Security Engineer",
    status: "applied",
    source: "linkedin",
    priority: false,
    jobDescription:
      "Run security reviews, threat modeling, and internal application testing.",
    jobUrl: "https://www.linkedin.com/jobs/view/112233445",
    notes: null,
    appliedAt: "2026-03-03T11:10:00Z",
    createdAt: "2026-03-03T11:10:00Z",
    updatedAt: "2026-03-03T11:10:00Z",
  },
  {
    companyName: "Slack",
    position: "Integration Developer",
    status: "draft",
    source: "other",
    priority: false,
    jobDescription:
      "Build integrations and developer tooling for collaboration workflows.",
    jobUrl: "https://slack.com/careers/listing/99102",
    notes: "Researching team structure.",
    appliedAt: null,
    createdAt: "2026-03-06T08:15:00Z",
    updatedAt: "2026-03-06T08:15:00Z",
  },
  {
    companyName: "Pinterest",
    position: "Growth Engineer",
    status: "rejected",
    source: "referral",
    priority: false,
    jobDescription:
      "Run experiments and optimize acquisition, activation, and onboarding flows.",
    jobUrl: "https://www.pinterestcareers.com/en/jobs/334455",
    notes: "Ghosted after first round.",
    appliedAt: "2026-01-20T09:00:00Z",
    createdAt: "2026-01-20T09:00:00Z",
    updatedAt: "2026-02-10T12:00:00Z",
  },
  {
    companyName: "Lyft",
    position: "Mobile Engineer",
    status: "applied",
    source: "company_website",
    priority: true,
    jobDescription:
      "Work on mobile app experiences and map-driven rider flows.",
    jobUrl: "https://www.lyft.com/careers/job/778899",
    notes: "Referral from ex-colleague.",
    appliedAt: "2026-03-02T21:45:00Z",
    createdAt: "2026-03-02T21:45:00Z",
    updatedAt: "2026-03-02T21:45:00Z",
  },
  {
    companyName: "NVIDIA",
    position: "CUDA Developer",
    status: "interviewing",
    source: "linkedin",
    priority: true,
    jobDescription:
      "Optimize GPU workloads and build performant compute kernels.",
    jobUrl: "https://www.linkedin.com/jobs/view/990011223",
    notes: "Deep learning focus.",
    appliedAt: "2026-02-27T10:00:00Z",
    createdAt: "2026-02-27T10:00:00Z",
    updatedAt: "2026-03-04T16:30:00Z",
  },
  {
    companyName: "Discord",
    position: "Infrastructure Lead",
    status: "draft",
    source: "indeed",
    priority: true,
    jobDescription:
      "Scale real-time communication systems and improve operational resilience.",
    jobUrl: "https://www.indeed.com/viewjob?jk=5566778899",
    notes: "Drafting cover letter.",
    appliedAt: null,
    createdAt: "2026-03-06T10:00:00Z",
    updatedAt: "2026-03-06T10:00:00Z",
  },
];

const demoUsers = [
  {
    name: "Sufiyan Mogal",
    email: "sufiyanyaseenmogal@gmail.com",
    emailNotification: true
  },
  {
    name: "Aarav Sharma",
    email: "aarav.demo@example.com",
     emailNotification: true
  },
  {
    name: "Zoya Khan",
    email: "zoya.demo@example.com",
     emailNotification: true
  },
];

const main = async () => {
  try {
    for (const userData of demoUsers) {
      const hashedPassword = await bcrypt.hash("demo123456",10);
      const user = await prisma.user.upsert({
        where: {
          email: userData.email,
        },
        update: {},
        create: {
          ...userData,
          password: hashedPassword
        },
      });

      const jobsWithUser = demoJobs.map((job) => ({
        ...job,
        userId: user.id
      }));

      await prisma.job.createMany({
        data: jobsWithUser,
        skipDuplicates: true,
      })

    }
  } catch (error) {
    console.error("Something went wrong while seeding data")
  }
};

main();
