# PokeLister



Live Demo: https://poke-lister-seven.vercel.app/
Frontend Repo: https://github.com/hravv/PokeLister
Backend Repo: https://github.com/hravv/pokemon-backend  

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Credits](#credits)
- [License](#license)

---

## Overview

### Motivation
This project originally started as a task in my coding course that required me to perform a fetch operation with the PokeAPI RESTful API. I then decided to build a CRUD system around this, and was then given the idea to create a like system and leaderboard, with which I took my first step into backend development.

### Objective
While this app can be utilised to add Pokemon to a list, rate them, and check other people's ratings, it mainly serves as a demonstration of my understanding of UI/UX design principles and creating responsive, clean interfaces.

### Learning Outcomes
- Created backend server
- Utilised RESTful API
- Connected frontend to backend
- Deployed full-stack application

---

## Features

- CRUD functionality
- Fully responsive design
- Search functionality

---

## Tech Stack

### Frontend
- React
- HTML5
- CSS3 / Tailwind
- Fetch API

### Backend
- Node.js + Express 
- REST API
- Render
  
### Database
- PostgreSQL
- Neon

### Tools
- Git & GitHub
- VS Code
- Neon
- Render

---

## Architecture

## Search
Client (Frontend)  
↓  
Server (REST API)  

## Like
Client (Frontend)
↓
Server (Backend)
↓ 
Database (Neon)

---

## Database Design

### Items
- id
- name
- likes

---

## API Endpoints

| Method | Endpoint           | Description        |
|--------|-------------------|--------------------|
| POST   | /api/like | Adds 1 like to specific Pokemon |
| POST   | /api/unlike | Removes 1 like from specific Pokemon |
| GET    | /backend/likes/chosenPokemon | Accesses like total for specific Pokemon |
| GET   | https://pokeapi.co/api/v2/pokemon/${input} | Retrieves API data for selected Pokemon | 

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### Run Development Servers

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm start
```

---

## Environment Variables

Create a `.env` file in the server folder:

```env
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

Do not commit your `.env` file.

---

## Usage

1. Register an account  
2. Login to dashboard  
3. Create / edit / delete records  
4. View analytics  

---

## Screenshots

```
assets/
 ├── home.png
 ├── dashboard.png
 └── login.png
```

Add inside README:

```markdown
![Home Page](assets/home.png)
![Dashboard](assets/dashboard.png)
```

---

## Deployment

- Backend deployed on Render / Railway / AWS
- Frontend deployed on Vercel / Netlify
- Database hosted on MongoDB Atlas / Supabase

---

## Future Improvements

- Add email verification
- Add unit & integration testing
- Add real-time notifications
- Improve UI animations
- Add admin dashboard

---

## Credits

Developer: Your Name  
GitHub: https://github.com/YOUR_USERNAME  

---

## License

This project is licensed under the MIT License.
