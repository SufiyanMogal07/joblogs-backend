import { prisma } from "../src/db/dbConfig";
const demoJobs = [
  {
    "companyName": "Google",
    "position": "Software Engineer",
    "status": "interviewing",
    "source": "linkedin",
    "priority": true,
    "jobDescription": "Design, develop, test, deploy, maintain and improve software. Must have 4+ years in distributed systems, C++, or Java. Ability to survive 45 minutes of someone watching you write code in a Google Doc required.",
    "jobUrl": "https://www.linkedin.com/jobs/view/382910471",
    "notes": "Met recruiter at career fair.",
    "appliedAt": "2026-03-01T10:00:00Z",
    "createdAt": "2026-03-01T10:00:00Z",
    "updatedAt": "2026-03-05T14:20:00Z"
  },
  {
    "companyName": "Meta",
    "position": "Frontend Developer",
    "status": "applied",
    "source": "referral",
    "priority": true,
    "jobDescription": "Build next-generation web applications using React, Relay, and GraphQL. Experience with high-traffic web apps and modern UI component libraries. Must be cool with the metaverse.",
    "jobUrl": "https://www.metacareers.com/v2/jobs/918273645",
    "notes": "Referral from college friend.",
    "appliedAt": "2026-03-02T14:30:00Z",
    "createdAt": "2026-03-02T14:30:00Z",
    "updatedAt": "2026-03-02T14:30:00Z"
  },
  {
    "companyName": "Amazon",
    "position": "Backend Engineer",
    "status": "draft",
    "source": "indeed",
    "priority": false,
    "jobDescription": "Scale AWS Tier-1 infrastructure to handle millions of transactions per second. Full ownership of service lifecycle. Strong background in Java, DynamoDB, and leadership principles.",
    "jobUrl": "https://www.indeed.com/viewjob?jk=a1b2c3d4e5f6",
    "notes": "Need to update resume for this one.",
    "appliedAt": null,
    "createdAt": "2026-03-04T09:00:00Z",
    "updatedAt": "2026-03-04T09:00:00Z"
  },
  {
    "companyName": "Netflix",
    "position": "Fullstack Dev",
    "status": "rejected",
    "source": "company_website",
    "priority": false,
    "jobDescription": "Work on the core video playback UI and underlying microservices. Node.js, React, and Java/Spring. High performance, stunning colleague culture.",
    "jobUrl": "https://jobs.netflix.com/jobs/88219034",
    "notes": "Position closed.",
    "appliedAt": "2026-02-15T09:15:00Z",
    "createdAt": "2026-02-15T09:15:00Z",
    "updatedAt": "2026-02-28T11:00:00Z"
  },
  {
    "companyName": "Apple",
    "position": "iOS Engineer",
    "status": "offer",
    "source": "linkedin",
    "priority": true,
    "jobDescription": "Create seamless user experiences for iOS/iPadOS using Swift and SwiftUI. Deep understanding of the iOS SDK, UIKit, and memory management.",
    "jobUrl": "https://www.linkedin.com/jobs/view/449102938",
    "notes": "Negotiating salary.",
    "appliedAt": "2026-02-20T11:00:00Z",
    "createdAt": "2026-02-20T11:00:00Z",
    "updatedAt": "2026-03-06T16:45:00Z"
  },
  {
    "companyName": "Microsoft",
    "position": "Azure Consultant",
    "status": "interviewing",
    "source": "referral",
    "priority": true,
    "jobDescription": "Advise Fortune 500 enterprise clients on cloud migration strategies. Expert knowledge of Azure cloud services, Kubernetes, and enterprise IAM.",
    "jobUrl": "https://careers.microsoft.com/us/en/job/1627384",
    "notes": "Round 2 on Friday.",
    "appliedAt": "2026-02-28T16:00:00Z",
    "createdAt": "2026-02-28T16:00:00Z",
    "updatedAt": "2026-03-04T10:15:00Z"
  },
  {
    "companyName": "Stripe",
    "position": "API Engineer",
    "status": "applied",
    "source": "other",
    "priority": false,
    "jobDescription": "Design and build world-class developer APIs. Obsession with developer ergonomics, Ruby/Go/Java, and maintaining 99.999% uptime.",
    "jobUrl": "https://stripe.com/jobs/listing/api-engineer/5019283",
    "notes": "Applied via Twitter post.",
    "appliedAt": "2026-03-03T08:00:00Z",
    "createdAt": "2026-03-03T08:00:00Z",
    "updatedAt": "2026-03-03T08:00:00Z"
  },
  {
    "companyName": "Airbnb",
    "position": "Product Designer",
    "status": "draft",
    "source": "linkedin",
    "priority": false,
    "jobDescription": "Own end-to-end design for host onboarding flows. Must have an immaculate Figma portfolio and experience conducting real-world user research.",
    "jobUrl": "https://www.linkedin.com/jobs/view/291038472",
    "notes": null,
    "appliedAt": null,
    "createdAt": "2026-03-05T11:30:00Z",
    "updatedAt": "2026-03-05T11:30:00Z"
  },
  {
    "companyName": "Uber",
    "position": "Data Scientist",
    "status": "interviewing",
    "source": "company_website",
    "priority": true,
    "jobDescription": "Develop predictive machine learning models to optimize dynamic pricing and driver dispatch routing. Python, PyTorch, SQL, and spatial data expertise.",
    "jobUrl": "https://www.uber.com/global/en/careers/list/102938/",
    "notes": "Technical screening done.",
    "appliedAt": "2026-02-25T13:45:00Z",
    "createdAt": "2026-02-25T13:45:00Z",
    "updatedAt": "2026-03-02T15:00:00Z"
  },
  {
    "companyName": "Tesla",
    "position": "Autopilot Engineer",
    "status": "rejected",
    "source": "indeed",
    "priority": false,
    "jobDescription": "Write low-level C/C++ code for vehicle neural net vision systems. Real-time OS experience and hardcore linear algebra foundation required.",
    "jobUrl": "https://www.indeed.com/viewjob?jk=9988776655",
    "notes": "Too far from home.",
    "appliedAt": "2026-01-10T10:30:00Z",
    "createdAt": "2026-01-10T10:30:00Z",
    "updatedAt": "2026-01-24T09:00:00Z"
  },
  {
    "companyName": "Spotify",
    "position": "Backend Developer",
    "status": "applied",
    "source": "linkedin",
    "priority": true,
    "jobDescription": "Build scalable music recommendation pipelines. Experience with Google Cloud Platform, Java, Python, and high-throughput event streaming (Kafka).",
    "jobUrl": "https://www.linkedin.com/jobs/view/554433221",
    "notes": "Cool culture.",
    "appliedAt": "2026-03-02T19:00:00Z",
    "createdAt": "2026-03-02T19:00:00Z",
    "updatedAt": "2026-03-02T19:00:00Z"
  },
  {
    "companyName": "Twitter",
    "position": "Site Reliability Engineer",
    "status": "draft",
    "source": "referral",
    "priority": false,
    "jobDescription": "Keep the firehose running. Manage massive Kubernetes clusters, Prometheus monitoring, and live high-pressure incident response.",
    "jobUrl": "https://careers.x.com/en/jobs/401928",
    "notes": "Wait for referral link.",
    "appliedAt": null,
    "createdAt": "2026-03-01T12:00:00Z",
    "updatedAt": "2026-03-01T12:00:00Z"
  },
  {
    "companyName": "Adobe",
    "position": "UI Engineer",
    "status": "offer",
    "source": "company_website",
    "priority": true,
    "jobDescription": "Bring heavy desktop Creative Cloud tools to the web. WebAssembly, HTML5 Canvas API, TypeScript, and complex client-side state management.",
    "jobUrl": "https://careers.adobe.com/us/en/job/R10293",
    "notes": "Signing next week!",
    "appliedAt": "2026-02-12T12:00:00Z",
    "createdAt": "2026-02-12T12:00:00Z",
    "updatedAt": "2026-03-05T09:30:00Z"
  },
  {
    "companyName": "Salesforce",
    "position": "Cloud Architect",
    "status": "interviewing",
    "source": "indeed",
    "priority": false,
    "jobDescription": "Design multi-tenant SaaS architectures for enterprise CRM implementations. Deep knowledge of Apex, Lightning Web Components, and REST APIs.",
    "jobUrl": "https://www.indeed.com/viewjob?jk=7766554433",
    "notes": "Hiring manager call scheduled.",
    "appliedAt": "2026-03-01T15:20:00Z",
    "createdAt": "2026-03-01T15:20:00Z",
    "updatedAt": "2026-03-03T14:00:00Z"
  },
  {
    "companyName": "Dropbox",
    "position": "Security Engineer",
    "status": "applied",
    "source": "linkedin",
    "priority": false,
    "jobDescription": "Conduct internal penetration testing, automated code reviews, and threat modeling. Strong Python/Go skills and deep grasp of the OWASP Top 10.",
    "jobUrl": "https://www.linkedin.com/jobs/view/112233445",
    "notes": null,
    "appliedAt": "2026-03-03T11:10:00Z",
    "createdAt": "2026-03-03T11:10:00Z",
    "updatedAt": "2026-03-03T11:10:00Z"
  },
  {
    "companyName": "Slack",
    "position": "Integration Dev",
    "status": "draft",
    "source": "other",
    "priority": false,
    "jobDescription": "Build and maintain core App Directory ecosystem plugins. Node.js, complex OAuth 2.0 flows, and real-time Webhook infrastructure.",
    "jobUrl": "https://slack.com/careers/listing/99102",
    "notes": "Researching team structure.",
    "appliedAt": null,
    "createdAt": "2026-03-06T08:15:00Z",
    "updatedAt": "2026-03-06T08:15:00Z"
  },
  {
    "companyName": "Pinterest",
    "position": "Growth Engineer",
    "status": "rejected",
    "source": "referral",
    "priority": false,
    "jobDescription": "Run high-velocity A/B experiments to drive user acquisition and onboarding conversion. React, Python, and data-driven product intuition.",
    "jobUrl": "https://www.pinterestcareers.com/en/jobs/334455",
    "notes": "Ghosted after first round.",
    "appliedAt": "2026-01-20T09:00:00Z",
    "createdAt": "2026-01-20T09:00:00Z",
    "updatedAt": "2026-02-10T12:00:00Z"
  },
  {
    "companyName": "Lyft",
    "position": "Mobile Engineer",
    "status": "applied",
    "source": "company_website",
    "priority": true,
    "jobDescription": "Work on the core Rider Android app. Kotlin, Coroutines, Jetpack Compose, and custom live map rendering optimization.",
    "jobUrl": "https://www.lyft.com/careers/job/778899",
    "notes": "Referral from ex-colleague.",
    "appliedAt": "2026-03-02T21:45:00Z",
    "createdAt": "2026-03-02T21:45:00Z",
    "updatedAt": "2026-03-02T21:45:00Z"
  },
  {
    "companyName": "NVIDIA",
    "position": "CUDA Developer",
    "status": "interviewing",
    "source": "linkedin",
    "priority": true,
    "jobDescription": "Optimize LLM training kernels for next-gen GPU architectures. Master level C++, CUDA, parallel algorithms, and hardware profiling required.",
    "jobUrl": "https://www.linkedin.com/jobs/view/990011223",
    "notes": "Deep learning focus.",
    "appliedAt": "2026-02-27T10:00:00Z",
    "createdAt": "2026-02-27T10:00:00Z",
    "updatedAt": "2026-03-04T16:30:00Z"
  },
  {
    "companyName": "Discord",
    "position": "Infrastructure Lead",
    "status": "draft",
    "source": "indeed",
    "priority": true,
    "jobDescription": "Scale real-time voice and text chat infrastructure for 100M+ concurrent users. Elixir, Rust, ScyllaDB, and WebRTC streaming protocols.",
    "jobUrl": "https://www.indeed.com/viewjob?jk=5566778899",
    "notes": "Drafting cover letter.",
    "appliedAt": null,
    "createdAt": "2026-03-06T10:00:00Z",
    "updatedAt": "2026-03-06T10:00:00Z"
  }
];
const userId = 11;

const main = async () => {
    try {
        const jobsWithUser  = demoJobs.map((value) => ({
            ...value,
            userId: userId
        })) as any;

        await prisma.job.createMany({
            data: jobsWithUser,
            skipDuplicates: true
        })
    } catch(error) {

    }
};

main();
