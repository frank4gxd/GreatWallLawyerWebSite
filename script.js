const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const endpoint = contactForm.getAttribute("action");

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Form service rejected the message.");
        }

        contactForm.reset();
        if (formNote) {
          formNote.textContent = "Thanks. Your message has been sent.";
        }
      } catch (error) {
        if (formNote) {
          formNote.textContent = "Sorry, the message could not be sent. Please email database@gwl.nz directly.";
        }
      }
      return;
    }

    const body = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Phone: ${phone || "Not provided"}`,
      `Email: ${email}`,
      "",
      "Message:",
      message
    ].join("\n");

    const mailto = new URL("mailto:database@gwl.nz");
    mailto.searchParams.set("subject", `Website enquiry from ${firstName} ${lastName}`.trim());
    mailto.searchParams.set("body", body);

    if (formNote) {
      formNote.textContent = "Opening your email app.";
    }

    window.location.href = mailto.toString();
  });
}
