import classNames from "classnames";
import React from "react";

const PopupWrapper = ({ content }) => {
  return (
    <div
      className={classNames(
        "flex absolute items-center justify-center top-0 w-full h-full backdrop-blur-md"
      )}
    >
      {content}
    </div>
  );
};

export default PopupWrapper;
