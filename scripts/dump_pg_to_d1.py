import os
import json
from datetime import date, datetime

import psycopg2
from psycopg2.extras import RealDictCursor

TABLES = [
    "project",
    "blogpost",
    "skill",
    "timelineevent",
    "educationentry",
    "award",
    "tool",
    "hobby",
    "sitesetting",
    "sectionvisibility",
]

DATABASE_URL = os.environ["DATABASE_URL"]


def esc(value):
    if value is None:
        return "NULL"
    if isinstance(value, bool):
        return "1" if value else "0"
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, (datetime, date)):
        return "'" + value.isoformat() + "'"
    if isinstance(value, (list, dict)):
        value = json.dumps(value)
    return "'" + str(value).replace("'", "''") + "'"


def main():
    conn = psycopg2.connect(DATABASE_URL)
    conn.set_client_encoding("UTF8")
    cur = conn.cursor(cursor_factory=RealDictCursor)

    lines = []
    for table in TABLES:
        cur.execute(f'SELECT * FROM "{table}" ORDER BY "id"')
        rows = cur.fetchall()
        lines.append(f"-- {table}: {len(rows)} rows")
        for row in rows:
            cols = ", ".join(f'"{c}"' for c in row.keys())
            vals = ", ".join(esc(v) for v in row.values())
            lines.append(f'INSERT INTO "{table}" ({cols}) VALUES ({vals});')
        lines.append("")

    cur.close()
    conn.close()

    with open("migrations/0002_data.sql", "w") as f:
        f.write("\n".join(lines))
    print("Wrote migrations/0002_data.sql")


if __name__ == "__main__":
    main()