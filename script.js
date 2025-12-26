const icons = {
  github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5C5.73.5.75 5.64.75 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.26.79-.57 0-.28-.01-1.02-.02-2-3.2.71-3.87-1.58-3.87-1.58-.52-1.35-1.27-1.71-1.27-1.71-1.04-.73.08-.72.08-.72 1.15.08 1.75 1.21 1.75 1.21 1.02 1.78 2.68 1.27 3.33.97.1-.76.4-1.27.72-1.56-2.55-.3-5.23-1.3-5.23-5.8 0-1.28.45-2.33 1.19-3.15-.12-.3-.52-1.51.11-3.15 0 0 .97-.32 3.18 1.2a10.7 10.7 0 0 1 2.9-.4c.98 0 1.97.14 2.9.4 2.2-1.52 3.17-1.2 3.17-1.2.64 1.64.24 2.85.12 3.15.74.82 1.19 1.87 1.19 3.15 0 4.51-2.69 5.5-5.25 5.79.41.36.78 1.09.78 2.2 0 1.59-.02 2.87-.02 3.26 0 .32.21.69.8.57A11.29 11.29 0 0 0 23.25 12C23.25 5.64 18.27.5 12 .5z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.66-1.85 3.41-1.85 3.65 0 4.32 2.4 4.32 5.52v6.22zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`,
  // X-style mark
  twitter: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.78 7.75L23 22h-6.84l-5.35-6.67L4.95 22H2l7.25-8.28L1 2h7l4.83 6.07L18.9 2zm-1.2 18h1.9L6.25 3.9H4.2L17.7 20z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Zm2.75-.25a1.25 1.25 0 0 0-1.2.9l6.03 4.22a1.5 1.5 0 0 0 1.72 0l6.03-4.22a1.25 1.25 0 0 0-1.2-.9H6.75Zm12.0 2.73-5.43 3.8a3 3 0 0 1-3.44 0l-5.43-3.8v8.02c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V9.23Z"/></svg>`,
};

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  for (const child of children) node.appendChild(child);
  return node;
}

function renderSocialLinks() {
  const wrap = document.getElementById("socialLinks");
  if (!wrap) return;

  wrap.innerHTML = "";

  (window.SITE?.social || []).forEach((s) => {
    const a = el("a", {
      class: "pill",
      href: s.url,
      target: "_blank",
      rel: "noreferrer",
      "aria-label": s.label,
      html: `${icons[s.icon] ?? ""}<span>${s.label}</span>`,
    });
    wrap.appendChild(a);
  });
}

function renderCompanies() {
  const grid = document.getElementById("companyCards");
  if (!grid) return;

  grid.innerHTML = "";

  (window.SITE?.companies || []).forEach((c) => {
    const title = document.createElement("h3");
    title.appendChild(
      el("a", { href: c.url, target: "_blank", rel: "noreferrer" }, [
        document.createTextNode(c.name),
      ])
    );

    // Keep your one-liner only
    const desc = el("p", {}, [document.createTextNode(c.description || "")]);

    const card = el("div", { class: "card" }, [title, desc]);
    grid.appendChild(card);
  });
}

function renderList(listId, items) {
  const ul = document.getElementById(listId);
  if (!ul) return;

  ul.innerHTML = "";

  (items || []).forEach((i) => {
    const li = document.createElement("li");
    const a = el("a", { href: i.url, target: "_blank", rel: "noreferrer" }, [
      document.createTextNode(i.name),
    ]);
    li.appendChild(a);
    ul.appendChild(li);
  });
}

function init() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (window.SITE?.person?.name) {
    document.title = window.SITE.person.name;

    const titleEl = document.querySelector(".title");
    if (titleEl) titleEl.textContent = window.SITE.person.name;

    const subtitleEl = document.querySelector(".subtitle");
    if (subtitleEl) {
      const loc = window.SITE.person.location ? ` • ${window.SITE.person.location}` : "";
      subtitleEl.textContent = `${window.SITE.person.tagline || ""}${loc}`.trim();
    }
  }

  renderSocialLinks();
  renderCompanies();
  renderList("youtubeList", window.SITE?.interests?.youtube || []);
}

init();

