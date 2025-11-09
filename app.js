/* ---------- Mobile Navigation ---------- */
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

mobileToggleBtn?.addEventListener('click', () => {
  if (mobileMenuEl.classList.contains('hidden')) openMobileMenu();
  else closeMobileMenu();
});

mobileMenuEl?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    closeMobileMenu();
    setTimeout(() => {
      const targetEl = document.querySelector(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 250);
  });
});

/* ---------- Product Modal ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("productModal");
  const mainImg = document.getElementById("modalMainImage");
  const title = document.getElementById("modalTitle");
  const paragraph = document.getElementById("modalParagraph");

  const products = {
    wedgepillow: {
      title: "Wedge Pillows",
      image: "assets/images/collections/wedge-pillow.jpg",
      paragraph: "A wedge pillow provides gentle elevation and firm support, helping improve posture and comfort while sleeping or resting. It’s perfect for relieving back, neck, or leg pressure and adds a touch of comfort to your daily relaxation ."
    },
    neckrest: {
      title: "Neck Rest Cushions",
      image: "assets/images/collections/neck-rest.jpg",
      paragraph: "Neck rest cushions offer soft, ergonomic support to keep your neck comfortable and aligned while sitting or traveling. Perfect for home, office, or long journeys, they help reduce strain and improve relaxation."
    },
    orthosupport: {
      title: "Anti Strong Ortho Pillow",
      image: "assets/images/collections/ortho-pillow.jpg",
      paragraph: " Anti-Strong Ortho pillows provide firm, ergonomic support designed to align your neck and spine. Ideal for those with neck or back discomfort, they help relieve pressure, improve posture, and ensure a restful, pain-free sleep."
    },
    maternity: {
      title: "Maternity Support",
      image: "assets/images/collections/maternity-cushion.jpg",
      paragraph: " Maternity cushions provide soft, supportive comfort for expecting mothers, helping relieve pressure on the back, hips, and belly. Designed to enhance rest and relaxation, they make sleeping and lounging more comfortable during pregnancy."
    },
    handsupport: {
      title: "Hand Support Pillows",
      image: "assets/images/collections/hand-support.jpg",
      paragraph: "Hand support pillows offer gentle cushioning and ergonomic support for your hands and wrists. Ideal for resting, reading, or working, they help reduce strain and provide comfort during daily activities."
    },
    bamboo: {
      title: "Bamboo Charcoal Pillow",
      image: "assets/images/collections/bamboo-charcoal.jpg",
      paragraph: "Bamboo charcoal pillows are infused with natural bamboo charcoal, helping absorb moisture and odors while keeping your pillow fresh. They provide soft, supportive comfort and promote a cleaner, healthier sleep environment."
    },
    greentea: {
      title: "Green Tea Pillows",
      image: "assets/images/collections/green-tea.jpg",
      paragraph: "Green tea pillows are filled with natural green tea extract, offering a refreshing and soothing sleep experience. They help reduce stress, absorb moisture, and keep your pillow fresh, promoting a calm and relaxing rest."
    },
    travel: {
      title: "Travel Pillows",
      image: "assets/images/collections/travel-pillow.jpg",
      paragraph: "Travel pillows offer soft, supportive comfort for your neck and head during long journeys. Lightweight and easy to carry, they help you rest better whether you’re on a flight, train, or road trip."
    },
    travelsupport: {
      title: "Travel Support Pillows",
      image: "assets/images/collections/travel-support.jpg",
      paragraph: "Travel pillows offer soft, supportive comfort for your neck and head during long journeys. Lightweight and easy to carry, they help you rest better whether you’re on a flight, train, or road trip."
    },
    compact: {
      title: "Cushions",
      image: "assets/images/collections/cushion.jpg",
      paragraph: "These soft and stylish pillows add comfort and elegance to any space. Designed with premium fabric and plush filling, they provide excellent support while enhancing your room’s décor. Perfect for your bed, sofa, or chair — a cozy touch for everyday relaxation."
    },
    bubble: {
      title: "Bubble Pillows",
      image: "assets/images/collections/bubble-pillow.jpg",
      paragraph: "Bubble pillows are designed with soft, air-filled bubbles that provide gentle, adaptive support for your head and body. They offer a unique, comfortable feel, making relaxation and sleep more enjoyable."
    },
    butterfly: {
      title: "Butterfly Pillow",
      image: "assets/images/collections/butterfly-pillow.jpg",
      paragraph: "Butterfly pillows feature a unique contoured shape that supports the neck, head, and shoulders. Designed for comfort and proper alignment, they help reduce strain and promote a restful sleep."
    },
    coxy: {
      title: "Coxy Cushion",
      image: "assets/images/collections/coxy-cushion.jpg",
      paragraph: "Coxy cushions provide soft, ergonomic support for your lower back and hips, helping relieve pressure while sitting. Perfect for home, office, or travel, they enhance comfort and promote better posture."
    },
    baby: {
      title: "Baby Pillows",
      image: "assets/images/collections/baby-pillow.jpg",
      paragraph: "Baby pillows are soft, gentle, and designed to support your little one’s delicate head and neck. Made with safe, breathable materials, they ensure comfort and promote healthy sleep for your baby."
    }
  };

  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.key;
      const p = products[key];
      if (!p) return;
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

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "auto";
    }
  });
});

/* ---------- GSAP Animations ---------- */
gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth < 768;

if (!isMobile) {
  // ✨ Hero animation
  gsap.from(".hero-left h1", { opacity: 0, y: 40, duration: 1, ease: "power3.out" });
  gsap.from(".hero-sub", { opacity: 0, y: 20, delay: 0.3, duration: 1, ease: "power2.out" });
  gsap.from(".hero-left a", { opacity: 0, y: 10, delay: 0.6, stagger: 0.1, duration: 0.8 });

  // 💎 About section fade-left + right
  gsap.from("#about .col-span-12.lg\\:col-span-7", {
    scrollTrigger: { trigger: "#about", start: "top 80%" },
    opacity: 0, x: -60, duration: 1.2, ease: "power3.out"
  });
  gsap.from("#about .col-span-12.lg\\:col-span-5", {
    scrollTrigger: { trigger: "#about", start: "top 80%" },
    opacity: 0, x: 60, duration: 1.2, ease: "power3.out"
  });

  // ✅ Keep features animation only on desktop
  gsap.from(".reveal-left", {
    scrollTrigger: { trigger: ".reveal-left", start: "top 80%" },
    x: -60, opacity: 0, duration: 1.1, ease: "power3.out"
  });
  gsap.from(".reveal-right", {
    scrollTrigger: { trigger: ".reveal-right", start: "top 80%" },
    x: 60, opacity: 0, duration: 1.1, ease: "power3.out"
  });

  // 🛏️ Mattress Toppers animation
  gsap.from("#collections .mt-24 img", {
    scrollTrigger: { trigger: "#collections .mt-24", start: "top 85%" },
    opacity: 0, x: -60, duration: 1.2, ease: "power3.out"
  });
  gsap.from("#collections .mt-24 div:nth-child(2)", {
    scrollTrigger: { trigger: "#collections .mt-24", start: "top 85%" },
    opacity: 0, x: 60, duration: 1.2, delay: 0.2, ease: "power3.out"
  });

  // 💫 Product cards fade up
  gsap.utils.toArray(".product-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: "top 85%" },
      opacity: 0, y: 40, duration: 0.8, delay: i * 0.05, ease: "power2.out"
    });
  });
}

/* ---------- Video Optimization for Mobile ---------- */
if (isMobile) {
  const vid = document.getElementById("heroVideo");
  if (vid) {
    vid.remove();
    const gif = document.getElementById("heroGif");
    if (gif) gif.classList.remove("hidden");
  }
}
