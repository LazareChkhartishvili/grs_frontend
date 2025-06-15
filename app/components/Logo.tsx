import Image from "next/image";
import React from "react";
import mobileLogo from "../../assets/images/mobileLogo.svg";
import simpleLogo from "../../assets/images/simpleLogo.svg";

export const MobileLogo = () => {
  return (
    <div className="">
      <Image src={mobileLogo} alt="mobileLogo" priority />
    </div>
  );
};

export const SimpleLogo = () => {
  return <Image src={simpleLogo} alt="simpleLogo" priority />;
};

export const MediaLogo = () => {
  return <div>Logo</div>;
};

export const RehabilitationLogo = () => {
  return <div>Logo</div>;
};
