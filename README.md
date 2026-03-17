# WebDevGuide

> **Learn Full-Stack Web Development the Right Way**

A comprehensive, interactive learning platform that teaches you modern web development from fundamentals to advanced concepts. Master frontend, backend, and everything in between with hands-on guides, interactive examples, and real-world best practices.

## 🌟 What You'll Learn

- **Frontend Development**: React, Next.js, responsive design, and state management
- **Backend Development**: Flask, REST APIs, authentication, database design, and deployment
- **Full-Stack Integration**: Connect frontend and backend seamlessly
- **Best Practices**: Error handling, testing, security, and production deployment
- **Modern Concepts**: JWT authentication, CORS, API design, and more

## 🚀 Tech Stack

- **Frontend**: Next.js with React
- **Backend**: Flask with Python
- **Database**: SQLite (easily extensible)
- **Deployment**: Docker & Docker Compose ready

---

## ⚡ Quick Start with Docker (All Platforms)

The easiest way to get started on **Windows, Linux, or macOS**:

```bash
# Clone the repository
git clone <repository-url>
cd webdevguide

# Start both frontend and backend
docker-compose up --build
```

Then open your browser to `http://localhost:3000`

---

## 📋 Manual Setup by Platform

### Windows

#### Prerequisites
- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js 16+](https://nodejs.org/)
- [Git](https://git-scm.com/)

#### Backend Setup (Flask)
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server (runs on http://localhost:5000)
python app.py
```

#### Frontend Setup (Next.js)
```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev
```

---

### Linux (Ubuntu/Debian)

#### Prerequisites
```bash
# Update package manager
sudo apt update

# Install Python and Node.js
sudo apt install python3 python3-venv python3-pip nodejs npm git
```

#### Backend Setup (Flask)
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server (runs on http://localhost:5000)
python app.py
```

#### Frontend Setup (Next.js)
```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev
```

---

### macOS

#### Prerequisites (Using Homebrew)
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python and Node.js
brew install python@3.11 node git
```

#### Backend Setup (Flask)
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server (runs on http://localhost:5000)
python app.py
```

#### Frontend Setup (Next.js)
```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev
```

---

## 🎯 Verify Installation

Once both servers are running, you should see:
- **Frontend**: `http://localhost:3000` - Interactive learning interface
- **Backend API**: `http://localhost:5000/api` - RESTful API endpoints

---

## 📚 Project Structure

```
webdevguide/
├── frontend/          # Next.js React application
├── backend/           # Flask Python backend
├── docker-compose.yml # Multi-container setup
└── README.md          # This file
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory for custom configuration:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
FLASK_ENV=development
CORS_ORIGINS=http://localhost:3000
```

---

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
pip install pytest
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 🌐 Deployment

The project is Docker-ready for production deployment. Use `docker-compose.yml` for local development and deploy using Docker containers in production environments.

---

## 📖 Documentation

For detailed guides on specific topics, check the inline documentation in:
- `backend/` - API endpoints and backend architecture
- `frontend/` - Component structure and frontend concepts

---

## 💡 Tips for Learning

1. **Follow the guides** in order - they build on each other
2. **Try the examples** - modify code and see what happens
3. **Test your understanding** - complete the practice exercises
4. **Build projects** - apply knowledge to real-world scenarios

---

## 📄 License

See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please ensure all tests pass before submitting pull requests.

---

**Happy learning! Start with the Quick Start section above.** 🚀
