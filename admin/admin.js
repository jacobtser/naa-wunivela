// ==========================================
// SHEAR BUTTER - ADMIN DASHBOARD
// ==========================================

const AdminPanel = {
  data: {
    videos: [],
    documents: [],
    messages: [],
    inquiries: [],
    orders: [],
  },

  init() {
    console.log("🔧 Admin Panel Initialized");
    this.checkAuth();
    this.loadData();
    this.attachEventListeners();
    this.updateDashboard();
  },

  checkAuth() {
    // Require a prior triple-click unlock (set in sessionStorage)
    try {
      const unlocked = sessionStorage.getItem("admin_unlocked");
      if (!unlocked) {
        alert("Unauthorized access. Perform the site unlock action first.");
        window.location.href = "../index.html";
        return;
      }
    } catch (err) {
      // If sessionStorage unavailable, treat as unauthorized
      console.warn("sessionStorage unavailable", err);
      window.location.href = "../index.html";
      return;
    }
    // Simple authentication check (collect password and store temporarily)
    const adminAuth = localStorage.getItem("adminAuth");
    if (!adminAuth) {
      const password = prompt("Enter admin password:");
      if (!password) {
        alert("❌ Password required");
        window.location.href = "../index.html";
        return;
      }
      // Store a flag locally and keep the raw password only in sessionStorage for API calls
      localStorage.setItem("adminAuth", "true");
      try {
        sessionStorage.setItem("admin_password_for_api", password);
        sessionStorage.removeItem("admin_unlocked");
      } catch (e) {}
      alert("✓ Authentication stored for this session");
    }
  },

  loadData() {
    // Load data from localStorage
    const savedData = localStorage.getItem("shearButterAdminData");
    if (savedData) {
      this.data = JSON.parse(savedData);
    }
  },

  saveData() {
    localStorage.setItem("shearButterAdminData", JSON.stringify(this.data));
  },

  attachEventListeners() {
    // Navigation links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document
          .querySelectorAll(".nav-link")
          .forEach((l) => l.classList.remove("active"));
        e.currentTarget.classList.add("active");
      });
    });

    // File upload drag and drop
    const fileUpload = document.querySelector(".file-upload");
    if (fileUpload) {
      fileUpload.addEventListener("click", () => {
        document.getElementById("fileInput").click();
      });

      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        fileUpload.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (eventName === "drop") {
            const files = e.dataTransfer.files;
            document.getElementById("fileInput").files = files;
          }
        });
      });
    }
  },

  updateDashboard() {
    document.getElementById("videoCount").textContent = this.data.videos.length;
    document.getElementById("docCount").textContent =
      this.data.documents.length;
    document.getElementById("messageCount").textContent =
      this.data.inquiries.length;
  },
};

// ==========================================
// VIDEO MANAGEMENT
// ==========================================

function addVideo(event) {
  event.preventDefault();

  const title = document.getElementById("videoTitle").value;
  const url = document.getElementById("videoUrl").value;
  const desc = document.getElementById("videoDesc").value;

  if (!title || !url) {
    showAlert("videoAlert", "Please fill all required fields", "error");
    return;
  }

  // Validate YouTube URL
  if (!url.includes("youtube.com/embed/") && !url.includes("youtu.be")) {
    showAlert("videoAlert", "Please enter a valid YouTube embed URL", "error");
    return;
  }

  const video = {
    id: Date.now(),
    title,
    url,
    desc,
    dateAdded: new Date().toLocaleDateString(),
  };

  AdminPanel.data.videos.push(video);
  AdminPanel.saveData();
  AdminPanel.updateDashboard();

  showAlert("videoAlert", "✓ Video uploaded successfully!", "success");
  event.target.reset();

  updateVideosList();
}

function updateVideosList() {
  const tbody = document.getElementById("videosList");

  if (AdminPanel.data.videos.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align: center; color: #999;">No videos uploaded yet</td></tr>';
    return;
  }

  tbody.innerHTML = AdminPanel.data.videos
    .map(
      (video) => `
        <tr>
            <td>${video.title}</td>
            <td><small>${video.url.substring(0, 40)}...</small></td>
            <td>${video.dateAdded}</td>
            <td>
                <button class="action-btn" onclick="editVideo(${video.id})">Edit</button>
                <button class="action-btn delete" onclick="deleteVideo(${video.id})">Delete</button>
            </td>
        </tr>
    `,
    )
    .join("");
}

function deleteVideo(id) {
  if (confirm("Are you sure you want to delete this video?")) {
    AdminPanel.data.videos = AdminPanel.data.videos.filter((v) => v.id !== id);
    AdminPanel.saveData();
    AdminPanel.updateDashboard();
    updateVideosList();
    showAlert("videoAlert", "✓ Video deleted successfully!", "success");
  }
}

function editVideo(id) {
  const video = AdminPanel.data.videos.find((v) => v.id === id);
  if (video) {
    document.getElementById("videoTitle").value = video.title;
    document.getElementById("videoUrl").value = video.url;
    document.getElementById("videoDesc").value = video.desc;
    deleteVideo(id);
  }
}

// ==========================================
// DOCUMENT MANAGEMENT
// ==========================================

function addDocument(event) {
  event.preventDefault();

  const name = document.getElementById("docName").value;
  const type = document.getElementById("docType").value;
  const file = document.getElementById("fileInput").files[0];

  if (!name || !file) {
    showAlert("docAlert", "Please fill all required fields", "error");
    return;
  }

  const doc = {
    id: Date.now(),
    name,
    type,
    fileName: file.name,
    fileSize: (file.size / 1024).toFixed(2) + " KB",
    dateAdded: new Date().toLocaleDateString(),
  };

  AdminPanel.data.documents.push(doc);
  AdminPanel.saveData();
  AdminPanel.updateDashboard();

  showAlert("docAlert", "✓ Document uploaded successfully!", "success");
  event.target.reset();

  updateDocsList();
}

function updateDocsList() {
  const tbody = document.getElementById("docsList");

  if (AdminPanel.data.documents.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align: center; color: #999;">No documents uploaded yet</td></tr>';
    return;
  }

  tbody.innerHTML = AdminPanel.data.documents
    .map(
      (doc) => `
        <tr>
            <td>${doc.name}</td>
            <td>${doc.type}</td>
            <td>${doc.dateAdded}</td>
            <td>
                <button class="action-btn" onclick="viewDocument(${doc.id})">View</button>
                <button class="action-btn delete" onclick="deleteDocument(${doc.id})">Delete</button>
            </td>
        </tr>
    `,
    )
    .join("");
}

function deleteDocument(id) {
  if (confirm("Are you sure you want to delete this document?")) {
    AdminPanel.data.documents = AdminPanel.data.documents.filter(
      (d) => d.id !== id,
    );
    AdminPanel.saveData();
    AdminPanel.updateDashboard();
    updateDocsList();
    showAlert("docAlert", "✓ Document deleted successfully!", "success");
  }
}

function viewDocument(id) {
  const doc = AdminPanel.data.documents.find((d) => d.id === id);
  if (doc) {
    alert(
      `Document: ${doc.name}\nType: ${doc.type}\nFile: ${doc.fileName}\nSize: ${doc.fileSize}`,
    );
  }
}

// ==========================================
// TEAM MESSAGES
// ==========================================

function sendTeamMessage(event) {
  event.preventDefault();

  const member = document.getElementById("teamMember").value;
  const subject = document.getElementById("msgSubject").value;
  const content = document.getElementById("msgContent").value;

  if (!member || !subject || !content) {
    showAlert("teamAlert", "Please fill all fields", "error");
    return;
  }

  const message = {
    id: Date.now(),
    to: member,
    subject,
    content,
    dateSent: new Date().toLocaleDateString(),
    status: "Sent",
  };

  AdminPanel.data.messages.push(message);
  AdminPanel.saveData();

  showAlert("teamAlert", "✓ Message sent successfully!", "success");
  event.target.reset();

  updateMessagesList();
}

function updateMessagesList() {
  const tbody = document.getElementById("messagesList");

  if (AdminPanel.data.messages.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align: center; color: #999;">No messages sent yet</td></tr>';
    return;
  }

  tbody.innerHTML = AdminPanel.data.messages
    .map(
      (msg) => `
        <tr>
            <td>${msg.to.split(" - ")[0]}</td>
            <td>${msg.subject}</td>
            <td>${msg.dateSent}</td>
            <td><span style="color: #4CAF50; font-weight: 600;">✓ ${msg.status}</span></td>
        </tr>
    `,
    )
    .join("");
}

// ==========================================
// SETTINGS
// ==========================================

function saveSettings(event) {
  event.preventDefault();

  const settings = {
    formspreeId: document.getElementById("formspreeId").value,
    siteEmail: document.getElementById("siteEmail").value,
    adminPassword: document.getElementById("adminPassword").value,
  };

  localStorage.setItem("shearButterSettings", JSON.stringify(settings));

  // Update the main site's Formspree form if ID is provided
  if (settings.formspreeId) {
    localStorage.setItem("formspreeId", settings.formspreeId);
  }

  showAlert("settingsAlert", "✓ Settings saved successfully!", "success");
}

function clearAllData() {
  if (
    confirm("⚠️ This will delete ALL data from the admin panel. Are you sure?")
  ) {
    if (
      confirm(
        'This action cannot be undone. Type "DELETE" in the prompt to confirm.',
      )
    ) {
      const confirmation = prompt("Type DELETE to confirm:");
      if (confirmation === "DELETE") {
        localStorage.clear();
        AdminPanel.data = {
          videos: [],
          documents: [],
          messages: [],
          inquiries: [],
        };
        alert("✓ All data cleared!");
        location.reload();
      }
    }
  }
}

// ==========================================
// ORDER MANAGEMENT
// ==========================================

async function loadOrders() {
  const ordersTable = document.getElementById("ordersList");
  const ordersSection = document.getElementById("orders");

  if (!ordersTable) {
    console.error("Orders table not found");
    return;
  }

  // Show loading state
  ordersTable.innerHTML =
    '<tr><td colspan="7" style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i> Loading orders...</td></tr>';

  try {
    // Try to fetch from backend first
    const response = await fetch("backend/get_orders.php");
    const result = await response.json();

    if (result.success && result.orders && result.orders.length > 0) {
      displayOrders(result.orders);
      AdminPanel.data.orders = result.orders;
      AdminPanel.saveData();
    } else {
      displayOrders(AdminPanel.data.orders || []);
    }
  } catch (error) {
    console.error("Error loading orders:", error);
    // Fall back to cached data
    displayOrders(AdminPanel.data.orders || []);
  }
}

function displayOrders(orders) {
  const tbody = document.getElementById("ordersList");

  if (!tbody) {
    console.error("Orders table body not found");
    return;
  }

  if (orders.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="7" style="text-align: center; color: #999; padding: 20px;">No orders received yet</td></tr>';
    return;
  }

  tbody.innerHTML = orders
    .map((order, index) => {
      const items = Array.isArray(order.items)
        ? order.items
        : typeof order.items === "string"
          ? JSON.parse(order.items)
          : [];
      const itemsText = items
        .map((item) => {
          const productName = item.product?.name || item.name || "Unknown";
          const quantity = item.quantity || 0;
          return `${productName} (x${quantity})`;
        })
        .join(", ");

      return `
      <tr>
        <td>${order.order_id}</td>
        <td>${order.customer_name}</td>
        <td>${order.customer_email}</td>
        <td>${order.customer_phone}</td>
        <td>GHc ${parseFloat(order.total_amount).toFixed(2)}</td>
        <td><span class="status-badge status-${order.status || "pending"}">${(order.status || "pending").toUpperCase()}</span></td>
        <td>
          <button class="action-btn" onclick="viewOrderDetails('${index}')">View</button>
          <button class="action-btn" onclick="updateOrderStatus('${order.order_id}', 'processing')">Process</button>
          <button class="action-btn delete" onclick="deleteOrder('${order.order_id}')">Delete</button>
        </td>
      </tr>
    `;
    })
    .join("");
}

function viewOrderDetails(orderIndex) {
  const order = AdminPanel.data.orders[orderIndex];
  if (!order) return;

  const items = Array.isArray(order.items)
    ? order.items
    : typeof order.items === "string"
      ? JSON.parse(order.items)
      : [];
  const itemsHTML = items
    .map((item) => {
      const productName = item.product?.name || item.name || "Unknown";
      const quantity = item.quantity || 0;
      const price = item.product?.price || item.price || 0;
      const subtotal = item.subtotal || quantity * price;
      return `<li>${productName} (x${quantity}) - GHc ${subtotal.toFixed(2)}</li>`;
    })
    .join("");

  const details = `
    <strong>Order ID:</strong> ${order.order_id}<br>
    <strong>Customer:</strong> ${order.customer_name}<br>
    <strong>Email:</strong> ${order.customer_email}<br>
    <strong>Phone:</strong> ${order.customer_phone}<br>
    <strong>Location:</strong> ${order.customer_location}<br>
    <strong>Items:</strong>
    <ul>${itemsHTML}</ul>
    <strong>Total:</strong> GHc ${parseFloat(order.total_amount).toFixed(2)}<br>
    <strong>Status:</strong> ${order.status || "pending"}<br>
    <strong>Date:</strong> ${order.order_date}<br>
    ${order.special_instructions ? `<strong>Special Instructions:</strong> ${order.special_instructions}<br>` : ""}
  `;

  alert(details);
}

function updateOrderStatus(orderId, newStatus) {
  const orderIndex = AdminPanel.data.orders.findIndex(
    (o) => o.order_id === orderId,
  );
  if (orderIndex !== -1) {
    AdminPanel.data.orders[orderIndex].status = newStatus;
    AdminPanel.saveData();
    loadOrders();
    showAlert(
      "ordersAlert",
      `✓ Order ${orderId} updated to ${newStatus}!`,
      "success",
    );
  }
}

function deleteOrder(orderId) {
  if (
    confirm(
      "Are you sure you want to delete this order? This cannot be undone.",
    )
  ) {
    AdminPanel.data.orders = AdminPanel.data.orders.filter(
      (o) => o.order_id !== orderId,
    );
    AdminPanel.saveData();
    loadOrders();
    showAlert("ordersAlert", `✓ Order ${orderId} deleted!`, "success");
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show selected section
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.add("active");
  }

  // Update lists when switching sections
  if (sectionId === "videos") updateVideosList();
  if (sectionId === "documents") updateDocsList();
  if (sectionId === "team") updateMessagesList();
  if (sectionId === "orders") loadOrders();
}

function showAlert(elementId, message, type) {
  const alertDiv = document.getElementById(elementId);
  if (!alertDiv) return;

  const alert = document.createElement("div");
  alert.className = `alert ${type}`;
  alert.textContent = message;

  alertDiv.innerHTML = "";
  alertDiv.appendChild(alert);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    alert.style.opacity = "0";
    alert.style.transition = "opacity 0.3s ease-out";
    setTimeout(() => alert.remove(), 300);
  }, 5000);
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("adminAuth");
    window.location.href = "../index.html";
  }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  AdminPanel.init();
});

// Prevent unauthorized access via console
Object.defineProperty(window, "adminData", {
  get() {
    console.warn("⚠️ Access to admin data is restricted");
    return null;
  },
});

console.log("%c🔒 Admin Panel Protected", "color: #D4AF37; font-weight: bold;");
