import React from "react";
import styled from "styled-components";
import Marquee from "react-fast-marquee";

// Brands
import Accor from "../svg/images/accor";
import Microsoft from "../svg/images/microsoft";
import Aws from "../svg/images/aws";
import Chalhoub from "../svg/images/chalhoub";
import Citadium from "../svg/images/citadium";
import Costco from "../svg/images/costco";
import Fourseasons from "../svg/images/four-seasons";
import Brand1 from "../svg/images/brand1";
import Brand2 from "../svg/images/brand2";
import Google from "../svg/images/google";
import Gucci from "../svg/images/Gucci";
import Laredoute from "../svg/images/la-redoute";
import Lvtetia from "../svg/images/LVTETIA";
import Nordstrom from "../svg/images/Nordstrom";
import Tumi from "../svg/images/tumi";
import Reliance from "../svg/images/reliance";

const BrandContainer = styled.div`
  display: flex;
  gap: 8rem; /* Adjust the gap as needed */
  padding: 10px; /* Adjust the padding as needed */
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    gap: 4rem;
    padding: 5px;
    margin-top: 1rem;
  }
`;

export function BrandSlider() {
  return (
    <div className="brandSlider">
      <Marquee
        pauseOnHover="true"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <BrandContainer>
          <Accor key={1} width={50} height={50} />
          <Aws key={2} width={50} height={50} />
          <Brand2 key={3} width={50} height={50} />
          <Reliance key={4} width={50} height={50}/>
          <Chalhoub key={5} width={50} height={50} />
          <Citadium key={6} width={50} height={50} />
          <Costco key={7} width={50} height={50} />
          <Fourseasons key={8} width={50} height={50} />
          <Google key={9} width={50} height={50} />
          <Gucci key={10} width={50} height={50} />
          <Laredoute key={11} width={50} height={50} />
          <Lvtetia key={12} width={50} height={50} />
          <Microsoft key={13} width={50} height={50} />
          <Nordstrom key={14} width={50} height={50} />
          <Brand1 key={15} width={50} height={50} />
          {/* <Tumi key={15} width={50} height={50} /> */}
        </BrandContainer>
      </Marquee>
    </div>
  );
}
