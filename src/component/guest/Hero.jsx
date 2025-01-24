import React from "react";
import PropTypes from "prop-types";

const Hero = ({ heroImg, name }) => {
  return (
    <>
      <div
        className={`${
          name === "login" ? "h-[440px]" : "h-[640px]"
        } bg-slate-200 hidden lg:block w-full md:w-[50%] tab:w-[70%] xl:w-[73%] my-auto`}
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </>
  );
};

Hero.propTypes = {
  heroImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Hero;
