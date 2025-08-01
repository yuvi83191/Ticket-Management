# Ticket Management System

This is a full-stack **Support Ticket Management System** project built using:

-  Backend: Node.js, Express.js, MongoDB
-  Frontend: React.js (Vite)

It includes user authentication, role-based access control, ticket tracking, and admin control features.

- Styling : Tailwind CSS 

---

##  Features

- User Registration & Login (JWT-based)
- Role-Based Access: User, Agent, Admin
- Create, Read, Update, Delete Tickets
- Ticket Status: Open, In-progress, Resolved, Closed
- Search, Filter, Pagination in Tickets
- Admin: Activate/Deactivate users, Change roles
- Protected Routes using JWT Middleware
- Password hashing with bcryptjs

---

##  Project Setup Instructions

Follow these steps to run the project on your system.

---

###  1. Clone the Project


git clone https://github.com/yuvi83191/Ticket-Management.git
cd Ticket-Management

## 2. Setup Backend (Server)
  Step 1: Go to Backend folder - cd Backend

  Step 2: Install packages - npm install
 
  Step 3: Create .env file in Backend folder



PORT=5000

MONGO_URI=mongodb+srv://yuvi8319182:yuvraj8319182@cluster0.t5l4a4v.mongodb.net/support-ticket-db

JWT_SECRET=support-ticket

NODE_ENV=development

 Step 4: Run the Backend server - npm run dev

It will start on:
 http://localhost:5000

## 3. Setup Frontend (Client)

 Step 1: Go to frontend folder

cd ../Frontend

 Step 2: Install frontend packages - npm install

 Step 3: Start the React app - npm run dev

Frontend will start at:
 http://localhost:5173

## 4. Connect Frontend with Backend
Make sure your React frontend uses API calls to:


http://localhost:5000/api

For example:

Login API: POST http://localhost:5000/api/auth/login

Register API: POST http://localhost:5000/api/auth/register



## API Endpoints

 Auth Routes

Method    | Endpoint           | Access   | Description
----------|--------------------|----------|--------------------------
POST      | /auth/register     | Public   | Register a new user
POST      | /auth/login        | Public   | Login and get token

Ticket Routes

Method    | Endpoint           | Access         | Description
----------|--------------------|----------------|-------------------------------
POST      | /tickets           | User           | Create new ticket
GET       | /tickets           | Agent, Admin   | View all tickets (filtered)
GET       | /tickets/my        | User           | View own tickets
GET       | /tickets/:id       | User, Agent    | Get single ticket
PATCH     | /tickets/:id       | Owner, Agent   | Update ticket
DELETE    | /tickets/:id       | Owner, Agent   | Delete ticket

 Admin Routes

Method    | Endpoint                    | Access   | Description
----------|-----------------------------|----------|----------------------------
GET       | /admin/users                | Admin    | View all users
PATCH     | /admin/users/:id/role       | Admin    | Change user role
PATCH     | /admin/users/:id/status     | Admin    | Activate/Deactivate user