"use client";
import React, { useEffect, useRef, useState } from "react";
import { images } from "../../../../public/Images/images";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import "@/app/globals.css";

export const HP_Scrolling = () => {
  const { ref: myRef1, inView: firstVisible } = useInView();
  const { ref: myRef2, inView: secondVisible } = useInView();
  const { ref: myRef3, inView: thirdVisible } = useInView();
  const { ref: myRef4, inView: animationVisible } = useInView();

  const [firstImage, setFirstImage] = useState(true);
  const [secondImage, setSecondImage] = useState(false);
  const [thirdImage, setThirdImage] = useState(false);
  const [imgSrc, setImgSrc] = useState(images.HP1);
  const [number, setNumber] = useState(1);
  useEffect(() => {
    const imageDecider = () => {
      if (thirdVisible) {
        setFirstImage(false);
        setSecondImage(false);
        setThirdImage(true);
      } else if (secondVisible) {
        setFirstImage(false);
        setSecondImage(true);
        setThirdImage(false);
      } else if (firstVisible) {
        setFirstImage(true);
        setSecondImage(false);
        setThirdImage(false);
      }
    };

    imageDecider();
  });

  useEffect(() => {
    if (firstImage) {
      setImgSrc(images.HP1);
      setNumber(1);
    } else if (secondImage) {
      setImgSrc(images.HP2);
      setNumber(2);
    } else if (thirdImage) {
      setImgSrc(images.HP3);
      setNumber(3);
    }
  });

  return (
    <div className="py-32 w-full">
      <div className="items-start w-full">
        <div className="flex items-start w-full h-full gap-24 relative">
          <div className="sticky top-32 z-10 border-r border-myBorder">
            <div>
              <Image
                key={imgSrc}
                src={imgSrc}
                alt="image"
                ref={myRef4}
                className={`animate-fade-in ${animationVisible ? "visible" : "invisible"}`}
              />
            </div>
            <div className="rounded-full w-16 h-16 border text-speBG font-bold text-2xl border-myBorder items-center flex justify-center bg-myBG absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
              0{number}
            </div>
          </div>

          <div className=" w-full">
            <div
              className=" h-screen justify-center flex flex-col gap-10"
              ref={myRef1}
            >
              <h1 className="font-medium text-2xl text-myBorder">
                ZERO PARTY DATA
              </h1>
              <h2 className="font-semibold text-headText text-3xl">
                Empowering Personalization With Zero Party Data
              </h2>
              <p className=" font-normal text-lg text-headText">
                Discover the untapped potential of your customers requirements
                by harnessing the power of zero- party data, enabling you to go
                beyond traditional data collection methods and truly understand
                their preferences, needs, and desires.Build deeper connections,
                deliver personalized experiences, and drive meaningful
                engagement that exceeds expectations.
              </p>
            </div>
            <div
              className=" h-screen justify-center flex flex-col gap-10"
              ref={myRef2}
            >
              <h1 className="font-medium text-2xl text-myBorder">
                EMPOWER USER CONTROL
              </h1>
              <h2 className="font-semibold text-headText text-3xl">
                Respecting Privacy With Consent Management
              </h2>
              <p className=" font-normal text-lg text-headText">
                Put privacy at the forefront of your data strategy by
                implementing our robust consent mechanism that ensures
                compliance with privacy regulations while empowering users to
                have full control over their data. Our user-friendly solution
                simplifies the consent process, enabling seamless opt-ins and
                opt-outs, fostering trust between your brand and your customers,
                and safeguarding their privacy rights.
              </p>
            </div>
            <div
              className="h-screen justify-center flex flex-col gap-10"
              ref={myRef3}
            >
              <h1 className="font-medium text-2xl text-myBorder">
                ILLUMINATED DATA INSIGHTS
              </h1>
              <h2 className="font-semibold text-headText text-3xl">
                Actionable Intelligence Through Data Observability
              </h2>
              <p className=" font-normal text-lg text-headText">
                Gain unprecedented visibility into your data ecosystem with our
                powerful observability tools that provide real-time insights and
                analytics. By monitoring data quality, integrity, and
                performance across various touchpoints, you can make informed
                decisions, identify patterns and trends, optimize processes, and
                unlock valuable opportunities for growth in today’s data-driven
                landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
