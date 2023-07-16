import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PageTitle from "../../components/common/PageTitle";
import PageWrapper from "../../components/common/PageWrapper";
import { addUser, getUser, updateUser } from "../../apis/Api";
import {
  getBirthYears,
  getFormikInitialUserSchema,
  getUserAttributeFromLocalStorage,
} from "../../utils/UserUtill";
import {
  GENDER,
  MARITAL_STATUS,
  MARRIED,
  MOBILE_NUMBER_REG_EXP,
  myProfileTabs,
  SALUTATIONS,
  USER_ATTRIBUTES,
} from "../../config/Constants";
import { Form, Formik } from "formik";
import SubmitButton from "../../components/common/SubmitButton";
import ValidatedDropdown from "../../components/common/ValidatedDropdown";
import LabelText from "../../components/common/LabelText";
import ValidatedTextInput from "../../components/common/ValidatedTextInput";
import ImageUpload from "../../components/common/ImageUpload";
import { storage } from "../../firebase";
import { addLeadingZero, notify } from "../../utils/CommonUtils";
import useWindowSize from "../../hooks/useWindowSize";

const basicDetailsSchema = Yup.object().shape({
  salutation: Yup.string().required("Please select your salutation"),
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid user id")
    .required("Please enter your email"),
});

const additionalDetailsSchema = Yup.object().shape({
  mobileNo: Yup.string()
    .matches(MOBILE_NUMBER_REG_EXP, "Phone number is not valid")
    .min(10, "Mobile Numbe must be 10 characters at minimum")
    .required("Mobile Number is required"),
  address: Yup.string().required("Please enter your address"),
  postalCode: Yup.string().required("Please enter your postal code"),
  nationality: Yup.string().required("Please enter your nationality"),
  birthDate: Yup.number(),
  birthMonth: Yup.number(),
  birthYear: Yup.number(),
  gender: Yup.string(),
  maritalStatus: Yup.string(),
});

const spouseDetailsSchema = Yup.object().shape({
  spouseSalutation: Yup.string(),
  spouseFName: Yup.string(),
  spouseLName: Yup.string(),
});

const personalPreferencesSchema = Yup.object().shape({
  hobbiesAndInterests: Yup.string(),
  favoriteSports: Yup.string(),
  preferredMusicgenres: Yup.string(),
  preferredMovieOrTVshows: Yup.string(),
});

const getSchema = (selectedTab) => {
  switch (selectedTab) {
    case 0:
      return basicDetailsSchema;
    case 1:
      return additionalDetailsSchema;
    case 2:
      return spouseDetailsSchema;
    case 3:
      return personalPreferencesSchema;
    default:
      return null;
  }
};

const days = [...Array(31).keys()].map((element) => {
  return {
    value: addLeadingZero(element + 1),
    label: addLeadingZero(element + 1),
  };
});

const months = [...Array(12).keys()].map((element) => {
  return {
    value: addLeadingZero(element + 1),
    label: addLeadingZero(element + 1),
  };
});

const renderBasicDetails = (user, isEditing) => {
  return (
    <div className="w-full">
      <label className="text-[14px] font-bold">Salutation *</label>
      {isEditing ? (
        <ValidatedDropdown
          fieldName={"salutation"}
          options={SALUTATIONS}
          placeholder="Select salutation"
        />
      ) : (
        <LabelText value={user.salutation} />
      )}
      <label className="text-[14px] font-bold">First Name *</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"firstName"} />
      ) : (
        <LabelText value={user.fname} />
      )}
      <label className="text-[14px] font-bold">Last Name *</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"lastName"} />
      ) : (
        <LabelText value={user.lname} />
      )}
      <label className="text-[14px] font-bold">Email *</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"email"} />
      ) : (
        <LabelText value={user.email} />
      )}
    </div>
  );
};

const renderAdditionalDetails = (
  user,
  isEditing,
  handleMaritalStatusChange
) => {
  return (
    <div>
      <label className="text-[14px] font-bold">Mobile Number *</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"mobileNo"} />
      ) : (
        <LabelText value={user.mobile} />
      )}
      <label className="text-[14px] font-bold">Home Address *</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"address"} />
      ) : (
        <LabelText value={user.address} />
      )}
      <label className="text-[14px] font-bold">Country *</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"country"} />
      ) : (
        <LabelText value={user.country} />
      )}
      <label className="text-[14px] font-bold">Postal Code *</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"postalCode"} />
      ) : (
        <LabelText value={user.postalCode} />
      )}
      <label className="text-[14px] font-bold">Nationality *</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"nationality"} />
      ) : (
        <LabelText value={user.nationality} />
      )}
      <label className="text-[14px] font-bold">Date of Birth</label>
      {isEditing ? (
        <div className="flex xxs:flex-col sm:justify-between">
          <ValidatedDropdown
            fieldName={"birthMonth"}
            options={months}
            placeholder="MM"
            className={""}
          />
          <ValidatedDropdown
            fieldName={"birthDate"}
            className={"sm:mx-2"}
            options={days}
            placeholder="DD"
          />
          <ValidatedDropdown
            fieldName={"birthYear"}
            className={""}
            options={getBirthYears()}
            placeholder="YYYY"
          />
        </div>
      ) : (
        <LabelText value={user.dob} />
      )}
      <label className="text-[14px] font-bold">Gender</label>
      {isEditing ? (
        <ValidatedDropdown
          fieldName={"gender"}
          options={GENDER}
          placeholder="Select gender"
        />
      ) : (
        <LabelText value={user.gender} />
      )}
      <label className="text-[14px] font-bold">Marital Status</label>
      {isEditing ? (
        <ValidatedDropdown
          fieldName={"maritalStatus"}
          options={MARITAL_STATUS}
          placeholder="Select marital status"
          handleChange={handleMaritalStatusChange}
        />
      ) : (
        <LabelText value={user.maritalStatus} />
      )}
    </div>
  );
};

const renderSpouseDetails = (user, isEditing) => {
  return (
    <div className="w-full">
      <label className="text-[14px] font-bold">Salutation</label>
      {isEditing ? (
        <ValidatedDropdown
          fieldName={"spouseSalutation"}
          options={SALUTATIONS}
          placeholder="Select salutation"
        />
      ) : (
        <LabelText value={user.spouseSalutation} />
      )}
      <label className="text-[14px] font-bold">First Name</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"spouseFName"} />
      ) : (
        <LabelText value={user.spouseFName} />
      )}
      <label className="text-[14px] font-bold">Last Name</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"spouseLName"} />
      ) : (
        <LabelText value={user.spouseLName} />
      )}
    </div>
  );
};

const renderPersonalPreferences = (user, isEditing) => {
  return (
    <div className="w-full">
      <label className="text-[14px] font-bold">Hobbies and Interests</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"hobbiesAndInterests"} />
      ) : (
        <LabelText value={user.hobbiesAndInterests} />
      )}
      <label className="text-[14px] font-bold">Favorite Sport(s)</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"favoriteSports"} />
      ) : (
        <LabelText value={user.favoriteSports} />
      )}
      <label className="text-[14px] font-bold">Preferred Music Genre(s)</label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"preferredMusicgenres"} />
      ) : (
        <LabelText value={user.preferredMusicgenres} />
      )}
      <label className="text-[14px] font-bold">
        {" "}
        Preferred movie/TV show(s)
      </label>
      {isEditing ? (
        <ValidatedTextInput fieldName={"preferredMovieOrTVshows"} />
      ) : (
        <LabelText value={user.preferredMovieOrTVshows} />
      )}
    </div>
  );
};

const renderUserDetails = (
  user,
  selectedTab,
  isEditing,
  handleMaritalStatusChange
) => {
  switch (selectedTab) {
    case 0:
      return renderBasicDetails(user, isEditing);
    case 1:
      return renderAdditionalDetails(
        user,
        isEditing,
        handleMaritalStatusChange
      );
    case 2:
      return renderSpouseDetails(user, isEditing);
    case 3:
      return renderPersonalPreferences(user, isEditing);
    default:
      return null;
  }
};

const MyProfile = () => {
  const { edit } = useParams();
  const formikRef = useRef(null); // Create a ref
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(edit ? true : false);
  const [user, setUser] = useState({});
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isUserMarried, setIsUserMarried] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSpuseDetails, setShowSpuseDetails] = useState(false);
  const [width] = useWindowSize();

  const userId = getUserAttributeFromLocalStorage(USER_ATTRIBUTES.USER_ID);

  console.log("=======================width ", width);

  useEffect(() => {
    setIsEditing(edit ? true : false);
  }, [edit]);

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line
  }, []);

  const refreshUser = () => {
    setIsLoading(true);
    setIsUserLoaded(false);
    getUser(userId)
      .then((response) => {
        const userMarried = response[0].maritalStatus === MARRIED;
        setUser(response[0]);
        setIsUserMarried(userMarried);
        setShowSpuseDetails(userMarried);
        setIsLoading(false);
        setIsUserLoaded(true);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        setIsLoading(false);
        setIsUserLoaded(true);
      });
  };

  const isSaveDisabled = (values, errors, selectedTab) => {
    switch (selectedTab) {
      case 0:
        return (
          values.salutation === "" ||
          values.lastName === "" ||
          values.firstName === "" ||
          values.email === "" ||
          errors.salutation ||
          errors.firstName ||
          errors.lastName === "" ||
          errors.email === ""
        );
      case 1:
        return (
          values.mobileNo === "" ||
          values.address === "" ||
          values.postalCode === "" ||
          values.nationality === "" ||
          errors.address === "" ||
          errors.postalCode === "" ||
          errors.postalCode === "" ||
          errors.nationality === ""
        );
      default:
        return null;
    }
  };

  const handleResetForm = () => {
    if (formikRef.current) {
      formikRef.current.resetForm(); // Access resetForm function via ref
    }
  };

  const uploadImage = async () => {
    if (selectedImage === null) return;
    const imageRef = ref(storage, `images/${userId}`);
    const uploaded = await uploadBytes(imageRef, selectedImage);
    return uploaded;
  };

  const toggleShowSpuseDetails = () => {
    isUserMarried ? setShowSpuseDetails(true) : setShowSpuseDetails(false);
  };

  const handleMaritalStatusChange = (event) => {
    const { value } = event;
    setShowSpuseDetails(value === MARRIED);
  };

  const submitForm = async (values, resetForm) => {
    setIsLoading(true);
    const uploadedResponse = await uploadImage();
    const imageUrl = uploadedResponse
      ? await getDownloadURL(uploadedResponse.ref)
      : values.avatar;
    if (!user.userId) {
      addUser({ ...values, avatar: imageUrl }, userId)
        .then(() => {
          refreshUser();
          setSelectedImage(null);
          setIsEditing(false);
          notify("SUCCESS", `Your profile has been updated`);
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          setIsLoading(false);
          notify("ERROR", `Error: ${error}`);
        });
    } else {
      setIsLoading(true);
      updateUser({ ...values, avatar: imageUrl }, userId)
        .then(() => {
          refreshUser();
          notify("SUCCESS", `Your profile has been updated`);
          setIsLoading(false);
          setSelectedImage(null);
          setIsEditing(false);
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          notify("ERROR", `Error: ${error}`);
          setIsLoading(false);
        });
    }
    resetForm();
  };

  return (
    <PageWrapper
      isLoading={isLoading}
      className={"mb-10"}
      content={
        <div
          className={classNames(
            "flex flex-col items-center justify-center text-textPrimary"
          )}
        >
          <div className="flex w-full justify-end">
            <div className="flex xxs:w-full md:w-3/4 justify-between items-center">
              <PageTitle
                className={"flex flex-1"}
                title={isEditing ? "Edit" : "My"}
                boldTitle="Profile"
              />
              <div
                className="flex justify-center mt-3 ml-4 underline cursor-pointer"
                onClick={() => {
                  setIsEditing(!isEditing);
                  toggleShowSpuseDetails(isUserMarried);
                  handleResetForm();
                }}
              >
                {isEditing && (
                  <div>
                    <ChevronLeftIcon />
                  </div>
                )}
                {width > 600 && (
                  <div className="md:mr-2">
                    {isEditing ? "Go back to My Profile" : "Edit profile"}
                  </div>
                )}
                {!isEditing && (
                  <div>
                    <ModeEditOutlineIcon />
                  </div>
                )}
                <div></div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full mt-10">
            <div className="flex flex-col xxs:w-1/3 md:w-1/4 pr-6">
              {myProfileTabs.map((tab, index) => {
                if (!showSpuseDetails && tab === "Spouse Details") return null;
                return (
                  <div
                    key={`tab-${index}`}
                    className={classNames(
                      "border-textPrimary py-2 cursor-pointer xxs:text-[15px] md:text-lg",
                      `${index === 0 && "border-t-[1px]"}`,
                      `${selectedTab === index && "border-b-[5px] font-bold"}`,
                      `${selectedTab !== index && "border-b-[1px]"}`
                    )}
                    onClick={() => setSelectedTab(index)}
                  >
                    {tab}
                  </div>
                );
              })}
            </div>
            <div className="flex xxs:flex-col md:flex-row xxs:w-2/3 md:w-3/4">
              {isUserLoaded && (
                <Formik
                  innerRef={formikRef}
                  initialValues={getFormikInitialUserSchema(user)}
                  initialErrors={{}}
                  validationSchema={getSchema(selectedTab)}
                  validateOnChange={true}
                  validateOnBlur={true}
                  onSubmit={async (values, { resetForm }) =>
                    await submitForm(values, resetForm)
                  }
                >
                  {({ values, errors, handleReset }) => (
                    <Form className="flex xxs:w-full h-auto lg:w-4/5 xxs:flex-col lg:flex-row">
                      <div className="xxs:w-full md:w-40 h-32 md:mx-10 xxs:mb-24">
                        <ImageUpload
                          selectedImage={selectedImage}
                          setSelectedImage={setSelectedImage}
                          url={user.avatar ? user.avatar : null}
                          isEditing={isEditing}
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start flex-1 w-full">
                        <div className="w-full">
                          {renderUserDetails(
                            user,
                            selectedTab,
                            isEditing,
                            handleMaritalStatusChange
                          )}
                        </div>
                        {isEditing && (
                          <div className="flex justify-between w-full">
                            <SubmitButton
                              className={classNames(
                                "py-3 w-1/2 mr-2",
                                `${
                                  !isSaveDisabled(values, errors, selectedTab)
                                    ? "bg-textSecondary text-white "
                                    : "bg-disableColor text-textGray"
                                }`
                              )}
                              label={"SAVE & UPDATE"}
                              disabled={isSaveDisabled(
                                values,
                                errors,
                                selectedTab
                              )}
                            />
                            <button
                              className={classNames(
                                "flex items-center justify-center text-textSecondary py-3 border-2 border-textSecondary w-1/2"
                              )}
                              onClick={() => {
                                setIsEditing(false);
                                setSelectedImage(null);
                                toggleShowSpuseDetails(isUserMarried);
                                handleReset();
                              }}
                            >
                              <div
                                className={classNames(
                                  "xxs:text-[11px] md:text-lg text-center font-semibold"
                                )}
                              >
                                CANCEL
                              </div>
                            </button>
                          </div>
                        )}
                        {isEditing && (
                          <div className="flex justify-between w-full mt-10">
                            * Mandatory field
                          </div>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
};
export default MyProfile;
