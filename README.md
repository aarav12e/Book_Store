# Book Store Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) application split into two distinct directories: `Frontend` and `Backend`. It has been configured for easy deployment on **Vercel** as two separate projects.

---

## 🚀 Local Development Setup

### 1. Backend
The backend requires a local MongoDB instance or a MongoDB Atlas URI.
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make sure you have a `.env` file with the following variables:
   ```env
   PORT=4001
   MongoDBURI=mongodb://127.0.0.1:27017/bookStore
   ```
   *(Change the URI to your own MongoDB cluster string if needed).*
4. Start the server (runs on `nodemon`):
   ```bash
   npm start
   ```

### 2. Frontend
The frontend connects dynamically to the backend using an environment variable. If none is set, it defaults to your local backend (`http://localhost:4001`).
1. Open a new terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 🌐 Vercel Deployment Guide

To deploy this application effectively, we recommend deploying them as **two separate projects** within Vercel. Vercel handles static sites (Frontend) perfectly and will deploy the Express backend as a serverless function automatically thanks to the provided setup.

### Step 1: Deploy the Backend
1. **Push your code to GitHub.**
2. **Log into Vercel** and select "Add New Project".
3. **Import** your GitHub repository.
4. Expand the **"Root Directory"** section, click Edit, and select the `Backend` folder.
5. In the **"Environment Variables"** section, add your MongoDB connection string:
   - **Name:** `MongoDBURI`
   - **Value:** `mongodb+srv://<username>:<password>@cluster...` *(Use your MongoDB Atlas URI here)*
6. Click **Deploy**. Vercel will install dependencies and use `vercel.json` and the exported `app` inside `index.js` to create the serverless API.
7. Once deployed, note down the domain provided by Vercel (e.g., `https://your-backend.vercel.app`).

### Step 2: Deploy the Frontend
1. Go back to your Vercel Dashboard and select "Add New Project" again.
2. **Import** the exact same root repository.
3. Expand **"Root Directory"** again, click Edit, and this time select the `Frontend` folder.
4. Vercel will automatically detect that this is a **Vite** project.
5. In the **"Environment Variables"** section, link your frontend to your newly deployed backend:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend.vercel.app` *(The URL you got from Step 1)*
6. Click **Deploy**.

🎉 You now have a high-performance, fully detached full-stack application successfully hosted on Vercel!
