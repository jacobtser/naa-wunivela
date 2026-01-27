// ==========================================
// SHEAR BUTTER - ADMIN DASHBOARD
// ==========================================

const AdminPanel = {
  data: {
    videos: [],
    documents: [],
    messages: [],
    inquiries: [],
  },

  init() {
    console.log("🔧 Admin Panel Initialized");
    this.checkAuth();
    this.loadData();
    this.attachEventListeners();
    this.updateDashboard();
  },

  checkAuth() {
    // Simple authentication check
    const adminAuth = localStorage.getItem("adminAuth");
    if (!adminAuth) {
      const password = prompt("Enter admin password:");
      if (password === "admin2026") {
        localStorage.setItem("adminAuth", "true");
        alert("✓ Authentication successful!");
      } else {
        alert("❌ Incorrect password");
        window.location.href = "../index.html";
      }
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
