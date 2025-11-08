/* ---------- Mobile menu: prevent page scroll when open ---------- */
/* ---------- Mobile Navigation Fix ---------- */
/* ---------- Fixed Mobile Navigation (scroll + toggle + smooth close) ---------- */
const mobileMenuEl = document.getElementById('mobileMenu');
const mobileToggleBtn = document.getElementById('mobileToggle');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');
const body = document.body;

function openMobileMenu() {
  mobileMenuEl.classList.remove('hidden');
  body.style.overflow = 'hidden';
  mobileToggleBtn?.setAttribute('aria-expanded', 'true');
  menuIcon.classList.add('hidden');
  closeIcon.classList.remove('hidden');
}

function closeMobileMenu() {
  mobileMenuEl.classList.add('hidden');
  body.style.overflow = '';
  mobileToggleBtn?.setAttribute('aria-expanded', 'false');
  closeIcon.classList.add('hidden');
  menuIcon.classList.remove('hidden');
}

// Toggle button click
mobileToggleBtn?.addEventListener('click', () => {
  if (mobileMenuEl.classList.contains('hidden')) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
});

// Close when clicking a link inside
mobileMenuEl?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    closeMobileMenu();

    // Offset fix for header height
    const headerOffset = 70; // actual header height
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      // Delay slightly to allow overflow to reset
      setTimeout(() => {
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }, 300);
    }
  });
});


// Close menu and scroll to section when a link is clicked
mobileMenuEl?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    closeMobileMenu();

    // Smooth scroll after menu closes
    setTimeout(() => {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 250);
  });
});


let removeModalTrap = null;
const modalEl = document.getElementById('productModal');
const modalCloseBtn = document.getElementById('modalClose');

function showModal() {
  modalEl.classList.remove('hidden');
  modalEl.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // prevent page scroll
  removeModalTrap = trapFocus(modalEl);
  // announce to screen readers
  modalEl.setAttribute('aria-hidden', 'false');
}

function hideModal() {
  modalEl.style.display = 'none';
  modalEl.classList.add('hidden');
  document.body.style.overflow = '';
  if (removeModalTrap) { removeModalTrap(); removeModalTrap = null; }
  modalEl.setAttribute('aria-hidden', 'true');
}

// Hook these into your existing openModal/closeModal functions:
// replace show code lines with showModal() and close code with hideModal()
// Example (if you use openModal/closeModal above):
// inside openModal(...): replace modal.classList.remove('hidden'); modal.style.display = 'flex'; with showModal();
// inside closeModal(...): replace modal.style.display = 'none'; modal.classList.add('hidden'); with hideModal();

/* ---------- Safe fallback: make about-cluster responsive if JS changes layout ----- */
/* If you used inline absolute-positioning for images, add a wrapper class 'about-cluster' */
document.addEventListener('DOMContentLoaded', () => {
  const aboutCluster = document.querySelector('.about-cluster');
  if (!aboutCluster) return;
  // If viewport is small, force the CSS grid fallback (redundant but defensive)
  if (window.innerWidth <= 1024) {
    aboutCluster.classList.add('about-cluster--stack');
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 1024) aboutCluster.classList.add('about-cluster--stack');
    else aboutCluster.classList.remove('about-cluster--stack');
  });
});
// --- Smooth feature section animations ---
gsap.from(".reveal-left", {
  scrollTrigger: {
    trigger: ".reveal-left",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  x: -60,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out"
});

gsap.from(".reveal-right", {
  scrollTrigger: {
    trigger: ".reveal-right",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  x: 60,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out"
});
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("productModal");
  const modalContent = document.getElementById("modalContent");
  const mainImg = document.getElementById("modalMainImage");
  const title = document.getElementById("modalTitle");
  const paragraph = document.getElementById("modalParagraph");

  // ✅ Product data (single image + paragraph)
const products = {
  // --- SLEEP STUDIO ---
  wedgepillow: {
    title: "Wedge Pillows",
    image: "assets/images/collections/wedge-pillow.jpg",
    paragraph:
      "A wedge pillow provides gentle elevation and firm support, helping improve posture and comfort while sleeping or resting. It’s perfect for relieving back, neck, or leg pressure and adds a touch of comfort to your daily relaxation ."
  },
  neckrest: {
    title: "Neck Rest Cushions",
    image: "assets/images/collections/neck-rest.jpg",
    paragraph:
      "Neck rest cushions offer soft, ergonomic support to keep your neck comfortable and aligned while sitting or traveling. Perfect for home, office, or long journeys, they help reduce strain and improve relaxation."
  },

  // --- WELLNESS ZONE ---
  orthosupport: {
    title: "Anti Strong Ortho Pillow",
    image: "assets/images/collections/ortho-pillow.jpg",
    paragraph:
      "Anti-Strong Ortho pillows provide firm, ergonomic support designed to align your neck and spine. Ideal for those with neck or back discomfort, they help relieve pressure, improve posture, and ensure a restful, pain-free sleep."
  },
  maternity: {
    title: "Maternity Support",
    image: "assets/images/collections/maternity-cushion.jpg",
    paragraph:
      "Maternity cushions provide soft, supportive comfort for expecting mothers, helping relieve pressure on the back, hips, and belly. Designed to enhance rest and relaxation, they make sleeping and lounging more comfortable during pregnancy."
  },
  handsupport: {
    title: "Hand Support Pillows",
    image: "assets/images/collections/hand-support.jpg",
    paragraph:
      "Hand support pillows offer gentle cushioning and ergonomic support for your hands and wrists. Ideal for resting, reading, or working, they help reduce strain and provide comfort during daily activities."
  },

  // --- NATURE’S TOUCH ---
  bamboo: {
    title: "Bamboo Charcoal Pillow",
    image: "assets/images/collections/bamboo-charcoal.jpg",
    paragraph:
      "Bamboo charcoal pillows are infused with natural bamboo charcoal, helping absorb moisture and odors while keeping your pillow fresh. They provide soft, supportive comfort and promote a cleaner, healthier sleep environment."
  },
  greentea: {
    title: "Green Tea Pillows",
    image: "assets/images/collections/green-tea.jpg",
    paragraph:
      "Bamboo charcoal pillows are infused with natural bamboo charcoal, helping absorb moisture and odors while keeping your pillow fresh. They provide soft, supportive comfort and promote a cleaner, healthier sleep environment."
  },

  // --- ON THE MOVE ---
  travel: {
    title: "Travel Pillows",
    image: "assets/images/collections/travel-pillow.jpg",
    paragraph:
      "Travel pillows offer soft, supportive comfort for your neck and head during long journeys. Lightweight and easy to carry, they help you rest better whether you’re on a flight, train, or road trip."
  },
  travelsupport: {
    title: "Travel Support Pillows",
    image: "assets/images/collections/travel-support.jpg",
    paragraph:
      "Travel support pillows provide firm yet gentle neck and head support, ensuring comfort during long trips. Designed for easy portability, they help reduce fatigue and make your travel experience more relaxing."
  },

  // --- DECOR & LIVING ---
  compact: {
    title: "Cushions",
    image: "assets/images/collections/cushion.jpg",
    paragraph:
      "These soft and stylish pillows add comfort and elegance to any space. Designed with premium fabric and plush filling, they provide excellent support while enhancing your room’s décor. Perfect for your bed, sofa, or chair — a cozy touch for everyday relaxation."
  },
  bubble: {
    title: "Bubble Pillows",
    image: "assets/images/collections/bubble-pillow.jpg",
    paragraph:
      "Bubble pillows are designed with soft, air-filled bubbles that provide gentle, adaptive support for your head and body. They offer a unique, comfortable feel, making relaxation and sleep more enjoyable."
  },
  butterfly: {
    title: "Butterfly Pillow",
    image: "assets/images/collections/butterfly-pillow.jpg",
    paragraph:
      " Butterfly pillows feature a unique contoured shape that supports the neck, head, and shoulders. Designed for comfort and proper alignment, they help reduce strain and promote a restful sleep."
  },
  coxy: {
    title: "Coxy Cushion",
    image: "assets/images/collections/coxy-cushion.jpg",
    paragraph:
      " Butterfly pillows feature a unique contoured shape that supports the neck, head, and shoulders. Designed for comfort and proper alignment, they help reduce strain and promote a restful sleep."
  },
  baby: {
    title: "Baby Pillows",
    image: "assets/images/collections/baby-pillow.jpg",
    paragraph:
      " Butterfly pillows feature a unique contoured shape that supports the neck, head, and shoulders. Designed for comfort and proper alignment, they help reduce strain and promote a restful sleep."
  }
};


  // ✅ Open modal when product clicked
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.key;
      const p = products[key];
      if (!p) return console.warn("No data for", key);

      title.textContent = p.title;
      paragraph.textContent = p.paragraph;

      mainImg.style.opacity = 0;
      mainImg.src = p.image;
      mainImg.onload = () => (mainImg.style.opacity = 1);

      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    });
  });

  // ✅ Close modal on click outside content
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "auto";
    }
  });
});
// === GSAP Animations ===
gsap.registerPlugin(ScrollTrigger);

// Fade-up reveal for all product cards
gsap.utils.toArray(".product-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay: i * 0.05,
    ease: "power2.out"
  });
});

// Fade-in for section headings
gsap.utils.toArray("h3.text-2xl").forEach((title) => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out"
  });
});

// About section fade-left + right
gsap.from("#about .col-span-12.lg\\:col-span-7", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%"
  },
  opacity: 0,
  x: -60,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from("#about .col-span-12.lg\\:col-span-5", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%"
  },
  opacity: 0,
  x: 60,
  duration: 1.2,
  ease: "power3.out"
});
// Hero animation
gsap.from(".hero-left h1", {
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power3.out"
});
gsap.from(".hero-sub", {
  opacity: 0,
  y: 20,
  delay: 0.3,
  duration: 1,
  ease: "power2.out"
});
gsap.from(".hero-left a", {
  opacity: 0,
  y: 10,
  delay: 0.6,
  stagger: 0.1,
  duration: 0.8
});
function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  gsap.fromTo("#modalContent", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
}

function closeModal() {
  gsap.to("#modalContent", {
    scale: 0.95,
    opacity: 0,
    duration: 0.25,
    ease: "power1.in",
    onComplete: () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "auto";
    }
  });
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
