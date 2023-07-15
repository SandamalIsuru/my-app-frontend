import React from "react";
import classNames from "classnames";

const LabelText = ({ className, value }) => {
  return (
    <div className={classNames("flex flex-col mt-3 mb-8 w-full", className)}>
      <div>
        <label className="text-[14px] mr-[5.67px] mt-3">
          {value ? value : "--"}
        </label>
      </div>
    </div>
  );
};

export default LabelText;
