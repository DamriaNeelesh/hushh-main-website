"use client";
import React from "react";
import Header from "../header";
import Headroom from "react-headroom";

const HeaderComponent = () => {
  return (
    <div className="w-full">
      <Headroom
        style={{
          WebkitTransition: "all .5s ease-in-out",
          MozTransition: "all .5s ease-in-out",
          OTransition: "all .5s ease-in-out",
          transition: "all .5s ease-in-out",
        }}
      >
        <Header />
      </Headroom>
    </div>
  );
};

export default HeaderComponent;
