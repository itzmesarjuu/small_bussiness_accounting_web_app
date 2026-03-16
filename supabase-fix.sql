-- ============================================
-- LedgerLite - Fix: Insert sample data only
-- (Tables and policies already exist)
-- ============================================

-- Clear any existing data first to avoid duplicates
TRUNCATE clients, invoices, expenses, settings RESTART IDENTITY CASCADE;

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
    ('Client Lunch Meeting - BlueStar', 'travel', 86.25, '2026-03-13', 'Credit Card'),
    ('Monthly Electric Bill', 'utilities', 245.00, '2026-03-12', 'Bank Transfer'),
    ('Google Workspace Business', 'software', 72.00, '2026-03-11', 'Credit Card'),
    ('Facebook Ads Campaign', 'marketing', 350.00, '2026-03-10', 'Credit Card'),
    ('Office Desk Lamp & Accessories', 'office', 67.99, '2026-03-09', 'Debit Card'),
    ('Web Hosting Renewal - Annual', 'software', 199.00, '2026-03-08', 'Credit Card'),
    ('Uber Rides to Client Meetings', 'travel', 45.60, '2026-03-07', 'Credit Card'),
    ('Employee Salary - March Part', 'payroll', 4500.00, '2026-03-06', 'Bank Transfer'),
    ('Internet Service - Monthly', 'utilities', 89.99, '2026-03-05', 'Bank Transfer'),
    ('LinkedIn Premium Business', 'marketing', 59.99, '2026-03-04', 'Credit Card'),
    ('Water & Sewage Bill', 'utilities', 42.00, '2026-03-03', 'Bank Transfer'),
    ('Shipping Supplies', 'office', 33.50, '2026-03-02', 'Debit Card'),
    ('Slack Pro Plan', 'software', 12.50, '2026-03-01', 'Credit Card');

INSERT INTO settings (id, business_name, business_email, currency, theme) VALUES 
    (1, 'Acme Corp', 'hello@acmecorp.com', 'INR', 'dark')
ON CONFLICT (id) DO NOTHING;

-- Done! Sample data inserted.
