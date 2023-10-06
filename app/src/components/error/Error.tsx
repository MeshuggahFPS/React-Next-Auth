import React, { FC } from "react";

const ErrorMessage: FC<IError> = ({ message }) => {
  return (
    <div className="bg-red-500 text-white pl-2 pr-2 mt-1 rounded">
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
