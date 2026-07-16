/*
  content.js  —  SINGLE SOURCE OF TRUTH for the site's editable content.
  ---------------------------------------------------------------------------
  This is the ONE file you edit to update the site. No build step, no tools.
  Just change the text below, save, and refresh the page.

  How it works: this file assigns everything to a global called SITE.
  The pages read from SITE and render the timeline, project cards, and links.

  Tips:
    - Keep the quotes and commas as they are. Only change the text inside quotes.
    - To reorder experience or projects, move whole { ... } blocks up or down.
    - Dates are just display text, so write them however you like.
*/

window.SITE = {

  /* ----- Basic profile + contact (used on every page) ----- */
  profile: {
    name: "Kyra Hu",
    positioning: "I build the operating systems that let fast-growing organizations scale.",
    intro:
      "I take ambiguous, high-stakes, ownerless problems and turn them into a plan, " +
      "momentum, and a measurable outcome. I work at the operations and chief-of-staff " +
      "level, building the quiet infrastructure that lets teams move faster without breaking.",
    location: "New York, NY",
    email: "kyrahu12@gmail.com",
    linkedin: "https://www.linkedin.com/in/kyra-hu/",
    x: "https://x.com/kyrawhoo",
    xHandle: "@kyrawhoo",
    resume: "assets/resume/Kyra-Hu-Resume.pdf"
  },

  /* ----- Experience timeline (newest first) -----
     On-page shows the ONE-LINE summary only. The full bullets live in the
     résumé PDF, so you never maintain two copies. */
  experience: [
    {
      company: "FoodServiceIQ",
      title: "Chief of Staff",
      dates: "2025 – Present",
      summary:
        "Strategic right hand to leadership. Built the company's operational backbone " +
        "and lead a team of three project managers."
    },
    {
      company: "Success Academy Charter Schools",
      title: "Senior Project Manager",
      dates: "2024 – 2025",
      summary:
        "Owned end-to-end delivery of high-volume in-house creative, digital, and print projects."
    },
    {
      company: "ConcentricLife",
      title: "Project Manager",
      dates: "2023 – 2024",
      summary:
        "Ran integrated marketing campaigns for a portfolio of global clients, on time and on budget."
    },
    {
      company: "Wunderkind",
      title: "Project Coordinator",
      dates: "2022 – 2023",
      summary:
        "Launched request and reporting systems, plus process docs that streamlined cross-team work."
    },
    {
      company: "Project Sunshine",
      title: "Program Coordinator",
      dates: "2021 – 2022",
      summary:
        "Key liaison across hospital partners, volunteers, and staff for pediatric programs, " +
        "exceeding adoption and engagement KPIs."
    }
  ],

  /* ----- Education ----- */
  education: {
    school: "Brown University",
    degrees: [
      "B.A. Education Studies",
      "B.A. Engineering"
    ]
  },

  /* ----- Skills (grouped) ----- */
  skills: [
    { group: "Project management", items: ["ClickUp", "Monday", "Workfront", "Jira", "Trello", "Notion"] },
    { group: "CRM", items: ["Salesforce", "Zoho"] },
    { group: "AI", items: ["ChatGPT", "Claude", "Copilot"] },
    {
      group: "Core competencies",
      items: [
        "New initiative launch", "Executive partnership", "Strategic planning",
        "Cross-functional leadership", "Operating cadence", "KPI development",
        "Stakeholder management", "Vendor and partner negotiation", "Team leadership and coaching"
      ]
    }
  ],

  /* ----- Projects (small tools and gifts I built and maintain) -----
     Each card: title, tagline (one line), description, and a link.
     "cta" is the button label. Set "wip: true" to show a work-in-progress tag.
     For a private project, set "access: true" so the card shows a
     "Request access" button pointing at LinkedIn instead of a live link. */
  projects: [
    {
      title: "The Gamers' Heardle",
      tagline: "A daily song-guessing game I built for my mom.",
      description:
        "Launched Mother's Day 2026. Guess the track from short audio clips, with daily " +
        "puzzles, categories, streaks, stats, and a full archive.",
      link: "https://kyrawho.github.io/heardle",
      cta: "Play the game"
    },
    {
      title: "The JACK Road",
      tagline: "22 years of family trips, mapped.",
      description:
        "A Father's Day gift for my dad: an interactive map tracing our family trips from " +
        "2003 to 2026. Tap any stop to see the photos from that trip.",
      link: "https://kyrawho.github.io/jack-road/",
      cta: "Open the map"
    },
    {
      title: "Meghna's World",
      tagline: "A little private site for a friend.",
      description:
        "A small, personal site I built for my friend Meghna. It's password protected, so " +
        "access is by request only.",
      access: true,
      cta: "Request access"
    },
    {
      title: "Prixel",
      tagline: "A companion tool for the Prixel Press stamp kit.",
      description:
        "A work-in-progress companion app for the Prixel Press stamp kit. Still being built, " +
        "so expect rough edges.",
      link: "https://kyrawho.github.io/prixel/",
      cta: "Preview the WIP",
      wip: true
    }
  ]
};
