import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { addTransaction, type Transaction } from "../slices/monthsSlice";

export default function MonthDetails() {
  const { id } = useParams<{ id: string }>();
  const month = useSelector((state: RootState) =>
    state.months.find((m) => m.id === id)
  );
  const dispatch = useDispatch<AppDispatch>();

  const [editableTransactions, setEditableTransactions] = useState<
    Transaction[]
  >(month?.transactions ?? []);

  const [newRow, setNewRow] = useState<Transaction>({
    date: "",
    category: "",
    income: 0,
    expense: 0,
    method: "",
    notes: "",
  });

  const handleCellChange = (
    index: number,
    field: keyof Transaction,
    value: string | number
  ) => {
    const updated = [...editableTransactions];
    updated[index] = {
      ...updated[index],
      [field]:
        field === "income" || field === "expense" ? Number(value) : value,
    };
    setEditableTransactions(updated);
  };

  const handleAdd = () => {
    dispatch(addTransaction({ monthId: id!, transaction: newRow }));
    setEditableTransactions([...(month?.transactions ?? []), newRow]);
    setNewRow({
      date: "",
      category: "",
      income: 0,
      expense: 0,
      method: "",
      notes: "",
    });
  };

  const categoryOptions = [
    "",
    "Salary",
    "Freelance",
    "Bonus",
    "Investment Income",
    "Refunds / Reimbursements",
    "Gifts / Donations",
    "Other Income",
    "Rent / Mortgage",
    "Utilities (Electricity, Water, Gas)",
    "Internet / Phone",
    "Insurance (Health, Auto, Home)",
    "Subscriptions (Netflix, Spotify, etc.)",
    "Loan Payments",
    "Tuition",
    "Groceries",
    "Dining Out",
    "Transportation (Gas, Uber, Bus)",
    "Health / Medical",
    "Clothing",
    "Entertainment",
    "Home Maintenance",
    "Pet Care",
    "Beauty / Personal Care",
    "Emergency Fund",
    "Retirement Fund",
    "Stock Investments",
    "Crypto",
    "Travel Savings",
    "Education Savings",
    "Credit Card",
    "Student Loan",
    "Personal Loan",
    "Auto Loan",
    "Other Debt",
    "Gifts Given",
    "Donations",
    "One-Time Purchases",
    "Fees / Penalties",
    "Bank Charges",
  ];

  const paymentMethods = [
    "Cash             ",
    "Credit Card",
    "Bank Transfer",
    "Mobile Payment (Apple Pay, Google Pay)",
    "Debit Card",
    "PayPal",
    "Venmo / Zelle",
    "Crypto",
    "Check",
    "Auto-debit",
  ];

  if (!month) return <div>Month not found</div>;

  return (
    <div className="container">
      <h2 className="title">{month.name} Details</h2>
      <p>
        <strong>Income:</strong> $
        {month.transactions.reduce((sum, t) => sum + t.income, 0)}
      </p>
      <p>
        <strong>Expense:</strong> $
        {month.transactions.reduce((sum, t) => sum + t.expense, 0)}
      </p>
      <p>
        <strong>Total:</strong> $
        {month.transactions.reduce((sum, t) => sum + t.income, 0) -
          month.transactions.reduce((sum, t) => sum + t.expense, 0)}
      </p>
      <p>
        <strong>Saving Goal:</strong> ${month.savingGoal}
      </p>
      <div className="header-container">
        <h3>Transactions</h3>
        <button onClick={handleAdd}>Add Transaction</button>
      </div>

      <table className="transaction-table">
        <thead className="transaction-table-header">
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Method</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {editableTransactions.map((t, i) => (
            <tr key={i}>
              <td>
                <input
                  type="date"
                  value={t.date}
                  onChange={(e) => handleCellChange(i, "date", e.target.value)}
                />
              </td>
              <td>
                <select
                  name="cars"
                  className="neo-select"
                  id="cars"
                  onChange={(e) =>
                    handleCellChange(i, "method", e.currentTarget.value)
                  }
                >
                  {categoryOptions.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={t.income}
                  onChange={(e) =>
                    handleCellChange(i, "income", +e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={t.expense}
                  onChange={(e) =>
                    handleCellChange(i, "expense", +e.target.value)
                  }
                />
              </td>
              <td>
                {/* <input
                  value={t.method}
                  onChange={(e) =>
                    handleCellChange(i, "method", e.target.value)
                  }
                /> */}
                <select
                  name="cars"
                  className="neo-select"
                  id="cars"
                  onChange={(e) =>
                    handleCellChange(i, "method", e.currentTarget.value)
                  }
                >
                  {paymentMethods.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </td>
              <td>
                <input
                  value={t.notes}
                  onChange={(e) => handleCellChange(i, "notes", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th>1110</th>
            <th>1110</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
