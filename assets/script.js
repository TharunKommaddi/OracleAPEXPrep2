/* ═══════════════════════════════════════════════════════════════
   APEX Interview Mastery — script.js
   Central JS for ALL pages. Fix here = fixed everywhere.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════════════════
   NAV — inject into every sub-page
   Call: renderNav('apex')  ← pass active page key
   Keys: home | sql | plsql | apex | html | css | js | jquery | quiz | pdf
════════════════════════════════════════════════ */
function renderNav(activePage) {
  const links = [
    { key:'home',   href:'index.html',               icon:'fa-home',           label:'Home' },
    { key:'sql',    href:'oracle-sql.html',           icon:'fa-database',       label:'Oracle SQL' },
    { key:'plsql',  href:'plsql.html',                icon:'fa-code',           label:'PL/SQL' },
    { key:'apex',   href:'oracle-apex.html',          icon:'fa-layer-group',    label:'APEX' },
    { key:'quiz',   href:'oracle-apex-quiz.html',     icon:'fa-circle-question',label:'Quiz' },
    { key:'pdf',    href:'pdf-resources.html',        icon:'fa-file-pdf',       label:'PDFs' },
    { key:'about',  href:'index.html#about',          icon:'fa-info-circle',    label:'About' },
    { key:'contact',href:'index.html#contact',        icon:'fa-envelope',       label:'Contact' },
  ];

  const frontendLinks = [
    { key:'html',   href:'html-questions.html',       icon:'fab fa-html5',      label:'HTML' },
    { key:'css',    href:'css-questions.html',        icon:'fab fa-css3-alt',   label:'CSS' },
    { key:'js',     href:'javascript-questions.html', icon:'fab fa-js',         label:'JavaScript' },
    { key:'jquery', href:'jquery-questions.html',     icon:'fas fa-dollar-sign',label:'jQuery' },
  ];

  const mainLinks = links.map(l =>
    `<li><a href="${l.href}" ${l.key === activePage ? 'class="active"' : ''}><i class="fas ${l.icon}"></i> ${l.label}</a></li>`
  );

  // Insert Frontend dropdown after APEX
  const apexIdx = links.findIndex(l => l.key === 'apex');
  const frontendDropdown = `
    <li class="nav-dropdown">
      <a><i class="fas fa-paint-brush"></i> Frontend <i class="fas fa-chevron-down" style="font-size:11px;margin-left:2px"></i></a>
      <ul class="nav-dropdown-menu">
        ${frontendLinks.map(f => `<li><a href="${f.href}" ${f.key === activePage ? 'class="active"' : ''}><i class="${f.icon}"></i> ${f.label}</a></li>`).join('')}
      </ul>
    </li>`;
  mainLinks.splice(apexIdx + 1, 0, frontendDropdown);

  // Mobile drawer links (flat list — no dropdown)
  const allMobileLinks = [
    ...links.slice(0, 4),  // Home, SQL, PL/SQL, APEX
    ...frontendLinks,       // HTML, CSS, JS, jQuery
    ...links.slice(4)       // Quiz, PDFs, About, Contact
  ];

  const navHTML = `
    <nav class="nav" id="mainNav">
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-mark">A</div>
        <span class="nav-logo-text">APEX Mastery</span>
      </a>
      <ul class="nav-links" id="navLinks">
        ${mainLinks.join('')}
      </ul>
      <div class="nav-actions" id="navActions">
        <a href="index.html" class="btn-nav-ghost">Sign In</a>
        <a href="index.html" class="btn-nav-primary"><i class="fas fa-rocket"></i> Get Access</a>
      </div>
      <button class="nav-hamburger" id="navHamburger" aria-label="Open menu" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <!-- Mobile Drawer -->
    <div class="nav-mobile-drawer" id="mobileDrawer">
      <ul class="nav-mobile-links">
        <li><div class="nav-mobile-section-label">Topics</div></li>
        ${allMobileLinks.slice(0,4).map(l => `
          <li><a href="${l.href}" ${l.key === activePage ? 'class="active"' : ''} onclick="closeMobileNav()">
            <i class="${l.icon && l.icon.startsWith('fab') ? l.icon : 'fas ' + l.icon}"></i> ${l.label}
          </a></li>`).join('')}
        <div class="nav-mobile-divider"></div>
        <li><div class="nav-mobile-section-label">Frontend</div></li>
        ${frontendLinks.map(f => `
          <li><a href="${f.href}" ${f.key === activePage ? 'class="active"' : ''} onclick="closeMobileNav()">
            <i class="${f.icon}"></i> ${f.label}
          </a></li>`).join('')}
        <div class="nav-mobile-divider"></div>
        <li><div class="nav-mobile-section-label">More</div></li>
        ${links.slice(4).map(l => `
          <li><a href="${l.href}" ${l.key === activePage ? 'class="active"' : ''} onclick="closeMobileNav()">
            <i class="fas ${l.icon}"></i> ${l.label}
          </a></li>`).join('')}
      </ul>
      <div class="nav-mobile-actions">
        <a href="index.html" class="nav-mobile-btn ghost" onclick="closeMobileNav()">
          <i class="fas fa-sign-in-alt"></i> Sign In
        </a>
        <a href="index.html" class="nav-mobile-btn primary" onclick="closeMobileNav()">
          <i class="fas fa-rocket"></i> Get Access
        </a>
      </div>
    </div>`;

  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) placeholder.outerHTML = navHTML;
}

/* ════════════════════════════════════════════════
   MOBILE NAV TOGGLE
════════════════════════════════════════════════ */
function toggleMobileNav() {
  const drawer = document.getElementById('mobileDrawer');
  const burger = document.getElementById('navHamburger');
  if (!drawer || !burger) return;
  const isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  burger.classList.toggle('open', !isOpen);
  // Prevent body scroll when drawer open
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeMobileNav() {
  const drawer = document.getElementById('mobileDrawer');
  const burger = document.getElementById('navHamburger');
  if (drawer) drawer.classList.remove('open');
  if (burger) burger.classList.remove('open');
  document.body.style.overflow = '';
}

// Close drawer on outside click
document.addEventListener('click', function(e) {
  const drawer = document.getElementById('mobileDrawer');
  const burger = document.getElementById('navHamburger');
  if (!drawer || !burger) return;
  if (drawer.classList.contains('open') &&
      !drawer.contains(e.target) &&
      !burger.contains(e.target)) {
    closeMobileNav();
  }
});

// Close drawer on resize to desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) closeMobileNav();
});

/* ════════════════════════════════════════════════
   FOOTER — inject into every sub-page
   Call: renderFooter()
════════════════════════════════════════════════ */
function renderFooter() {
  const footerHTML = `
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo-mark">A</div>
            <span class="footer-logo-text">APEX Interview Mastery</span>
          </div>
          <p class="footer-brand-desc">The most comprehensive preparation platform for Oracle APEX developers. Built with care, for developers who want to land the job.</p>
        </div>
        <div class="footer-col">
          <h4>Topics</h4>
          <ul>
            <li><a href="oracle-sql.html">Oracle SQL</a></li>
            <li><a href="plsql.html">PL/SQL</a></li>
            <li><a href="oracle-apex.html">Oracle APEX</a></li>
            <li><a href="oracle-apex-quiz.html">APEX Quiz</a></li>
            <li><a href="pdf-resources.html">PDF Resources</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Frontend</h4>
          <ul>
            <li><a href="html-questions.html">HTML</a></li>
            <li><a href="css-questions.html">CSS</a></li>
            <li><a href="javascript-questions.html">JavaScript</a></li>
            <li><a href="jquery-questions.html">jQuery</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="index.html#about">About</a></li>
            <li><a href="index.html#contact">Contact</a></li>
            <li><a href="index.html#login">Request Access</a></li>
            <li><a href="index.html#admin">Admin</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">© 2025–2026 APEX Interview Mastery. All rights reserved.</span>
        <span class="footer-made">Made with <i class="fas fa-heart"></i> for Oracle developers</span>
      </div>
    </footer>`;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) placeholder.outerHTML = footerHTML;
}

/* ════════════════════════════════════════════════
   QUESTION RENDERER
   Renders an array of question objects into #questions-container
   Question object format:
   {
     id: 1,
     text: 'What is Oracle APEX?',
     difficulty: 'basic',           // basic | intermediate | advanced
     category: '',                  // optional: rest | soap | joins | etc
     answer: 'Oracle APEX is...',
     code: '-- SQL code here',
     codeLang: 'sql',              // sql | javascript | html | css | plsql
     beforeTable: { headers:[], rows:[] },
     afterTable:  { headers:[], rows:[] },
     outputLines: [],              // for terminal-style output
     takeaway: 'Key takeaway text'
   }
════════════════════════════════════════════════ */
function renderQuestions(questions, containerId) {
  containerId = containerId || 'questions-container';
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = questions.map(q => buildQuestionHTML(q)).join('');

  // Attach event listeners
  attachQuestionEvents(container);
}

function buildQuestionHTML(q) {
  const diffColors = {
    basic:        'background:#d1fae5;color:#065f46;border:1px solid #6ee7b7',
    intermediate: 'background:#fef9c3;color:#713f12;border:1px solid #fcd34d',
    advanced:     'background:#fce7f3;color:#831843;border:1px solid #f9a8d4',
    rest:         'background:#dbeafe;color:#1e40af;border:1px solid #93c5fd',
    soap:         'background:#ede9fe;color:#5b21b6;border:1px solid #c4b5fd',
  };

  const badgeStyle = diffColors[q.difficulty] || diffColors.basic;
  const cat = q.category ? `data-category="${q.category}"` : '';

  let detailsHTML = '';

  // Code block
  if (q.code) {
    detailsHTML += `
      <div class="rich-section">
        <div class="rich-s-hdr">
          <div class="rich-icon code"><i class="fas fa-code"></i></div>
          <span class="rich-lbl">Code</span>
          <span class="rich-sub">${(q.codeLang || 'SQL').toUpperCase()}</span>
        </div>
        <div class="rich-s-body" style="padding:0">
          <div class="rich-code-blk">
            <div class="rich-code-bar">
              <span class="rich-lang-tag">${(q.codeLang || 'sql').toUpperCase()}</span>
              <button class="rich-cp-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> Copy</button>
            </div>
            <pre><code class="language-${q.codeLang || 'sql'}">${escapeHTML(q.code)}</code></pre>
          </div>
        </div>
      </div>`;
  }

  // Before/After tables
  if (q.beforeTable || q.afterTable) {
    detailsHTML += `<div class="rich-section"><div class="rich-s-hdr"><div class="rich-icon before-ic"><i class="fas fa-clock-rotate-left"></i></div><span class="rich-lbl">Before / After</span></div><div class="rich-s-body" style="padding:16px 18px">`;

    if (q.beforeTable) {
      detailsHTML += `<div class="state-pill before"><i class="fas fa-circle-dot"></i> Before</div>`;
      detailsHTML += buildTable(q.beforeTable);
    }
    if (q.afterTable) {
      detailsHTML += `<div class="state-pill after" style="margin-top:12px"><i class="fas fa-circle-check"></i> After</div>`;
      detailsHTML += buildTable(q.afterTable);
    }
    detailsHTML += `</div></div>`;
  }

  // Output lines (terminal style)
  if (q.outputLines && q.outputLines.length) {
    detailsHTML += `
      <div class="rich-out-blk">
        <div class="rich-out-bar"><div class="d-r"></div><div class="d-y"></div><div class="d-g"></div><span class="out-t">Output</span></div>
        <div class="out-body">${q.outputLines.map(l => `<span class="l ${l.type||''}">${l.text}</span>`).join('')}</div>
      </div>`;
  }

  // Takeaway
  if (q.takeaway) {
    detailsHTML += `
      <div class="rich-takeaway">
        <div class="rich-tk-icon"><i class="fas fa-bolt"></i></div>
        <div class="rich-tk-body"><h4>Key Takeaway</h4><p>${q.takeaway}</p></div>
      </div>`;
  }

  const hasDetails = detailsHTML.length > 0;

  return `
<div class="question-container" data-difficulty="${q.difficulty}" ${cat}>
  <div class="question-header" role="button" tabindex="0" aria-expanded="false">
    <div class="question-text">Q${q.id}. ${q.text}</div>
    <div class="question-details">
      <span class="difficulty-badge" style="${badgeStyle}">${q.difficulty}</span>
      <div class="question-toggle"><i class="fas fa-chevron-down"></i></div>
    </div>
  </div>
  <div class="question-content" style="display:none;" aria-hidden="true">
    <div class="rich-section">
      <div class="rich-s-hdr"><div class="rich-icon ans"><i class="fas fa-lightbulb"></i></div><span class="rich-lbl">Answer</span></div>
      <div class="rich-s-body" style="padding:16px 18px"><p class="ans-txt">${q.answer}</p></div>
    </div>
    ${hasDetails ? `
    <button class="details-toggle-btn" onclick="toggleDetails(this)">
      <span class="toggle-icon">+</span>&nbsp;Show Code &amp; Details
    </button>
    <div class="details-body">${detailsHTML}</div>` : ''}
  </div>
</div>`;
}

function buildTable(tbl) {
  if (!tbl || !tbl.headers) return '';
  const headers = tbl.headers.map(h => `<th>${h}</th>`).join('');
  const rows = (tbl.rows || []).map(r =>
    `<tr>${r.map(c => `<td class="${c === 'NULL' ? 'td-null' : ''}">${c}</td>`).join('')}</tr>`
  ).join('');
  return `<div class="rich-tbl-wrap" style="margin-top:10px"><table class="rich-tbl"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ════════════════════════════════════════════════
   QUESTION EVENTS (expand/collapse)
════════════════════════════════════════════════ */
function attachQuestionEvents(container) {
  container.addEventListener('click', function(e) {
    if (e.target.closest('.details-toggle-btn')) return;
    if (e.target.closest('.rich-cp-btn')) return;
    const header = e.target.closest('.question-header');
    if (!header) return;
    const card    = header.closest('.question-container');
    if (!card) return;
    const content = card.querySelector('.question-content');
    if (!content) return;
    const icon    = header.querySelector('.question-toggle');
    const isOpen  = content.style.display === 'block';
    content.style.display = isOpen ? 'none' : 'block';
    header.setAttribute('aria-expanded', !isOpen);
    if (content) content.setAttribute('aria-hidden', isOpen);
    if (icon) icon.classList.toggle('rotated', !isOpen);
  });
}

/* ════════════════════════════════════════════════
   SHOW / HIDE DETAILS (+ button inside answer)
════════════════════════════════════════════════ */
function toggleDetails(btn) {
  const body = btn.nextElementSibling;
  if (!body) return;
  const isOpen = body.classList.contains('open');
  if (isOpen) {
    body.classList.remove('open');
    btn.innerHTML = '<span class="toggle-icon">+</span>&nbsp;Show Code &amp; Details';
  } else {
    body.classList.add('open');
    btn.innerHTML = '<span class="toggle-icon">&#8722;</span>&nbsp;Hide Details';
    if (window.Prism) {
      setTimeout(function() {
        body.querySelectorAll('code[class*="language-"]').forEach(function(el) {
          Prism.highlightElement(el);
        });
      }, 50);
    }
  }
}

/* ════════════════════════════════════════════════
   COPY CODE BUTTON
════════════════════════════════════════════════ */
function copyCode(btn) {
  const blk = btn.closest('.rich-code-blk');
  if (!blk) return;
  const code = blk.querySelector('code').textContent;
  navigator.clipboard.writeText(code).catch(function() {
    const ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
  btn.style.color = '#a8d080';
  setTimeout(function() { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
}

/* ════════════════════════════════════════════════
   FILTER TABS
   Call: initFilter({ hasCategory: true })
   hasCategory: true  → uses data-category for rest/soap
   hasCategory: false → uses data-difficulty only
════════════════════════════════════════════════ */
function initFilter(options) {
  options = options || {};
  document.querySelectorAll('.filter-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.filter-tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      const f = tab.dataset.filter;
      document.querySelectorAll('.question-container').forEach(function(card) {
        let show = false;
        if (f === 'all') {
          show = true;
        } else if (options.hasCategory && (f === 'rest' || f === 'soap')) {
          show = card.dataset.category === f;
        } else {
          show = card.dataset.difficulty === f;
        }
        card.style.display = show ? 'block' : 'none';
      });
    });
  });
}

/* ════════════════════════════════════════════════
   SEARCH
   Call: initSearch('searchInput')
════════════════════════════════════════════════ */
function initSearch(inputId) {
  const el = document.getElementById(inputId || 'searchInput');
  if (!el) return;
  el.addEventListener('input', function() {
    const q = this.value.toLowerCase().trim();
    document.querySelectorAll('.question-container').forEach(function(card) {
      card.style.display = (!q || card.textContent.toLowerCase().includes(q)) ? 'block' : 'none';
    });
  });
}

/* ════════════════════════════════════════════════
   FAQ TOGGLE (Contact page / index.html)
════════════════════════════════════════════════ */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* ════════════════════════════════════════════════
   INIT — called on DOMContentLoaded for question pages
   Usage:
     initPage({
       navKey: 'apex',
       filterOptions: { hasCategory: true },
       searchId: 'searchInput',
       questions: APEX_QUESTIONS   // from data file
     });
════════════════════════════════════════════════ */
function initPage(opts) {
  document.addEventListener('DOMContentLoaded', function() {
    renderNav(opts.navKey || 'home');
    renderFooter();
    if (opts.questions) {
      renderQuestions(opts.questions);
    }
    initFilter(opts.filterOptions || {});
    initSearch(opts.searchId || 'searchInput');
  });
}
