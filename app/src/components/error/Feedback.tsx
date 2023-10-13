import React, { FC } from "react";
import { IFeedback } from "./Feedback.types";

const FeedbackMessage: FC<IFeedback> = ({ type, message }) => {
  if (type === 'success') return (
    <div className="bg-green-500 text-white pl-2 pr-2 mt-1 rounded">
      <span>{message}</span>
    </div>
  );

  return (
    <div className="bg-red-500 text-white pl-2 pr-2 mt-1 rounded">
      <span>{message}</span>
    </div>
  );
};

export default FeedbackMessage;
