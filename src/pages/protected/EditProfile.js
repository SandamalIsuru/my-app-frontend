import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import PageWrapper from "../../components/common/PageWrapper";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
      <PageWrapper
        isLoading={isLoading}
        content={
          <div
            className={classNames(
              "flex flex-col items-center justify-center text-textPrimary"
            )}
          >
            <PageTitle className={"w-full"} title="Edit" boldTitle="Profile"/>
          </div>
        }
      />
  );
};
export default EditProfile;
