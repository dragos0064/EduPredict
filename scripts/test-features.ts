import { getStudentFeatures } from "../lib/oracle-db";

const test = async () => {
  const features = await getStudentFeatures(1); // Use your student ID
  console.log("Fetched features:", features);
};

test();
