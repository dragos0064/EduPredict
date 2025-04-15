import { getStudentFeatures, logPrediction } from "../lib/oracle-db";
import { predictStudentOutcome } from "../lib/ml-model";

async function runPrediction() {
  const studentId = 1;

  const features = await getStudentFeatures(studentId);
  const prediction = predictStudentOutcome(features);

  console.log(" Prediction:", prediction);

  await logPrediction(studentId, prediction.outcome, prediction.confidence);
  console.log(" Logged to Oracle!");
}

runPrediction();