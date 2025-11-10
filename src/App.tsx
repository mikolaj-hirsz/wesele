import React from "react";

const App: React.FC = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Wesele Wiktorii i Mikołaja</h1>
        <p style={styles.subtitle}>Strona w budowie 💍</p>
        <p style={styles.text}>Zapraszamy już wkrótce!</p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    background: "linear-gradient(135deg, #ffe6eb 0%, #fff0f5 40%, #fdf2f8 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "16px",
    padding: "2.5rem 3rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "2.8rem",
    marginBottom: "0.75rem",
    color: "#a04e65",
    fontFamily: "'Playfair Display', serif",
  },
  subtitle: {
    fontSize: "1.6rem",
    marginBottom: "0.5rem",
    color: "#5a2a4a",
    fontFamily: "'Raleway', sans-serif",
  },
  text: {
    fontSize: "1.1rem",
    color: "#444",
  },
};

export default App;
