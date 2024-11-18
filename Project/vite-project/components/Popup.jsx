import React, { useEffect, useState } from "react";
import "../src/index.css";

// LoadingPopup component displays a warning with a countdown
const LoadingPopup = ({ onClose }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      onClose();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [countdown, onClose]);

  const handleClose = () => {
    clearTimeout();
    onClose();
  };

  return (
    <div className="loading-popup">
      {" "}
      <div className="popup-content">
        {" "}
        <h2>Warning: Color Intensity</h2>
        <p>
          This page contains vibrant colors that may be irritating. To make it
          easier on the eyes, we suggest switching to Dark Mode.
        </p>
        <p>{`The popup will close in ${countdown} seconds.`}</p>{" "}
        <button className="close-button" onClick={handleClose}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default LoadingPopup;
