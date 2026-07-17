/*
  content.js  —  SINGLE SOURCE OF TRUTH for the site's editable content.
  ---------------------------------------------------------------------------
  This is the ONE file you edit to update the site. No build step, no tools.
  Just change the text below, save, and refresh the page.

  How it works: this file assigns everything to a global called SITE.
  The pages read from SITE and render the launchpad, timeline, project cards,
  and craft grid.

  Tips:
    - Keep the quotes and commas as they are. Only change the text inside quotes.
    - To reorder experience / projects / crafts, move whole { ... } blocks.
    - Dates are just display text, so write them however you like.
*/

window.SITE = {

  /* ----- Basic profile + contact (used on every page) ----- */
  profile: {
    name: "Kyra Hu",

    /* The one line on the home page. */
    tagline:
      "I spend my days making companies work for the people in them, " +
      "and my free time making things for the people I love.",

    /* A shorter professional positioning line (used on the About page). */
    positioning: "I build the operating systems that let fast-growing organizations scale.",

    location: "New York, NY",
    email: "kyrahu12@gmail.com",
    linkedin: "https://www.linkedin.com/in/kyra-hu/",
    letterboxd: "https://letterboxd.com/kyrawho/",
    instagram: "https://www.instagram.com/kyraskrafts/",
    instagramHandle: "@kyraskrafts",
    resume: "assets/resume/Kyra-Hu-Resume.pdf",

    /* Headshot lives on the About page now. Save your photo as this file
       (a web-friendly JPG, ~800px wide is plenty). */
    headshot: "assets/img/kyra-headshot.jpg"
  },

  /* ----- About page copy ----- */
  about: {
    lead:
      "I'm Kyra — a chief of staff in New York who is happiest turning chaos " +
      "into calm, whether that's an operating cadence for a fast-growing company " +
      "or a small handmade thing at my kitchen table.",
    paragraphs: [
      "By day I work at the operations and chief-of-staff level: I take ambiguous, " +
      "high-stakes, ownerless problems and turn them into a plan, momentum, and a " +
      "measurable outcome. The throughline of my career has been building the quiet " +
      "infrastructure that lets teams move faster without breaking.",

      "What I actually care about, underneath the org charts and the KPIs, is people — " +
      "making companies work for the people inside them. The best systems are the ones " +
      "nobody notices, because everything just works.",

      "Away from work, I make things. Small web apps and games I build as gifts for the " +
      "people I love. Crafts I share at @kyraskrafts. And a steady, slightly obsessive " +
      "diet of movies — I'm always hunting for the next favorite."
    ],
    /* The "off the clock" note about movies. */
    moviesNote: "I log everything I watch on Letterboxd."
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
     "cta" is the link label. Set "wip: true" to show a work-in-progress tag.
     For a private project, set "access: true" so the card shows a
     "Request access" link pointing at LinkedIn instead of a live link. */
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
  ],

  /* ----- Crafts (@kyraskrafts) -----
     A curated, self-hosted gallery. These are SCAFFOLD placeholders — swap them
     for real work whenever you like.

     To add a real craft:
       1. Drop a photo into assets/img/crafts/ (any web-friendly JPG/PNG).
       2. Fill in "img" with its path, a short "title", and an optional "note".
       3. (Optional) point "link" at the matching Instagram post.
     Leave "img" empty ("") and the tile shows a clean labeled placeholder. */
  crafts: [
    { title: "Coming soon", note: "A recent make", img: "", link: "" },
    { title: "Coming soon", note: "A recent make", img: "", link: "" },
    { title: "Coming soon", note: "A recent make", img: "", link: "" },
    { title: "Coming soon", note: "A recent make", img: "", link: "" },
    { title: "Coming soon", note: "A recent make", img: "", link: "" },
    { title: "Coming soon", note: "A recent make", img: "", link: "" }
  ]
};
