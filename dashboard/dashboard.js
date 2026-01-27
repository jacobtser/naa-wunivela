// ==========================================
// MEDIFY DASHBOARD - JAVASCRIPT
// ==========================================

// Mock Data - Doctors
const doctorsData = [
    {
        id: 1,
        name: "dr. Anastasya Will",
        avatar: "assets/dashboard/images/doctors/doctor-1.png",
        department: "General Practitioners",
        phoneNumber: "+62 3213 3289 1303",
        email: "anastasya@mail.com",
        status: "active"
    },
    {
        id: 2,
        name: "dr. Anthony Martinez",
        avatar: "assets/dashboard/images/doctors/doctor-2.png",
        department: "Gynaecology",
        phoneNumber: "+62 3213 3289 1303",
        email: "anthony@mail.com",
        status: "active"
    },
    {
        id: 3,
        name: "dr. Larry Clark",
        avatar: "assets/dashboard/images/doctors/doctor-3.png",
        department: "Haematology",
        phoneNumber: "+62 3213 3289 1303",
        email: "larry@mail.com",
        status: "active"
    },
    {
        id: 4,
        name: "dr. Laura Martin",
        avatar: "assets/dashboard/images/doctors/doctor-4.png",
        department: "Cardiology",
        phoneNumber: "+62 3213 3289 1303",
        email: "laura@mail.com",
        status: "active"
    },
    {
        id: 5,
        name: "dr. Barbara Jackson",
        avatar: "assets/dashboard/images/doctors/doctor-5.png",
        department: "Cardiology",
        phoneNumber: "+62 3213 3289 1303",
        email: "barbara@mail.com",
        status: "active"
    },
    {
        id: 6,
        name: "dr. Betty Lau",
        avatar: "assets/dashboard/images/doctors/doctor-6.png",
        department: "Cardiology",
        phoneNumber: "+62 3213 3289 1303",
        email: "betty@mail.com",
        status: "active"
    },
    {
        id: 7,
        name: "dr. Deborah Miller",
        avatar: "assets/dashboard/images/doctors/doctor-7.png",
        department: "Haematology",
        phoneNumber: "+62 3213 3289 1303",
        email: "deborah@mail.com",
        status: "active"
    },
    {
        id: 8,
        name: "dr. Anthony Smith",
        avatar: "assets/dashboard/images/doctors/doctor-8.png",
        department: "General Practitioners",
        phoneNumber: "+62 3213 3289 1303",
        email: "anthony@mail.com",
        status: "active"
    },
    {
        id: 9,
        name: "dr. Laura Williams",
        avatar: "assets/dashboard/images/doctors/doctor-9.png",
        department: "General Surgery",
        phoneNumber: "+62 3213 3289 1303",
        email: "laura@mail.com",
        status: "active"
    },
    {
        id: 10,
        name: "dr. Gary Simmons",
        avatar: "assets/dashboard/images/doctors/doctor-10.png",
        department: "General Surgery",
        phoneNumber: "+62 3213 3289 1303",
        email: "gary@mail.com",
        status: "inactive"
    }
];

// Generate additional mock data to reach 256 entries
const generateMockDoctors = () => {
    const departments = ["General Practitioners", "Gynaecology", "Haematology", "Cardiology", "General Surgery"];
    const firstNames = ["John", "Sarah", "Michael", "Emily", "David", "Lisa", "Robert", "Maria", "James", "Anna"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
    
    const allDoctors = [...doctorsData];
    
    for (let i = 11; i <= 256; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const avatarIndex = ((i - 1) % 10) + 1;
        
        allDoctors.push({
            id: i,
            name: `dr. ${firstName} ${lastName}`,
            avatar: `assets/dashboard/images/doctors/doctor-${avatarIndex}.png`,
            department: departments[Math.floor(Math.random() * departments.length)],
            phoneNumber: "+62 3213 3289 1303",
            email: `${firstName.toLowerCase()}@mail.com`,
            status: Math.random() > 0.1 ? "active" : "inactive"
        });
    }
    
    return allDoctors;
};

// State Management
let state = {
    doctors: generateMockDoctors(),
    filteredDoctors: [],
    currentPage: 1,
    itemsPerPage: 15,
    searchQuery: "",
    sortColumn: null,
    sortDirection: "asc",
    viewMode: "list"
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    state.filteredDoctors = [...state.doctors];
    renderTable();
    renderPagination();
    attachEventListeners();
}

// Event Listeners
function attachEventListeners() {
    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Entries per page
    document.getElementById('entriesPerPage').addEventListener('change', handleEntriesChange);
    
    // Pagination
    document.getElementById('prevPage').addEventListener('click', () => changePage(state.currentPage - 1));
    document.getElementById('nextPage').addEventListener('click', () => changePage(state.currentPage + 1));
    
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => handleViewToggle(e.target.closest('.view-btn')));
    });
    
    // Sort headers
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', (e) => handleSort(e.currentTarget.dataset.sort));
    });
    
    // New Doctor button
    document.getElementById('newDoctorBtn').addEventListener('click', () => {
        alert('New Doctor form would open here');
    });
}

// Search Handler
function handleSearch(e) {
    state.searchQuery = e.target.value.toLowerCase();
    state.filteredDoctors = state.doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(state.searchQuery) ||
        doctor.department.toLowerCase().includes(state.searchQuery) ||
        doctor.email.toLowerCase().includes(state.searchQuery)
    );
    state.currentPage = 1;
    renderTable();
    renderPagination();
}

// Sort Handler
function handleSort(column) {
    if (state.sortColumn === column) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortColumn = column;
        state.sortDirection = 'asc';
    }
    
    state.filteredDoctors.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (state.sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    renderTable();
}

// View Toggle Handler
function handleViewToggle(btn) {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.viewMode = btn.dataset.view;
    
    if (state.viewMode === 'grid') {
        alert('Grid view is not yet implemented. Staying in list view.');
    }
}

// Entries Change Handler
function handleEntriesChange(e) {
    state.itemsPerPage = parseInt(e.target.value);
    state.currentPage = 1;
    renderTable();
    renderPagination();
}

// Change Page
function changePage(page) {
    const totalPages = Math.ceil(state.filteredDoctors.length / state.itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    state.currentPage = page;
    renderTable();
    renderPagination();
}

// Render Table
function renderTable() {
    const tbody = document.getElementById('doctorsTableBody');
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    const pageData = state.filteredDoctors.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageData.map(doctor => `
        <tr>
            <td class="col-checkbox">
                <img src="assets/dashboard/icons/checkbox-unchecked.svg" alt="Select" class="checkbox">
            </td>
            <td class="col-name">
                <div class="doctor-profile">
                    <img src="${doctor.avatar}" alt="${doctor.name}" class="doctor-avatar">
                    <span>${doctor.name}</span>
                </div>
            </td>
            <td class="col-department">${doctor.department}</td>
            <td class="col-phone">${doctor.phoneNumber}</td>
            <td class="col-email">${doctor.email}</td>
            <td class="col-status">
                <span class="status-badge status-${doctor.status}">${doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}</span>
            </td>
            <td class="col-action">
                <div class="action-buttons">
                    <button class="action-btn" onclick="editDoctor(${doctor.id})" title="Edit">
                        <img src="assets/dashboard/icons/edit.svg" alt="Edit">
                    </button>
                    <button class="action-btn" onclick="deleteDoctor(${doctor.id})" title="Delete">
                        <img src="assets/dashboard/icons/delete.svg" alt="Delete">
                    </button>
                    <button class="action-btn" onclick="viewDoctor(${doctor.id})" title="View Details">
                        <img src="assets/dashboard/icons/info.svg" alt="Info">
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Update entries info
    const start = state.filteredDoctors.length === 0 ? 0 : startIndex + 1;
    const end = Math.min(endIndex, state.filteredDoctors.length);
    document.getElementById('startEntry').textContent = start;
    document.getElementById('endEntry').textContent = end;
    document.getElementById('totalEntries').textContent = state.filteredDoctors.length;
}

// Render Pagination
function renderPagination() {
    const totalPages = Math.ceil(state.filteredDoctors.length / state.itemsPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    
    let pages = [];
    
    if (totalPages <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Show first, last, current, and nearby pages with ellipsis
        if (state.currentPage <= 3) {
            pages = [1, 2, 3, '...', totalPages];
        } else if (state.currentPage >= totalPages - 2) {
            pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
        } else {
            pages = [1, '...', state.currentPage, '...', totalPages];
        }
    }
    
    pageNumbers.innerHTML = pages.map(page => {
        if (page === '...') {
            return '<span class="page-ellipsis">...</span>';
        }
        return `<button class="page-number ${page === state.currentPage ? 'active' : ''}" onclick="changePage(${page})">${page}</button>`;
    }).join('');
    
    // Update prev/next buttons
    document.getElementById('prevPage').disabled = state.currentPage === 1;
    document.getElementById('nextPage').disabled = state.currentPage === totalPages;
}

// Action Handlers
function editDoctor(id) {
    const doctor = state.doctors.find(d => d.id === id);
    alert(`Edit doctor: ${doctor.name}\n\nThis would open an edit form.`);
}

function deleteDoctor(id) {
    const doctor = state.doctors.find(d => d.id === id);
    if (confirm(`Are you sure you want to delete ${doctor.name}?`)) {
        state.doctors = state.doctors.filter(d => d.id !== id);
        state.filteredDoctors = state.filteredDoctors.filter(d => d.id !== id);
        
        // Adjust current page if needed
        const totalPages = Math.ceil(state.filteredDoctors.length / state.itemsPerPage);
        if (state.currentPage > totalPages && totalPages > 0) {
            state.currentPage = totalPages;
        }
        
        renderTable();
        renderPagination();
    }
}

function viewDoctor(id) {
    const doctor = state.doctors.find(d => d.id === id);
    alert(`View doctor details: ${doctor.name}\n\nDepartment: ${doctor.department}\nEmail: ${doctor.email}\nPhone: ${doctor.phoneNumber}\nStatus: ${doctor.status}`);
}
