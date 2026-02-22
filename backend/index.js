const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("EMS Backend Running");
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    res.send(result);
  });
});
app.get("/employees/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM employees WHERE emp_id = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});
app.post("/employees", (req, res) => {
  db.query("INSERT INTO employees SET ?", req.body, () => {
    res.send("Employee Added");
  });
});

app.put("/employees/:id", (req, res) => {
  db.query(
    "UPDATE employees SET ? WHERE emp_id=?",
    [req.body, req.params.id],
    () => res.send("Employee Updated")
  );
});

app.delete("/employees/:id", (req, res) => {
  db.query(
    "DELETE FROM employees WHERE emp_id=?",
    req.params.id,
    () => res.send("Employee Deleted")
  );
});
// ================= ATTENDANCE ROUTES =================

// Get attendance for a selected date (includes all employees)
app.get("/attendance", (req, res) => {
  const date = req.query.date;

  const query = `
    SELECT 
      e.emp_id,
      e.name,
      IFNULL(a.status, 'Absent') AS status,
      ? AS date
    FROM employees e
    LEFT JOIN attendance a
      ON e.emp_id = a.emp_id
      AND a.date = ?
  `;

  db.query(query, [date, date], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});


// Mark / update attendance (ONE record per employee per day)
app.post("/attendance", (req, res) => {
  const { emp_id, date, status } = req.body;

  const query = `
    INSERT INTO attendance (emp_id, date, status)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE status = ?
  `;

  db.query(
    query,
    [emp_id, date, status, status],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Attendance updated");
    }
  );
});
// ================= REPORTS ROUTES =================

// Date-wise attendance report
app.get("/reports/attendance-by-date", (req, res) => {
  const date = req.query.date;

  const query = `
    SELECT e.emp_id, e.name, a.status
    FROM employees e
    LEFT JOIN attendance a
      ON e.emp_id = a.emp_id
     AND a.date = ?
  `;

  db.query(query, [date], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Employee-wise attendance summary
app.get("/reports/employee-summary", (req, res) => {
  const emp_id = req.query.emp_id;

  const query = `
    SELECT
      SUM(status='Present') AS presentDays,
      SUM(status='Absent') AS absentDays
    FROM attendance
    WHERE emp_id = ?
  `;

  db.query(query, [emp_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result[0]);
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});