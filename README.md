# D&D Player Availability Calendar

A simple React app for managing Dungeons & Dragons player availability. Players can mark when they are available or unavailable on a shared calendar. The app uses **Firebase Firestore** for real-time data storage and is deployed on **GitHub Pages**.

---

## 🚀 Features
- **Shared Calendar**: All players see the same availability.
- **Add Availability**: Click on a date range and enter your name.
- **Edit/Delete Entries**: Update or remove your availability.
- **Color-Coded Players**: Each player gets a unique color.
- **Legend**: Displays which color belongs to which player.
- **Responsive Design**: Optimized for mobile and desktop.

---

## 🛠 Tech Stack
- **React** (Create React App)
- **React Big Calendar**
- **Firebase Firestore**
- **Date-fns**
- **GitHub Pages** for hosting

---

## 📦 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mattyhakin/dnd-availability.git
   cd dnd-availability
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Add your Firebase config in `src/firebase.js`:
   ```javascript
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   ```

---

## ▶️ Usage
- **Add Availability**: Click on a date range → Enter your name.
- **Edit/Delete**: Click an existing event → Type `edit` or `delete`.
- **Legend**: Shows player colors for quick reference.

---

## 🌐 Deployment
1. Set homepage in `package.json`:
   ```json
   "homepage": "https://mattyhakin.github.io/dnd-availability"
   ```
2. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```
Your app will be live at:
```
https://mattyhakin.github.io/dnd-availability/
```

---

## ✅ Screenshots
*(Add screenshots of your app here)*

---

## 📌 Future Enhancements
- Authentication (optional)
- Export availability as CSV
- Notifications for session planning

---

## 📝 License
MIT License
