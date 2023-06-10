import React from "react";

const ClearCompletedBtn = ({ cleanCompleted }) => {
  return (
    <div>
      <button className="button" onClick={cleanCompleted}>
        Clear completed
      </button>
    </div>
  );
};

export default ClearCompletedBtn;
