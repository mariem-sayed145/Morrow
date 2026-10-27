/**
 * MORROW COFFEE ROASTERS — MAIN INTERACTION CONTROLLER
 * Vanilla JavaScript implementation for navigation, modals, cart drawer,
 * article reader, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. DATA DEFINITIONS (Products & Journal Articles)
     ========================================================================== */
  const PRODUCTS = {
    'house-blend': {
      id: 'house-blend',
      lot: 'LOT 01 • WHOLE BEAN',
      name: '01 — House Blend',
      price: 19.50,
      priceFormatted: '$19.50',
      origin: 'Huila, Colombia & Antigua, Guatemala • Medium Roast',
      notes: 'Chocolate, hazelnut, caramel.',
      image: 'assets/images/product-house-blend.jpg',
      size: '300g Whole Bean'
    },
    'sunrise-ethiopia': {
      id: 'sunrise-ethiopia',
      lot: 'LOT 02 • WHOLE BEAN',
      name: '02 — Sunrise Ethiopia',
      price: 22.00,
      priceFormatted: '$22.00',
      origin: 'Yirgacheffe, Gedeb • Natural Process • Light Roast',
      notes: 'Citrus, jasmine, stone fruit.',
      image: 'assets/images/product-sunrise-ethiopia.jpg',
      size: '250g Whole Bean'
    },
    'slow-sunday': {
      id: 'slow-sunday',
      lot: 'LOT 03 • WHOLE BEAN',
      name: '03 — Slow Sunday Decaf',
      price: 20.00,
      priceFormatted: '$20.00',
      origin: 'Chiapas, Mexico • Mountain Water Process • Medium Roast',
      notes: 'Cocoa, almond, soft sweetness.',
      image: 'assets/images/product-slow-sunday.jpg',
      size: '300g Whole Bean'
    }
  };

  const ARTICLES = {
    'morning-brew': {
      title: 'A Better Morning Brew',
      category: 'Brewing Ritual',
      date: 'October 14, 2026',
      readTime: '4 min read',
      author: 'Morrow Roastery Journal',
      image: 'assets/images/journal-morning-brew.jpg',
      content: `
        <p>There is a distinct tranquility in the earliest hours of the morning before email notifications begin and the neighborhood awakens. For us at Morrow, coffee is not merely a stimulant to be rushed down before a commute; it is an invitation to pause, measure, and engage our senses in tactile craftsmanship.</p>
        
        <h3>The Golden Ratio: 1 to 16</h3>
        <p>If there is a single adjustment that will permanently elevate your coffee at home, it is switching from arbitrary scoops to a digital scale. A brewing ratio of 1 part coffee to 16 parts fresh water (for example, 20 grams of coffee to 320 grams of water) guarantees balanced solubility. Too much water yields hollow bitterness; too little leaves sweet origin characteristics trapped inside unextracted grounds.</p>

        <h3>Water Quality & Temperature</h3>
        <p>Coffee is roughly ninety-eight percent water. Using filtered spring water at roughly 92°C to 94°C (approximately thirty seconds off the boil) extracts complex fruit sugars without scorching delicate aromatics. Allow yourself five quiet minutes at dawn—you will taste the difference in every sip.</p>
      `
    },
    'origins': {
      title: 'Understanding Coffee Origins',
      category: 'Origin Fieldwork',
      date: 'September 28, 2026',
      readTime: '6 min read',
      author: 'Julian Morrow, Green Sourcing',
      image: 'assets/images/journal-origins.jpg',
      content: `
        <p>To drink specialty coffee is to taste geography. The climate, soil chemistry, elevation, and post-harvest fermentation methods combine to dictate the distinct fingerprint found in every cup.</p>
        
        <h3>High Altitude & Density</h3>
        <p>Our Ethiopian lots are harvested at altitudes exceeding 2,000 meters above sea level. Cold mountain nights slow cherry maturation, permitting complex organic acids and sugars to develop within dense seeds. When roasted with care, these coffees yield enchanting notes of bergamot, candied peach, and jasmine tea.</p>

        <h3>Processing: Washed vs. Natural</h3>
        <p>While washed coffees undergo depulping and underwater fermentation for pristine clarity, natural process coffees dry inside the fruit under the midday sun. This slow natural drying imparts winey sweetness, strawberry undertones, and deep syrupy body. By honoring direct farm relationships, we ensure transparent compensation that fuels sustainable agricultural resilience.</p>
      `
    },
    'slow-pour': {
      title: 'The Art of the Slow Pour',
      category: 'Technique',
      date: 'September 12, 2026',
      readTime: '5 min read',
      author: 'Clara Chen, Head of Coffee',
      image: 'assets/images/journal-slow-pour.jpg',
      content: `
        <p>Hand-pour brewing using an origami dripper or ceramic V60 is widely regarded as the ultimate expression of single-origin clarity. Yet many home brewers find their cups varying wildly from day to day. Mastery lies in controlling water flow and agitation.</p>
        
        <h3>The Crucial Bloom</h3>
        <p>Always commence with a bloom: pour sixty grams of water over thirty grams of freshly cracked coffee and allow the bed to expand for forty-five seconds. This releases trapped carbon dioxide gas, paving the way for uniform extraction during subsequent pours.</p>

        <h3>Laminar Spiral Pouring</h3>
        <p>Using a slender gooseneck kettle, pour in slow concentric spirals moving gently from center outward without disturbing the outer paper rim. Maintain a steady, unbroken stream. The result is a luminous, sediment-free brew that reveals layered tasting notes as the temperature gently cools.</p>
      `
    }
  };

  /* ==========================================================================
     2. CART STATE & CONTROLLER
     ========================================================================== */
  let cart = [
    {
      productId: 'house-blend',
      grind: 'Whole Bean',
      size: '300g',
      quantity: 1,
      price: 19.50
    }
  ];

  const cartCounter = document.getElementById('cart-counter');
  const cartDrawerBackdrop = document.getElementById('cart-drawer-backdrop');
  const cartDrawerItems = document.getElementById('cart-drawer-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const checkoutDemoBtn = document.getElementById('checkout-demo-btn');

  function updateCartUI() {
    // Update badge counter
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCounter) {
      cartCounter.textContent = totalItems;
      cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Render items list
    if (cartDrawerItems) {
      if (cart.length === 0) {
        cartDrawerItems.innerHTML = `
          <div style="text-align: center; padding: 3rem 1rem; color: var(--color-espresso-60);">
            <p style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--color-espresso);">Your bag is empty</p>
            <p style="font-size: 0.875rem;">Explore our seasonal single-origins and house blends above.</p>
          </div>
        `;
      } else {
        cartDrawerItems.innerHTML = cart.map((item, idx) => {
          const product = PRODUCTS[item.productId];
          return `
            <div class="cart-item-row" data-cart-index="${idx}">
              <img src="${product.image}" alt="${product.name}" class="cart-item-thumb">
              <div>
                <h4 class="cart-item-title">${product.name}</h4>
                <p class="cart-item-meta">${item.size} • ${item.grind}</p>
                <div class="cart-qty-ctrls">
                  <button type="button" class="cart-qty-btn" data-action="decrease" data-index="${idx}" aria-label="Decrease quantity">−</button>
                  <span class="cart-qty-val">${item.quantity}</span>
                  <button type="button" class="cart-qty-btn" data-action="increase" data-index="${idx}" aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div style="text-align: right;">
                <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                <button type="button" class="btn-link" data-action="remove" data-index="${idx}" style="font-size: 0.72rem; margin-top: 0.5rem; color: var(--color-warm-gray);">Remove</button>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartSubtotal) {
      cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }
  }

  function openCart() {
    if (cartDrawerBackdrop) {
      cartDrawerBackdrop.classList.add('is-active');
      cartDrawerBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawerBackdrop) {
      cartDrawerBackdrop.classList.remove('is-active');
      cartDrawerBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function addToCart(productId, grind = 'Whole Bean', size = '300g') {
    const existing = cart.find(item => item.productId === productId && item.grind === grind && item.size === size);
    if (existing) {
      existing.quantity += 1;
    } else {
      const prod = PRODUCTS[productId];
      cart.push({
        productId,
        grind,
        size,
        quantity: 1,
        price: prod.price
      });
    }
    updateCartUI();
    openCart();
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartDrawerBackdrop) {
    cartDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === cartDrawerBackdrop) closeCart();
    });
  }

  if (cartDrawerItems) {
    cartDrawerItems.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const index = parseInt(btn.dataset.index, 10);

      if (action === 'increase') {
        cart[index].quantity += 1;
      } else if (action === 'decrease') {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
      } else if (action === 'remove') {
        cart.splice(index, 1);
      }
      updateCartUI();
    });
  }

  if (checkoutDemoBtn) {
    checkoutDemoBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your bag is currently empty.');
        return;
      }
      alert('Demo Roastery Checkout: Thank you for testing Morrow Coffee Roasters. In a production store, this proceeds to secure checkout.');
    });
  }

  // Bind Add to Bag buttons on cards
  document.querySelectorAll('button[data-add-bag]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.addBag;
      addToCart(id, 'Whole Bean', '300g');
    });
  });

  /* ==========================================================================
     3. PRODUCT QUICK VIEW MODAL
     ========================================================================== */
  const productModalBackdrop = document.getElementById('product-modal-backdrop');
  const closeProdModalBtn = document.getElementById('close-prod-modal');
  const modalProdImg = document.getElementById('modal-prod-img');
  const modalProdLot = document.getElementById('modal-prod-lot');
  const modalProdTitle = document.getElementById('modal-prod-title');
  const modalProdPrice = document.getElementById('modal-prod-price');
  const modalProdDesc = document.getElementById('modal-prod-desc');
  const modalProdNotes = document.getElementById('modal-prod-notes');
  const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
  const grindSelector = document.getElementById('grind-selector');
  const sizeSelector = document.getElementById('size-selector');

  let activeModalProductId = 'house-blend';
  let selectedGrind = 'Whole Bean';
  let selectedSize = '300g';

  function openProductModal(productId) {
    const prod = PRODUCTS[productId];
    if (!prod || !productModalBackdrop) return;

    activeModalProductId = productId;
    selectedGrind = 'Whole Bean';
    selectedSize = '300g';

    modalProdImg.src = prod.image;
    modalProdImg.alt = prod.name;
    modalProdLot.textContent = prod.lot;
    modalProdTitle.textContent = prod.name;
    modalProdPrice.textContent = prod.priceFormatted;
    modalProdDesc.textContent = prod.origin;
    modalProdNotes.textContent = prod.notes;

    // Reset pill selections
    if (grindSelector) {
      grindSelector.querySelectorAll('.pill-option-btn').forEach((btn, idx) => {
        btn.classList.toggle('is-selected', idx === 0);
      });
    }
    if (sizeSelector) {
      sizeSelector.querySelectorAll('.pill-option-btn').forEach((btn, idx) => {
        btn.classList.toggle('is-selected', idx === 0);
      });
    }

    productModalBackdrop.classList.add('is-active');
    productModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    if (productModalBackdrop) {
      productModalBackdrop.classList.remove('is-active');
      productModalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('button[data-quick-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.quickView;
      openProductModal(id);
    });
  });

  if (closeProdModalBtn) closeProdModalBtn.addEventListener('click', closeProductModal);
  if (productModalBackdrop) {
    productModalBackdrop.addEventListener('click', (e) => {
      if (e.target === productModalBackdrop) closeProductModal();
    });
  }

  // Pill option selections in modal
  if (grindSelector) {
    grindSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill-option-btn');
      if (!btn) return;
      grindSelector.querySelectorAll('.pill-option-btn').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedGrind = btn.dataset.val;
    });
  }

  if (sizeSelector) {
    sizeSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill-option-btn');
      if (!btn) return;
      sizeSelector.querySelectorAll('.pill-option-btn').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedSize = btn.dataset.val;
      const basePrice = PRODUCTS[activeModalProductId].price;
      const adjustedPrice = selectedSize === '1kg' ? (basePrice * 3.1).toFixed(2) : basePrice.toFixed(2);
      modalProdPrice.textContent = `$${adjustedPrice}`;
    });
  }

  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener('click', () => {
      addToCart(activeModalProductId, selectedGrind, selectedSize);
      closeProductModal();
    });
  }

  /* ==========================================================================
     4. JOURNAL ARTICLE READER MODAL
     ========================================================================== */
  const journalModalBackdrop = document.getElementById('journal-modal-backdrop');
  const closeJournalModalBtn = document.getElementById('close-journal-modal');
  const journalModalCat = document.getElementById('journal-modal-cat');
  const journalModalTitle = document.getElementById('journal-modal-title');
  const journalModalAuthor = document.getElementById('journal-modal-author');
  const journalModalDate = document.getElementById('journal-modal-date');
  const journalModalImg = document.getElementById('journal-modal-img');
  const journalModalBody = document.getElementById('journal-modal-body');

  function openJournalModal(slug) {
    const article = ARTICLES[slug];
    if (!article || !journalModalBackdrop) return;

    journalModalCat.textContent = article.category;
    journalModalTitle.textContent = article.title;
    journalModalAuthor.textContent = article.author;
    journalModalDate.textContent = `${article.date} • ${article.readTime}`;
    journalModalImg.src = article.image;
    journalModalImg.alt = article.title;
    journalModalBody.innerHTML = article.content;

    journalModalBackdrop.classList.add('is-active');
    journalModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeJournalModal() {
    if (journalModalBackdrop) {
      journalModalBackdrop.classList.remove('is-active');
      journalModalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('button[data-open-journal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.dataset.openJournal;
      openJournalModal(slug);
    });
  });

  if (closeJournalModalBtn) closeJournalModalBtn.addEventListener('click', closeJournalModal);
  if (journalModalBackdrop) {
    journalModalBackdrop.addEventListener('click', (e) => {
      if (e.target === journalModalBackdrop) closeJournalModal();
    });
  }

  /* ==========================================================================
     5. CONTACT / GET IN TOUCH MODAL
     ========================================================================== */
  const contactModalBackdrop = document.getElementById('contact-modal-backdrop');
  const openContactBtn = document.getElementById('open-contact-btn');
  const closeContactBtn = document.getElementById('close-contact-modal');
  const contactForm = document.getElementById('contact-form');
  const contactFeedback = document.getElementById('contact-feedback');

  function openContactModal() {
    if (contactModalBackdrop) {
      contactModalBackdrop.classList.add('is-active');
      contactModalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (contactFeedback) {
        contactFeedback.className = 'form-feedback';
        contactFeedback.textContent = '';
      }
    }
  }

  function closeContactModal() {
    if (contactModalBackdrop) {
      contactModalBackdrop.classList.remove('is-active');
      contactModalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (openContactBtn) openContactBtn.addEventListener('click', openContactModal);
  if (closeContactBtn) closeContactBtn.addEventListener('click', closeContactModal);
  if (contactModalBackdrop) {
    contactModalBackdrop.addEventListener('click', (e) => {
      if (e.target === contactModalBackdrop) closeContactModal();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        contactFeedback.className = 'form-feedback is-visible is-error';
        contactFeedback.textContent = 'Please fill out all required fields.';
        return;
      }

      if (!emailRegex.test(email)) {
        contactFeedback.className = 'form-feedback is-visible is-error';
        contactFeedback.textContent = 'Please enter a valid email address.';
        return;
      }

      // Success in Demo mode
      contactFeedback.className = 'form-feedback is-visible is-success';
      contactFeedback.textContent = `Thank you, ${name}. Your message has been received (Demo showcase: no server dispatch). Our roastery team will follow up via email.`;
      contactForm.reset();

      setTimeout(() => {
        closeContactModal();
      }, 3500);
    });
  }

  /* ==========================================================================
     6. NEWSLETTER VALIDATION & LOCAL CONFIRMATION
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        newsletterFeedback.className = 'newsletter-feedback is-visible is-error';
        newsletterFeedback.textContent = 'Please enter your email address.';
        newsletterEmail.focus();
        return;
      }

      if (!emailRegex.test(email)) {
        newsletterFeedback.className = 'newsletter-feedback is-visible is-error';
        newsletterFeedback.textContent = 'Please enter a valid email address format.';
        newsletterEmail.focus();
        return;
      }

      // Success confirmation
      newsletterFeedback.className = 'newsletter-feedback is-visible is-success';
      newsletterFeedback.textContent = 'Thank you for subscribing to our morning dispatch! (Demo showcase: confirmed locally, no data stored on a server).';
      newsletterEmail.value = '';
    });
  }

  /* ==========================================================================
     7. MOBILE NAVIGATION & SMOOTH SCROLLING
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const primaryNav = document.getElementById('primary-navigation');
  const siteHeader = document.getElementById('site-header');

  if (mobileToggle && primaryNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav on link click
    primaryNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Header scroll appearance
  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 20) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    }
  }, { passive: true });

  // Active section indicator on nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ==========================================================================
     8. GLOBAL ACCESSIBILITY KEYBOARD LISTENER (ESC TO CLOSE)
     ========================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeProductModal();
      closeJournalModal();
      closeContactModal();
      if (primaryNav && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });

  // Initial cart UI population
  updateCartUI();
});
