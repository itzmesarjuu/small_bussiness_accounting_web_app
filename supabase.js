/* ============================================
   Supabase Database Configuration
   ============================================
   
   To connect your app to Supabase:
   1. Go to https://supabase.com and create a free account
   2. Create a new project
   3. Go to Settings > API and copy your:
      - Project URL
      - anon/public API key
   4. Replace the placeholders below with your actual values
   5. Run the SQL below in Supabase SQL Editor to create tables
   ============================================ */

// ===== SUPABASE CONFIG =====
// Replace these with your actual Supabase project values
const SUPABASE_URL = 'YOUR_SUPABASE_URL';      // e.g., https://xyzcompany.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // e.g., eyJhbGciOiJIUzI1NiIs...

// Initialize Supabase client (loaded via CDN in index.html)
let supabaseClient = null;

function initSupabase() {
    if (typeof supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase connected successfully');
        return true;
    }
    console.log('⚠️ Running in offline mode (no Supabase configured)');
    return false;
}

// ===== DATABASE OPERATIONS =====

// --- CLIENTS ---
async function dbGetClients() {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) { console.error('Error fetching clients:', error); return null; }
    return data;
}

async function dbAddClient(client) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('clients')
        .insert([{
            name: client.name,
            email: client.email,
            phone: client.phone,
            color: client.color
        }])
        .select();
    if (error) { console.error('Error adding client:', error); return null; }
    return data[0];
}

async function dbUpdateClient(id, updates) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select();
    if (error) { console.error('Error updating client:', error); return null; }
    return data[0];
}

async function dbDeleteClient(id) {
    if (!supabaseClient) return null;
    const { error } = await supabaseClient
        .from('clients')
        .delete()
        .eq('id', id);
    if (error) { console.error('Error deleting client:', error); return false; }
    return true;
}

// --- INVOICES ---
async function dbGetInvoices() {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) { console.error('Error fetching invoices:', error); return null; }
    return data;
}

async function dbAddInvoice(invoice) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('invoices')
        .insert([{
            invoice_number: invoice.id,
            client_id: invoice.clientId,
            client_name: invoice.client,
            amount: invoice.amount,
            invoice_date: invoice.date,
            due_date: invoice.dueDate,
            status: invoice.status
        }])
        .select();
    if (error) { console.error('Error adding invoice:', error); return null; }
    return data[0];
}

async function dbUpdateInvoice(invoiceNumber, updates) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('invoices')
        .update(updates)
        .eq('invoice_number', invoiceNumber)
        .select();
    if (error) { console.error('Error updating invoice:', error); return null; }
    return data[0];
}

async function dbDeleteInvoice(invoiceNumber) {
    if (!supabaseClient) return null;
    const { error } = await supabaseClient
        .from('invoices')
        .delete()
        .eq('invoice_number', invoiceNumber);
    if (error) { console.error('Error deleting invoice:', error); return false; }
    return true;
}

// --- EXPENSES ---
async function dbGetExpenses() {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('expenses')
        .select('*')
        .order('expense_date', { ascending: false });
    if (error) { console.error('Error fetching expenses:', error); return null; }
    return data;
}

async function dbAddExpense(expense) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('expenses')
        .insert([{
            description: expense.description,
            category: expense.category,
            amount: expense.amount,
            expense_date: expense.date,
            payment_method: expense.method
        }])
        .select();
    if (error) { console.error('Error adding expense:', error); return null; }
    return data[0];
}

async function dbUpdateExpense(id, updates) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('expenses')
        .update(updates)
        .eq('id', id)
        .select();
    if (error) { console.error('Error updating expense:', error); return null; }
    return data[0];
}

async function dbDeleteExpense(id) {
    if (!supabaseClient) return null;
    const { error } = await supabaseClient
        .from('expenses')
        .delete()
        .eq('id', id);
    if (error) { console.error('Error deleting expense:', error); return false; }
    return true;
}

// --- SETTINGS ---
async function dbGetSettings() {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('settings')
        .select('*')
        .limit(1)
        .single();
    if (error) { console.error('Error fetching settings:', error); return null; }
    return data;
}

async function dbSaveSettings(settings) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('settings')
        .upsert([settings])
        .select();
    if (error) { console.error('Error saving settings:', error); return null; }
    return data[0];
}

// ===== SYNC: Load data from Supabase into app state =====
async function syncFromDatabase() {
    if (!supabaseClient) return false;

    try {
        const [clients, invoices, expenses] = await Promise.all([
            dbGetClients(),
            dbGetInvoices(),
            dbGetExpenses()
        ]);

        if (clients) {
            state.clients = clients.map(c => ({
                id: c.id,
                name: c.name,
                email: c.email || '',
                phone: c.phone || '',
                color: c.color || '#6C5CE7',
                totalRevenue: 0,
                invoiceCount: 0
            }));
            state.nextClientId = Math.max(...state.clients.map(c => c.id), 0) + 1;
        }

        if (invoices) {
            state.invoices = invoices.map(i => ({
                id: i.invoice_number,
                clientId: i.client_id,
                client: i.client_name,
                amount: parseFloat(i.amount),
                date: i.invoice_date,
                dueDate: i.due_date,
                status: i.status
            }));
            const nums = state.invoices.map(i => parseInt(i.id.replace('INV-', '')));
            state.nextInvoiceNum = Math.max(...nums, 0) + 1;
        }

        if (expenses) {
            state.expenses = expenses.map(e => ({
                id: e.id,
                date: e.expense_date,
                description: e.description,
                category: e.category,
                amount: parseFloat(e.amount),
                method: e.payment_method
            }));
            state.nextExpenseId = Math.max(...state.expenses.map(e => e.id), 0) + 1;
        }

        console.log('✅ Data synced from Supabase');
        return true;
    } catch (err) {
        console.error('Error syncing from database:', err);
        return false;
    }
}
