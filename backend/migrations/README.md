# Database Migrations & Seeding

## Available SQL Files:

### 1. `init_database.sql` (Full Setup)
- **Drops** existing database (⚠️ WARNING!)
- Creates fresh `monolibrary` database
- Creates all tables (users, books)
- Seeds 6 users (2 Admin, 4 Anggota)
- Seeds 25 books (berbagai kategori)

**Usage:**
```bash
mysql -u root -p < init_database.sql
```

**When to use:**
- First time setup
- Clean install
- Development/Testing reset

---

### 2. `seed_data.sql` (Data Only)
- **Does NOT** drop database
- **Does NOT** create tables
- Only inserts data (users & books)
- Uses `ON DUPLICATE KEY UPDATE` (safe)

**Usage:**
```bash
mysql -u root -p monolibrary < seed_data.sql
```

**When to use:**
- Database already exists
- Tables already created
- Just need sample data

---

### 3. `add_role_to_users.sql` (Migration)
- Adds `role` column to existing users table
- Adds sample admin user
- For upgrading existing installations

**Usage:**
```bash
mysql -u root -p monolibrary < add_role_to_users.sql
```

---

### 4. `generate_password_hash.js` (Utility)
- Node.js script to generate bcrypt password hashes
- Use this to create secure password hashes for seeding

**Usage:**
```bash
cd backend
npm install  # Make sure bcrypt is installed
node migrations/generate_password_hash.js
```

---

## Default Credentials (After Seeding):

### Admin Account:
- **Email:** admin@monolibrary.com
- **Password:** password123

### Member Account:
- **Email:** john@example.com
- **Password:** password123

⚠️ **IMPORTANT:** Change these passwords after first login in production!

---

## Sample Data Included:

### Users (6 total):
- 2 Admin users
- 4 Anggota (members)

### Books (25 total):
- **Fiksi & Sastra:** 5 books (Harper Lee, Orwell, Austen, dll)
- **Non-Fiksi:** 5 books (Harari, James Clear, dll)
- **Programming:** 5 books (Clean Code, Design Patterns, dll)
- **Fantasy & Sci-Fi:** 5 books (Tolkien, Frank Herbert, dll)
- **Indonesia:** 5 books (Laskar Pelangi, Bumi Manusia, dll)

---

## Quick Commands:

```bash
# Full reset (⚠️ Deletes all data!)
mysql -u root -p < backend/migrations/init_database.sql

# Seed data only (safe)
mysql -u root -p monolibrary < backend/migrations/seed_data.sql

# Check what was created
mysql -u root -p -e "USE monolibrary; SHOW TABLES; SELECT COUNT(*) FROM users; SELECT COUNT(*) FROM books;"

# View sample data
mysql -u root -p -e "USE monolibrary; SELECT id, name, email, role FROM users; SELECT id, title, author, category FROM books LIMIT 5;"
```

---

## Troubleshooting:

**Error: Database doesn't exist**
```bash
mysql -u root -p -e "CREATE DATABASE monolibrary;"
```

**Error: Table already exists**
Use `seed_data.sql` instead of `init_database.sql`

**Error: Access denied**
Check your MySQL credentials in `.env` file

**Password hash doesn't work**
Run `generate_password_hash.js` to create valid bcrypt hashes
