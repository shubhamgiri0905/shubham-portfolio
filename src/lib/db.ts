import { sql } from "@vercel/postgres";

export async function createTables() {
  // Messages table
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

export async function saveMessage(
  name: string,
  email: string,
  message: string
) {
  await createTables();

  await sql`
    INSERT INTO messages (name, email, message)
    VALUES (${name}, ${email}, ${message});
  `;
}
export async function createVisitTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS visits (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      path TEXT,
      user_agent TEXT,
      referer TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

export async function logVisit(
  path: string,
  userAgent: string | null,
  referer: string | null
) {
  await createVisitTable();

  await sql`
    INSERT INTO visits (path, user_agent, referer)
    VALUES (${path}, ${userAgent}, ${referer});
  `;
}
