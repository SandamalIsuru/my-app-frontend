import classNames from "classnames";
import React from "react";

const PopupWrapper = ({ content }) => {
  return (
    <div
      className={classNames(
        "flex absolute items-center justify-center top-0 bottom-0 w-full min-h-screen backdrop-blur-md"
      )}
    >
      <div>{content}</div>
    </div>
  );
};

export default PopupWrapper;
