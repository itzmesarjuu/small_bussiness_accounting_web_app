/* ============================================
   LedgerLite - App Logic & Data
   ============================================ */

// ===== SAMPLE DATA =====
const sampleClients = [
    { id: 1, name: 'TechNova Solutions', email: 'billing@technova.io', phone: '+1 (555) 234-5678', color: '#6C5CE7', totalRevenue: 12500, invoiceCount: 5 },
    { id: 2, name: 'GreenLeaf Marketing', email: 'accounts@greenleaf.co', phone: '+1 (555) 345-6789', color: '#00B894', totalRevenue: 8750, invoiceCount: 3 },
    { id: 3, name: 'BlueStar Logistics', email: 'finance@bluestar.com', phone: '+1 (555) 456-7890', color: '#0984E3', totalRevenue: 15200, invoiceCount: 7 },
    { id: 4, name: 'Crimson Studios', email: 'hello@crimsonstudios.art', phone: '+1 (555) 567-8901', color: '#E17055', totalRevenue: 6300, invoiceCount: 2 },
    { id: 5, name: 'Apex Consulting', email: 'info@apexconsult.biz', phone: '+1 (555) 678-9012', color: '#FDCB6E', totalRevenue: 9800, invoiceCount: 4 },
    { id: 6, name: 'Velvet Digital', email: 'team@velvetdigital.co', phone: '+1 (555) 789-0123', color: '#A29BFE', totalRevenue: 4500, invoiceCount: 2 },
];

const sampleInvoices = [
    { id: 'INV-001', clientId: 1, client: 'TechNova Solutions', amount: 3500, date: '2026-03-01', dueDate: '2026-03-31', status: 'paid' },
    { id: 'INV-002', clientId: 2, client: 'GreenLeaf Marketing', amount: 2750, date: '2026-03-03', dueDate: '2026-04-02', status: 'paid' },
    { id: 'INV-003', clientId: 3, client: 'BlueStar Logistics', amount: 4200, date: '2026-03-05', dueDate: '2026-04-04', status: 'pending' },
    { id: 'INV-004', clientId: 1, client: 'TechNova Solutions', amount: 1800, date: '2026-03-07', dueDate: '2026-04-06', status: 'pending' },
    { id: 'INV-005', clientId: 4, client: 'Crimson Studios', amount: 6300, date: '2026-02-20', dueDate: '2026-03-10', status: 'overdue' },
    { id: 'INV-006', clientId: 5, client: 'Apex Consulting', amount: 2400, date: '2026-03-10', dueDate: '2026-04-09', status: 'pending' },
    { id: 'INV-007', clientId: 3, client: 'BlueStar Logistics', amount: 5500, date: '2026-03-12', dueDate: '2026-04-11', status: 'draft' },
    { id: 'INV-008', clientId: 2, client: 'GreenLeaf Marketing', amount: 1250, date: '2026-03-14', dueDate: '2026-04-13', status: 'paid' },
    { id: 'INV-009', clientId: 6, client: 'Velvet Digital', amount: 4500, date: '2026-02-28', dueDate: '2026-03-15', status: 'overdue' },
    { id: 'INV-010', clientId: 5, client: 'Apex Consulting', amount: 3200, date: '2026-03-15', dueDate: '2026-04-14', status: 'pending' },
];

const sampleExpenses = [
    { id: 1, date: '2026-03-15', description: 'Adobe Creative Cloud Subscription', category: 'software', amount: 54.99, method: 'Credit Card' },
    { id: 2, date: '2026-03-14', description: 'Office Printer Paper & Toner', category: 'office', amount: 128.50, method: 'Debit Card' },
    { id: 3, date: '2026-03-13', description: 'Client Lunch Meeting – BlueStar', category: 'travel', amount: 86.25, method: 'Credit Card' },
    { id: 4, date: '2026-03-12', description: 'Monthly Electric Bill', category: 'utilities', amount: 245.00, method: 'Bank Transfer' },
    { id: 5, date: '2026-03-11', description: 'Google Workspace Business', category: 'software', amount: 72.00, method: 'Credit Card' },
    { id: 6, date: '2026-03-10', description: 'Facebook Ads Campaign', category: 'marketing', amount: 350.00, method: 'Credit Card' },
    { id: 7, date: '2026-03-09', description: 'Office Desk Lamp & Accessories', category: 'office', amount: 67.99, method: 'Debit Card' },
    { id: 8, date: '2026-03-08', description: 'Web Hosting Renewal – Annual', category: 'software', amount: 199.00, method: 'Credit Card' },
    { id: 9, date: '2026-03-07', description: 'Uber Rides to Client Meetings', category: 'travel', amount: 45.60, method: 'Credit Card' },
    { id: 10, date: '2026-03-06', description: 'Employee Salary – March Part', category: 'payroll', amount: 4500.00, method: 'Bank Transfer' },
    { id: 11, date: '2026-03-05', description: 'Internet Service – Monthly', category: 'utilities', amount: 89.99, method: 'Bank Transfer' },
    { id: 12, date: '2026-03-04', description: 'LinkedIn Premium Business', category: 'marketing', amount: 59.99, method: 'Credit Card' },
    { id: 13, date: '2026-03-03', description: 'Water & Sewage Bill', category: 'utilities', amount: 42.00, method: 'Bank Transfer' },
    { id: 14, date: '2026-03-02', description: 'Shipping Supplies', category: 'office', amount: 33.50, method: 'Debit Card' },
    { id: 15, date: '2026-03-01', description: 'Slack Pro Plan', category: 'software', amount: 12.50, method: 'Credit Card' },
];

const activityData = [
    { type: 'payment', icon: 'fas fa-check-circle', text: '<strong>TechNova Solutions</strong> paid invoice INV-001 (₹3,500)', time: '2 hours ago' },
    { type: 'invoice', icon: 'fas fa-file-invoice', text: 'New invoice <strong>INV-010</strong> created for Apex Consulting', time: '5 hours ago' },
    { type: 'expense', icon: 'fas fa-receipt', text: 'Expense recorded: <strong>Adobe Creative Cloud</strong> (₹54.99)', time: '8 hours ago' },
    { type: 'client', icon: 'fas fa-user-plus', text: 'New client <strong>Velvet Digital</strong> added', time: '1 day ago' },
    { type: 'payment', icon: 'fas fa-check-circle', text: '<strong>GreenLeaf Marketing</strong> paid invoice INV-008 (₹1,250)', time: '1 day ago' },
    { type: 'invoice', icon: 'fas fa-file-invoice', text: 'Invoice <strong>INV-005</strong> is now overdue', time: '2 days ago' },
];

// ===== APP STATE =====
let state = {
    invoices: [...sampleInvoices],
    expenses: [...sampleExpenses],
    clients: [...sampleClients],
    currentPage: 'dashboard',
    nextInvoiceNum: 11,
    nextExpenseId: 16,
    nextClientId: 7,
};

// ===== UTILITY FUNCTIONS =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getCategoryLabel(cat) {
    const labels = {
        office: 'Office Supplies', travel: 'Travel', utilities: 'Utilities',
        software: 'Software', marketing: 'Marketing', payroll: 'Payroll', other: 'Other'
    };
    return labels[cat] || cat;
}

function getCategoryIcon(cat) {
    const icons = {
        office: 'fas fa-box', travel: 'fas fa-plane', utilities: 'fas fa-bolt',
        software: 'fas fa-laptop-code', marketing: 'fas fa-bullhorn', payroll: 'fas fa-wallet', other: 'fas fa-ellipsis'
    };
    return icons[cat] || 'fas fa-ellipsis';
}

function animateValue(el, start, end, duration = 800) {
    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * eased);
        el.textContent = formatCurrency(current);
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', info: 'fas fa-info-circle', warning: 'fas fa-exclamation-triangle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="toast-icon ${icons[type]}"></i><span class="toast-message">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== NAVIGATION =====
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const pageEl = document.getElementById(`page-${page}`);
    const navEl = document.querySelector(`.nav-item[data-page="${page}"]`);

    if (pageEl) pageEl.classList.add('active');
    if (navEl) navEl.classList.add('active');

    state.currentPage = page;

    // Refresh page data
    if (page === 'dashboard') renderDashboard();
    if (page === 'invoices') renderInvoices();
    if (page === 'expenses') renderExpenses();
    if (page === 'clients') renderClients();
    if (page === 'reports') renderReports();

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('mobile-open');
}

// ===== MODAL =====
function openModal(title, bodyHTML, footerHTML = '') {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHTML;
    document.getElementById('modalFooter').innerHTML = footerHTML;
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// ===== DASHBOARD =====
let revenueChartInstance = null;
let expenseDonutInstance = null;

function renderDashboard() {
    // KPIs
    const totalRevenue = state.invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
    const totalExpenses = state.expenses.reduce((s, e) => s + e.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const outstanding = state.invoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((s, i) => s + i.amount, 0);

    animateValue(document.getElementById('kpiRevenue'), 0, totalRevenue);
    animateValue(document.getElementById('kpiExpenses'), 0, totalExpenses);
    animateValue(document.getElementById('kpiProfit'), 0, netProfit);
    animateValue(document.getElementById('kpiOutstanding'), 0, outstanding);

    // Revenue vs Expenses Chart
    renderRevenueChart();
    renderExpenseDonut();
    renderRecentInvoices();
    renderActivityFeed();
}

function renderRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    if (revenueChartInstance) revenueChartInstance.destroy();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const revData = [8200, 9100, 7500, 11200, 10800, 12500];
    const expData = [4500, 5200, 4800, 6100, 5900, 5800];

    revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Revenue',
                    data: revData,
                    borderColor: '#00B894',
                    backgroundColor: 'rgba(0, 184, 148, 0.08)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2.5,
                    pointBackgroundColor: '#00B894',
                    pointBorderColor: '#00B894',
                    pointRadius: 4,
                    pointHoverRadius: 7,
                },
                {
                    label: 'Expenses',
                    data: expData,
                    borderColor: '#E17055',
                    backgroundColor: 'rgba(225, 112, 85, 0.05)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2.5,
                    pointBackgroundColor: '#E17055',
                    pointBorderColor: '#E17055',
                    pointRadius: 4,
                    pointHoverRadius: 7,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { intersect: false, mode: 'index' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(17, 19, 39, 0.95)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderWidth: 1,
                    titleColor: '#F0F0F5',
                    bodyColor: '#8B8DA3',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(c) { return `${c.dataset.label}: ${formatCurrency(c.raw)}`; }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: { color: '#5A5C72', font: { size: 11 } },
                    border: { display: false }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: {
                        color: '#5A5C72',
                        font: { size: 11 },
                        callback: v => `₹${v / 1000}k`
                    },
                    border: { display: false }
                }
            }
        }
    });
}

function renderExpenseDonut() {
    const ctx = document.getElementById('expenseDonut');
    if (!ctx) return;

    if (expenseDonutInstance) expenseDonutInstance.destroy();

    // Aggregate expenses by category
    const catTotals = {};
    state.expenses.forEach(e => {
        catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
    });

    const categories = Object.keys(catTotals);
    const values = Object.values(catTotals);
    const total = values.reduce((a, b) => a + b, 0);

    const colors = {
        software: '#6C5CE7', office: '#0984E3', travel: '#E17055',
        utilities: '#FDCB6E', marketing: '#00B894', payroll: '#A29BFE', other: '#636E72'
    };

    document.getElementById('donutCenter').querySelector('.donut-total').textContent = formatCurrency(total);

    // Legend
    const legendEl = document.getElementById('expenseLegend');
    legendEl.innerHTML = categories.map(cat => `
        <div class="expense-legend-item">
            <span class="expense-legend-dot" style="background:${colors[cat] || '#636E72'}"></span>
            <span>${getCategoryLabel(cat)} (${formatCurrency(catTotals[cat])})</span>
        </div>
    `).join('');

    expenseDonutInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories.map(getCategoryLabel),
            datasets: [{
                data: values,
                backgroundColor: categories.map(c => colors[c] || '#636E72'),
                borderWidth: 0,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(17, 19, 39, 0.95)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderWidth: 1,
                    titleColor: '#F0F0F5',
                    bodyColor: '#8B8DA3',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(c) {
                            const pct = ((c.raw / total) * 100).toFixed(1);
                            return `${c.label}: ${formatCurrency(c.raw)} (${pct}%)`;
                        }
                    }
                }
            }
        }
    });
}

function renderRecentInvoices() {
    const tbody = document.getElementById('recentInvoicesBody');
    const recent = [...state.invoices].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    tbody.innerHTML = recent.map(inv => `
        <tr>
            <td><strong>${inv.id}</strong></td>
            <td>${inv.client}</td>
            <td>${formatCurrency(inv.amount)}</td>
            <td><span class="status-badge status-${inv.status}"><span class="status-dot"></span>${inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}</span></td>
            <td>${formatDate(inv.date)}</td>
        </tr>
    `).join('');
}

function renderActivityFeed() {
    const feed = document.getElementById('activityFeed');
    feed.innerHTML = activityData.map(item => `
        <div class="activity-item">
            <div class="activity-icon ${item.type}"><i class="${item.icon}"></i></div>
            <div>
                <div class="activity-text">${item.text}</div>
                <div class="activity-time">${item.time}</div>
            </div>
        </div>
    `).join('');
}

// ===== INVOICES =====
function renderInvoices() {
    const statusFilter = document.getElementById('invoiceStatusFilter').value;
    const searchQuery = document.getElementById('invoiceSearch').value.toLowerCase();

    let filtered = [...state.invoices];
    if (statusFilter !== 'all') filtered = filtered.filter(i => i.status === statusFilter);
    if (searchQuery) filtered = filtered.filter(i =>
        i.id.toLowerCase().includes(searchQuery) || i.client.toLowerCase().includes(searchQuery)
    );

    // Stats
    document.getElementById('invoiceTotalCount').textContent = state.invoices.length;
    document.getElementById('invoicePaidCount').textContent = state.invoices.filter(i => i.status === 'paid').length;
    document.getElementById('invoicePendingCount').textContent = state.invoices.filter(i => i.status === 'pending').length;
    document.getElementById('invoiceOverdueCount').textContent = state.invoices.filter(i => i.status === 'overdue').length;

    const tbody = document.getElementById('invoicesBody');
    tbody.innerHTML = filtered.map(inv => `
        <tr>
            <td><strong>${inv.id}</strong></td>
            <td>${inv.client}</td>
            <td>${formatCurrency(inv.amount)}</td>
            <td>${formatDate(inv.date)}</td>
            <td>${formatDate(inv.dueDate)}</td>
            <td><span class="status-badge status-${inv.status}"><span class="status-dot"></span>${inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" title="View" onclick="viewInvoice('${inv.id}')"><i class="fas fa-eye"></i></button>
                    <button class="action-btn" title="Edit" onclick="editInvoice('${inv.id}')"><i class="fas fa-pen"></i></button>
                    <button class="action-btn delete" title="Delete" onclick="deleteInvoice('${inv.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function showCreateInvoiceModal() {
    const clientOptions = state.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    const body = `
        <div class="form-group">
            <label for="invoiceClient">Client</label>
            <select id="invoiceClient" class="filter-select">${clientOptions}</select>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="invoiceAmount">Amount (₹)</label>
                <input type="number" id="invoiceAmount" placeholder="0.00" step="0.01" min="0">
            </div>
            <div class="form-group">
                <label for="invoiceStatus">Status</label>
                <select id="invoiceStatus" class="filter-select">
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="invoiceDate">Invoice Date</label>
                <input type="date" id="invoiceDate" value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
                <label for="invoiceDueDate">Due Date</label>
                <input type="date" id="invoiceDueDate">
            </div>
        </div>
    `;
    const footer = `
        <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="createInvoice()">Create Invoice</button>
    `;
    openModal('Create New Invoice', body, footer);

    // Set default due date (30 days from now)
    const due = new Date();
    due.setDate(due.getDate() + 30);
    document.getElementById('invoiceDueDate').value = due.toISOString().split('T')[0];
}

function createInvoice() {
    const clientId = parseInt(document.getElementById('invoiceClient').value);
    const client = state.clients.find(c => c.id === clientId);
    const amount = parseFloat(document.getElementById('invoiceAmount').value);
    const status = document.getElementById('invoiceStatus').value;
    const date = document.getElementById('invoiceDate').value;
    const dueDate = document.getElementById('invoiceDueDate').value;

    if (!amount || amount <= 0) { showToast('Please enter a valid amount', 'error'); return; }

    const inv = {
        id: `INV-${String(state.nextInvoiceNum).padStart(3, '0')}`,
        clientId, client: client.name, amount, date, dueDate, status
    };

    state.invoices.unshift(inv);
    state.nextInvoiceNum++;
    closeModal();
    renderInvoices();
    showToast(`Invoice ${inv.id} created successfully!`);

    // Persist to Supabase
    dbAddInvoice(inv);
}

function viewInvoice(id) {
    const inv = state.invoices.find(i => i.id === id);
    if (!inv) return;
    const body = `
        <div style="display:grid; gap:16px;">
            <div class="form-row">
                <div class="form-group"><label>Invoice #</label><div style="font-size:1.1rem;font-weight:700">${inv.id}</div></div>
                <div class="form-group"><label>Status</label><span class="status-badge status-${inv.status}"><span class="status-dot"></span>${inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}</span></div>
            </div>
            <div class="form-group"><label>Client</label><div>${inv.client}</div></div>
            <div class="form-row">
                <div class="form-group"><label>Amount</label><div style="font-size:1.25rem;font-weight:700;color:var(--success)">${formatCurrency(inv.amount)}</div></div>
                <div class="form-group"><label>Invoice Date</label><div>${formatDate(inv.date)}</div></div>
            </div>
            <div class="form-group"><label>Due Date</label><div>${formatDate(inv.dueDate)}</div></div>
        </div>
    `;
    openModal(`Invoice ${inv.id}`, body, `<button class="btn btn-outline" onclick="closeModal()">Close</button>`);
}

function editInvoice(id) {
    const inv = state.invoices.find(i => i.id === id);
    if (!inv) return;
    const clientOptions = state.clients.map(c => `<option value="${c.id}" ${c.id === inv.clientId ? 'selected' : ''}>${c.name}</option>`).join('');
    const body = `
        <input type="hidden" id="editInvoiceId" value="${inv.id}">
        <div class="form-group">
            <label for="editInvClient">Client</label>
            <select id="editInvClient" class="filter-select">${clientOptions}</select>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="editInvAmount">Amount (₹)</label>
                <input type="number" id="editInvAmount" value="${inv.amount}" step="0.01" min="0">
            </div>
            <div class="form-group">
                <label for="editInvStatus">Status</label>
                <select id="editInvStatus" class="filter-select">
                    <option value="draft" ${inv.status === 'draft' ? 'selected' : ''}>Draft</option>
                    <option value="pending" ${inv.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="paid" ${inv.status === 'paid' ? 'selected' : ''}>Paid</option>
                    <option value="overdue" ${inv.status === 'overdue' ? 'selected' : ''}>Overdue</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="editInvDate">Invoice Date</label>
                <input type="date" id="editInvDate" value="${inv.date}">
            </div>
            <div class="form-group">
                <label for="editInvDueDate">Due Date</label>
                <input type="date" id="editInvDueDate" value="${inv.dueDate}">
            </div>
        </div>
    `;
    const footer = `
        <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveInvoiceEdit()">Save Changes</button>
    `;
    openModal('Edit Invoice', body, footer);
}

function saveInvoiceEdit() {
    const id = document.getElementById('editInvoiceId').value;
    const inv = state.invoices.find(i => i.id === id);
    if (!inv) return;

    const clientId = parseInt(document.getElementById('editInvClient').value);
    const client = state.clients.find(c => c.id === clientId);
    inv.clientId = clientId;
    inv.client = client.name;
    inv.amount = parseFloat(document.getElementById('editInvAmount').value);
    inv.status = document.getElementById('editInvStatus').value;
    inv.date = document.getElementById('editInvDate').value;
    inv.dueDate = document.getElementById('editInvDueDate').value;

    closeModal();
    renderInvoices();
    showToast(`Invoice ${id} updated successfully!`);

    // Persist to Supabase
    dbUpdateInvoice(id, {
        client_id: inv.clientId,
        client_name: inv.client,
        amount: inv.amount,
        status: inv.status,
        invoice_date: inv.date,
        due_date: inv.dueDate
    });
}

function deleteInvoice(id) {
    const footer = `
        <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn-danger" onclick="confirmDeleteInvoice('${id}')">Delete</button>
    `;
    openModal('Delete Invoice', `<p>Are you sure you want to delete invoice <strong>${id}</strong>? This action cannot be undone.</p>`, footer);
}

function confirmDeleteInvoice(id) {
    state.invoices = state.invoices.filter(i => i.id !== id);
    closeModal();
    renderInvoices();
    showToast(`Invoice ${id} deleted.`, 'info');

    // Persist to Supabase
    dbDeleteInvoice(id);
}

// ===== EXPENSES =====
function renderExpenses() {
    const catFilter = document.getElementById('expenseCategoryFilter').value;
    const searchQuery = document.getElementById('expenseSearch').value.toLowerCase();

    let filtered = [...state.expenses];
    if (catFilter !== 'all') filtered = filtered.filter(e => e.category === catFilter);
    if (searchQuery) filtered = filtered.filter(e => e.description.toLowerCase().includes(searchQuery));

    const totalMonth = state.expenses.reduce((s, e) => s + e.amount, 0);
    document.getElementById('expenseTotal').textContent = formatCurrency(totalMonth);
    document.getElementById('expenseAvg').textContent = formatCurrency(totalMonth / 31);
    document.getElementById('expenseCount').textContent = state.expenses.length;

    // Highest category
    const catTotals = {};
    state.expenses.forEach(e => { catTotals[e.category] = (catTotals[e.category] || 0) + e.amount; });
    const highestCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('expenseHighest').textContent = highestCat ? getCategoryLabel(highestCat[0]) : 'N/A';

    const tbody = document.getElementById('expensesBody');
    tbody.innerHTML = filtered.map(exp => `
        <tr>
            <td>${formatDate(exp.date)}</td>
            <td>${exp.description}</td>
            <td><span class="status-badge" style="background:rgba(255,255,255,0.05);color:var(--text-secondary)"><i class="${getCategoryIcon(exp.category)}" style="font-size:0.7rem;margin-right:4px"></i>${getCategoryLabel(exp.category)}</span></td>
            <td style="font-weight:600;color:var(--danger)">${formatCurrency(exp.amount)}</td>
            <td>${exp.method}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" title="Edit" onclick="editExpense(${exp.id})"><i class="fas fa-pen"></i></button>
                    <button class="action-btn delete" title="Delete" onclick="deleteExpense(${exp.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function showAddExpenseModal() {
    const body = `
        <div class="form-group">
            <label for="expenseDesc">Description</label>
            <input type="text" id="expenseDesc" placeholder="What was this expense for?">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="expenseAmt">Amount (₹)</label>
                <input type="number" id="expenseAmt" placeholder="0.00" step="0.01" min="0">
            </div>
            <div class="form-group">
                <label for="expenseCat">Category</label>
                <select id="expenseCat" class="filter-select">
                    <option value="office">Office Supplies</option>
                    <option value="travel">Travel</option>
                    <option value="utilities">Utilities</option>
                    <option value="software">Software</option>
                    <option value="marketing">Marketing</option>
                    <option value="payroll">Payroll</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="expenseDate">Date</label>
                <input type="date" id="expenseDate" value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
                <label for="expenseMethod">Payment Method</label>
                <select id="expenseMethod" class="filter-select">
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                </select>
            </div>
        </div>
    `;
    const footer = `
        <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="addExpense()">Add Expense</button>
    `;
    openModal('Add New Expense', body, footer);
}

function addExpense() {
    const desc = document.getElementById('expenseDesc').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmt').value);
    const category = document.getElementById('expenseCat').value;
    const date = document.getElementById('expenseDate').value;
    const method = document.getElementById('expenseMethod').value;

    if (!desc) { showToast('Please enter a description', 'error'); return; }
    if (!amount || amount <= 0) { showToast('Please enter a valid amount', 'error'); return; }

    const newExp = { id: state.nextExpenseId++, date, description: desc, category, amount, method };
    state.expenses.unshift(newExp);
    closeModal();
    renderExpenses();
    showToast('Expense added successfully!');

    // Persist to Supabase
    dbAddExpense(newExp);
}

function editExpense(id) {
    const exp = state.expenses.find(e => e.id === id);
    if (!exp) return;
    const body = `
        <input type="hidden" id="editExpId" value="${id}">
        <div class="form-group">
            <label for="editExpDesc">Description</label>
            <input type="text" id="editExpDesc" value="${exp.description}">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="editExpAmt">Amount (₹)</label>
                <input type="number" id="editExpAmt" value="${exp.amount}" step="0.01" min="0">
            </div>
            <div class="form-group">
                <label for="editExpCat">Category</label>
                <select id="editExpCat" class="filter-select">
                    ${['office','travel','utilities','software','marketing','payroll','other'].map(c => `<option value="${c}" ${exp.category === c ? 'selected' : ''}>${getCategoryLabel(c)}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="editExpDate">Date</label>
                <input type="date" id="editExpDate" value="${exp.date}">
            </div>
            <div class="form-group">
                <label for="editExpMethod">Payment Method</label>
                <select id="editExpMethod" class="filter-select">
                    ${['Credit Card','Debit Card','Bank Transfer','Cash'].map(m => `<option value="${m}" ${exp.method === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
            </div>
        </div>
    `;
    const footer = `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveExpenseEdit()">Save Changes</button>`;
    openModal('Edit Expense', body, footer);
}

function saveExpenseEdit() {
    const id = parseInt(document.getElementById('editExpId').value);
    const exp = state.expenses.find(e => e.id === id);
    if (!exp) return;
    exp.description = document.getElementById('editExpDesc').value.trim();
    exp.amount = parseFloat(document.getElementById('editExpAmt').value);
    exp.category = document.getElementById('editExpCat').value;
    exp.date = document.getElementById('editExpDate').value;
    exp.method = document.getElementById('editExpMethod').value;
    closeModal();
    renderExpenses();
    showToast('Expense updated successfully!');

    // Persist to Supabase
    dbUpdateExpense(id, {
        description: exp.description,
        amount: exp.amount,
        category: exp.category,
        expense_date: exp.date,
        payment_method: exp.method
    });
}

function deleteExpense(id) {
    const footer = `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-danger" onclick="confirmDeleteExpense(${id})">Delete</button>`;
    openModal('Delete Expense', '<p>Are you sure you want to delete this expense? This action cannot be undone.</p>', footer);
}

function confirmDeleteExpense(id) {
    state.expenses = state.expenses.filter(e => e.id !== id);
    closeModal();
    renderExpenses();
    showToast('Expense deleted.', 'info');

    // Persist to Supabase
    dbDeleteExpense(id);
}

// ===== CLIENTS =====
function renderClients() {
    const search = document.getElementById('clientSearch').value.toLowerCase();
    let filtered = [...state.clients];
    if (search) filtered = filtered.filter(c => c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search));

    const grid = document.getElementById('clientsGrid');

    // Add New Client card slot
    const addCard = `
        <div class="add-client-card" onclick="showAddClientModal()" id="addClientSlot">
            <div class="add-icon"><i class="fas fa-plus"></i></div>
            <span class="add-label">Add New Client</span>
            <span class="add-sublabel">Click to create a new client</span>
        </div>
    `;

    const clientCards = filtered.map(client => {
        const initials = client.name.split(' ').map(w => w[0]).join('').substring(0, 2);
        const invoiceCount = state.invoices.filter(i => i.clientId === client.id).length;
        const totalRev = state.invoices.filter(i => i.clientId === client.id && i.status === 'paid').reduce((s, i) => s + i.amount, 0);
        return `
            <div class="client-card">
                <div class="client-card-header">
                    <div class="client-avatar" style="background:${client.color}">${initials}</div>
                    <div>
                        <div class="client-name">${client.name}</div>
                        <div class="client-email">${client.email}</div>
                    </div>
                </div>
                <div class="client-stats">
                    <div class="client-stat">
                        <span class="client-stat-value">${formatCurrency(totalRev)}</span>
                        <span class="client-stat-label">Revenue</span>
                    </div>
                    <div class="client-stat">
                        <span class="client-stat-value">${invoiceCount}</span>
                        <span class="client-stat-label">Invoices</span>
                    </div>
                </div>
                <div class="client-card-actions">
                    <button class="btn btn-outline btn-sm" onclick="editClient(${client.id})"><i class="fas fa-pen"></i> Edit</button>
                    <button class="btn btn-outline btn-sm" onclick="deleteClient(${client.id})"><i class="fas fa-trash"></i> Delete</button>
                </div>
            </div>
        `;
    }).join('');

    grid.innerHTML = addCard + clientCards;
}

function showAddClientModal() {
    const body = `
        <div class="form-group">
            <label for="clientName">Client Name</label>
            <input type="text" id="clientName" placeholder="e.g., Acme Corp">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="clientEmail">Email</label>
                <input type="email" id="clientEmail" placeholder="email@company.com">
            </div>
            <div class="form-group">
                <label for="clientPhone">Phone</label>
                <input type="tel" id="clientPhone" placeholder="+1 (555) 000-0000">
            </div>
        </div>
    `;
    const footer = `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="addClient()">Add Client</button>`;
    openModal('Add New Client', body, footer);
}

function addClient() {
    const name = document.getElementById('clientName').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();

    if (!name) { showToast('Please enter a client name', 'error'); return; }

    const colors = ['#6C5CE7', '#00B894', '#0984E3', '#E17055', '#FDCB6E', '#A29BFE', '#FD79A8', '#636E72'];
    const color = colors[state.nextClientId % colors.length];

    const newClient = { id: state.nextClientId++, name, email, phone, color, totalRevenue: 0, invoiceCount: 0 };
    state.clients.push(newClient);
    closeModal();
    renderClients();
    showToast(`Client "${name}" added successfully!`);

    // Persist to Supabase
    dbAddClient(newClient);
}

function editClient(id) {
    const client = state.clients.find(c => c.id === id);
    if (!client) return;
    const body = `
        <input type="hidden" id="editClientId" value="${id}">
        <div class="form-group">
            <label for="editClientName">Client Name</label>
            <input type="text" id="editClientName" value="${client.name}">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="editClientEmail">Email</label>
                <input type="email" id="editClientEmail" value="${client.email}">
            </div>
            <div class="form-group">
                <label for="editClientPhone">Phone</label>
                <input type="tel" id="editClientPhone" value="${client.phone}">
            </div>
        </div>
    `;
    const footer = `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveClientEdit()">Save Changes</button>`;
    openModal('Edit Client', body, footer);
}

function saveClientEdit() {
    const id = parseInt(document.getElementById('editClientId').value);
    const client = state.clients.find(c => c.id === id);
    if (!client) return;
    client.name = document.getElementById('editClientName').value.trim();
    client.email = document.getElementById('editClientEmail').value.trim();
    client.phone = document.getElementById('editClientPhone').value.trim();
    closeModal();
    renderClients();
    showToast('Client updated successfully!');

    // Persist to Supabase
    dbUpdateClient(id, {
        name: client.name,
        email: client.email,
        phone: client.phone
    });
}

function deleteClient(id) {
    const client = state.clients.find(c => c.id === id);
    const footer = `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-danger" onclick="confirmDeleteClient(${id})">Delete</button>`;
    openModal('Delete Client', `<p>Are you sure you want to delete <strong>${client ? client.name : ''}</strong>? This action cannot be undone.</p>`, footer);
}

function confirmDeleteClient(id) {
    state.clients = state.clients.filter(c => c.id !== id);
    closeModal();
    renderClients();
    showToast('Client deleted.', 'info');

    // Persist to Supabase
    dbDeleteClient(id);
}

// ===== REPORTS =====
let monthlyRevenueChartInstance = null;
let cashFlowChartInstance = null;

function renderReports() {
    const totalRevenue = state.invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
    const totalExpenses = state.expenses.reduce((s, e) => s + e.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const margin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;

    document.getElementById('pnlRevenue').textContent = formatCurrency(totalRevenue);
    document.getElementById('pnlExpenses').textContent = `-${formatCurrency(totalExpenses)}`;
    document.getElementById('pnlProfit').textContent = formatCurrency(netProfit);
    document.getElementById('pnlMargin').textContent = `${margin}%`;

    renderMonthlyRevenueChart();
    renderCashFlowChart();
    renderTopClients();
}

function renderMonthlyRevenueChart() {
    const ctx = document.getElementById('monthlyRevenueChart');
    if (!ctx) return;
    if (monthlyRevenueChartInstance) monthlyRevenueChartInstance.destroy();

    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const data = [6800, 7900, 9200, 8500, 10200, 12500];

    monthlyRevenueChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Revenue',
                data: data,
                backgroundColor: data.map((_, i) => i === data.length - 1 ? 'rgba(108, 92, 231, 0.8)' : 'rgba(108, 92, 231, 0.3)'),
                borderColor: 'rgba(108, 92, 231, 0.6)',
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(17, 19, 39, 0.95)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderWidth: 1,
                    titleColor: '#F0F0F5',
                    bodyColor: '#8B8DA3',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: { label: c => `Revenue: ${formatCurrency(c.raw)}` }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#5A5C72', font: { size: 11 } },
                    border: { display: false }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: { color: '#5A5C72', font: { size: 11 }, callback: v => `₹${v / 1000}k` },
                    border: { display: false }
                }
            }
        }
    });
}

function renderCashFlowChart() {
    const ctx = document.getElementById('cashFlowChart');
    if (!ctx) return;
    if (cashFlowChartInstance) cashFlowChartInstance.destroy();

    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const inflow = [6800, 7900, 9200, 8500, 10200, 12500];
    const outflow = [4200, 5100, 4800, 5500, 6200, 5800];
    const net = inflow.map((v, i) => v - outflow[i]);

    cashFlowChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Net Cash Flow',
                data: net,
                borderColor: '#00B894',
                backgroundColor: 'rgba(0, 184, 148, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2.5,
                pointBackgroundColor: '#00B894',
                pointRadius: 5,
                pointHoverRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(17, 19, 39, 0.95)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderWidth: 1,
                    titleColor: '#F0F0F5',
                    bodyColor: '#8B8DA3',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: { label: c => `Net Cash Flow: ${formatCurrency(c.raw)}` }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#5A5C72', font: { size: 11 } },
                    border: { display: false }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: { color: '#5A5C72', font: { size: 11 }, callback: v => `$${v / 1000}k` },
                    border: { display: false }
                }
            }
        }
    });
}

function renderTopClients() {
    const totalPaidRevenue = state.invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);

    const clientRevenues = {};
    const clientInvoiceCounts = {};

    state.invoices.filter(i => i.status === 'paid').forEach(inv => {
        clientRevenues[inv.client] = (clientRevenues[inv.client] || 0) + inv.amount;
        clientInvoiceCounts[inv.client] = (clientInvoiceCounts[inv.client] || 0) + 1;
    });

    const sorted = Object.entries(clientRevenues).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const tbody = document.getElementById('topClientsBody');
    tbody.innerHTML = sorted.map(([name, rev]) => {
        const count = clientInvoiceCounts[name];
        const avg = rev / count;
        const share = ((rev / totalPaidRevenue) * 100).toFixed(1);
        return `
            <tr>
                <td><strong>${name}</strong></td>
                <td>${formatCurrency(rev)}</td>
                <td>${count}</td>
                <td>${formatCurrency(avg)}</td>
                <td>
                    <div style="display:flex;align-items:center;gap:8px">
                        <div class="share-bar" style="width:80px"><div class="share-bar-fill" style="width:${share}%"></div></div>
                        <span style="font-size:0.8rem;color:var(--text-secondary)">${share}%</span>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ===== CSV EXPORT =====
function exportInvoicesCSV() {
    const headers = ['Invoice #', 'Client', 'Amount', 'Date', 'Due Date', 'Status'];
    const rows = state.invoices.map(i => [i.id, i.client, i.amount, i.date, i.dueDate, i.status]);
    let csv = headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices_export.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Invoices exported as CSV!', 'success');
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(item.dataset.page);
        });
    });

    document.querySelectorAll('.view-all-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    // Mobile sidebar toggle
    document.getElementById('mobileToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('mobile-open');
    });

    // Sidebar collapse toggle (desktop)
    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('collapsed');
    });

    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });

    // Create buttons
    document.getElementById('createInvoiceBtn').addEventListener('click', showCreateInvoiceModal);
    document.getElementById('addExpenseBtn').addEventListener('click', showAddExpenseModal);
    document.getElementById('addClientBtn').addEventListener('click', showAddClientModal);
    document.getElementById('exportInvoicesBtn').addEventListener('click', exportInvoicesCSV);

    // Filters
    document.getElementById('invoiceStatusFilter').addEventListener('change', renderInvoices);
    document.getElementById('invoiceSearch').addEventListener('input', renderInvoices);
    document.getElementById('expenseCategoryFilter').addEventListener('change', renderExpenses);
    document.getElementById('expenseSearch').addEventListener('input', renderExpenses);
    document.getElementById('clientSearch').addEventListener('input', renderClients);

    // Settings forms
    document.getElementById('businessForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Business information saved!');
    });

    document.getElementById('saveInvoiceSettings')?.addEventListener('click', () => {
        showToast('Invoice settings saved!');
    });

    // Theme toggle — actually applies light/dark theme
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('light-theme');
            document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
        }
        // Re-render charts so grid/tick colors update
        if (state.currentPage === 'dashboard') renderDashboard();
        if (state.currentPage === 'reports') renderReports();
    }

    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.theme-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyTheme(btn.dataset.theme);
            showToast(`Theme switched to ${btn.dataset.theme} mode`, 'info');
        });
    });

    // Top-bar moon/sun button also toggles theme
    document.getElementById('themeToggle').addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        // Sync settings buttons
        document.querySelectorAll('.theme-option').forEach(b => {
            b.classList.toggle('active', b.dataset.theme === newTheme);
        });
        applyTheme(newTheme);
        showToast(`Theme switched to ${newTheme} mode`, 'info');
    });

    // Color options
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.documentElement.style.setProperty('--primary', btn.dataset.color);
            showToast('Accent color updated!', 'info');
        });
    });

    // Download report button
    document.getElementById('downloadReportBtn')?.addEventListener('click', () => {
        showToast('Report PDF generation is a premium feature.', 'info');
    });

    // Render initial page — with Supabase sync if configured
    const supabaseReady = initSupabase();
    if (supabaseReady) {
        syncFromDatabase().then(() => {
            renderDashboard();
            showToast('Data synced from database!', 'success');
        });
    } else {
        renderDashboard();
    }
});
