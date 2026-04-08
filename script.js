/* =====================================================
   GEN-M PLACE — script.js
   Handles: default products, localStorage merge,
   rendering, filtering, search
   ===================================================== */

// ── DEFAULT PRODUCTS (seed data) ──────────────────────
const DEFAULT_PRODUCTS = [
  {
    id: "d1",
    name: " Solimo 4XL Premium Faux Leather Bean Bag Combo with Footrest & Cushion, Filled with Beans ",
    price: "Rs.1,889",
    category: "Home",
    image: "https://m.media-amazon.com/images/I/61QL52WUXZL._SL1200_.jpg",
    link: "https://amzn.to/4dBjo2O",
    description: "Amazon Brand - Solimo 4XL Premium Faux Leather Bean Bag Combo with Footrest & Cushion, Filled with Beans | Capacity: Upto 6 Ft 5 in Height, 125 KG Weight | Yeah I'm Listening Print."
  },
  {
    id: "d2",
    name: "",
    price: " ₹1,599",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/711l4y8aNlL._SL1500_.jpg",
    link: "https://amzn.to/4tAgPTq",
    description:"boAt Rockerz 480, RGB LEDs,6 Light Modes, 40mm Drivers,Beast Mode, 60H Battery, ENx Tech, Stream Ad Free Music via App Support, Bluetooth Headphones, Wireless Over Ear Headphone with Mic (Black Sabre)"
  },
  {
    id: "d3",
    name: "Samsung Galaxy Fit3 Light and Sleek Fitness Band",
    price: " ₹3,649",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61K2qby-3oL._SL1500_.jpg",
    link: "https://amzn.to/4vhZgJj",
    description: "Samsung Galaxy Fit3 Light and Sleek Fitness Band, 13 Days Battery, 100+ Exercises and Sleep Tracking, Dark Gray (Black)"
  },
  {
    id: "d4",
    name: "Apple iPhone 17 Pro Max 512",
    price: "₹1,69,900 ",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/71R8VsJ07nL._SL1500_.jpg",
    link: "https://amzn.to/4c0MHus",
    description: "Apple iPhone 17 Pro Max 512 GB: 17.42 cm (6.9″) Display with Promotion, A19 Pro Chip, Best Battery Life in Any iPhone Ever, Pro Fusion Camera System, Center..."
  },
  {
    id: "d5",
    name: "Amazon Echo Pop",
    price: "₹4,499 ",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/81aMuyDLANL._SL1500_.jpg",
    link: "https://amzn.to/4cibU2v",
    description: "Amazon Echo Pop| Smart speaker with Alexa and Bluetooth| Full sound, balanced bass, crisp vocals| Purple"
  },
  {
    id: "d6",
    name: "Puma RCB 2026 Men's Striper Polo | IPL 2026",
    price: "₹2,999 ",
    category: "Home",
    image: "https://m.media-amazon.com/images/I/51CBIUR9zPL._SX466_.jpg",
    link: "https://amzn.to/4e57C0Q",
    description: "Puma RCB 2026 Men's Striper Polo | IPL 2026"
  },
  {
    id: "d7",
    name: "Casio Vintage A-158WA-1Q Digital Grey Dial Unisex Watch Silver Metal Strap (D011)",
    price: "₹1,894 ",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61ybeKQto8L._SY879_.jpg",
    link: "https://amzn.to/4cy1Q6A",
    description: "Casio Vintage A-158WA-1Q Digital Grey Dial Unisex Watch Silver Metal Strap (D011)"
  },
  {
    id: "d8",
    name: "GOBOULT Mustang Thunder",
    price: "₹2,799 ",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/71A0roq73EL._SL1500_.jpg",
    link: "https://amzn.to/4ebupbf",
    description: "GOBOULT Mustang Thunder Bluetooth Headphones with Upto 70H Playtime, BoomX Technology, Brightness LEDs, 40mm Driver, Zen ENC Mic, BTv 5.4, Type-C Fast..."
  },
  {
    id: "d9",
    name: "Lord Krishna Idol with Flute – Handcrafted Marble ",
    price: "₹388 ",
    category: "Home",
    image: "https://m.media-amazon.com/images/I/51hbjpQCNNL._SX679_.jpg",
    link: "https://amzn.to/4vhESbr",
    description: "Lord Krishna Idol with Flute – Handcrafted Marble Finish Krishna Murti for Car Dashboard, Home Decor & Temple | Hindu God Decorative Figurine Gift"
  },
  {
    id: "d10",
    name: "Scented Candle Gift Set of 3 (Lavender, Sandalwood, Honeysuckle) ",
    price: "₹594.74 ",
    category: "Home",
    image: "https://m.media-amazon.com/images/I/41Rt3kYgn2L._SX342_SY445_QL70_FMwebp_.jpg",
    link: "https://amzn.to/3O5NOzY",
    description: "Scented Candle Gift Set of 3 (Lavender, Sandalwood, Honeysuckle) | 3x80g Jars | Aromatherapy Hamper for Birthday & Anniversary Gifting (Pack of 3)"
  },
  {
    id: "d11",
    name: "Desidiya® Lying Panda Night Light",
    price: " ₹385 ",
    category: "Home",
    image: "https://m.media-amazon.com/images/I/316-lfylyKL._SY300_SX300_QL70_FMwebp_.jpg",
    link: "https://amzn.to/4skruQU",
    description: "Desidiya® Lying Panda Night Light - Soft Silicone Color-Changing LED Touch Lamp with Timer for Bedroom & Office"
  },
  {
    id: "d12",
    name: "Magnetic Cable Clips,",
    price: " ₹158 ",
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/71Z8-TW2uyL._SY450_.jpg",
    link: "https://amzn.to/4tsjRJo",
    description: "Magnetic Cable Clips, Adjustable Cord Holder Management, Adhesive Wire Keeper Organizer for Home Office Desk Phone PC Car Wall Desktop Nightstand Appliance (9-Pack White)"
  },
   {
    id: "d13",
    name: "John Jacobs Sunglasses For Men & Women ",
    price: " ₹1,839",
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/6175hVcen4L._SX679_.jpg",
    link: "https://amzn.to/3OoMFn8",
    description: "John Jacobs | Stylish & Premium | Polarized & 100% UV Protection Sunglasses For Men & Women | Full Rim Pilot Medium (Size-59)"
  } 
   ,
   {
    id: "d14",
    name: "The Souled Store Daredevil: Hell's Knight Men and Boys High Top Sneakers",
    price: "₹3,699 ",
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/51w5zgA5IPL._SY695_.jpg",
    link: "https://amzn.to/4sYAlJj",
    description: "The Souled Store Daredevil: Hell's Knight Men and Boys High Top Sneakers | Burgundy, Black & Red Breathable Mesh with Cushioned Insole, Padded Ankle Support & Durable Outsole"
  },
   {
    id: "d15",
    name: "Burnlab 6 in 1 multifunctional weight training kit ",
    price: "₹6,999 ",
    category: "Fitness",
    image: "https://m.media-amazon.com/images/I/41p61dmx4LL._SY300_SX300_QL70_FMwebp_.jpg",
    link: "https://amzn.to/4eakra4",
    description: "Burnlab 6 in 1 multifunctional weight training kit - Dumbbells, Kettlebells, Barbells & Push up brackets in 1 | Adjustable Weights | Perfect for Full Body Workout for Men & Women"
  },
   {
    id: "d16",
    name: "Fashnex Resistance Bands Set for Exercise",
    price: "₹1,398",
    category: "Fitness",
    image: "https://m.media-amazon.com/images/I/511Qvnov2XL._SY300_SX300_QL70_FMwebp_.jpg",
    link: "https://amzn.to/4mf17dP",
    description: "Fashnex Resistance Bands Set for Exercise, Stretching and Workout Toning Tube Kit with Foam Handles, Door Anchor, Ankle Strap and Carry Bag for Men, WomenVisit the FASHNEX Store"
  },
   {
    id: "d17",
    name: "Reversible Deskspread",
    price: "₹598 ",
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/61QVYUfBamL._SL1500_.jpg",
    link: "https://amzn.to/4sklw2I",
    description: "V-CUBE Designs Premium Vegan Leather Dual Color Desk Mat 75X40cm 1.8mm Thick| Laptop Mat/Extended Large Mouse Pad, Reversible Deskspread |High Tear/Peel Strength|Anti-Slip,Splash-Proof| Blue&Yellow"
  },
   {
    id: "d18",
    name: "FOVERA Adjustable Neoprene Weighted Vest (5 Kg) ",
    price: " ₹1,299",
    category: "Fitness",
    image: "https://m.media-amazon.com/images/I/41s80M0vGYL._SY300_SX300_QL70_FMwebp_.jpg",
    link: "https://amzn.to/3Q7SHJh",
    description: "FOVERA Adjustable Neoprene Weighted Vest (5 Kg) – Comfortable Workout Vest for Men & Women | Ideal for Jogging, Running, CrossFit, Cardio & Strength Training | Outdoor & Gym Fitness Vest"
  } ,
   {
    id: "d19",
    name: " Office Single Monitor Gas Spring Arm",
    price: "₹2,990 ",
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/41zeyNnMG-L._SY300_SX300_QL70_FMwebp_.jpg",
    link: "https://amzn.to/4vnbD7a",
    description: "Height Adjustable Desk Mount| Spring Adjustment Monitor Stand| Tilt, Swivel, Rotation Features"
  },
   {
    id: "d20",
    name: "Wiselife MicroFiber & Natural Rubber Foldable Yoga Mat + Carry Strap",
    price: " ₹1,858",
    category: "Fitness",
    image: "https://m.media-amazon.com/images/I/51VhygdeFWL._SY300_SX300_QL70_FMwebp_.jpg",
    link: "https://amzn.to/3QcSdBH",
    description: "Wiselife MicroFiber & Natural Rubber Foldable Yoga Mat + Carry Strap | Extra Thick Extra Long,Extra Wide Exercise floor Mat For Gym, Workout, Fitness | Natural Rubber Yoga Mat (1MM, Arabian Night)"
  },
   {
    id: "d20",
    name: "Wiselife MicroFiber & Natural Rubber Foldable Yoga Mat + Carry Strap",
    price: " ₹1,858",
    category: "xyz",
    image: "https://m.media-amazon.com/images/I/51VhygdeFWL._SY300_SX300_QL70_FMwebp_.jpg",
    link: "https://amzn.to/3QcSdBH",
    description: "Wiselife MicroFiber & Natural Rubber Foldable Yoga Mat + Carry Strap | Extra Thick Extra Long,Extra Wide Exercise floor Mat For Gym, Workout, Fitness | Natural Rubber Yoga Mat (1MM, Arabian Night)"
  }
];

// ── HELPERS ───────────────────────────────────────────
function getProducts() {
  const stored = localStorage.getItem('genm_products');
  const custom = stored ? JSON.parse(stored) : [];
  return [...DEFAULT_PRODUCTS, ...custom];
}

// ── STATE ─────────────────────────────────────────────
let activeCategory = 'all';
let searchQuery    = '';

// ── RENDER ────────────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const all     = getProducts();
  const query   = searchQuery.trim().toLowerCase();
  const filtered = all.filter(p => {
    const matchCat   = activeCategory === 'all' || p.category === activeCategory;
    const matchQuery = !query ||
      p.name.toLowerCase().includes(query) ||
      (p.description || '').toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  const countEl = document.getElementById('productCount');
  const noRes   = document.getElementById('noResults');
  const titleEl = document.getElementById('sectionTitle');

  if (countEl) countEl.textContent = `${filtered.length} item${filtered.length !== 1 ? 's' : ''}`;
  if (titleEl) titleEl.textContent = activeCategory === 'all' ? 'All Products' : activeCategory;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noRes) noRes.classList.remove('hidden');
    return;
  }
  if (noRes) noRes.classList.add('hidden');

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.05}s">
      <div class="card-img-wrap">
        <img src="${escHtml(p.image)}" alt="${escHtml(p.name)}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/400x300/1a1a26/f5a623?text=No+Image'"/>
        <span class="card-badge">${escHtml(p.category)}</span>
      </div>
      <div class="card-body">
        <span class="card-cat">${escHtml(p.category)}</span>
        <p class="card-name">${escHtml(p.name)}</p>
        ${p.description ? `<p class="card-desc">${escHtml(p.description)}</p>` : ''}
      </div>
      <div class="card-footer">
        <span class="card-price">${escHtml(p.price)}</span>
        <button class="btn-buy" onclick="buyNow('${escHtml(p.link)}')">
          Buy Now <i class="fa fa-arrow-up-right-from-square"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function escHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buyNow(link) {
  if (!link) return;
  window.open(link, '_blank', 'noopener,noreferrer');
}

// ── CATEGORY FILTERS ──────────────────────────────────
function initCategoryButtons() {
  const allBtns = document.querySelectorAll('.cat-btn');
  allBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      activeCategory = cat;
      // sync all button groups
      document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === cat);
      });
      renderProducts();
      // scroll to products
      const sec = document.getElementById('productsSection');
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ── SEARCH ────────────────────────────────────────────
function initSearch() {
  const input     = document.getElementById('searchInput');
  const clearBtn  = document.getElementById('searchClear');
  if (!input) return;

  input.addEventListener('input', () => {
    searchQuery = input.value;
    if (clearBtn) clearBtn.style.display = searchQuery ? 'block' : 'none';
    renderProducts();
  });
  if (clearBtn) {
    clearBtn.style.display = 'none';
    clearBtn.addEventListener('click', () => {
      input.value = '';
      searchQuery = '';
      clearBtn.style.display = 'none';
      renderProducts();
    });
  }
}

// ── HAMBURGER ─────────────────────────────────────────
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
}

// ── HERO CTA ──────────────────────────────────────────
function initHeroCta() {
  const btn = document.getElementById('heroCta');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ── FOOTER CATEGORY LINKS ─────────────────────────────
function initFooterLinks() {
  document.querySelectorAll('.footer-links a[data-cat]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const cat = link.dataset.cat;
      activeCategory = cat;
      document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === cat);
      });
      renderProducts();
      document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ── NAVBAR SCROLL SHADOW ──────────────────────────────
function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 32px rgba(0,0,0,0.6)'
      : 'none';
  }, { passive: true });
}

// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initCategoryButtons();
  initSearch();
  initHamburger();
  initHeroCta();
  initFooterLinks();
  initNavbarScroll();
});
