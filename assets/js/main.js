/*
  main.js  —  reads window.SITE (from content.js) and renders the dynamic
  parts of each page: home hero + links, the experience timeline, education,
  skills, and the project cards.

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

  /* ---------- Footer + mobile nav (shared on every page) ---------- */
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
    /* fill footer contact links from profile */
    document.querySelectorAll("[data-email]").forEach(function (a) {
      a.href = "mailto:" + P.email; a.textContent = P.email;
    });
    document.querySelectorAll("[data-linkedin]").forEach(function (a) { a.href = P.linkedin; });
    document.querySelectorAll("[data-x]").forEach(function (a) {
      a.href = P.x; if (!a.textContent.trim()) a.textContent = P.xHandle;
    });
    document.querySelectorAll("[data-letterboxd]").forEach(function (a) { if (P.letterboxd) a.href = P.letterboxd; });
    document.querySelectorAll("[data-resume]").forEach(function (a) { a.href = P.resume; });
  }

  /* ---------- Home ---------- */
  function initHome() {
    var hero = document.querySelector("[data-hero]");
    if (!hero) return;
    var name = hero.querySelector("[data-name]");
    var pos = hero.querySelector("[data-positioning]");
    var intro = hero.querySelector("[data-intro]");
    if (name) name.textContent = P.name;
    if (pos) pos.textContent = P.positioning;
    if (intro) intro.textContent = P.intro;
    var loc = document.querySelector("[data-location]");
    if (loc) loc.textContent = P.location;
    var personal = document.querySelector("[data-personal]");
    if (personal) personal.textContent = P.personal;

    /* Headshot: try the configured path, then a couple of common extensions,
       and if none load, leave the clean "KH" placeholder frame in place. */
    var photo = document.querySelector("[data-headshot]");
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
        else { photo.parentNode && photo.parentNode.removeChild(photo); }
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
    (SITE.experience || []).forEach(function (job, i) {
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
          '<a class="btn btn-primary" href="' + esc(P.linkedin) + '">' + esc(pr.cta) + '</a>' +
          '<p class="proj-note">Password protected. Message me on ' +
            '<a href="' + esc(P.linkedin) + '">LinkedIn</a> or ' +
            '<a href="' + esc(P.x) + '">' + esc(P.xHandle) + '</a> for access.</p>';
      } else {
        action = '<a class="btn btn-primary" href="' + esc(pr.link) + '">' + esc(pr.cta) +
                 ' <span aria-hidden="true">&rarr;</span></a>';
      }
      card.innerHTML =
        '<div class="proj-head"><h3 class="proj-title">' + esc(pr.title) + '</h3>' + tag + '</div>' +
        '<p class="proj-tagline">' + esc(pr.tagline) + '</p>' +
        '<p class="proj-desc">' + esc(pr.description) + '</p>' +
        '<div class="proj-action">' + action + '</div>';
      grid.appendChild(card);
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
    initExperience();
    initProjects();
    initReveal();
  });
})();
