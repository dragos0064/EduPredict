import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECT_STRING,
};

export interface StudentData {
    attendance: number;
    homeworkCompletion: number;
    testScores: number;
    participation: number;
    previousGrades: number;
  }

export async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    return connection;
  } catch (err) {
    console.error("Error getting Oracle DB connection:", err);
    throw err;
    }
};

export async function getStudentFeatures(studentId: number): Promise<StudentData> {
    const conn = await getConnection();
  
    const [attendanceResult, homeworkResult, testResult, participationResult, gradesResult] = await Promise.all([
      conn.execute(`SELECT present_days, total_days FROM attendance WHERE student_id = :id`, [studentId]),
      conn.execute(`SELECT completed_tasks, total_tasks FROM homework WHERE student_id = :id`, [studentId]),
      conn.execute(`SELECT average_score FROM test_scores WHERE student_id = :id`, [studentId]),
      conn.execute(`SELECT score FROM participation WHERE student_id = :id`, [studentId]),
      conn.execute(`SELECT previous_average FROM grades WHERE student_id = :id`, [studentId]),
    ]);
  
    const attendanceRow = attendanceResult.rows?.[0] as any;
    const homeworkRow = homeworkResult.rows?.[0] as any;
    const testRow = testResult.rows?.[0] as any;
    const participationRow = participationResult.rows?.[0] as any;
    const gradesRow = gradesResult.rows?.[0] as any;
  
    await conn.close();
  
    return {
      attendance: attendanceRow ? attendanceRow.PRESENT_DAYS / attendanceRow.TOTAL_DAYS : 0,
      homeworkCompletion: homeworkRow ? homeworkRow.COMPLETED_TASKS / homeworkRow.TOTAL_TASKS : 0,
      testScores: testRow?.AVERAGE_SCORE || 0,
      participation: participationRow?.SCORE || 0,
      previousGrades: gradesRow?.PREVIOUS_AVERAGE || 0
    };
  }

  export async function logPrediction(studentId: number, result: string, confidence: number): Promise<void> {
    const conn = await getConnection();
  
    await conn.execute(
      `INSERT INTO predictions (student_id, predicted_result, confidence) VALUES (:studentId, :result, :confidence)`,
      [studentId, result, confidence],
      { autoCommit: true }
    );
  
    await conn.close();
  }