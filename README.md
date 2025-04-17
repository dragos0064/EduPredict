
# Student Performance Predictor

A full‑stack web application that allows you to manage student records, run on‑the‑fly ML predictions for pass/fail outcomes, and persist results in an Oracle Database. Built with Next.js, OracleDB (via Node.js), and a scikit‑learn logistic regression model wrapped in Python.




## Tech Stack

**Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Framer Motion

**Backend:** Node.js (TypeScript), Next.js API Routes, OracleDB driver (oracledb)

**Machine Learning:** Python 3.12, scikit‑learn, joblib

**Database:** Oracle Database 21c

**ML Dataset:** UCI Student Performance (augmented with attendance, average grade, previous performance)

## Features

- **Student CRUD** via /api/students
- On‑insert ML Prediction:
    -
    Runs predict.py as a child process
    Sends features → receives { result, confidence }
    Persists into PREDICTIONS table
- Detail Page:
    -
    Fetches latest prediction from /api/predictions/[id]
    Renders “Passing” or “At Risk” badge + confidence

- **Responsive UI** with filtering, sorting, and animations

## Prerequisites
    1. Node.js ≥ 20.0

    2. Python ≥ 3.10

    3. pip install -U scikit-learn pandas joblib numpy

    4. Oracle DB client/config (TNS, SQL Developer)

    5. [Optional] virtualenv for Python environment
## Installation


Clone the repo

```bash
git clone https://github.com/your‑username/student‑performance‑predictor.git
cd student-performance-predictor
```

Install Node.js dependencies

```bash
npm install
```

Install Python dependencies

```bash
cd ml
python -m venv .venv
source .venv/bin/activate      # macOS/Linux
.venv\Scripts\activate         # Windows
pip install -r requirements.txt
```
Database Setup

In SQL Developer (or your preferred client), run:
```bash
ORACLE_USER=your_user
ORACLE_PASSWORD=your_password
ORACLE_CONNECT_STRING=host:1521/service_name
```
    
##  Training the ML Model
Prepare training script at ml/train_model.py. It should:

- Read your CSV (e.g. student-por.csv)

- Encode previous_performance

- Split into train/test

- Build a Pipeline([('scale',StandardScaler()),('clf',LogisticRegression())])

- Fit and joblib.dump(pipeline, 'student_model.pkl')


Run training
```bash
cd ml
python train_model.py
```
This outputs student_model.pkl alongside predict.py.
## Running the Application

Start Next.js Dev Server

```bash
  npm run dev
```
Visits http://localhost:3000 for your web UI.

Add New Student:
- Navigate to Add New Student
- Fill out the form (attendance, average grade, performance)
- On submit, a student row is created and ML prediction runs in background.
View Student:
- Go to the student’s detail page

- See real‑time badge and confidence fetched from /api/predictions/[id]


Start the server




## API ENDPOINTS

#### Get all items

```http
  GET /api/items
```

| METHOD | URL    | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/api/students` | List all students |
| `POST` | `/api/students` | Create a student + trigger ML |
| `GET` | `/api/students/[id]` | 	Fetch one student’s details |
| `GET` | `/api/predictions/[studentId]` | 	Fetch latest ML prediction |




## License

[MIT](https://choosealicense.com/licenses/mit/) © [Dragos Rudencu]

- Feel free to tweak, extend, or adapt for your own student‑prediction projects!

