import React, { useState } from "react";

const questions = [
  { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
  { id: "gender", label: "Gender", type: "radio", options: ["Male", "Female"] },
  { id: "age", label: "Age", type: "number", placeholder: "Enter your age" },
  { id: "height", label: "Height", type: "number", unit: "cm", placeholder: "Enter height in cm" },
  { id: "weight", label: "Weight", type: "number", unit: "kg", placeholder: "Enter weight in kg" },
  { id: "systolic", label: "Systolic Blood Pressure", type: "number", unit: "mmHg", placeholder: "e.g. 120" },
  { id: "diastolic", label: "Diastolic Blood Pressure", type: "number", unit: "mmHg", placeholder: "e.g. 80" },
  { id: "sugar", label: "Blood Sugar", type: "number", unit: "mg/dL", placeholder: "Enter blood sugar" },
  { id: "diabetes", label: "Do you have diabetes?", type: "radio", options: ["Yes", "No"] },
  { id: "medication", label: "Are you currently taking any medication?", type: "radio", options: ["Yes", "No"] }
];

function Sidebar({ active, setActive }) {
  const items = [
    ["dashboard", "⌂", "Dashboard"],
    ["intake", "＋", "Health Intake"],
    ["patients", "♙", "Patients"],
    ["labs", "▣", "Lab Results"],
    ["reports", "▤", "Reports"],
    ["settings", "⚙", "Settings"]
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">✚</div>
        <div>
          <strong>HealthCare</strong>
          <span>Patient Portal</span>
        </div>
      </div>

      <nav>
        {items.map(([id, icon, label]) => (
          <button
            key={id}
            className={active === id ? "nav-item active" : "nav-item"}
            onClick={() => setActive(id)}
          >
            <span>{icon}</span>{label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-box">
          <strong>Need Help?</strong>
          <p>Contact our support team for assistance.</p>
          <button>Contact Support</button>
        </div>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="mobile-title">HealthCare Dashboard</div>
      <div className="header-search">
        <span>⌕</span>
        <input placeholder="Search patients, reports..." />
      </div>
      <div className="header-right">
        <button className="icon-button">♧</button>
        <button className="icon-button notification">●<small>2</small></button>
        <div className="profile">
          <div className="avatar">U</div>
          <div>
            <strong>User</strong>
            <span>Patient</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({ icon, title, value, text }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>
        <span className="trend">↗</span>
      </div>
      <p>{title}</p>
      <h2>{value}</h2>
      <span className="stat-text">{text}</span>
    </div>
  );
}

function DashboardHome({ onStart }) {
  return (
    <>
      <div className="welcome">
        <div>
          <span className="eyebrow">HEALTH OVERVIEW</span>
          <h1>Welcome back 👋</h1>
          <p>Keep your health information up to date and track your latest results.</p>
        </div>
        <button className="primary-button" onClick={onStart}>＋ Start New Intake</button>
      </div>

      <div className="stats-grid">
        <StatCard icon="♙" title="Patients" value="120" text="+12% this month" />
        <StatCard icon="▣" title="Lab Tests" value="45" text="8 pending results" />
        <StatCard icon="♥" title="Health Reports" value="32" text="5 new reports" />
        <StatCard icon="◷" title="Appointments" value="18" text="3 scheduled today" />
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Health & Lab Intake</h2>
              <p>Start a new health questionnaire for a patient.</p>
            </div>
            <span className="status-badge">Ready</span>
          </div>
          <div className="intake-card">
            <div className="intake-illustration">✚</div>
            <div>
              <h3>Complete your health profile</h3>
              <p>Answer a few questions about your basic health information, blood pressure, blood sugar and medication.</p>
              <button className="primary-button" onClick={onStart}>Start New Intake</button>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Your latest health updates.</p>
            </div>
            <button className="text-button">View all</button>
          </div>
          <div className="activity-list">
            <div className="activity"><span className="activity-icon">✓</span><div><strong>Health intake completed</strong><small>Today, 10:30 AM</small></div></div>
            <div className="activity"><span className="activity-icon">▣</span><div><strong>Blood test report added</strong><small>Yesterday, 4:20 PM</small></div></div>
            <div className="activity"><span className="activity-icon">♥</span><div><strong>Health report generated</strong><small>Sep 10, 2:15 PM</small></div></div>
          </div>
        </section>
      </div>
    </>
  );
}

function IntakeModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const visibleQuestions = questions.filter(
    q => !(q.id === "medicationDetails")
  );

  const current = visibleQuestions[step];
  const isLast = step === visibleQuestions.length - 1;
  const currentValue = answers[current?.id] || "";

  function update(value) {
    setAnswers(prev => ({ ...prev, [current.id]: value }));
  }

  function next() {
    if (!currentValue) return;
    if (isLast) {
      setSubmitted(true);
      return;
    }
    setStep(s => s + 1);
  }

  function back() {
    if (step === 0) onClose();
    else setStep(s => s - 1);
  }

  if (submitted) {
    return (
      <div className="modal-overlay">
        <div className="modal success-modal">
          <div className="success-icon">✓</div>
          <h2>Health Intake Completed</h2>
          <p>Your health information has been successfully recorded.</p>
          <div className="summary">
            <div><span>Name</span><strong>{answers.name}</strong></div>
            <div><span>Gender</span><strong>{answers.gender}</strong></div>
            <div><span>Age</span><strong>{answers.age}</strong></div>
            <div><span>Height</span><strong>{answers.height} cm</strong></div>
            <div><span>Weight</span><strong>{answers.weight} kg</strong></div>
            <div><span>Blood Pressure</span><strong>{answers.systolic}/{answers.diastolic} mmHg</strong></div>
            <div><span>Blood Sugar</span><strong>{answers.sugar} mg/dL</strong></div>
            <div><span>Diabetes</span><strong>{answers.diabetes}</strong></div>
            <div><span>Medication</span><strong>{answers.medication}</strong></div>
          </div>
          {answers.medication === "Yes" && (
            <div className="medication-note">
              Medication details can be collected in the next screen.
            </div>
          )}
          <button className="primary-button full" onClick={onClose}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-header">
          <span className="eyebrow">HEALTH INTAKE</span>
          <h2>{current.label}</h2>
          <p>Question {step + 1} of {visibleQuestions.length}</p>
        </div>

        <div className="progress">
          <div style={{ width: `${((step + 1) / visibleQuestions.length) * 100}%` }} />
        </div>

        <div className="question-area">
          {current.type === "radio" ? (
            <div className="radio-list">
              {current.options.map(option => (
                <label key={option} className={currentValue === option ? "radio-option selected" : "radio-option"}>
                  <input
                    type="radio"
                    name={current.id}
                    value={option}
                    checked={currentValue === option}
                    onChange={e => update(e.target.value)}
                  />
                  <span className="custom-radio" />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <div className="input-with-unit">
              <input
                autoFocus
                type={current.type}
                value={currentValue}
                placeholder={current.placeholder}
                onChange={e => update(e.target.value)}
                onKeyDown={e => e.key === "Enter" && next()}
              />
              {current.unit && <span>{current.unit}</span>}
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="secondary-button" onClick={back}>{step === 0 ? "Cancel" : "← Back"}</button>
          <button className="primary-button" disabled={!currentValue} onClick={next}>
            {isLast ? "Submit Intake ✓" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SimplePage({ title, description }) {
  return (
    <div className="empty-page">
      <div className="empty-icon">▣</div>
      <h1>{title}</h1>
      <p>{description}</p>
      <button className="primary-button">Coming Soon</button>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [showIntake, setShowIntake] = useState(false);

  function navigate(id) {
    if (id === "intake") setShowIntake(true);
    else setActive(id);
  }

  return (
    <div className="app">
      <Sidebar active={active} setActive={navigate} />
      <main className="main">
        <Header />
        <div className="page">
          {active === "dashboard" && <DashboardHome onStart={() => setShowIntake(true)} />}
          {active === "patients" && <SimplePage title="Patients" description="Manage patient profiles and health information." />}
          {active === "labs" && <SimplePage title="Lab Results" description="View and manage laboratory test results." />}
          {active === "reports" && <SimplePage title="Reports" description="View generated health and medical reports." />}
          {active === "settings" && <SimplePage title="Settings" description="Manage your dashboard preferences." />}
        </div>
      </main>
      {showIntake && <IntakeModal onClose={() => setShowIntake(false)} />}
    </div>
  );
}