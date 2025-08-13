

// --------------------------
// Yardımcı Fonksiyonlar
// --------------------------
const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const formatPrice = (value) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// --------------------------
// Data
// --------------------------
let PRODUCTS = []; // Boş, API'den gelecek

// --------------------------
// State Persistence
// --------------------------
const STORAGE_KEYS = { CART: 'SHOP_CART', WISHLIST: 'SHOP_WISHLIST' };

function safeGetStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore 
  }
}

let cartItems = safeGetStorage(STORAGE_KEYS.CART, []); // [{id, qty}]
let wishlist = new Set(safeGetStorage(STORAGE_KEYS.WISHLIST, []));

// --------------------------
// Yardımcı Fonksiyonlar
// --------------------------
const findProduct = (id) => PRODUCTS.find(p => p.id === id);
const cartCount = () => cartItems.reduce((sum, it) => sum + it.qty, 0);
const isInWishlist = (id) => wishlist.has(id);

// --------------------------
// DOM Elementleri
// --------------------------
const productGrid = qs('#product-grid');
const searchInput = qs('#searchInput');
const categoryFilter = qs('#categoryFilter');
const sortSelect = qs('#sortSelect');
const wishlistBtn = qs('#btn-wishlist');
const wishlistCountEl = qs('#wishlist-count');

const btnCart = qs('.btn-cart');
const cartList = qs('.shopping-cart-list');
const itemCountEl = qs('#item-count');
const cartItemsContainer = qs('.shopping-cart-list .cart-items');
const subtotalEl = qs('#cart-subtotal');
const shippingEl = qs('#cart-shipping');
const totalEl = qs('#cart-total');
const btnClearCart = qs('#btn-clear-cart');
const btnCheckout = qs('#btn-checkout');

// --------------------------
// Apiden ürünleri çekme
// --------------------------
async function fetchProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    PRODUCTS = data.map(item => ({
      id: item.id.toString(),
      title: item.title,
      description: item.description,
      category: item.category.charAt(0).toUpperCase() + item.category.slice(1),
      price: item.price,
      image: item.image
    }));

    initCategoryOptions();
    updateWishlistCount();
    renderProducts();
    renderCart();
  } catch (error) {
    console.error('Ürünler çekilirken hata:', error);
  }
}

// --------------------------
// Filtreleme ve Kategori Seçeneklerini Başlatma
// --------------------------
function initCategoryOptions() {
  if (!categoryFilter) return;
  categoryFilter.innerHTML = '<option value="all" selected>Tüm Kategoriler</option>';
  const categories = Array.from(new Set(PRODUCTS.map(p => p.category))).sort();
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

// --------------------------
// Filtre ve Sıralama Fonksiyonları
// --------------------------
function getFilteredProducts() {
  if (!searchInput || !categoryFilter || !sortSelect) return [];

  const term = (searchInput.value || '').trim().toLowerCase();
  const selectedCat = categoryFilter.value || 'all';
  const sorting = sortSelect.value || 'default';
  const wishlistOnly = wishlistBtn?.classList.contains('active');

  let list = PRODUCTS.slice();

  if (term) {
    list = list.filter(p => p.title.toLowerCase().includes(term));
  }
  if (selectedCat !== 'all') {
    list = list.filter(p => p.category === selectedCat);
  }
  if (wishlistOnly) {
    list = list.filter(p => wishlist.has(p.id));
  }

  switch (sorting) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'title-asc': list.sort((a, b) => a.title.localeCompare(b.title)); break;
    case 'title-desc': list.sort((a, b) => b.title.localeCompare(a.title)); break;
  }

  return list;
}

// --------------------------
// Ürünler
// --------------------------
function renderProducts() {
  if (!productGrid) return;
  const list = getFilteredProducts();

  productGrid.innerHTML = '';

  list.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 mb-3';

    const isFav = isInWishlist(p.id);
    const card = document.createElement('div');
    card.className = 'card product-card h-100 shadow-sm';
    card.innerHTML = `
      <div class="position-relative">
        <img src="${p.image}" alt="${p.title}" class="card-img-top img-fluid" style="height: 200px; object-fit: contain;">
        <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-2">${p.category}</span>
        <button class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2 btn-wish ${isFav ? 'active' : ''}" data-action="toggle-wish" data-id="${p.id}" title="Favorilere Ekle/Çıkar">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-1" title="${p.title}">${p.title.length > 40 ? p.title.slice(0, 40) + '...' : p.title}</h5>
        <p class="text-muted small flex-grow-1" title="${p.description}">${p.description.length > 70 ? p.description.slice(0, 70) + '...' : p.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <span class="price-tag fw-bold">${formatPrice(p.price)}</span>
          <button class="btn btn-info text-white btn-sm" data-action="add-to-cart" data-id="${p.id}">Sepete Ekle</button>
        </div>
      </div>`;

    col.appendChild(card);
    productGrid.appendChild(col);
  });
}

// --------------------------
// Favoriler
// --------------------------
function toggleWishlist(id) {
  if (wishlist.has(id)) {
    wishlist.delete(id);
  } else {
    wishlist.add(id);
  }
  safeSetStorage(STORAGE_KEYS.WISHLIST, Array.from(wishlist));
  updateWishlistCount();
  renderProducts();
}
function updateWishlistCount() {
  if (wishlistCountEl) wishlistCountEl.textContent = wishlist.size;
}

// --------------------------
// Cart İŞlemleri
// --------------------------
function addToCart(id, qty = 1) {
  const existing = cartItems.find(ci => ci.id === id);
  if (existing) {
    existing.qty = clamp(existing.qty + qty, 1, 99);
  } else {
    cartItems.push({ id, qty: clamp(qty, 1, 99) });
  }
  persistCartAndRender();
}

function updateCartQty(id, delta) {
  const item = cartItems.find(ci => ci.id === id);
  if (!item) return;
  item.qty = clamp(item.qty + delta, 1, 99);
  persistCartAndRender();
}

function removeFromCart(id) {
  cartItems = cartItems.filter(ci => ci.id !== id);
  persistCartAndRender();
}

function clearCart() {
  cartItems = [];
  persistCartAndRender();
}

function calculateTotals() {
  const detailed = cartItems.map(ci => ({ ...ci, product: findProduct(ci.id) })).filter(x => !!x.product);
  const subtotal = detailed.reduce((sum, it) => sum + it.product.price * it.qty, 0);
  const shipping = subtotal >= 200 ? 0 : (subtotal > 0 ? 19.9 : 0);
  const total = subtotal + shipping;
  return { detailed, subtotal, shipping, total };
}

function renderCart() {
  const { detailed, subtotal, shipping, total } = calculateTotals();

  if (cartItemsContainer) cartItemsContainer.innerHTML = '';
  detailed.forEach(({ id, qty, product }) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'list-item mb-3';
    itemEl.innerHTML = `
      <div class="row align-items-center text-white-50">
        <div class="col-3">
          <img src="${product.image}" alt="${product.title}" class="img-fluid rounded" style="max-height: 60px; object-fit: contain;">
        </div>
        <div class="col-9">
          <div class="d-flex justify-content-between align-items-start">
            <div class="me-2">
              <div class="title text-white">${product.title}</div>
              <div class="small">${formatPrice(product.price)} x <span class="qty-value">${qty}</span> = <span class="text-white">${formatPrice(product.price * qty)}</span></div>
            </div>
            <div class="d-flex align-items-center gap-1">
              <button class="btn btn-sm btn-light btn-qty" data-action="dec" data-id="${id}">-</button>
              <button class="btn btn-sm btn-light btn-qty" data-action="inc" data-id="${id}">+</button>
              <button class="btn btn-sm" data-action="remove" data-id="${id}"><i class="fas fa-trash-alt text-danger"></i></button>
            </div>
          </div>
        </div>
      </div>`;
    cartItemsContainer.appendChild(itemEl);
  });

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(total);
  if (itemCountEl) itemCountEl.textContent = cartCount();
}

function persistCartAndRender() {
  safeSetStorage(STORAGE_KEYS.CART, cartItems);
  renderCart();
  renderProducts(); // reflect states
}

// 

if (productGrid) {
  productGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    if (action === 'add-to-cart') {
      addToCart(id, 1);
    } else if (action === 'toggle-wish') {
      toggleWishlist(id);
    }
  });
}

// kart işlemleri
if (cartItemsContainer) {
  cartItemsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    if (action === 'inc') updateCartQty(id, +1);
    if (action === 'dec') updateCartQty(id, -1);
    if (action === 'remove') removeFromCart(id);
  });
}

if (btnClearCart) btnClearCart.addEventListener('click', () => clearCart());
if (btnCheckout) btnCheckout.addEventListener('click', () => {
  const { total } = calculateTotals();
  if (total <= 0) { alert('Sepetiniz boş.'); return; }
  alert('Ödeme akışı demo: Satın alma tamamlandı!');
  clearCart();
});

// kart dropdown
if (btnCart && cartList) {
  btnCart.addEventListener('click', () => {
    cartList.classList.toggle('d-none');
  });
  document.addEventListener('click', (e) => {
    const isInside = e.target.closest('.shopping-cart');
    const isCartBtn = e.target.closest('.btn-cart');
    if (!isInside && !isCartBtn) {
      cartList.classList.add('d-none');
    }
  });
}

// Filters events
;[searchInput, categoryFilter, sortSelect].forEach(el => {
  if (!el) return;
  el.addEventListener('input', renderProducts);
  el.addEventListener('change', renderProducts);
});

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});
