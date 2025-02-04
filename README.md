# New Feed API

New Feed API is a RESTful API built with Express.js, Node.js, and Mongoose. It serves as the backend for a feed-based application, providing endpoints to create, read, update, and delete feed items.

## Features

- CRUD operations for feed items
- MongoDB integration using Mongoose
- Express.js for handling HTTP requests and routing
- Login and Registration endpoints
- JWT-based authentication
- Basic error handling and input validation

## Prerequisites

- Node.js (>=14.0.0)
- MongoDB (>=4.0)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/llynv/new-feed-api.git
   cd new-feed-api
   ```  

2. **Install dependencies:**

   ```bash
    npm install
    ```

3. **Set up environment variables:**
    ```env
    PORT=5000
    DB_URL='mongodb://localhost:27017/new-feed-api'
    JWT_SECRET=your_secret_key
    ```

4. **Start the server:**

   ```bash
   npm run start
   ```
