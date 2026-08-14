# CSE230 REST API – Task Management System

A production-ready, modular RESTful Web Service built with **Node.js**, **Express.js**, and **MongoDB** using **Mongoose ODM**. This application provides full Create, Read, Update, and Delete (CRUD) capabilities for task management, complete with schema validation and structured error handling.

---

## Technical Stack & Dependencies

* **Runtime Environment:** Node.js (v18+)
* **Web Framework:** Express.js (v4.x)
* **Database System:** MongoDB Local Instance / MongoDB Atlas
* **Object Data Modeling (ODM):** Mongoose (v8.x)
* **Environment Configuration:** dotenv
* **Development Server:** Nodemon
* **API Client & Verification:** Postman v11+

---

## Project Architecture & Structure

```text
cse230-todo-rest-api/
├── .env
├── package.json
├── package-lock.json
├── README.md
├── CSE230 Todo API.postman_collection.json
└── server/
    ├── index.js
    ├── models/
    │   └── Task.js
    └── routes/
        └── taskRoutes.js