import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="outer-bar w-[200px] h-3.5 bg-td1/40 rounded-md overflow-hidden">
      <div
        className="inner-bar h-3.5 bg-td1 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
