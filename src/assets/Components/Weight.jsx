import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Weight = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [entries, setEntries] = useState([]);
  const [goal, setGoal] = useState(0);
  const [pregnancyWeek, setPregnancyWeek] = useState(1);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('weightEntries');
    if (savedData) setEntries(JSON.parse(savedData));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('weightEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weight) return;

    const newEntry = {
      date: new Date().toLocaleDateString(),
      weight: parseFloat(weight),
      unit,
      week: pregnancyWeek
    };

    setEntries([...entries, newEntry]);
    setWeight('');
  };

  const deleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  // Chart data
  const chartData = {
    labels: entries.map(entry => `Week ${entry.week}`),
    datasets: [
      {
        label: `Weight (${unit})`,
        data: entries.map(entry => entry.weight),
        borderColor: 'rgb(139, 95, 191)',
        backgroundColor: 'rgba(139, 95, 191, 0.1)',
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} ${unit}`
        }
      }
    }
  };

  // Calculate BMI (optional)
  const calculateBMI = (height) => {
    if (!height || !entries.length) return null;
    const latestWeight = entries[entries.length - 1].weight;
    const heightInMeters = unit === 'kg' ? height / 100 : height * 0.0254;
    return (latestWeight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  return (
    <div className="weight-tracker-container">
      <header className="tracker-header">
        <h1>Pregnancy Weight Tracker</h1>
        <p>Monitor your healthy weight gain journey</p>
      </header>

      <div className="tracker-card">
        <form onSubmit={handleSubmit} className="weight-form">
          <div className="input-group">
            <label>Current Weight:</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              step="0.1"
              min="30"
              max="200"
              placeholder={`Enter weight in ${unit}`}
              required
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Unit:</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>

            <div className="input-group">
              <label>Pregnancy Week:</label>
              <input
                type="number"
                value={pregnancyWeek}
                onChange={(e) => setPregnancyWeek(e.target.value)}
                min="1"
                max="42"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Goal Weight (optional):</label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder={`Target in ${unit}`}
            />
          </div>

          <button type="submit" className="submit-btn">
            Log Weight
          </button>
        </form>

        {entries.length > 0 && (
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}

        <div className="entries-list">
          <h3>Your Entries</h3>
          {entries.length === 0 ? (
            <p className="empty-state">No entries yet. Log your first weight!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Weight</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.week}</td>
                    <td>
                      {entry.weight} {entry.unit}
                    </td>
                    <td>{entry.date}</td>
                    <td>
                      <button
                        onClick={() => deleteEntry(index)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="medical-guidelines">
        <h3>Healthy Pregnancy Weight Gain</h3>
        <ul>
          <li>
            <strong>Underweight (BMI {'<'} 18.5):</strong> 12.5-18 kg (28-40 lbs)
          </li>
          <li>
            <strong>Normal weight (BMI 18.5-24.9):</strong> 11.5-16 kg (25-35 lbs)
          </li>
          <li>
            <strong>Overweight (BMI 25-29.9):</strong> 7-11.5 kg (15-25 lbs)
          </li>
          <li>
            <strong>Obese (BMI ≥ 30):</strong> 5-9 kg (11-20 lbs)
          </li>
        </ul>
        <p className="disclaimer">
          <i className="fas fa-exclamation-triangle"></i> Always consult your
          doctor about weight changes during pregnancy.
        </p>
      </div>
    </div>
  );
};

export default Weight;