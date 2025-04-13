import { getConnection } from "@/lib/oracle-db";

async function testConnection() {
  try {
    const conn = await getConnection();
    const result = await conn.execute("SELECT * FROM students");
    console.log(" Students:");
    console.table(result.rows);

    await conn.close();
  } catch (err) {
    console.error(" Failed to connect or query:", err);
  }
}

testConnection();