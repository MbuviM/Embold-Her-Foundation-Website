const elements = {
  brandName: document.querySelector("#brandName"),
  brandTagline: document.querySelector("#brandTagline"),
  siteNav: document.querySelector("#siteNav"),
  heroEyebrow: document.querySelector("#heroEyebrow"),
  heroHeadline: document.querySelector("#heroHeadline"),
  heroCopy: document.querySelector("#heroCopy"),
  heroActions: document.querySelector("#heroActions"),
  heroImage: document.querySelector("#heroImage"),
  heroImageCaption: document.querySelector("#heroImageCaption"),
  valueBand: document.querySelector("#valueBand"),
  aboutTitle: document.querySelector("#aboutTitle"),
  aboutIntro: document.querySelector("#aboutIntro"),
  aboutBody: document.querySelector("#aboutBody"),
  aboutHighlights: document.querySelector("#aboutHighlights"),
  pillarsTitle: document.querySelector("#pillarsTitle"),
  pillarsIntro: document.querySelector("#pillarsIntro"),
  pillarsGrid: document.querySelector("#pillarsGrid"),
  workTitle: document.querySelector("#workTitle"),
  workIntro: document.querySelector("#workIntro"),
  initiativeList: document.querySelector("#initiativeList"),
  involvementTitle: document.querySelector("#involvementTitle"),
  involvementIntro: document.querySelector("#involvementIntro"),
  actionGrid: document.querySelector("#actionGrid"),
  closingTitle: document.querySelector("#closingTitle"),
  closingBody: document.querySelector("#closingBody"),
  contactTitle: document.querySelector("#contactTitle"),
  contactIntro: document.querySelector("#contactIntro"),
  contactBody: document.querySelector("#contactBody"),
  nameLabel: document.querySelector("#nameLabel"),
  emailLabel: document.querySelector("#emailLabel"),
  contextLabel: document.querySelector("#contextLabel"),
  messageLabel: document.querySelector("#messageLabel"),
  contextSelect: document.querySelector("#contextSelect"),
  contactForm: document.querySelector("#contactForm"),
  submitButton: document.querySelector("#submitButton"),
  formStatus: document.querySelector("#formStatus"),
  footerNote: document.querySelector("#footerNote"),
  footerYear: document.querySelector("#footerYear")
};

function createLinkButton({ href, label, variant }) {
  const link = document.createElement("a");
  link.href = href;
  link.className = `button ${variant === "outline" ? "button-outline" : "button-solid"}`;
  link.textContent = label;
  return link;
}

function createCard(title, description, extraClass = "") {
  const article = document.createElement("article");
  article.className = extraClass;

  const heading = document.createElement("h3");
  heading.textContent = title;

  const body = document.createElement("p");
  body.textContent = description;

  article.append(heading, body);
  return article;
}

function populateNavigation(navigation) {
  elements.siteNav.replaceChildren(
    ...navigation.map((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      return link;
    })
  );
}

function populateValues(values) {
  elements.valueBand.replaceChildren(
    ...values.map((value) => {
      const pill = document.createElement("span");
      pill.className = "value-pill";
      pill.textContent = value;
      return pill;
    })
  );
}

function populateHighlights(highlights) {
  elements.aboutHighlights.replaceChildren(
    ...highlights.map((item) => {
      const block = document.createElement("article");
      block.className = "story-highlight";

      const label = document.createElement("strong");
      label.textContent = "Why it matters";

      const copy = document.createElement("p");
      copy.textContent = item;

      block.append(label, copy);
      return block;
    })
  );
}

function populatePrograms(pillars) {
  elements.pillarsGrid.replaceChildren(
    ...pillars.map((pillar) => createCard(pillar.title, pillar.description, "program-card"))
  );
}

function populateInitiatives(initiatives) {
  elements.initiativeList.replaceChildren(
    ...initiatives.map((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      return listItem;
    })
  );
}

function populateActions(actions) {
  elements.actionGrid.replaceChildren(
    ...actions.map((action) => createCard(action.title, action.description, "action-card"))
  );
}

function populateContextOptions(options) {
  elements.contextSelect.replaceChildren(
    ...options.map((option) => {
      const optionNode = document.createElement("option");
      optionNode.value = option;
      optionNode.textContent = option;
      return optionNode;
    })
  );
}

function applyContent(data) {
  document.title = `${data.foundation.name} Foundation`;
  elements.brandName.textContent = data.foundation.name;
  elements.brandTagline.textContent = data.foundation.tagline;
  elements.heroEyebrow.textContent = data.hero.eyebrow;
  elements.heroHeadline.textContent = data.hero.headline;
  elements.heroCopy.textContent = data.hero.copy;
  elements.heroActions.replaceChildren(...data.hero.ctas.map(createLinkButton));
  elements.heroImage.src = data.hero.image.src;
  elements.heroImage.alt = data.hero.image.alt;
  elements.heroImageCaption.textContent = data.hero.image.caption;
  elements.aboutTitle.textContent = data.about.title;
  elements.aboutIntro.textContent = data.about.intro;
  elements.aboutBody.textContent = data.about.body;
  elements.pillarsTitle.textContent = data.pillars.title;
  elements.pillarsIntro.textContent = data.pillars.intro;
  elements.workTitle.textContent = data.work.title;
  elements.workIntro.textContent = data.work.intro;
  elements.involvementTitle.textContent = data.involvement.title;
  elements.involvementIntro.textContent = data.involvement.intro;
  elements.closingTitle.textContent = data.closing.title;
  elements.closingBody.textContent = data.closing.body;
  elements.contactTitle.textContent = data.contact.title;
  elements.contactIntro.textContent = data.contact.intro;
  elements.contactBody.textContent = data.contact.body;
  elements.nameLabel.textContent = data.contact.formLabels.name;
  elements.emailLabel.textContent = data.contact.formLabels.email;
  elements.contextLabel.textContent = data.contact.formLabels.context;
  elements.messageLabel.textContent = data.contact.formLabels.message;
  elements.footerNote.textContent = data.foundation.note;
  elements.footerYear.textContent = new Date().getFullYear();

  populateNavigation(data.navigation);
  populateValues(data.values);
  populateHighlights(data.about.highlights);
  populatePrograms(data.pillars.items);
  populateInitiatives(data.work.initiatives);
  populateActions(data.involvement.actions);
  populateContextOptions(data.contact.contextOptions);
}

async function loadSite() {
  const response = await fetch("/api/site-content");

  if (!response.ok) {
    throw new Error("Unable to load site content.");
  }

  const data = await response.json();
  applyContent(data);
}

function initialiseReveal() {
  const revealElements = document.querySelectorAll(".reveal");

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
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

async function handleContactSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.contactForm);
  const payload = Object.fromEntries(formData.entries());

  elements.submitButton.disabled = true;
  elements.submitButton.textContent = "Sending...";
  elements.formStatus.textContent = "";
  elements.formStatus.dataset.state = "";

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

    elements.contactForm.reset();
    elements.formStatus.dataset.state = "success";
    elements.formStatus.textContent = result.message;
  } catch (error) {
    elements.formStatus.dataset.state = "error";
    elements.formStatus.textContent = error.message;
  } finally {
    elements.submitButton.disabled = false;
    elements.submitButton.textContent = "Send Message";
  }
}

async function init() {
  initialiseReveal();
  elements.contactForm.addEventListener("submit", handleContactSubmit);

  try {
    await loadSite();
  } catch (error) {
    elements.formStatus.dataset.state = "error";
    elements.formStatus.textContent = error.message;
  }
}

init();
