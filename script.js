window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('is-hidden'), 500);
});

const roles = [
  'AI / ML Researcher',
  'Developer',
  'B.Tech Student @ OUTR',
  'BS Data Science @ IIT Madras',
  
  
];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 60);
}
typeLoop();

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(el => revealObserver.observe(el));

const bars = document.querySelectorAll('.bar__fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-filled');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(el => barObserver.observe(el));

const counters = document.querySelectorAll('.stat-card__num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

const sections = document.querySelectorAll('main .section, .hero');
const navLinks = document.querySelectorAll('[data-nav]');
const progressFill = document.querySelector('.progress-wheel__fill');
const CIRC = 163.4;
const topBtn = document.getElementById('topBtn');

function onScroll() {
  let currentId = 'top';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120) currentId = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === '#' + currentId);
  });

  
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? scrollTop / docHeight : 0;
  progressFill.style.strokeDashoffset = String(CIRC * (1 - pct));

  
  topBtn.classList.toggle('is-visible', scrollTop > 500);
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
}));


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
});


const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cName');
  const email = document.getElementById('cEmail');
  const msg = document.getElementById('cMsg');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let valid = true;
  [ [name, name.value.trim().length > 0],
    [email, emailPattern.test(email.value.trim())],
    [msg, msg.value.trim().length > 0] ].forEach(([field, ok]) => {
    field.closest('.field').classList.toggle('has-error', !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    successMsg.classList.remove('is-visible');
    return;
  }

  const subject = encodeURIComponent(`Portfolio contact from ${name.value.trim()}`);
  const body = encodeURIComponent(`${msg.value.trim()}\n\n— ${name.value.trim()} (${email.value.trim()})`);
  window.location.href = `mailto:omishra776@gmail.com?subject=${subject}&body=${body}`;

  successMsg.classList.add('is-visible');
  form.reset();
});


document.getElementById('year').textContent = new Date().getFullYear();
