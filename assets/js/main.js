/*
  main.js  —  reads window.SITE (from content.js) and renders the dynamic
  parts of each page: the home launchpad, the About copy, the experience
  timeline, education, skills, project cards, and the craft grid.

  You normally do NOT need to edit this file. To change wording or data,
  edit content.js instead. This file only decides how that content is drawn.
*/
(function () {
  "use strict";
  var SITE = window.SITE || {};
  var P = SITE.profile || {};

  /* small helper to build elements */
  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (k === "class") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      }
    }
    if (html != null) node.innerHTML = html;
    return node;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---------- Header + footer (shared on every page) ---------- */
  function initChrome() {
    var year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();

    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    /* Fill contact links from profile. For icon links (which contain an <svg>)
       we only set the href; for empty text links we also fill the label. */
    function wire(sel, href, label) {
      document.querySelectorAll(sel).forEach(function (a) {
        if (href) a.href = href;
        if (label && !a.querySelector("svg") && !a.textContent.trim()) {
          a.textContent = label;
        }
      });
    }
    wire("[data-email]", "mailto:" + P.email, P.email);
    wire("[data-linkedin]", P.linkedin, "LinkedIn");
    wire("[data-letterboxd]", P.letterboxd, "Letterboxd");
    wire("[data-instagram]", P.instagram, P.instagramHandle);
    wire("[data-resume]", P.resume, "Résumé");
  }

  /* ---------- Home launchpad ---------- */
  function initHome() {
    var home = document.querySelector("[data-home]");
    if (!home) return;
    var name = home.querySelector("[data-name]");
    var tagline = home.querySelector("[data-tagline]");
    var loc = document.querySelector("[data-location]");
    if (name) name.textContent = P.name;
    if (tagline) tagline.textContent = P.tagline;
    if (loc) loc.textContent = P.location;
  }

  /* ---------- About ---------- */
  function initAbout() {
    var wrap = document.querySelector("[data-about]");
    if (!wrap) return;
    var A = SITE.about || {};

    var lead = wrap.querySelector("[data-about-lead]");
    if (lead) lead.textContent = A.lead || "";

    var body = wrap.querySelector("[data-about-body]");
    if (body) {
      (A.paragraphs || []).forEach(function (para) {
        body.appendChild(el("p", null, esc(para)));
      });
    }

    var movies = wrap.querySelector("[data-about-movies]");
    if (movies) {
      movies.innerHTML =
        esc(A.moviesNote || "") +
        ' <a href="' + esc(P.letterboxd) + '">See my Letterboxd <span aria-hidden="true">&rarr;</span></a>';
    }

    /* Headshot with graceful fallback across common extensions. */
    var photo = wrap.querySelector("[data-headshot]");
    if (photo && P.headshot) {
      var candidates = [
        P.headshot,
        P.headshot.replace(/\.jpg$/i, ".jpeg"),
        P.headshot.replace(/\.jpg$/i, ".png")
      ];
      var idx = 0;
      photo.addEventListener("error", function () {
        idx += 1;
        if (idx < candidates.length) { photo.src = candidates[idx]; }
        else if (photo.parentNode) { photo.parentNode.classList.add("no-photo"); photo.parentNode.removeChild(photo); }
      });
      photo.addEventListener("load", function () { photo.classList.add("loaded"); });
      photo.src = candidates[0];
      photo.alt = P.name;
    }
  }

  /* ---------- Experience timeline ---------- */
  function initExperience() {
    var wrap = document.querySelector("[data-timeline]");
    if (!wrap) return;
    (SITE.experience || []).forEach(function (job) {
      var item = el("article", { "class": "tl-item reveal", "tabindex": "0" });
      item.innerHTML =
        '<span class="tl-dot" aria-hidden="true"></span>' +
        '<div class="tl-card">' +
          '<p class="tl-dates">' + esc(job.dates) + '</p>' +
          '<h3 class="tl-title">' + esc(job.title) + '</h3>' +
          '<p class="tl-company">' + esc(job.company) + '</p>' +
          '<p class="tl-summary">' + esc(job.summary) + '</p>' +
        '</div>';
      wrap.appendChild(item);
    });

    /* Education */
    var eduWrap = document.querySelector("[data-education]");
    if (eduWrap && SITE.education) {
      var degrees = (SITE.education.degrees || [])
        .map(function (d) { return '<li>' + esc(d) + '</li>'; }).join("");
      eduWrap.innerHTML =
        '<h3 class="side-h">' + esc(SITE.education.school) + '</h3>' +
        '<ul class="edu-list">' + degrees + '</ul>';
    }

    /* Skills */
    var skillsWrap = document.querySelector("[data-skills]");
    if (skillsWrap) {
      (SITE.skills || []).forEach(function (grp) {
        var chips = (grp.items || [])
          .map(function (it) { return '<span class="chip">' + esc(it) + '</span>'; }).join("");
        var block = el("div", { "class": "skill-group" });
        block.innerHTML =
          '<h3 class="side-h">' + esc(grp.group) + '</h3>' +
          '<div class="chip-row">' + chips + '</div>';
        skillsWrap.appendChild(block);
      });
    }

    /* line fill on scroll (subtle) */
    var line = wrap.querySelector(".tl-progress");
    if (line) {
      var onScroll = function () {
        var r = wrap.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = r.height;
        var passed = Math.min(Math.max(vh * 0.5 - r.top, 0), total);
        line.style.height = (total ? (passed / total) * 100 : 0) + "%";
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    }
  }

  /* ---------- Projects ---------- */
  function initProjects() {
    var grid = document.querySelector("[data-projects]");
    if (!grid) return;
    (SITE.projects || []).forEach(function (pr) {
      var card = el("article", { "class": "proj-card reveal" });
      var tag = pr.wip ? '<span class="tag tag-wip">Work in progress</span>'
                       : (pr.access ? '<span class="tag tag-private">Private</span>' : "");
      var action;
      if (pr.access) {
        action =
          '<a class="text-link" href="' + esc(P.linkedin) + '">' + esc(pr.cta) +
            ' <span aria-hidden="true">&rarr;</span></a>' +
          '<p class="proj-note">Password protected. Message me on ' +
            '<a href="' + esc(P.linkedin) + '">LinkedIn</a> or by ' +
            '<a href="mailto:' + esc(P.email) + '">email</a> for access.</p>';
      } else {
        action = '<a class="text-link" href="' + esc(pr.link) + '">' + esc(pr.cta) +
                 ' <span aria-hidden="true">&rarr;</span></a>';
      }
      card.innerHTML =
        '<div class="proj-head"><h3 class="proj-title">' + esc(pr.title) + '</h3>' + tag + '</div>' +
        '<p class="proj-tagline">' + esc(pr.tagline) + '</p>' +
        '<p class="proj-desc">' + esc(pr.description) + '</p>' +
        (pr.note ? '<p class="proj-note">' + esc(pr.note) + '</p>' : '') +
        '<div class="proj-action">' + action + '</div>';
      grid.appendChild(card);
    });
  }

  /* ---------- Crafts ---------- */
  function initCrafts() {
    var grid = document.querySelector("[data-crafts]");
    if (!grid) return;

    var follow = document.querySelector("[data-crafts-follow]");
    if (follow) {
      follow.href = P.instagram;
      follow.innerHTML = 'Follow ' + esc(P.instagramHandle) + ' <span aria-hidden="true">&rarr;</span>';
    }

    (SITE.crafts || []).forEach(function (c) {
      var hasImg = c.img && c.img.trim();
      var inner =
        '<div class="craft-media' + (hasImg ? '' : ' is-placeholder') + '">' +
          (hasImg
            ? '<img src="' + esc(c.img) + '" alt="' + esc(c.title || "Craft") + '" loading="lazy" />'
            : '<span class="craft-ph" aria-hidden="true"></span>') +
        '</div>' +
        '<div class="craft-meta">' +
          '<span class="craft-title">' + esc(c.title || "") + '</span>' +
          (c.note ? '<span class="craft-note">' + esc(c.note) + '</span>' : '') +
        '</div>';

      var tile;
      if (c.link && c.link.trim()) {
        tile = el("a", { "class": "craft reveal", "href": c.link });
      } else {
        tile = el("div", { "class": "craft reveal" });
      }
      tile.innerHTML = inner;
      grid.appendChild(tile);
    });
  }

  /* ---------- Reveal-on-scroll (subtle fade/slide) ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (n) { io.observe(n); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initChrome();
    initHome();
    initAbout();
    initExperience();
    initProjects();
    initCrafts();
    initReveal();
  });
})();
