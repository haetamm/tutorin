import React from "react";

const Load = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.loader}></div>
    </div>
  );
};

const styles = {
  overlay: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  loader: {
    width: "50px",
    height: "50px",
    border: "6px solid #fff",
    borderTop: "6px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default Load;
