import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div style={{ width: `${progress}%` }} className="progress-bar-fill"></div>
    </div>
  );
};

export default ProgressBar;
