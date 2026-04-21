const elements = {
  brandName: document.querySelector("#brandName"),
  brandTagline: document.querySelector("#brandTagline"),
  siteHeader: document.querySelector("#siteHeader"),
  siteNav: document.querySelector("#siteNav"),
  pageRoot: document.querySelector("#pageRoot"),
  footerNote: document.querySelector("#footerNote"),
  footerYear: document.querySelector("#footerYear")
};

const currentPage = document.body.dataset.page || "home";
const metaDescription = document.querySelector('meta[name="description"]');

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buttonMarkup({ href, label, variant = "solid" }) {
  return `<a class="button ${variant === "outline" ? "button-outline" : "button-solid"}" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
}

function imageMarkup(image, caption = image.caption) {
  return `
    <div class="hero-media">
      <div class="media-frame">
        <div class="media-halo" aria-hidden="true"></div>
        <img class="hero-image" src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" />
      </div>
      <p class="media-caption">${escapeHtml(caption)}</p>
    </div>
  `;
}

function cardMarkup(title, description, className) {
  return `
    <article class="${className}">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
    </article>
  `;
}

function highlightMarkup(items) {
  return items
    .map(
      (item) => `
        <article class="story-highlight">
          <strong>Why it matters</strong>
          <p>${escapeHtml(item)}</p>
        </article>
      `
    )
    .join("");
}

function valueMarkup(values) {
  return values.map((value) => `<span class="value-pill">${escapeHtml(value)}</span>`).join("");
}

function overviewCardMarkup(eyebrow, title, description) {
  return `
    <article class="overview-card">
      <span class="overview-eyebrow">${escapeHtml(eyebrow)}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
    </article>
  `;
}

function supportCardMarkup(title, description) {
  return `
    <article class="support-card">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
    </article>
  `;
}

function initiativeListMarkup(initiatives) {
  return initiatives.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function contactFormMarkup(contact) {
  return `
    <form class="contact-form" id="contactForm">
      <label>
        <span>${escapeHtml(contact.formLabels.name)}</span>
        <input type="text" name="name" autocomplete="name" required />
      </label>

      <label>
        <span>${escapeHtml(contact.formLabels.email)}</span>
        <input type="email" name="email" autocomplete="email" required />
      </label>

      <label>
        <span>${escapeHtml(contact.formLabels.context)}</span>
        <select name="context">
          ${contact.contextOptions
            .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
            .join("")}
        </select>
      </label>

      <label>
        <span>${escapeHtml(contact.formLabels.message)}</span>
        <textarea name="message" rows="5" required></textarea>
      </label>

      <button class="button button-solid" type="submit" id="submitButton">Send Message</button>
      <p class="form-status" id="formStatus" role="status" aria-live="polite"></p>
    </form>
  `;
}

function renderClosingBanner(data) {
  return `
    <section class="closing-banner reveal">
      <p class="closing-kicker">A Place To Begin Again</p>
      <h2>${escapeHtml(data.closing.title)}</h2>
      <p>${escapeHtml(data.closing.body)}</p>
    </section>
  `;
}

function pageConfig(data) {
  return {
    home: {
      title: `${data.foundation.name} Foundation`,
      description:
        "EmboldHer is a trusted presence walking with women and girls through dignity, care, belonging, and hope.",
      markup: `
        <section class="hero reveal">
          <div class="hero-copy">
            <p class="eyebrow">${escapeHtml(data.hero.eyebrow)}</p>
            <h1>${escapeHtml(data.hero.headline)}</h1>
            <p class="hero-text">${escapeHtml(data.hero.copy)}</p>
            <div class="hero-actions">${data.hero.ctas.map(buttonMarkup).join("")}</div>
            <div class="value-band">${valueMarkup(data.values)}</div>
          </div>
          ${imageMarkup(data.hero.image)}
        </section>

        <section class="overview-section reveal">
          <div class="section-heading">
            <p class="section-kicker">Explore</p>
            <h2>Walk through the work one page at a time.</h2>
            <p class="section-intro">
              Use the header navigation to move through the dedicated pages for the story, the programs, the work, the ways to help, and how to reach out.
            </p>
          </div>
          <div class="overview-grid">
            ${overviewCardMarkup(data.about.title, "A trusted presence rooted in dignity and affirmation.", data.about.intro)}
            ${overviewCardMarkup(data.pillars.title, "Practical care and community that move together.", data.pillars.intro)}
            ${overviewCardMarkup(data.work.title, "Visible support delivered in real places.", data.work.intro)}
            ${overviewCardMarkup(data.involvement.title, "Ways to volunteer, partner, and give.", data.involvement.intro)}
            ${overviewCardMarkup("Reach Out", "A direct path for support, giving, and partnership.", data.contact.intro)}
          </div>
        </section>

        ${renderClosingBanner(data)}
      `
    },
    "who-we-are": {
      title: `Who We Are | ${data.foundation.name}`,
      description: "Learn about EmboldHer's identity, values, and commitment to women and girls.",
      markup: `
        <section class="page-hero reveal">
          <div class="page-hero-copy">
            <p class="section-kicker">${escapeHtml(data.about.title)}</p>
            <h1 class="page-title">A steady, trusted presence.</h1>
            <p class="hero-text">${escapeHtml(data.about.intro)}</p>
            <div class="hero-actions">
              ${buttonMarkup({ href: "/get-involved.html", label: "Join the Movement" })}
              ${buttonMarkup({ href: "/reach-out.html", label: "Reach Out", variant: "outline" })}
            </div>
          </div>
          ${imageMarkup(data.hero.image, "A visual echo of light, dignity, and becoming.")}
        </section>

        <section class="story-section reveal">
          <div class="section-heading">
            <p class="section-kicker">Identity</p>
            <h2>${escapeHtml(data.about.title)}</h2>
          </div>
          <div class="story-layout">
            <div class="story-card">
              <p>${escapeHtml(data.about.intro)}</p>
              <p>${escapeHtml(data.about.body)}</p>
            </div>
            <div class="story-highlights">
              ${highlightMarkup(data.about.highlights)}
            </div>
          </div>
        </section>

        <section class="value-section reveal">
          <div class="section-heading">
            <p class="section-kicker">What Grounds Us</p>
            <h2>Seen. Valued. Supported.</h2>
            <p class="section-intro">
              These are not slogans. They are the baseline of how women and girls are meant to be met.
            </p>
          </div>
          <div class="value-band value-band-wide">${valueMarkup(data.values)}</div>
        </section>

        ${renderClosingBanner(data)}
      `
    },
    "what-we-do": {
      title: `What We Do | ${data.foundation.name}`,
      description: "See how EmboldHer combines dignity-centered care with belonging and mentorship.",
      markup: `
        <section class="page-hero reveal">
          <div class="page-hero-copy">
            <p class="section-kicker">${escapeHtml(data.pillars.title)}</p>
            <h1 class="page-title">Practical care with human warmth.</h1>
            <p class="hero-text">${escapeHtml(data.pillars.intro)}</p>
            <div class="hero-actions">
              ${buttonMarkup({ href: "/our-work.html", label: "See Our Work" })}
              ${buttonMarkup({ href: "/get-involved.html", label: "Partner With Us", variant: "outline" })}
            </div>
          </div>
          ${imageMarkup(data.hero.image, "Care that feels grounded, hopeful, and deeply human.")}
        </section>

        <section class="program-section reveal">
          <div class="section-heading">
            <p class="section-kicker">Core Areas</p>
            <h2>${escapeHtml(data.pillars.title)}</h2>
            <p class="section-intro">${escapeHtml(data.pillars.intro)}</p>
          </div>
          <div class="program-grid">
            ${data.pillars.items.map((item) => cardMarkup(item.title, item.description, "program-card")).join("")}
          </div>
        </section>

        <section class="support-section reveal">
          <div class="section-heading">
            <p class="section-kicker">How It Feels</p>
            <h2>Support that responds to the whole person.</h2>
          </div>
          <div class="support-grid">
            ${supportCardMarkup("Immediate dignity", data.pillars.items[0].description)}
            ${supportCardMarkup("Safe belonging", data.pillars.items[1].description)}
            ${supportCardMarkup("A longer walk", "The work does not end with a single visit. It grows through presence, conversation, and consistent encouragement.")}
          </div>
        </section>

        ${renderClosingBanner(data)}
      `
    },
    "our-work": {
      title: `Our Work | ${data.foundation.name}`,
      description: "Explore EmboldHer's outreach, visits, menstrual dignity support, and mentorship work.",
      markup: `
        <section class="page-hero reveal">
          <div class="page-hero-copy">
            <p class="section-kicker">${escapeHtml(data.work.title)}</p>
            <h1 class="page-title">Visible care, delivered in real places.</h1>
            <p class="hero-text">${escapeHtml(data.work.intro)}</p>
            <div class="hero-actions">
              ${buttonMarkup({ href: "/get-involved.html", label: "Stand With Us" })}
              ${buttonMarkup({ href: "/reach-out.html", label: "Ask for Support", variant: "outline" })}
            </div>
          </div>
          ${imageMarkup(data.hero.image, "A reminder that practical care can still carry beauty and hope.")}
        </section>

        <section class="work-section reveal">
          <div class="section-heading">
            <p class="section-kicker">Current Focus</p>
            <h2>${escapeHtml(data.work.title)}</h2>
            <p class="section-intro">${escapeHtml(data.work.intro)}</p>
          </div>
          <div class="work-shell">
            <div class="work-callout">
              <p class="callout-label">Dignity &amp; Connection Drive</p>
              <p class="callout-text">
                Presence, practical support, and conversations that remind women and girls they do not have to walk alone.
              </p>
            </div>
            <ul class="initiative-list">
              ${initiativeListMarkup(data.work.initiatives)}
            </ul>
          </div>
        </section>

        <section class="support-section reveal">
          <div class="section-heading">
            <p class="section-kicker">In Practice</p>
            <h2>The work moves from care to connection.</h2>
          </div>
          <div class="support-grid">
            ${supportCardMarkup("Dignity first", data.work.initiatives[0])}
            ${supportCardMarkup("Go where the need is", data.work.initiatives[1])}
            ${supportCardMarkup("Stay in conversation", data.work.initiatives[2])}
          </div>
        </section>

        ${renderClosingBanner(data)}
      `
    },
    "get-involved": {
      title: `Get Involved | ${data.foundation.name}`,
      description: "Volunteer, partner, or donate to support EmboldHer's mission.",
      markup: `
        <section class="page-hero reveal">
          <div class="page-hero-copy">
            <p class="section-kicker">${escapeHtml(data.involvement.title)}</p>
            <h1 class="page-title">Generosity can look like time, trust, or resources.</h1>
            <p class="hero-text">${escapeHtml(data.involvement.intro)}</p>
            <div class="hero-actions">
              ${buttonMarkup({ href: "/reach-out.html", label: "Reach Out" })}
              ${buttonMarkup({ href: "/our-work.html", label: "See the Work", variant: "outline" })}
            </div>
          </div>
          ${imageMarkup(data.hero.image, "Movement grows when more people choose to show up.")}
        </section>

        <section class="involvement-section reveal">
          <div class="section-heading">
            <p class="section-kicker">Ways To Help</p>
            <h2>${escapeHtml(data.involvement.title)}</h2>
            <p class="section-intro">${escapeHtml(data.involvement.intro)}</p>
          </div>
          <div class="action-grid">
            ${data.involvement.actions.map((action) => cardMarkup(action.title, action.description, "action-card")).join("")}
          </div>
        </section>

        <section class="support-section reveal">
          <div class="section-heading">
            <p class="section-kicker">What Your Support Unlocks</p>
            <h2>Support becomes dignity, access, and steady presence.</h2>
            <p class="section-intro">
              Time, partnership, and financial support all land in practical places where women and girls can feel the difference.
            </p>
          </div>
          <div class="support-grid">
            ${supportCardMarkup("Menstrual dignity", "Pads, essentials, and practical care items reach girls and women who need them most.")}
            ${supportCardMarkup("Visits that reach real places", "Transport, planning, and coordination make it possible to show up in girls homes and borstal spaces.")}
            ${supportCardMarkup("Mentorship that lasts", "Follow-up conversations and encouragement help support continue beyond a single drive or visit.")}
          </div>
        </section>

        ${renderClosingBanner(data)}
      `
    },
    "reach-out": {
      title: `Reach Out | ${data.foundation.name}`,
      description: "Contact EmboldHer for support, volunteering, partnership, or giving.",
      markup: `
        <section class="page-hero reveal">
          <div class="page-hero-copy">
            <p class="section-kicker">Reach Out</p>
            <h1 class="page-title">If you need support, we are here.</h1>
            <p class="hero-text">${escapeHtml(data.contact.body)}</p>
            <div class="hero-actions">
              ${buttonMarkup({ href: "/who-we-are.html", label: "Learn About Us" })}
              ${buttonMarkup({ href: "/get-involved.html", label: "Get Involved", variant: "outline" })}
            </div>
          </div>
          ${imageMarkup(data.hero.image, "A place to begin the conversation.")}
        </section>

        <section class="contact-section reveal">
          <div class="contact-copy">
            <p class="section-kicker">${escapeHtml(data.contact.title)}</p>
            <h2>${escapeHtml(data.contact.intro)}</h2>
            <p class="section-intro">${escapeHtml(data.contact.body)}</p>
            <p>
              Use the form to ask for support, volunteer, start a partnership conversation, or say you want to help fund the work.
            </p>
          </div>
          ${contactFormMarkup(data.contact)}
        </section>

        <section class="support-section reveal">
          <div class="section-heading">
            <p class="section-kicker">You Can Reach Out About</p>
            <h2>Support, giving, partnership, or service.</h2>
          </div>
          <div class="support-grid">
            ${data.contact.contextOptions.map((option) => supportCardMarkup(option, "EmboldHer can respond and route your message through the local backend inbox already wired to this site.")).join("")}
          </div>
        </section>
      `
    }
  };
}

function applyChrome(data, config) {
  document.title = config.title;

  if (metaDescription) {
    metaDescription.setAttribute("content", config.description);
  }

  elements.brandName.textContent = data.foundation.name;
  elements.brandTagline.textContent = data.foundation.tagline;
  elements.footerNote.textContent = data.foundation.note;
  elements.footerYear.textContent = new Date().getFullYear();
  elements.siteNav.querySelectorAll("a[data-nav-key]").forEach((link) => {
    if (link.dataset.navKey === currentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initialiseReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealElements.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function syncHeaderState() {
  elements.siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
}

async function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector("#submitButton");
  const formStatus = form.querySelector("#formStatus");
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  formStatus.textContent = "";
  formStatus.dataset.state = "";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Unable to send message.");
    }

    form.reset();
    formStatus.dataset.state = "success";
    formStatus.textContent = result.message;
  } catch (error) {
    formStatus.dataset.state = "error";
    formStatus.textContent = error.message;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }
}

function bindPageInteractions() {
  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }
}

function renderPage(data) {
  const config = pageConfig(data)[currentPage] || pageConfig(data).home;
  applyChrome(data, config);
  elements.pageRoot.innerHTML = config.markup;
  bindPageInteractions();
  initialiseReveal();
}

async function loadSite() {
  const response = await fetch("/api/site-content");

  if (!response.ok) {
    throw new Error("Unable to load site content.");
  }

  return response.json();
}

async function init() {
  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });

  try {
    const data = await loadSite();
    renderPage(data);
  } catch (error) {
    elements.pageRoot.innerHTML = `
      <section class="closing-banner is-visible">
        <p class="closing-kicker">Load Error</p>
        <h2>Unable to load the site right now.</h2>
        <p>${escapeHtml(error.message)}</p>
      </section>
    `;
  }
}

init();
