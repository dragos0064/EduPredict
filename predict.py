import warnings
warnings.filterwarnings("ignore", category=UserWarning)

import sys, json, joblib, numpy as np

# load your trained pipeline
model = joblib.load("student_model.pkl")

# read stdin
data = json.loads(sys.stdin.read())
att = data["attendance"]
avg = data["average_grade"]
perf_map = {"poor":0,"average":1,"good":2,"excellent":3}
perf = perf_map[data["previous_performance"]]

X = np.array([[att, avg, perf]])
proba = model.predict_proba(X)[0]
pred = "pass" if proba[1]>=0.5 else "fail"
conf = round((proba[1] if pred=="pass" else proba[0])*100, 2)

print(json.dumps({"result": pred, "confidence": conf}))