import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { addMonth, updateMonth, type Month } from "../slices/monthsSlice";

export default function Home() {
  const months = useSelector((state: RootState) => state.months);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAddNewRow = () => {
    const newMonth: Month = {
      id: Date.now().toString(),
      name: "",
      income: 0,
      expense: 0,
      savingGoal: 0,
      transactions: [],
    };
    dispatch(addMonth(newMonth));
  };

  const handleCellChange = (
    index: number,
    field: keyof Month,
    value: string | number
  ) => {
    const updated = {
      ...months[index],
      [field]:
        field === "income" || field === "expense" || field === "savingGoal"
          ? Number(value)
          : value,
    };
    dispatch(updateMonth({ index, updatedMonth: updated }));
  };

  return (
    <div className="container">
      <div className="header-container">
        <h1 className="title">Monthly Budget Overview</h1>
        <button onClick={handleAddNewRow}>+ Add New Month</button>
      </div>

      <table className="month-table">
        <thead className="transaction-table-header">
          <tr>
            <th>Month Name</th>
            <th>Total Income</th>
            <th>Total Expense</th>
            <th>Saving Goal</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month, i) => (
            <tr key={month.id}>
              <td>
                <input
                  value={month.name}
                  onChange={(e) => handleCellChange(i, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={month.income}
                  onChange={(e) =>
                    handleCellChange(i, "income", +e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={month.expense}
                  onChange={(e) =>
                    handleCellChange(i, "expense", +e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={month.savingGoal}
                  onChange={(e) =>
                    handleCellChange(i, "savingGoal", +e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => navigate(`/month/${month.id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
