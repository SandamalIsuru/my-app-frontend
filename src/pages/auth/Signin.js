import { Checkbox, Divider } from "@mui/material";
import classNames from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { signInWithEmailAndPassword } from "firebase/auth";
import PageWrapper from "../../components/common/PageWrapper";
import PasswordTextInput from "../../components/common/PasswordTextInput";
import SubmitButton from "../../components/common/SubmitButton";
import TextInput from "../../components/common/TextInput";
import { PASSWORD_POLICY } from "../../config/Constants";
import { auth } from "../../firebase";
import {
  setKeepLoggedInInBrowserCookies,
  setUserAuthInLocalStorage,
  setUserInLocalStorage,
} from "../../utils/UserUtill";
import { mapAuthCodeToMessage } from "../../utils/AuthUtils";

YupPassword(Yup);

const signinSchema = Yup.object().shape({
  userId: Yup.string().email("Invalid user id").required("User id is required"),
  password: Yup.string().required(PASSWORD_POLICY.REQUIRED_POLICY),
});

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const isSignInDisabled = (values, errors) => {
    return (
      values.userId === "" ||
      values.password === "" ||
      errors.userId ||
      errors.password
    );
  };

  const onClickSignUp = () => {
    navigate("/signup");
  };

  return (
    <PageWrapper
      isLoading={isLoading}
      content={
        <div
          className={classNames(
            "flex flex-col items-center justify-center text-textPrimary w-screen h-full"
          )}
        >
          <div className="w-1/2">
            <Formik
              initialValues={{ userId: "", password: "" }}
              initialErrors={
                isInvalidCredentials ? { userId: "", password: "" } : {}
              }
              enableReinitialize={true}
              validationSchema={signinSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={async (values, { resetForm }) => {
                setIsLoading(true);
                signInWithEmailAndPassword(auth, values.userId, values.password)
                  .then((useCredentials) => {
                    setUserInLocalStorage({
                      uid: useCredentials.user.uid,
                      email: useCredentials.user.email,
                    });
                    setUserAuthInLocalStorage({
                      accessToken: useCredentials.user.accessToken,
                      refreshToken: useCredentials._tokenResponse.refreshToken,
                    });
                    setKeepLoggedInInBrowserCookies(keepLoggedIn);
                    setIsLoading(false);
                    navigate("/my-contacts");
                  })
                  .catch((error) => {
                    console.log("ERROR: ", error);
                    setIsInvalidCredentials(true);
                    setErrorText(mapAuthCodeToMessage(error.code));
                    setIsLoading(false);
                  });
              }}
            >
              {({ errors, values }) => (
                <Form className="flex flex-col justify-center items-center">
                  <div className="text-5xl mb-5 font-light text-center">
                    <span>Welcome to </span>
                    <span className="font-bold">myApp</span>
                  </div>
                  <Divider className="bg-dividerColor w-1/5 h-1" />
                  <div className="flex flex-col form-group w-full lg:items-end mt-7">
                    <div className="lg:w-2/3">
                      <div className="flex xxs:flex-col lg:flex-row justify-center items-center mb-2">
                        <div className="xxs:w-full flex lg:justify-center lg:w-1/5">
                          User ID*
                        </div>
                        <div className="xxs:w-full lg:w-4/5">
                          <Field name="userId" autoComplete="email">
                            {({ field, form: { touched, errors } }) => (
                              <TextInput
                                type="email"
                                className={"mt-2"}
                                placeholder="User ID"
                                field={field}
                                touched={touched[field.name]}
                                error={
                                  (touched[field.name] && errors[field.name]) ||
                                  isInvalidCredentials
                                }
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            component="div"
                            name="userId"
                            className="invalid-feedback text-errorRed text-[12px]"
                          />
                        </div>
                      </div>
                      <div className="flex xxs:flex-col lg:flex-row items-center">
                        <div className="flex xxs:w-full lg:justify-center lg:w-1/5">
                          Password*
                        </div>
                        <div className="xxs:w-full lg:w-4/5">
                          <Field
                            name="password"
                            autoComplete="current-password"
                          >
                            {({ field, form: { touched, errors } }) => (
                              <PasswordTextInput
                                className={"mt-2"}
                                placeholder="Password"
                                field={field}
                                error={
                                  (touched[field.name] && errors[field.name]) ||
                                  isInvalidCredentials
                                }
                              />
                            )}
                          </Field>
                          <div className="w-full">
                            <ErrorMessage
                              component="div"
                              name="password"
                              className=" text-errorRed text-[12px]"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex lg:justify-center items-center mt-2">
                        <div className="flex justify-center lg:w-1/5"></div>
                        <div className="flex items-center w-4/5">
                          <Checkbox
                            checked={keepLoggedIn}
                            onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                            style={{ marginLeft: -10 }}
                          />
                          <div>Keep me logged in</div>
                        </div>
                      </div>
                      <div className="flex lg:justify-center items-center mt-2">
                        <div className="flex justify-center lg:w-1/5"></div>
                        <div className="flex items-center xxs:w-full lg:w-4/5">
                          <SubmitButton
                            className={classNames(
                              "py-3 xxs:w-full lg:w-[165px] mt-[24px]",
                              `${
                                !isSignInDisabled(values, errors)
                                  ? "bg-primary text-white "
                                  : "bg-disableColor text-textGray"
                              }`
                            )}
                            label={"LOGIN"}
                            disabled={isSignInDisabled(values, errors)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center mt-[24px]">
                    <span className="text-xs font-normal text-textGray">
                      {"No account? "}
                      <span
                        className="underline text-xs font-normal text-textGray underline cursor-pointer ml-[1px]"
                        onClick={onClickSignUp}
                      >
                        {"Register here."}
                      </span>
                    </span>
                  </div>
                  {isInvalidCredentials && (
                    <div className="flex justify-center items-center text-whiteSmoke rounded-md mt-[24px] bg-errorRed py-2 px-6">
                      {errorText}
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      }
    />
  );
};
export default Signin;
