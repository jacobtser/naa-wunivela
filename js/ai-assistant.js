(function () {
  "use strict";

  // ==========================================
  // KNOWLEDGE BASE
  // ==========================================
  const KNOWLEDGE_BASE = [
    {
      keywords: ["what is naa wuni vela", "who are you", "about", "tell me about", "what is this", "what do you do", "company", "brand", "business"],
      answer: "Naa-Wuni Vela (meaning 'God is Good' in Likpakpaln) is a Ghanaian social enterprise founded by Stephen Andrews Dobia in 2023. We produce premium natural shea butter products while empowering rural women in the Bunkpurugu-Nakpanduri District, Northeast Region, Ghana. We combine social impact with enterprise development through sustainable shea butter production and agroforestry practices."
    },
    {
      keywords: ["founder", "stephen", "who started", "who founded", "ceo", "creator", "founder and ceo"],
      answer: "Our founder is Stephen Andrews Dobia, a visionary leader with over 3 years of experience in sustainable agriculture and premium shea products. He is passionate about empowering local communities and founded Naa-Wuni Vela in 2023 with a mission to create economic opportunities and restore dignity through work."
    },
    {
      keywords: ["pure shea butter", "shea butter 4kg", "unrefined", "grade a", "pure", "natural shea"],
      answer: "Our <strong>Pure Shea Butter (4kg)</strong> is 100% natural, unrefined, Grade A shea butter straight from Ghana. Perfect for skin and hair care. Price: <strong>GHc 250.00</strong>. Features: Unrefined, Grade A, No Additives. It's our best seller!"
    },
    {
      keywords: ["whipped shea", "whipped", "whipped raw shea", "whipped package", "small whipped", "25"],
      answer: "We offer Whipped Raw Shea Butter in three sizes:<br><br>• <strong>Small</strong> — GHc 25.00 (Natural Fragrance, Eco-friendly)<br>• <strong>Medium</strong> — GHc 40.00 (Natural Fragrance, Eco-friendly)<br>• <strong>Large</strong> — GHc 60.00 (Natural Fragrance, Eco-friendly)<br><br>All made with natural fragrance and eco-friendly packaging."
    },
    {
      keywords: ["shea soap", "soap", "coming soon", "soap with essential oils"],
      answer: "Our Shea Soap with Essential Oils is <strong>coming soon</strong>! We're crafting a premium soap using natural shea butter and essential oils. Stay tuned for updates!"
    },
    {
      keywords: ["product", "products", "what do you sell", "price", "pricing", "cost", "how much", "buy", "shop", "collection", "catalog", "catalogue"],
      answer: "Here are our products:<br><br>• <strong>Pure Shea Butter (4kg)</strong> — GHc 250.00 (Best Seller)<br>• <strong>Whipped Raw Shea (Small)</strong> — GHc 25.00<br>• <strong>Whipped Raw Shea (Medium)</strong> — GHc 40.00<br>• <strong>Whipped Raw Shea (Large)</strong> — GHc 60.00<br>• <strong>Shea Soap</strong> — Coming soon!<br><br>👉 <a href='order.html' style='color: var(--primary-color); text-decoration: underline;'>Order now on our Order page</a>"
    },
    {
      keywords: ["order", "how to order", "place order", "buy now", "purchase", "ordering", "how do i buy", "get product"],
      answer: "You can order directly from our <a href='order.html' style='color: var(--primary-color); text-decoration: underline;'>Order Page</a>. Simply select your products, fill in your details, and submit. After placing your order, you'll be redirected to WhatsApp to finalize with our team. You can also contact us at <strong>+233 (055) 655 9201</strong>."
    },
    {
      keywords: ["delivery", "shipping", "how long", "deliver", "ship", "delivery time", "how does delivery work"],
      answer: "Delivery is available within Ghana. We work with reliable logistics partners to ensure your order reaches you. For specific delivery timelines and rates, please contact us at <strong>+233 (055) 655 9201</strong> or place an order on our <a href='order.html' style='color: var(--primary-color); text-decoration: underline;'>Order Page</a>."
    },
    {
      keywords: ["payment", "pay", "how to pay", "mobile money", "momo", "payment method", "what payment"],
      answer: "We accept mobile money (MoMo) and other payment methods. After placing your order on our Order page, you'll be connected via WhatsApp where our team will confirm your order and provide payment instructions. For any payment inquiries, call <strong>+233 (055) 655 9201</strong>."
    },
    {
      keywords: ["contact", "phone", "email", "call", "reach", "message", "get in touch", "address", "location"],
      answer: "You can reach us through:<br><br>📍 <strong>Location:</strong> Boaterigu, Bunkpurugu-Nakpanduri District, Northeast Region, Ghana<br>📞 <strong>Phone:</strong> +233 (055) 655 9201 (Mon-Fri, 8AM-5PM GMT)<br>📧 <strong>Email:</strong> dobiastephen86@gmail.com (Response within 24 hours)<br><br>You can also use the <a href='#contact' style='color: var(--primary-color); text-decoration: underline;'>contact form</a> on our website."
    },
    {
      keywords: ["story", "history", "how it started", "beginning", "founded", "journey", "timeline", "background"],
      answer: "Naa-Wuni Vela was founded in <strong>2023</strong> by Stephen Andrews Dobia. In <strong>2024</strong>, the first shea prototype was birthed — where theoretical knowledge was brought to life in a physical product. In <strong>2025</strong>, we achieved sustainability certification and made our first measurable community impact. Our story is one of empowering rural women through sustainable shea butter production."
    },
    {
      keywords: ["team", "people", "staff", "who works here", "members", "family"],
      answer: "Our dedicated team includes:<br><br>• <strong>Stephen Andrews Dobia</strong> — Founder & CEO<br>• <strong>Ayeh Kwabena-Koranteng William</strong> — Sales & Marketing Director<br>• <strong>Mr. Francis Nibanje Siibu</strong> — Advisor & Mentor (Sustainability)<br>• <strong>Mr. John Wobil</strong> — Business Coach<br>• <strong>Jacob Tser Doku</strong> — Head of Development<br>• <strong>Mma Alima</strong> — Women's Collective Lead"
    },
    {
      keywords: ["impact", "women empowerment", "community", "social", "empower", "rural women", "empowering women"],
      answer: "Our impact goals:<br><br>👥 <strong>50 women empowered</strong> through fair wages, training, and support for sustainable livelihoods<br>🌳 <strong>1,000 trees to be planted</strong><br>💰 <strong>25 jobs to be created</strong><br>🎓 <strong>50 youth to be trained</strong><br><br>We work directly with women's cooperatives, providing fair trade, skills development programs, business mentorship, and environmental sustainability practices."
    },
    {
      keywords: ["water", "borehole", "clean water", "boaterigu", "community project", "well"],
      answer: "We repaired a long-spoiled borehole for the people of Boaterigu community, providing access to clean and safe water for all. This includes free water accessibility, clean and safe water for all programs, borehole maintenance, and improved health outcomes for the community."
    },
    {
      keywords: ["sustainability", "environment", "eco", "green", "organic", "environmental", "agroforestry"],
      answer: "Sustainability is at our core. We practice: organic farming methods, reforestation projects, eco-friendly packaging, and water conservation. In 2025, we achieved organic and sustainable sourcing certifications. Our approach combines environmental responsibility with community development."
    },
    {
      keywords: ["supporter", "partner", "sponsor", "donor", "support us", "become a supporter", "partnership"],
      answer: "Our supporters include <strong>Mr. Obed Nyarko</strong> — a Mentor & Conservation Expert who provided financial support in 2025.<br><br>Want to support our mission? <a href='#contact' style='color: var(--primary-color); text-decoration: underline;'>Contact us</a> to become a partner and help empower more women and communities through sustainable shea production."
    },
    {
      keywords: ["testimonial", "review", "what people say", "customer review", "feedback", "rating"],
      answer: "Our customers love us! Here's what they say:<br><br>⭐ \"Naa-Wuni Vela's shea butter has transformed my skincare routine. The quality is exceptional!\" — Grace, Accra<br><br>⭐ \"Not only is the product amazing, but knowing it supports women in Ghana makes it even more special.\" — Dora, Kumasi<br><br>⭐ \"Outstanding quality and exceptional customer service. Their commitment to sustainability is truly inspiring.\" — Linda Mburu, Nalerigu"
    },
    {
      keywords: ["shea butter benefits", "benefits", "skin care", "skincare", "skin", "hair", "moisturizer", "uses"],
      answer: "Our shea butter is excellent for:<br><br>• Deep skin moisturizing<br>• Hair care and scalp treatment<br>• Healing minor cuts, burns, and rashes<br>• Stretch mark prevention<br>• Lip balm and cuticle care<br>• Natural sunscreen (low SPF)<br><br>It's 100% natural, unrefined, and rich in vitamins A, E, and F."
    },
    {
      keywords: ["mission", "vision", "goal", "purpose", "aim", "objective"],
      answer: "Our <strong>mission</strong> is to create economic opportunities and restore dignity through work by equipping women with practical skills, production resources, and market access to transform shea processing into a reliable source of income. Our <strong>vision</strong> is self-reliant and resilient communities with a locally rooted shea value chain that creates economic opportunities, uplifts communities, and fosters inclusive development."
    },
    {
      keywords: ["meaning", "naa wuni vela meaning", "god is good", "name meaning", "translation", "language"],
      answer: "Naa-Wuni Vela means <strong>'God is Good'</strong> in the Likpakpaln language, spoken by the Konkomba people in the Northeast Region of Ghana."
    },
    {
      keywords: ["ghana", "where are you based", "location", "northeast region", "bunkpurugu", "nakpanduri", "africa"],
      answer: "We are based in <strong>Boaterigu, Bunkpurugu-Nakpanduri District, Northeast Region, Ghana</strong>. Our shea butter is sourced from local women's cooperatives across the region."
    },
    {
      keywords: ["ingredient", "what's in it", "composition", "natural", "additive", "chemical", "pure"],
      answer: "Our shea butter is <strong>100% natural, unrefined, Grade A</strong> with no additives or chemicals. It's pure shea butter straight from Ghanaian women farmers. Our whipped variants contain natural fragrance, and our upcoming soap will feature essential oils."
    },
    {
      keywords: ["price", "cost", "how much", "ghc", "ghana cedi", "pricing", "rates"],
      answer: "Our prices:<br><br>• Pure Shea Butter (4kg) — <strong>GHc 250.00</strong><br>• Whipped Shea (Small) — <strong>GHc 25.00</strong><br>• Whipped Shea (Medium) — <strong>GHc 40.00</strong><br>• Whipped Shea (Large) — <strong>GHc 60.00</strong><br>• Shea Soap — <strong>Coming soon</strong>"
    },
    {
      keywords: ["whatsapp", "wa.me", "233", "055", "655"],
      answer: "You can reach us on WhatsApp at <strong>+233 (055) 655 9201</strong>. After placing an order, you'll be redirected to WhatsApp to finalize with our team. Or simply send us a message directly!"
    },
    {
      keywords: ["shea butter", "shea", "butter", "what is shea butter", "shea nut"],
      answer: "Shea butter is a natural fat extracted from shea nuts (from the shea tree, Vitellaria paradoxa). It's rich in vitamins A, E, and F, and has excellent moisturizing, healing, and anti-inflammatory properties. Our shea butter is 100% natural, unrefined Grade A, sourced from women's cooperatives in Northern Ghana."
    },
    {
      keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy"],
      answer: "👋 Hello! Welcome to Naa-Wuni Vela. I'm your AI assistant. I can help you with information about our products, pricing, ordering, our story, impact, and more. What would you like to know?"
    },
    {
      keywords: ["thank", "thanks", "thank you", "appreciate", "grateful"],
      answer: "You're welcome! 😊 We're glad to help. If you have any other questions about Naa-Wuni Vela or our products, feel free to ask. Have a blessed day!"
    },
    {
      keywords: ["bye", "goodbye", "see you", "good night", "farewell"],
      answer: "Thank you for visiting Naa-Wuni Vela! 🙏 If you ever need anything, we're here to help. Feel free to come back anytime. God is Good — and so is our shea! 😊"
    },
    {
      keywords: ["jacob", "developer", "tser", "doku", "who made this", "who built", "head of development"],
      answer: "<strong>Jacob Tser Doku</strong> is our Head of Development. He's an expert in web development and digital innovation, and ensures our online presence reflects our brand excellence. He built this AI assistant! Check out his work: <a href='https://angelbluef65-tech.github.io/my_portfolio/' target='_blank' style='color: var(--primary-color); text-decoration: underline;'>Portfolio</a>"
    },
    {
      keywords: ["help", "what can you do", "capabilities", "options", "commands", "menu", "suggestions"],
      answer: "I can help you with:<br><br>• 📋 <strong>Products</strong> — Learn about our shea butter range and prices<br>• 📖 <strong>Our Story</strong> — How Naa-Wuni Vela started and our journey<br>• 👥 <strong>Team</strong> — Meet the people behind the brand<br>• 🌍 <strong>Impact</strong> — Our social and environmental mission<br>• 📞 <strong>Contact</strong> — Get in touch with us<br>• 🛒 <strong>Orders</strong> — How to place an order<br>• 💡 <strong>Tips</strong> — Shea butter benefits and uses<br><br>Just ask me anything!"
    }
  ];

  const FALLBACK_RESPONSES = [
    "I'm not sure I understand. Could you try rephrasing? You can ask me about our products, story, team, impact, or how to order.",
    "Hmm, I don't have an answer for that yet. Try asking about our shea butter products, pricing, or our mission!",
    "I'm still learning! Feel free to ask about products, pricing, ordering, our story, or our team — I'd love to help."
  ];

  const SUGGESTED_QUESTIONS = [
    "What products do you sell?",
    "Tell me about Naa-Wuni Vela",
    "How can I place an order?",
    "What are your prices?",
    "What impact do you make?",
    "Who is on your team?"
  ];

  // ==========================================
  // CHATBOT UI
  // ==========================================
  function createChatbotUI() {
    if (document.getElementById("ai-assistant-widget")) return;

    const widget = document.createElement("div");
    widget.id = "ai-assistant-widget";

    widget.innerHTML = `
      <div class="ai-assistant-container">
        <button class="ai-assistant-toggle" id="aiToggle" aria-label="Open AI Assistant">
          <i class="fas fa-comment-dots"></i>
        </button>

        <div class="ai-assistant-panel" id="aiPanel">
          <div class="ai-assistant-header">
            <div class="ai-header-left">
              <div class="ai-avatar">
                <i class="fas fa-leaf"></i>
              </div>
              <div class="ai-header-info">
                <h4>Naa-Wuni Vela AI</h4>
                <span class="ai-status">Online</span>
              </div>
            </div>
            <div class="ai-header-actions">
              <button class="ai-btn-icon" id="aiClearChat" title="Clear chat">
                <i class="fas fa-trash-alt"></i>
              </button>
              <button class="ai-btn-icon" id="aiClose" title="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <div class="ai-assistant-messages" id="aiMessages">
            <div class="ai-message ai-message-bot">
              <div class="ai-message-avatar">
                <i class="fas fa-leaf"></i>
              </div>
              <div class="ai-message-content">
                <p>👋 Welcome to <strong>Naa-Wuni Vela</strong>! I'm your AI assistant. I know everything about our premium shea butter products, our story, our team, and how you can support our mission. How can I help you today?</p>
              </div>
            </div>
            <div class="ai-suggested-questions" id="aiSuggested">
              ${SUGGESTED_QUESTIONS.map(q => `<button class="ai-suggestion-btn">${q}</button>`).join('')}
            </div>
          </div>

          <div class="ai-assistant-input">
            <input type="text" id="aiInput" placeholder="Ask me anything about Naa-Wuni Vela..." autocomplete="off">
            <button id="aiSendBtn" class="ai-send-btn" aria-label="Send message">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(widget);
  }

  // ==========================================
  // CHATBOT LOGIC
  // ==========================================
  function initChatbot() {
    const toggle = document.getElementById("aiToggle");
    const panel = document.getElementById("aiPanel");
    const close = document.getElementById("aiClose");
    const messages = document.getElementById("aiMessages");
    const input = document.getElementById("aiInput");
    const sendBtn = document.getElementById("aiSendBtn");
    const clearBtn = document.getElementById("aiClearChat");

    let isOpen = false;

    function togglePanel() {
      isOpen = !isOpen;
      panel.classList.toggle("active", isOpen);
      toggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-comment-dots"></i>';
      if (isOpen) {
        setTimeout(() => input.focus(), 300);
      }
    }

    function addMessage(text, isUser) {
      const div = document.createElement("div");
      div.className = `ai-message ${isUser ? "ai-message-user" : "ai-message-bot"}`;
      div.innerHTML = isUser
        ? `<div class="ai-message-content"><p>${escapeHtml(text)}</p></div>`
        : `<div class="ai-message-avatar"><i class="fas fa-leaf"></i></div>
           <div class="ai-message-content"><p>${text}</p></div>`;
      messages.insertBefore(div, document.getElementById("aiSuggested"));

      // Remove suggested questions after first user message
      const suggested = document.getElementById("aiSuggested");
      if (isUser && suggested) {
        suggested.remove();
      }

      messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
      const div = document.createElement("div");
      div.className = "ai-message ai-message-bot ai-message-typing";
      div.id = "aiTypingIndicator";
      div.innerHTML = `<div class="ai-message-avatar"><i class="fas fa-leaf"></i></div>
        <div class="ai-message-content">
          <div class="typing-dots"><span></span><span></span><span></span></div>
        </div>`;
      messages.insertBefore(div, document.getElementById("aiSuggested"));
      messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
      const typing = document.getElementById("aiTypingIndicator");
      if (typing) typing.remove();
    }

    function getResponse(query) {
      const q = query.toLowerCase().trim();
      const queryWords = q.split(/\s+/).filter(w => w.length > 2);
      const queryBigrams = [];
      for (let i = 0; i < queryWords.length - 1; i++) {
        queryBigrams.push(queryWords[i] + " " + queryWords[i + 1]);
      }

      let bestMatch = null;
      let bestScore = -1;

      for (const entry of KNOWLEDGE_BASE) {
        let score = 0;

        for (const keyword of entry.keywords) {
          const keywordLower = keyword.toLowerCase();

          // Full phrase match (highest weight)
          if (q.includes(keywordLower) || keywordLower.includes(q)) {
            score += keywordLower.length * 2;
          }

          // Bigram overlap
          const keywordWords = keywordLower.split(/\s+/).filter(w => w.length > 2);
          for (const bigram of queryBigrams) {
            if (keywordLower.includes(bigram)) {
              score += bigram.length;
            }
          }

          // Individual word matches
          for (const kw of keywordWords) {
            if (kw.length > 2 && queryWords.includes(kw)) {
              score += kw.length;
            }
          }
        }

        // Normalize by answer length to avoid bias toward long entries
        const normalizedScore = entry.keywords.length > 0
          ? score / entry.keywords.length
          : 0;

        if (normalizedScore > bestScore) {
          bestScore = normalizedScore;
          bestMatch = entry.answer;
        }
      }

      if (bestMatch && bestScore > 2) {
        return bestMatch;
      }

      return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
    }

    function handleSend() {
      const text = input.value.trim();
      if (!text) return;

      addMessage(text, true);
      input.value = "";
      input.focus();
      showTyping();

      setTimeout(() => {
        removeTyping();
        const response = getResponse(text);
        addMessage(response, false);
      }, 600 + Math.random() * 400);
    }

    function escapeHtml(text) {
      const d = document.createElement("div");
      d.textContent = text;
      return d.innerHTML;
    }

    // Event listeners
    toggle.addEventListener("click", togglePanel);
    close.addEventListener("click", togglePanel);

    sendBtn.addEventListener("click", handleSend);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSend();
    });

    clearBtn.addEventListener("click", () => {
      const msgContainer = document.getElementById("aiMessages");
      const suggested = document.getElementById("aiSuggested");
      // Keep only the welcome message and suggested questions
      const items = msgContainer.querySelectorAll(".ai-message");
      items.forEach(item => item.remove());
      if (!suggested) {
        const newSuggested = document.createElement("div");
        newSuggested.className = "ai-suggested-questions";
        newSuggested.id = "aiSuggested";
        newSuggested.innerHTML = SUGGESTED_QUESTIONS.map(q =>
          `<button class="ai-suggestion-btn">${q}</button>`
        ).join('');
        msgContainer.appendChild(newSuggested);
        attachSuggestionListeners();
      }
      // Re-add welcome message
      const welcome = document.createElement("div");
      welcome.className = "ai-message ai-message-bot";
      welcome.innerHTML = `<div class="ai-message-avatar"><i class="fas fa-leaf"></i></div>
        <div class="ai-message-content">
          <p>👋 Welcome back! How can I help you today?</p>
        </div>`;
      msgContainer.insertBefore(welcome, msgContainer.firstChild);
    });

    // Suggestion button clicks
    function attachSuggestionListeners() {
      document.querySelectorAll(".ai-suggestion-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const text = btn.textContent.trim();
          addMessage(text, true);
          btn.closest(".ai-suggested-questions")?.remove();
          showTyping();
          setTimeout(() => {
            removeTyping();
            const response = getResponse(text);
            addMessage(response, false);
          }, 600 + Math.random() * 400);
        });
      });
    }

    attachSuggestionListeners();

    // Listen for theme changes to update the chatbot theme
    const widgetEl = document.getElementById("ai-assistant-widget");
    const observer = new MutationObserver(() => {
      const theme = document.body.getAttribute("data-theme");
      if (widgetEl) widgetEl.setAttribute("data-theme", theme || "light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
  }

  // ==========================================
  // INITIALIZE
  // ==========================================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      createChatbotUI();
      initChatbot();
    });
  } else {
    createChatbotUI();
    initChatbot();
  }
})();
