/* =====================================================
   GEN-M PLACE — admin.js
   Handles: login, add product, manage products
   Credentials stored in JS (no backend)
   ===================================================== */

// ── CREDENTIALS (change these) ────────────────────────
const ADMIN_USERNAME = 'chocho';
const ADMIN_PASSWORD = 'yadav@02102023';
const AUTH_KEY       = 'genm_admin_auth';
const STORAGE_KEY    = 'genm_products';

// ── HELPERS ───────────────────────────────────────────
function isLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

function getCustomProducts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCustomProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function generateId() {
  return 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

// ── LOGIN ─────────────────────────────────────────────
function initLogin() {
  const loginScreen = document.getElementById('loginScreen');
  const dashboard   = document.getElementById('dashboard');
  if (!loginScreen || !dashboard) return;

  // Already logged in? Skip login
  if (isLoggedIn()) {
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
    initDashboard();
    return;
  }

  const loginBtn  = document.getElementById('loginBtn');
  const errorEl   = document.getElementById('loginError');
  const userInput = document.getElementById('adminUser');
  const passInput = document.getElementById('adminPass');

  function attemptLogin() {
    const user = userInput.value.trim();
    const pass = passInput.value.trim();
    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      errorEl.classList.add('hidden');
      loginScreen.classList.add('hidden');
      dashboard.classList.remove('hidden');
      initDashboard();
    } else {
      errorEl.classList.remove('hidden');
      passInput.value = '';
      passInput.focus();
      loginScreen.querySelectorAll('.login-card')[0].style.animation = 'none';
      setTimeout(() => loginScreen.querySelectorAll('.login-card')[0].style.animation = '', 10);
    }
  }

  loginBtn.addEventListener('click', attemptLogin);
  passInput.addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });
  userInput.addEventListener('keydown', e => { if (e.key === 'Enter') passInput.focus(); });
}

// ── DASHBOARD ─────────────────────────────────────────
function initDashboard() {
  // Sidebar navigation
  const sidebarBtns = document.querySelectorAll('.sidebar-btn[data-panel]');
  const panels      = { add: document.getElementById('panelAdd'), manage: document.getElementById('panelManage') };
  const dashTitle   = document.getElementById('dashTitle');

  const panelLabels = { add: 'Add Product', manage: 'Manage Products' };

  sidebarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.dataset.panel;
      sidebarBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      Object.values(panels).forEach(p => p?.classList.add('hidden'));
      panels[panel]?.classList.remove('hidden');
      if (dashTitle) dashTitle.textContent = panelLabels[panel] || '';
      if (panel === 'manage') renderManageList('');
    });
  });

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY);
    location.reload();
  });

  initAddProduct();
  initManagePanel();
}

// ── ADD PRODUCT ───────────────────────────────────────
function initAddProduct() {
  const btn     = document.getElementById('addProductBtn');
  const errEl   = document.getElementById('formError');
  const succEl  = document.getElementById('formSuccess');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name  = document.getElementById('prodName')?.value.trim();
    const price = document.getElementById('prodPrice')?.value.trim();
    const cat   = document.getElementById('prodCat')?.value;
    const link  = document.getElementById('prodLink')?.value.trim();
    const img   = document.getElementById('prodImg')?.value.trim();
    const desc  = document.getElementById('prodDesc')?.value.trim();

    // Validate
    if (!name || !price || !cat || !link || !img) {
      showError(errEl, 'Please fill in all required fields.');
      succEl?.classList.add('hidden');
      return;
    }
    if (!isValidUrl(link)) {
      showError(errEl, 'Affiliate link must be a valid URL (https://…).');
      return;
    }
    if (!isValidUrl(img)) {
      showError(errEl, 'Image URL must be a valid URL (https://…).');
      return;
    }

    const newProduct = { id: generateId(), name, price, category: cat, link, image: img, description: desc };
    const products   = getCustomProducts();
    products.push(newProduct);
    saveCustomProducts(products);

    // Clear form
    ['prodName','prodPrice','prodLink','prodImg','prodDesc'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('prodCat').value = '';

    errEl?.classList.add('hidden');
    succEl?.classList.remove('hidden');
    setTimeout(() => succEl?.classList.add('hidden'), 3500);
  });
}

function showError(el, msg) {
  if (!el) return;
  el.textContent = '⚠ ' + msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

function isValidUrl(str) {
  try { const u = new URL(str); return u.protocol === 'http:' || u.protocol === 'https:'; }
  catch { return false; }
}

// ── MANAGE PRODUCTS ───────────────────────────────────
function initManagePanel() {
  const searchInput = document.getElementById('manageSearch');
  if (!searchInput) return;
  renderManageList('');
  searchInput.addEventListener('input', () => renderManageList(searchInput.value));
}

function renderManageList(query = '') {
  const list     = document.getElementById('manageList');
  const countEl  = document.getElementById('manageCount');
  if (!list) return;

  const products = getCustomProducts();
  const q        = query.trim().toLowerCase();
  const filtered = products.filter(p =>
    !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  if (countEl) countEl.textContent = `${filtered.length} custom product${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    list.innerHTML = `<div style="color:var(--text-muted);text-align:center;padding:40px 0;font-size:14px;">
      ${q ? 'No matching products.' : 'No custom products yet. Add your first one!'}
    </div>`;
    return;
  }

  list.innerHTML = filtered.map(p => `
    <div class="manage-item" id="item-${p.id}">
      <img class="manage-item-img"
           src="${escAdmin(p.image)}" alt="${escAdmin(p.name)}"
           onerror="this.src='https://via.placeholder.com/52x52/1a1a26/f5a623?text=?'"/>
      <div class="manage-item-info">
        <div class="manage-item-name">${escAdmin(p.name)}</div>
        <div class="manage-item-meta">
          <span>${escAdmin(p.category)}</span>
          ${escAdmin(p.price)}
        </div>
      </div>
      <button class="btn-delete" onclick="deleteProduct('${p.id}')">
        <i class="fa fa-trash"></i> Delete
      </button>
    </div>
  `).join('');
}

function deleteProduct(id) {
  if (!confirm('Delete this product? This cannot be undone.')) return;
  const products = getCustomProducts().filter(p => p.id !== id);
  saveCustomProducts(products);
  const item = document.getElementById('item-' + id);
  if (item) {
    item.style.transition = 'opacity 0.3s, transform 0.3s';
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    setTimeout(() => renderManageList(document.getElementById('manageSearch')?.value || ''), 300);
  } else {
    renderManageList(document.getElementById('manageSearch')?.value || '');
  }
}

function escAdmin(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initLogin);
