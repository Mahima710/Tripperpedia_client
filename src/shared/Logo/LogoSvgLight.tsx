import React from "react";
import Logo from "images/logos/dark/logo.png"

const LogoSvgLight = () => {
  return (
      <img src = {Logo} alt="logo" className="w-full hidden dark:block" />
  );
};

export default LogoSvgLight;
