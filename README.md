# Quiz App

This repository contains both the frontend and backend code for a quiz application.  
The frontend is built with React/Next.js, and the backend provides an API to manage quizzes and questions.

---

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- PostgreSQL database (or another supported database by your backend)
- Git

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ibrag1moff/quiz-builder
cd my-project
```
### 2. Backend Setup
```bash
cd backend
npm install
```
Create a .env file in the backend directory with your environment variables. Example: 
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/quizdb
PORT=8000
```
Make sure your database server is running. Run database migrations (if applicable) and then start the server:
```bash
npm run migrate
npm run dev
```

The backend will start on http://localhost:8000 (or the port you configured).

### 3. Frontend Setup
Open a new terminal window/tab, navigate to the frontend folder, and install dependencies:
```bash
cd ../frontend
npm install
```
Create a .env.local file in the frontend directory and add your backend API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```
Start the frontend development server:
```bash
npm run dev
```
The frontend will be available at http://localhost:3000.

## 4. Using the Application

1. Open your browser and go to [http://localhost:3000](http://localhost:3000).

2. Enter a **Quiz Title**.

3. Add questions by clicking **+ Add Question**.

4. For each question:
   - Select the question type (`INPUT`, `BOOLEAN`, or `CHECKBOX`).
   - Enter the question text.
   - Add options and mark the correct answers.

5. Click **Save Quiz** to send the quiz data to the backend.

6. You will see a success notification once the quiz is saved.

# Good Luck!
