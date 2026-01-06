# 🐾 Tele-Vet MVP

A professional, modular Node.js backend for the **Tele-Vet** platform—a comprehensive solution for pet health management, telemedicine, and community engagement.

## 🚀 Features

-   **Authentication**: Secure Register/Login flow.
-   **Pet Management**: CRUD operations for pet profiles.
-   **Appointments**: Booking system with random Vet assignment.
-   **Health Logs**: Track symptoms and health history.
-   **Real-time Chat**: `Socket.io` enabled chat with "Wizard of Oz" capability and Auto-reply bot.
-   **Community**: Breed-specific info and community posting.
-   **Data Persistence**: Lightweight JSON file-based database (`db.json`).

## 🛠 Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Real-time**: Socket.io
-   **Logging**: Morgan
-   **Architecture**: Modular Monolith (Controllers, Routes, Services)

## 📂 Project Structure

```text
MVP/
├── src/
│   ├── controllers/   # Business logic
│   ├── middleware/    # Auth & Error handling
│   ├── routes/        # API Endpoints
│   ├── services/      # Socket.io logic
│   ├── utils/         # Helpers & DB Access
│   └── app.js         # Express App Setup
├── public/            # Static assets
├── db.json            # JSON Database
├── docker-compose.yml # Docker Composition
└── server.js          # Entry point
```

## ⚡ Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16+)
-   [Docker](https://www.docker.com/) (Optional)

### 1️⃣ Run Locally

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server** (with auto-reload):
    ```bash
    npm run dev
    ```

3.  **Start Production Server**:
    ```bash
    npm start
    ```

The server will run on `http://localhost:8080`.

### 2️⃣ Run with Docker 🐳

To run the application in a containerized environment:

1.  **Build and Run**:
    ```bash
    docker-compose up -d --build
    ```

2.  **Stop**:
    ```bash
    docker-compose down
    ```

The app will be accessible at `http://localhost:8080`. Data in `db.json` is persisted via Docker volumes.

## 📡 API Documentation

### Auth
-   `POST /api/login` - Login user
-   `POST /api/register` - Register new user
-   `GET /api/profile` - Get current user info (requires token)

### Pets
-   `GET /api/pets` - List user's pets
-   `POST /api/pets` - Add a new pet
-   `GET /api/pets/:id` - Get specific pet details

### Appointments
-   `GET /api/appointments/:petId` - Get appointments for a pet
-   `POST /api/appointments` - Book an appointment

### Community
-   `GET /api/breed-info/:breed` - Get breed info & care guide
-   `GET /api/community/:breed` - Get community posts
-   `POST /api/community` - Create a post

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
