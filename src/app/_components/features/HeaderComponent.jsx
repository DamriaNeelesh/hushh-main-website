"use client";
import React from "react";
import Header from "../header";
import Headroom from "react-headroom";

const HeaderComponent = () => {
  return (
    <div className="w-full">
      <Headroom
        style={{
          webkitTransition: "all .5s ease-in-out",
          mozTransition: "all .5s ease-in-out",
          oTransition: "all .5s ease-in-out",
          transition: "all .5s ease-in-out",
        }}
      >
        <Header />
      </Headroom>
    </div>
  );
};

export default HeaderComponent;
