import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { ISignUpForm } from "data/types";
import checkPhoneNumber from "utils/checkPhoneNumber";
import { useSignUpNewUser } from "api/hooks";
import formatDate from "utils/formatDate";
import Select from "shared/Select/Select";
import countryCodes from "../../data/jsons/__countryCodes.json";

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState<ISignUpForm>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile_no: "",
    confirm_password: "",
    dob: "",
  });
  const [phoneCode, setPhoneCode] = useState<string>("");
  const [hasClickedSubmit, setHasClickedSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const { mutate: createNewUser, status: createNewUserStatus } =
    useSignUpNewUser({
      onSuccess: (data) => {
        console.log(data, "Signup Data");
        // TODO: Add user data/token to localStorage
        navigate("/");
      },
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHasClickedSubmit(true);
    createNewUser({
      ...formData,
      country_code: phoneCode.substring(1),
      mobile_no: `${phoneCode.substring(1)}${formData.mobile_no}`,
      country_iso: (
        countryCodes.find((i) => i.dial_code === phoneCode)?.code ?? ""
      ).toLowerCase(),
      device_type: "Web",
      dob: formatDate(dob),
    });
    console.log(formData, "formData");
  };

  const {
    first_name,
    last_name,
    email,
    password,
    mobile_no,
    confirm_password,
    dob,
  } = formData;

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div> */}
          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                First Name
              </span>
              <Input
                type="text"
                placeholder="John"
                className="mt-1"
                name="first_name"
                value={first_name}
                onChange={handleInputChange}
                error={hasClickedSubmit && !first_name}
                errorMessage={"First Name is required"}
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Last Name
              </span>
              <Input
                type="text"
                placeholder="Doe"
                className="mt-1"
                name="last_name"
                value={last_name}
                onChange={handleInputChange}
                error={hasClickedSubmit && !last_name}
                errorMessage={"Last Name is required"}
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                name="email"
                value={email}
                onChange={handleInputChange}
                error={hasClickedSubmit && !email}
                errorMessage={"Email is required"}
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Phone Number
              </span>
              <div className="flex flex-row w-full">
                <Select
                  className="mt-1 w-3/4 h-full"
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                >
                  {countryCodes.map((country) => (
                    <option value={country.dial_code}>
                      {country.dial_code} {country.name}
                    </option>
                  ))}
                </Select>
                <Input
                  type="text"
                  placeholder="9998887776"
                  className="mt-1 ml-1"
                  fullWidth
                  name="mobile_no"
                  value={mobile_no}
                  onChange={handleInputChange}
                  error={
                    !!(hasClickedSubmit && !mobile_no) ||
                    !!(mobile_no && !checkPhoneNumber(mobile_no))
                  }
                  errorMessage={"Enter a valid phone number"}
                />
              </div>
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Date of Birth
              </span>
              <Input
                type="date"
                placeholder="21/11/2000"
                className="mt-1"
                name="dob"
                value={dob}
                onChange={handleInputChange}
                error={!!(hasClickedSubmit && !dob)}
                errorMessage={"Enter your date of birth"}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                name="password"
                value={password}
                onChange={handleInputChange}
                error={hasClickedSubmit && !password}
                errorMessage={"Password is required"}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input
                type="password"
                className="mt-1"
                name="confirm_password"
                value={confirm_password}
                onChange={handleInputChange}
                error={confirm_password !== "" && password !== confirm_password}
                errorMessage={"Passwords do not match!"}
              />
            </label>
            <ButtonPrimary
              type="submit"
              onClick={handleSubmit}
              loading={createNewUserStatus === "loading"}
            >
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
