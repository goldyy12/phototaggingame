# 🎯 Find the Hidden Objects

A fun browser-based game where players search for hidden objects in an image as fast as possible. Your time is tracked, and once you find all objects, your score is saved to a leaderboard.

---

## 🚀 Features

* 🖼️ Interactive image map
* 🎯 Multiple hidden objects to find
* ⏱️ Real-time timer
* 📋 Click-to-select detection system
* 🏆 Leaderboard with fastest times
* 🔄 Play again & logout functionality

---

## 🕹️ How to Play

1. Click **Start Game**
2. Look at the icons of objects you need to find
3. Click anywhere on the image
4. Select the object you think is at that location
5. Find all objects as fast as possible!

---

## 🛠️ Tech Stack

### Frontend

* React (TypeScript)
* CSS

### Backend

* Node.js
* Express

### Database

* (Your DB here – e.g. PostgreSQL / MongoDB / Supabase)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

## ▶️ Running the App

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

---

## 🌐 Environment Variables

Create a `.env` file in your backend:

```env
DATABASE_URL=your_database_url
PORT=5000
```

---

## 📡 API Endpoints

### Submit Score

```
POST /submit-score
```

Body:

```json
{
  "username": "string",
  "time": number
}
```

### Get Leaderboard

```
GET /leaderboard
```

---

## 🧠 Game Logic

* Click position is converted into percentage coordinates
* Each object has predefined coordinates + radius
* Distance formula is used to determine if selection is correct

---

## ⚠️ Known Issues

* Timer synchronization bug (fixed using `useRef`)
* Potential double submissions (can be improved)

---

## 🔮 Future Improvements

* 🎵 Sound effects
* 📱 Mobile optimization
* 🌍 Multiplayer mode
* 🎨 Better UI/UX animations
* 🔐 Authentication system

---

## 👨‍💻 Author

Diar Selmani

---

## 📄 License

This project is open-source and free to use.
