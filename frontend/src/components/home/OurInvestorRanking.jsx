"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Usr1,
  Usr2,
  Usr3,
  Usr4,
  Usr5,
  Usr6,
  Usr7,
  Usr8,
  Usr9,
  Usr10,
  Usr11,
  Usr12,
  BlueBgBlur,
  GreenBlur,
} from "../../app/assets/all-images";
import { BtnPrimary } from "../common/CustomModules";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import Link from "next/link";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const OurInvestorData = [
  {
    ranking: "01",
    id: "dabiddoe9876",
    img: Usr1,
    name: "David Doe",
    investment: "2,224,100.00",
  },
  {
    ranking: "02",
    id: "dabiddoe9876",
    img: Usr2,
    name: "Sofia Khan",
    investment: "4,224.00",
  },
  {
    ranking: "03",
    id: "dabiddoe9876",
    img: Usr3,
    name: "Stepen Cook",
    investment: "5,100.00",
  },
  {
    ranking: "04",
    id: "dabiddoe9876",
    img: Usr4,
    name: "Albert Doy",
    investment: "2,224,100.00",
  },
  {
    ranking: "05",
    id: "dabiddoe9876",
    img: Usr5,
    name: "Jesica Baily",
    investment: "1,224,100.00",
  },
  {
    ranking: "06",
    id: "dabiddoe9876",
    img: Usr6,
    name: "Sakira Butt",
    investment: "7,224,100.00",
  },
  {
    ranking: "07",
    id: "dabiddoe9876",
    img: Usr7,
    name: "David Doe",
    investment: "2,224,100.00",
  },
  {
    ranking: "08",
    id: "dabiddoe9876",
    img: Usr8,
    name: "Sofia Khan",
    investment: "4,224.00",
  },
  {
    ranking: "09",
    id: "dabiddoe9876",
    img: Usr9,
    name: "Stepen Cook",
    investment: "5,100.00",
  },
  {
    ranking: "10",
    id: "dabiddoe9876",
    img: Usr10,
    name: "Albert Doy",
    investment: "2,224,100.00",
  },
  {
    ranking: "11",
    id: "dabiddoe9876",
    img: Usr11,
    name: "Jesica Baily",
    investment: "1,224,100.00",
  },
  {
    ranking: "12",
    id: "dabiddoe9876",
    img: Usr12,
    name: "Sakira Butt",
    investment: "7,224,100.00",
  },
];

const OurInvestorRanking = () => {
  const [totalShow, setTotalShow] = useState(5);
  const slice = OurInvestorData.slice(0, totalShow);

  // get investor data
  const { data: investorData } = useQuery({
    queryKey: ["home/top_investors"],
    queryFn: fetchData,
    select: (data) => {
      const investorHeader = data.data.header;
      const investorList = data.data.investors.slice(0, 5);
      return {
        header: investorHeader,
        investors: investorList,
      };
    },
  });

  return (
    <div className="container_section_sm my-12 2xl:mt-20 3xl:mt-24">
      <section className="w-full max-w-3xl mx-auto text-center px-2 ">
        <h1 className="section_heading_3xl mb-3">
          {investorData?.header?.top_investor_header_title}
        </h1>
        <p className="text-base max-w-lg mx-auto">
          {investorData?.header?.top_investor_header_content}
        </p>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 my-8 xl:my-10">
        {investorData?.investors?.length > 0 &&
          investorData.investors.map((investor, index) => (
            <div
              key={index}
              className="text-center bg-dark-primary2 p-3 rounded-lg text-white font-semibold"
            >
              User ID: {investor.user_id || investor.id}
            </div>
          ))}
      </section>

      {OurInvestorData.length > totalShow && (
        <div className="text-center my-4">
          <Link href="/top-investors">
            <BtnPrimary
              classes={"group"}
              onClick={() => setTotalShow((prevCount) => prevCount + 5)}
            >
              Load More
              <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                &#10230;
              </span>
            </BtnPrimary>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OurInvestorRanking;
