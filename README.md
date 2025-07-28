# Simple Blog CMS — Full-stack Developer Intern Code Test

A full-stack Blog CMS built with:

- **Backend:** Nest.js, TypeORM, MySQL
- **Frontend:** Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Authentication:** JWT-based (predefined admin user)
- **Deployment Dev Mode:** `concurrently` for unified backend + frontend development

---

## 🚀 Features

- ✅ Slug auto-generation with uniqueness enforcement
- ✅ JWT-protected admin login (only 1 predefined user)
- ✅ Create, Read, Update, Delete blog posts
- ✅ Responsive & modern UI with shadcn/ui
- ✅ Pagination on landing page and admin dashboard
- ✅ RESTful API with proper structure
- ✅ Postman collection provided

---

## 🗃️ Tech Stack

| Layer     | Stack                  |
|-----------|------------------------|
| Backend   | Nest.js, TypeORM, JWT  |
| Frontend  | Next.js (App Router), shadcn/ui, TailwindCSS |
| Database  | MySQL                  |
| Auth      | JWT                    |
| Dev Tools | concurrently, ts-node  |

---

## 🧑‍💻 Admin Credentials

```
Email: admin@cms.com  
Password: secret123
```

> Predefined in database seeder (or manually insert via MySQL)

---

## 📂 Folder Structure

```
├── backend
│   └── src
│       ├── blog
│       ├── auth
│       ├── user
│       └── main.ts
├── frontend
│   └── app
│       ├── admin
│       ├── blog
│       ├── components
│       └── page.tsx
├── package.json (with concurrently)
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/fadel1809/blog-cms-test.git
cd blog-cms-test
```

### 2. Install Dependencies

```bash
npm run install:all
```

### 3. Setup `.env`

#### 📦 Backend

```env
# backend/.env
JWT_SECRET=fadel123
```
Although it's generally recommended to manage database configuration using a `.env` file, for simplicity in this project, I only included the `JWT_SECRET` environment variable. This was done to reduce complexity during testing and setup.

### 4. Run MySQL & Migrate

> Create database `blogcms` manually or via script and make sure MySQL is running (using XAMPP etc.)

If table doesn't create automatically run this on the backend.
```bash
# inside backend/
npm run typeorm migration:run
```

### 5. Start Project (Dev Mode)

```bash
npm run dev
```

This runs both `frontend` and `backend` using `concurrently`.

---

## 📬 API Documentation

Postman collection available in:  
📁 `FS-TEST-VODEA.postman_collection`

---

## 🧪 Testing

Unit testing was not included in this project due to time constraints. In a production-level application, writing tests would be an essential part of the development process to ensure code quality and reliability.

---

## 🧠 Bonus (Plus Points Implemented)

- ✅ **Migration files** using TypeORM CLI
- ✅ **Pagination** for both frontend and backend
- ✅ **Well-structured response format**
- ✅ **Modular and maintainable architecture**

---

## 🙏 Acknowledgement
Should you experience any issues or find the setup instructions unclear, please don’t hesitate to reach out.
Thank you for the opportunity! Looking forward to your feedback 🙇‍♂️