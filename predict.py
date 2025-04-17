import warnings
warnings.filterwarnings("ignore", category=UserWarning)

import sys, json, joblib, numpy as np

# load your trained pipeline
model = joblib.load("student_model.pkl")

# read stdin
data = json.loads(sys.stdin.read())

att = data["attendance"]
avg = data["average_grade"]
perf_map = {"poor":0,"below-average": 1,"average":2, "good":3, "excellent":4}
perf = perf_map[data["previous_performance"]]
if att < 40:
    print(json.dumps({"result":"fail","confidence":100.0}))
    sys.exit(0)
X = np.array([[att, avg, perf]])
# 1) get the two‐class probabilities
proba_all = model.predict_proba(X)[0]  # shape (2,)
# 2) extract the “pass” probability
proba_pass = proba_all[1]
# 3) threshold at 0.9 instead of 0.5
pred = "pass" if proba_pass >= 0.9 else "fail"
# 4) build your confidence
conf = round(proba_pass * 100, 2)

print(json.dumps({"result": pred, "confidence": conf}))