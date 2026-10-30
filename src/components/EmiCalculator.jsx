import { useState, useEffect } from "react";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [error, setError] = useState("");

  const isValidNumber = (value) => {
    return value !== "" && !isNaN(value) && Number(value) > 0;
  };

  useEffect(() => {
    if (!loanAmount || !interestRate || !loanTerm) {
      setEmi(null);
      setTotalPayment(null);
      setTotalInterest(null);
      setError("");
      return;
    }

    if (
      !isValidNumber(loanAmount) ||
      !isValidNumber(interestRate) ||
      !isValidNumber(loanTerm)
    ) {
      setError("Please enter valid numeric values greater than 0.");
      setEmi(null);
      setTotalPayment(null);
      setTotalInterest(null);
      return;
    }

    setError("");

    const P = Number(loanAmount);
    const r = Number(interestRate) / 12 / 100; // monthly interest rate
    const n = Number(loanTerm) * 12; // total months

    const calculatedEmi =
      (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const totalPay = calculatedEmi * n;
    const totalInt = totalPay - P;

    setEmi(calculatedEmi.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>EMI Calculator</h2>

        <div style={styles.field}>
          <label>Loan Amount (Rs.)</label>
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="e.g. 500000"
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Annual Interest Rate (%)</label>
          <input
            type="text"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="e.g. 8.5"
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Loan Term (Years)</label>
          <input
            type="text"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="e.g. 5"
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.results}>
          <div style={styles.resultItem}>
            <span>Monthly EMI</span>
            <strong>{emi ? `Rs. ${emi}` : "—"}</strong>
          </div>
          <div style={styles.resultItem}>
            <span>Total Payment</span>
            <strong>{totalPayment ? `Rs. ${totalPayment}` : "—"}</strong>
          </div>
          <div style={styles.resultItem}>
            <span>Total Interest</span>
            <strong>{totalInterest ? `Rs. ${totalInterest}` : "—"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "20px 24px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "16px",
  },
  field: {
    marginBottom: "14px",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  error: {
    color: "#d9534f",
    fontSize: "13px",
    marginTop: "8px",
  },
  results: {
    marginTop: "18px",
    paddingTop: "12px",
    borderTop: "1px solid #eee",
  },
  resultItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "14px",
  },
};