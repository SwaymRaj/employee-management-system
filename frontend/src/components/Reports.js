import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Reports() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const generatedOn = new Date().toLocaleString();

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((res) => setTotalEmployees(res.data.length))
      .catch(() => setTotalEmployees(0));
  }, []);


  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Employee Management System", 20, 20);

    doc.setFontSize(14);
    doc.text("System Report", 20, 35);
doc.line(20, 38, 190, 38);

doc.setFontSize(13);
doc.text("Summary", 20, 48);
    doc.setFontSize(11);
    doc.text(`• Total Employees: ${totalEmployees}`, 20, 55);
    doc.text("• Attendance Status: System Active", 20, 65);
    doc.text("• Generated on: " + generatedOn, 20, 75);

    doc.save("EMS_Report.pdf");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Reports</h1>

      <p style={{ color: "#555", marginBottom: "20px" }}>
        Generate official system reports for review and submission.
      </p>
<div
  style={{
    background: "#f9fafb",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #e5e7eb",
  }}
>
  <p><strong>Total Employees:</strong> {totalEmployees}</p>
  <p><strong>System Status:</strong> Operational</p>
  <p><strong>Last Generated:</strong> {generatedOn}</p>
</div>
      <button
        onClick={generatePDF}
        style={{
          padding: "12px 18px",
          backgroundColor: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Download PDF Report
      </button>
    </div>
  );
}

export default Reports;