import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
import joblib

# 1. Load dataset
df = pd.read_csv("student-por.csv", sep=";")  

# 2. Feature Engineering
df["average_grade"] = df[["G1", "G2", "G3"]].mean(axis=1)
df["attendance"] = 100 - df["absences"]
df["attendance"] = df["attendance"].clip(lower=0, upper=100)

def map_performance(g3):
    if g3 >= 16:
        return "excellent"
    elif g3 >= 13:
        return "good"
    elif g3 >= 10:
        return "average"
    else:
        return "poor"

df["previous_performance"] = df["G3"].apply(map_performance)
perf_map = {"poor": 0, "average": 1, "good": 2, "excellent": 3}
df["previous_performance_encoded"] = df["previous_performance"].map(perf_map)

# 3. Define inputs and target
X = df[["attendance", "average_grade", "previous_performance_encoded"]]
y = (df["G3"] >= 10).astype(int)  # pass = 1, fail = 0

# 4. Split and scale
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("clf", LogisticRegression())
])

# 5. Train
pipeline.fit(X_train, y_train)

# 6. Evaluate (optional)
y_pred = pipeline.predict(X_test)
print(classification_report(y_test, y_pred))

# 7. Save the model
joblib.dump(pipeline, "student_model.pkl")
