(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.SITE_CONTENT = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  return {
    foundation: {
      name: "EmboldHer",
      tagline: "A trusted presence for women and girls finding their way forward.",
      note: "Come as you are. We'll walk with you."
    },
    navigation: [
      { key: "who-we-are", label: "Who We Are", href: "/who-we-are.html" },
      { key: "what-we-do", label: "What We Do", href: "/what-we-do.html" },
      { key: "our-work", label: "Our Work", href: "/our-work.html" },
      { key: "get-involved", label: "Get Involved", href: "/get-involved.html" },
      { key: "reach-out", label: "Reach Out", href: "/reach-out.html" }
    ],
    hero: {
      eyebrow: "For girls and women choosing hope, healing, and a new beginning",
      headline: "You are not alone and you are not small.",
      copy:
        "EmboldHer is a beacon of hope, courage, and love. We walk with women and girls the way an older sister, mother, or aunt would: seeing them fully, valuing them deeply, and supporting them to rise on their own terms.",
      ctas: [
        { label: "Join the Movement", href: "/get-involved.html", variant: "solid" },
        { label: "Support a Woman", href: "/reach-out.html", variant: "outline" }
      ],
      image: {
        src: "/photos/muse.jpeg",
        alt: "Painting of a silhouetted woman with a radiant center against a golden sky.",
        caption: "Art that mirrors dignity, light, and becoming."
      }
    },
    values: ["Seen", "Valued", "Supported"],
    about: {
      title: "Who We Are",
      intro:
        "EmboldHer exists to support, affirm, and empower women and girls from all walks of life, especially those navigating hardship, healing, or starting over.",
      body:
        "We show up as a safe presence where women are met with dignity, practical care, and community. The goal is not to speak over them, but to help them reclaim voice, confidence, and possibility.",
      highlights: [
        "An affirming presence rooted in compassion and trust",
        "A space for women and girls rebuilding after difficult seasons",
        "Support that centers dignity, belonging, and personal agency"
      ]
    },
    pillars: {
      title: "What We Do",
      intro:
        "Our work is relational and practical. We respond to immediate needs while nurturing the kind of support that helps women move forward with confidence.",
      items: [
        {
          title: "Dignity & Care",
          description:
            "Menstrual health support, practical care, and emotional reassurance that protect dignity in vulnerable seasons."
        },
        {
          title: "Connection & Belonging",
          description:
            "Mentorship, safe spaces, and community where women and girls can be known, heard, and encouraged."
        }
      ]
    },
    work: {
      title: "Our Work",
      intro:
        "The Dignity & Connection Drive meets women and girls where they are with practical support and presence that lasts beyond a single visit.",
      initiatives: [
        "Pads initiative and menstrual dignity support",
        "Visits to girls homes and borstal spaces",
        "Conversations, mentorship, and consistent encouragement"
      ]
    },
    involvement: {
      title: "Get Involved",
      intro:
        "The movement grows through generous people and organizations willing to show up with time, resources, and care.",
      actions: [
        {
          title: "Volunteer",
          description:
            "Offer your skills, presence, and empathy in mentorship moments, drives, and community outreach."
        },
        {
          title: "Partner",
          description:
            "Collaborate as an organization, school, church, or community group aligned with dignity-centered care."
        },
        {
          title: "Donate",
          description:
            "Help fund menstrual health support, visits, outreach logistics, and responsive care for women and girls."
        }
      ]
    },
    closing: {
      title: "Come as you are.",
      body:
        "Whether you need support, want to stand with someone else, or hope to build a kinder future for women and girls, EmboldHer is here to walk with you."
    },
    contact: {
      title: "Contact / Reach Out",
      intro: "If you need support, we are here.",
      body:
        "Send a note and the message will be recorded by the local backend so your outreach flow is already wired for the next step.",
      formLabels: {
        name: "Your name",
        email: "Email address",
        context: "How can we walk with you?",
        message: "Message"
      },
      contextOptions: [
        "I need support",
        "I want to volunteer",
        "I want to partner",
        "I want to donate"
      ]
    }
  };
});
