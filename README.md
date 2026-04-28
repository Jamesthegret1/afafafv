# PLAYFUNRBXSHOP - Replicated Marketplace

This project is a 100% functional replica of the Robux trading marketplace, optimized for local development and easy deployment on Vercel.

## 🚀 Deployment Instructions

### 1. Upload to GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Open your terminal in this project folder.
3. Initialize the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Replicated Marketplace"
   ```
4. Link to your GitHub repository and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com/new).
2. Import your GitHub repository.
3. Vercel will automatically detect the configuration in `vercel.json`.
4. Click **Deploy**.

## 💻 Local Development

To run the project locally using the custom Express server:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure
- `index.html`: The main homepage.
- `dashboard.html`, `proxies.html`, etc.: Static page templates.
- `api/`: Folder containing JSON data for the mock API.
- `_next/`: Static assets for the Next.js frontend.
- `server.js`: Local Express server for testing.
- `vercel.json`: Configuration for Vercel routing.
