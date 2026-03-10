<div align="center">
  <h1 align="center">⚔️ PURE RAGE ⚔️</h1>
  <p align="center">
    <strong>A high-octane turn-based battle web game built with Flask & Vanilla JavaScript</strong>
  </p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.12+-blue.svg" alt="Python Version" />
  <img src="https://img.shields.io/badge/Flask-3.1.0-black.svg?logo=flask" alt="Flask" />
  <img src="https://img.shields.io/badge/Database-Azure%20SQL-blue.svg" alt="Azure SQL" />
  <img src="https://img.shields.io/badge/Frontend-Vanilla%20JS%20%7C%20HTML%20%7C%20CSS-f39f37.svg" alt="Frontend" />
</p>

---




Teaser:





<div align="center">
  <video src="https://github.com/user-attachments/assets/a15e25f0-8edb-4aa5-906b-7c7eac3c51be" width="100%" autoplay muted loop playsinline></video>
</div>







### 🌐 Live Demo:  [PURE RAGE ON AZURE](https://turn-based-battle-fqckckgve8bsa3ha.centralus-01.azurewebsites.net/)


##  Overview

**PURE RAGE** is a dynamic, fast-paced, turn-based battle browser game. Players can register an account, choose their fighter from a diverse roster of characters, and engage in tactical 1v1 battles featuring unique abilities, rage meters, and intense visual feedback (particle effects, screen shake, and adaptive battle music). The project integrates a scalable Python/Flask backend with an interactive Vanilla JavaScript frontend, demonstrating full-stack web development principles.

##  Features

- **Robust Authentication:** Secure user registration, robust session management utilizing cookies, and password hashing powered by `flask-bcrypt`.
- **Dynamic Turn-Based Combat:** Engage in 1v1 combat against an intelligent AI. Manage Health and the "Rage" meter to unleash devastating abilities.
- **AAA "Juice" Mechanics:** Immersive visual feedback including dynamic damage popups, screen shake upon impact, HTML5 canvas-based particle effects, and adaptive audio that matches the tension of low-health states.
- **Extensible Character System:** Highly scalable character architecture driven by JSON configurations inside `/characters/` and object-oriented JS data structures.
- **Micro-Social Integration:** Syncs with the decentralized Bluesky API to fetch and display live feedback/posts containing the `#PureRage` hashtag directly within the application.
- **Robust Backend & DB Setup:** Designed to interact seamlessly with Azure SQL, leveraging `pyodbc` for dynamic query executions, equipped with a safe fallback "MOCK" mode for local development.

---

##  Tech Stack

**Frontend:**
- **HTML5 & CSS3:** For structuring and responsive, thematic styling (including custom animations, glitches, and visual FX).
- **Vanilla JavaScript (ES6+):** Pure object-oriented game logic, API interaction, DOM manipulation, and HTML5 Canvas API for particles.

**Backend:**
- **Python 3.12+ & Flask:** Robust routing, API endpoint execution, and application serving.
- **Flask-RESTful & Flask-Bcrypt:** Structured RESTful API principles and modern cryptographic password hashing.
- **Bluesky API (AT Protocol):** External integration to fetch posts programmatically using JWT authentication.

**Database & Infrastructure:**
- **Azure SQL Server:** Cloud relational database for storing User and Session data (`pyodbc` integration).
- **Pytest:** Thorough end-to-end and unit testing pipelines.

---

##  Project Architecture

```graphql
PureRage/
├── app.py                   # Main Flask Application Entry Point
├── bluesky_api.py           # Integration module for AT Protocol/Bluesky
├── requirements.txt         # Python Package Requirements
├── pyproject.toml           # Project metadata and configurations
├── public/                  # HTML Templates (Served by Flask)
│   ├── battle.html          # Core Battle UI
│   ├── intro.html           # Landing & Authentication UI
│   └── ...            
├── js/                      # Frontend JavaScript
│   ├── battle-ui.js         # Battle Interface & AAA Juice (Particles, Shakes)
│   ├── game-logic/          # OO Design for Character Classes, Abilities, & States
│   └── signin.js            # Auth validation & API Integration
├── css/                     # Application Styles & Animations
├── assets/                  # Media (Battle Audio, Portraits, Sound FX)
├── characters/              # JSON specific configuration per champion/fighter
└── tests/                   # PyTest Suite for routes, APIs, and business logic
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Python 3.12** or higher
- **Node.js / NPM** (Optional, for frontend tooling if expanded)
- **ODBC Driver** (e.g., ODBC Driver 18 for SQL Server) to interface with Azure SQL (optional if strictly using MOCK mode).

### 2. Local Setup & Installation

Clone the repository and spin up your environment:

```bash
git clone https://github.com/YourUsername/PureRage.git
cd PureRage

# Set up a virtual environment (Recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Environment Variables Configuration

The application is highly environment-driven. Create a `.secret.env` file in the root directory and add the necessary configurations to ensure secure behavior:

```env
# Flask Application Security
FLASK_SECRET_KEY=your_highly_secure_random_string

# Database
AZURE_SQL_CONNECTIONSTRING=Driver={ODBC Driver 18 for SQL Server};Server=tcp:YOUR_SERVER.database.windows.net,1433;Database=YOUR_DB;Uid=YOUR_UID;Pwd=YOUR_PWD;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;

# Bluesky API credentials
BLUESKY_HANDLE=your_handle.bsky.social
BLUESKY_APP_PASSWORD=your_app_password
```
*(Note: If `AZURE_SQL_CONNECTIONSTRING` is left blank, misconfigured, or set to "MOCK", the app gracefully falls back to a mocked in-memory database configuration optimized for immediate frontend testing.)*

### 4. Running the Application

Once everything is configured, run the server natively via Flask:

```bash
python app.py
```
Open your browser and navigate to `http://127.0.0.1:5000`. 

---

##  Testing

The codebase maintains automated tests located in the `tests/` directory.

```bash
# Execute unit testing suite using Pytest
pytest
```

---

##  Known Security Considerations (For Contributors)

*Note: Before deploying to production, ensure these items are addressed:*
1. **Mock Security:** Ensure `.secret.env` prevents the application from referencing default fallback keys (like `pure-rage-secret-123`) in production.
2. **Client-Side Validations:** Authentication heavily relies on backend JWTs/Sessions. Always secure client-side checks and ensure API interactions rely solely on server-validated states.

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.
