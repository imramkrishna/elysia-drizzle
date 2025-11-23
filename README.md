# Elysia API with Drizzle ORM & PostgreSQL

A high-performance REST API built with [ElysiaJS](https://elysiajs.com/), running on the [Bun](https://bun.sh/) runtime, and using [Drizzle ORM](https://orm.drizzle.team/) for PostgreSQL database management.

## 🚀 Tech Stack

- **Runtime:** [Bun](https://bun.sh/)
- **Framework:** [ElysiaJS](https://elysiajs.com/)
- **Database:** PostgreSQL
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Language:** TypeScript

## 📂 Project Structure

```
src/
├── controllers/      # Route logic (Login, Register, Dashboard, etc.)
├── db/              
│   ├── client.ts     # Database connection setup
│   └── schema.ts     # Drizzle table definitions
├── middlewares/      # Custom middlewares (e.g., checkAuth)
├── utils/            # Helper functions (Token generation, etc.)
├── index.ts          # Application entry point
├── routes.ts         # Route definitions and configuration
└── types.ts          # TypeScript interfaces and enums
```

## 🛠️ Prerequisites

- [Bun](https://bun.sh/) installed
- PostgreSQL database running locally or via Docker

## ⚡ Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd elysia-drizzle
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgres://user:password@localhost:5432/db_name"
   JWT_SECRET="your_super_secret_key"
   ```

4. **Database Migration**
   Generate and push schema changes to the database:
   ```bash
   bun run drizzle-kit generate
   bun run drizzle-kit migrate
   ```

5. **Run Development Server**
   ```bash
   bun run dev
   ```
   The server will start at `http://localhost:3000`.

## 🔌 API Endpoints

| Method | Endpoint        | Description               | Protected |
|--------|-----------------|---------------------------|-----------|
| POST   | `/registerUser` | Register a new user       | ❌        |
| POST   | `/login`        | Login and get tokens      | ❌        |
| GET    | `/getUsers`     | Retrieve list of users    | ❌        |
| GET    | `/dashboard`    | Access protected content  | ✅        |

## 🧪 Testing

You can test the API using Postman or curl.

**Example: Register User**
```bash
curl -X POST http://localhost:3000/registerUser \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "password": "123"}'
```

## 📜 License

This project is licensed under the MIT License.