import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import CircularSpinner from "./CircularSpinner";
import { AppContext } from "../../appContexts";
import backgroundImage from "../../assets/images/background.jpeg";
import PopupWrapper from "./PopupWrapper";

const PageWrapper = ({ className, content, isLoading }) => {
  const { popup, setPopup } = useContext(AppContext);

  useEffect(() => {
    setPopup(null);
  }, [setPopup]);

  useEffect(() => {
    let popup = null;
    if (isLoading) {
      popup = (
        <div className="flex flex-col items-center justify-center w-[500px] h-[500px]">
          <div
            className="flex justify-center items-center w-full h-full bg-grayBackground overflow-x-auto"
            onContextMenu={(e) => e.preventDefault()}
          >
            <CircularSpinner size={60} />
          </div>
        </div>
      );
    }
    setPopup(popup);
  }, [isLoading, setPopup]);

  return (
    <div
      className={classNames(className, "h-full w-full")}
    >
      {content}
      {popup && <PopupWrapper content={<>{popup}</>} />}
    </div>
  );
};

export default PageWrapper;
