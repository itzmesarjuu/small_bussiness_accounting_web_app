-- ============================================
-- LedgerLite - Supabase Database Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- (Dashboard > SQL Editor > New Query)
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== CLIENTS TABLE =====
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    color VARCHAR(20) DEFAULT '#6C5CE7',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== INVOICES TABLE =====
CREATE TABLE IF NOT EXISTS invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(20) UNIQUE NOT NULL,
    client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
    client_name VARCHAR(255) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'paid', 'overdue')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== EXPENSES TABLE =====
CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'other',
    amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    expense_date DATE NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Credit Card',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== SETTINGS TABLE =====
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    business_name VARCHAR(255) DEFAULT 'Acme Corp',
    business_email VARCHAR(255) DEFAULT 'hello@acmecorp.com',
    business_phone VARCHAR(50) DEFAULT '+91 98765 43210',
    business_address TEXT DEFAULT '123 Business Ave, Mumbai, MH 400001',
    invoice_prefix VARCHAR(10) DEFAULT 'INV-',
    payment_terms INTEGER DEFAULT 30,
    tax_rate DECIMAL(5, 2) DEFAULT 18.00,
    currency VARCHAR(3) DEFAULT 'INR',
    theme VARCHAR(10) DEFAULT 'dark',
    accent_color VARCHAR(10) DEFAULT '#6C5CE7',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== ROW LEVEL SECURITY =====
-- Enable RLS on all tables (you can configure policies in Supabase dashboard)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for now (configure authentication later)
CREATE POLICY "Allow all operations on clients" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on invoices" ON invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on expenses" ON expenses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on settings" ON settings FOR ALL USING (true) WITH CHECK (true);

-- ===== SAMPLE DATA =====
INSERT INTO clients (name, email, phone, color) VALUES
    ('TechNova Solutions', 'billing@technova.io', '+91 98765 00001', '#6C5CE7'),
    ('GreenLeaf Marketing', 'accounts@greenleaf.co', '+91 98765 00002', '#00B894'),
    ('BlueStar Logistics', 'finance@bluestar.com', '+91 98765 00003', '#0984E3'),
    ('Crimson Studios', 'hello@crimsonstudios.art', '+91 98765 00004', '#E17055'),
    ('Apex Consulting', 'info@apexconsult.biz', '+91 98765 00005', '#FDCB6E'),
    ('Velvet Digital', 'team@velvetdigital.co', '+91 98765 00006', '#A29BFE');

INSERT INTO invoices (invoice_number, client_id, client_name, amount, invoice_date, due_date, status) VALUES
    ('INV-001', 1, 'TechNova Solutions', 3500.00, '2026-03-01', '2026-03-31', 'paid'),
    ('INV-002', 2, 'GreenLeaf Marketing', 2750.00, '2026-03-03', '2026-04-02', 'paid'),
    ('INV-003', 3, 'BlueStar Logistics', 4200.00, '2026-03-05', '2026-04-04', 'pending'),
    ('INV-004', 1, 'TechNova Solutions', 1800.00, '2026-03-07', '2026-04-06', 'pending'),
    ('INV-005', 4, 'Crimson Studios', 6300.00, '2026-02-20', '2026-03-10', 'overdue'),
    ('INV-006', 5, 'Apex Consulting', 2400.00, '2026-03-10', '2026-04-09', 'pending'),
    ('INV-007', 3, 'BlueStar Logistics', 5500.00, '2026-03-12', '2026-04-11', 'draft'),
    ('INV-008', 2, 'GreenLeaf Marketing', 1250.00, '2026-03-14', '2026-04-13', 'paid'),
    ('INV-009', 6, 'Velvet Digital', 4500.00, '2026-02-28', '2026-03-15', 'overdue'),
    ('INV-010', 5, 'Apex Consulting', 3200.00, '2026-03-15', '2026-04-14', 'pending');

INSERT INTO expenses (description, category, amount, expense_date, payment_method) VALUES
    ('Adobe Creative Cloud Subscription', 'software', 54.99, '2026-03-15', 'Credit Card'),
    ('Office Printer Paper & Toner', 'office', 128.50, '2026-03-14', 'Debit Card'),
    ('Client Lunch Meeting – BlueStar', 'travel', 86.25, '2026-03-13', 'Credit Card'),
    ('Monthly Electric Bill', 'utilities', 245.00, '2026-03-12', 'Bank Transfer'),
    ('Google Workspace Business', 'software', 72.00, '2026-03-11', 'Credit Card'),
    ('Facebook Ads Campaign', 'marketing', 350.00, '2026-03-10', 'Credit Card'),
    ('Office Desk Lamp & Accessories', 'office', 67.99, '2026-03-09', 'Debit Card'),
    ('Web Hosting Renewal – Annual', 'software', 199.00, '2026-03-08', 'Credit Card'),
    ('Uber Rides to Client Meetings', 'travel', 45.60, '2026-03-07', 'Credit Card'),
    ('Employee Salary – March Part', 'payroll', 4500.00, '2026-03-06', 'Bank Transfer'),
    ('Internet Service – Monthly', 'utilities', 89.99, '2026-03-05', 'Bank Transfer'),
    ('LinkedIn Premium Business', 'marketing', 59.99, '2026-03-04', 'Credit Card'),
    ('Water & Sewage Bill', 'utilities', 42.00, '2026-03-03', 'Bank Transfer'),
    ('Shipping Supplies', 'office', 33.50, '2026-03-02', 'Debit Card'),
    ('Slack Pro Plan', 'software', 12.50, '2026-03-01', 'Credit Card');

INSERT INTO settings (id, business_name, business_email, currency, theme) VALUES 
    (1, 'Acme Corp', 'hello@acmecorp.com', 'INR', 'dark')
ON CONFLICT (id) DO NOTHING;

-- Done! Your database is ready.
