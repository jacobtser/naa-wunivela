// ==========================================
// ENHANCED FORM VALIDATION & HANDLING
// ==========================================

class EnhancedForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) {
      console.warn(`Form with ID "${formId}" not found`);
      return;
    }

    this.isSubmitting = false;
    this.init();
  }

  init() {
    this.setupValidation();
    this.setupRealTimeValidation();
    this.setupCharacterCounter();
    this.setupAutoSave();
    this.bindEvents();
  }

  setupValidation() {
    // Remove novalidate to let browser handle basic validation
    // Form will submit directly to Formspree
    this.form.addEventListener("submit", (e) => {
      // Let the form submit normally to Formspree
      // Formspree will handle validation and redirect back
    });
  }

  setupRealTimeValidation() {
    const inputs = this.form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      // Clear error on focus
      input.addEventListener("focus", () => {
        this.clearFieldError(input);
      });
    });
  }

  setupCharacterCounter() {
    const textarea = this.form.querySelector("textarea");
    if (!textarea) return;

    const counter = this.form.querySelector(".char-counter");
    if (!counter) return;

    textarea.addEventListener("input", () => {
      const count = textarea.value.length;
      const countSpan = counter.querySelector("#charCount");
      if (countSpan) countSpan.textContent = count;

      // Update color based on length
      if (count > 450) {
        counter.style.color = "#e74c3c";
      } else if (count > 400) {
        counter.style.color = "#e67e22";
      } else {
        counter.style.color = "";
      }
    });
  }

  setupAutoSave() {
    const fields = this.form.querySelectorAll("input, textarea");
    const saveKey = "naawuni_form_draft";

    fields.forEach((field) => {
      field.addEventListener(
        "input",
        this.debounce(() => {
          this.saveDraft(saveKey);
        }, 1000),
      );
    });

    // Load draft on page load
    this.loadDraft(saveKey);
  }

  saveDraft(key) {
    const formData = {};
    const fields = this.form.querySelectorAll("input, textarea");

    fields.forEach((field) => {
      if (field.name) {
        formData[field.name] = field.value;
      }
    });

    localStorage.setItem(key, JSON.stringify(formData));
  }

  loadDraft(key) {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return;

      const formData = JSON.parse(saved);

      Object.keys(formData).forEach((name) => {
        const field = this.form.querySelector(`[name="${name}"]`);
        if (field) {
          field.value = formData[name] || "";
        }
      });
    } catch (error) {
      console.error("Error loading form draft:", error);
    }
  }

  bindEvents() {
    // Clear draft on successful submission
    this.form.addEventListener("form:success", () => {
      localStorage.removeItem("naawuni_form_draft");
    });
  }

  validateForm() {
    let isValid = true;
    const fields = this.form.querySelectorAll("[required]");

    this.clearAllErrors();

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
        this.showFieldError(field, this.getFieldErrorMessage(field));
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();

    // Required validation
    if (field.required && !value) {
      return false;
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return false;
      }
    }

    // Length validation for message
    if (field.name === "message" && value.length > 500) {
      return false;
    }

    return true;
  }

  validateEmail(field) {
    const value = field.value.trim();
    if (!value) return true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);

    if (!isValid) {
      this.showFieldError(field, "Please enter a valid email address");
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  }

  formatPhoneNumber(field) {
    let value = field.value.replace(/\D/g, "");

    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    // Format for Ghanaian numbers
    if (value.length >= 3) {
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    }

    field.value = value;
  }

  getFieldErrorMessage(field) {
    const value = field.value.trim();

    if (field.required && !value) {
      return "This field is required";
    }

    if (field.type === "email" && value) {
      return "Please enter a valid email address";
    }

    if ((field.type === "tel" || field.name === "phone") && value) {
      return "Please enter a valid phone number";
    }

    if (field.minLength && value.length < parseInt(field.minLength)) {
      return `Minimum ${field.minLength} characters required`;
    }

    return "Please check this field";
  }

  showFieldError(field, message) {
    this.clearFieldError(field);

    field.classList.add("error");

    const errorElement = document.createElement("div");
    errorElement.className = "form-error";
    errorElement.textContent = message;
    errorElement.style.cssText = `
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `;

    const icon = document.createElement("i");
    icon.className = "fas fa-exclamation-circle";
    errorElement.prepend(icon);

    field.parentNode.appendChild(errorElement);

    // Scroll to error if needed
    const rect = field.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      field.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // ARIA
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", `error-${field.name}`);
    errorElement.id = `error-${field.name}`;
  }

  clearFieldError(field) {
    field.classList.remove("error");
    field.removeAttribute("aria-invalid");

    const errorId = `error-${field.name}`;
    field.removeAttribute("aria-describedby");

    const errorElement = field.parentNode.querySelector(".form-error");
    if (errorElement) {
      errorElement.remove();
    }
  }

  clearAllErrors() {
    const fields = this.form.querySelectorAll("input, textarea");
    fields.forEach((field) => this.clearFieldError(field));
  }

  async submitForm() {
    this.isSubmitting = true;

    const submitButton = this.form.querySelector(".submit-button");
    const buttonText = submitButton.innerHTML;
    const loadingIndicator = submitButton.querySelector(".button-loading");

    // Show loading state
    submitButton.disabled = true;
    if (loadingIndicator) {
      loadingIndicator.style.display = "block";
    }

    // Prepare form data
    const formData = new FormData(this.form);

    try {
      const response = await fetch(this.form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        this.showSuccessMessage();
        this.form.reset();
        this.form.dispatchEvent(new Event("form:success"));
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      this.showErrorMessage("Failed to send message. Please try again.");
    } finally {
      // Reset button state
      this.isSubmitting = false;
      submitButton.disabled = false;
      if (loadingIndicator) {
        loadingIndicator.style.display = "none";
      }
    }
  }

  showSuccessMessage() {
    this.showMessage(
      "Success! Your message has been sent. We'll get back to you soon.",
      "success",
      "fas fa-check-circle",
    );
  }

  showErrorMessage(message) {
    this.showMessage(message, "error", "fas fa-exclamation-circle");
  }

  showMessage(text, type, iconClass) {
    // Remove existing messages
    const existing = this.form.querySelector(".form-message");
    if (existing) existing.remove();

    // Create message element
    const message = document.createElement("div");
    message.className = `form-message ${type}`;
    message.innerHTML = `
      <i class="${iconClass}"></i>
      <div>
        <strong>${type === "success" ? "Success!" : "Error!"}</strong>
        <p>${text}</p>
      </div>
    `;

    message.style.cssText = `
      padding: 1rem;
      border-radius: var(--radius-md);
      background: ${type === "success" ? "rgba(46, 204, 113, 0.1)" : "rgba(231, 76, 60, 0.1)"};
      border: 1px solid ${type === "success" ? "#2ecc71" : "#e74c3c"};
      color: ${type === "success" ? "#27ae60" : "#c0392b"};
      margin-bottom: 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    `;

    this.form.prepend(message);

    // Scroll to message
    message.scrollIntoView({ behavior: "smooth", block: "center" });

    // Auto-remove success message
    if (type === "success") {
      setTimeout(() => {
        message.style.opacity = "0";
        message.style.transition = "opacity 0.3s ease";
        setTimeout(() => message.remove(), 300);
      }, 5000);
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize form when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = new EnhancedForm("contactForm");
});

// Make class available globally
window.EnhancedForm = EnhancedForm;
