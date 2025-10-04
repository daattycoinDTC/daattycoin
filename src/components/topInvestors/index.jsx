"use client";
import { useQuery } from "@tanstack/react-query";
import TopBanner from "../banner/TopBanner";
import { BtnPrimary } from "../common/CustomModules";
import JoinNishue from "../common/JoinNishue";
import LightingComponentSm from "../common/LightingComponentSm";
import { fetchData } from "../../libs/utils/api";
import SpinnerLoader from "../customLoader/SpinnerLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const TopInvestors = () => {
  const [topInvestors, setTopInvestors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [`top_investors?page_no=${currentPage}`],
    queryFn: fetchData,
    select: (data) => data.data,
  });

  const handlePagination = debounce(() => {
    setCurrentPage((prev) => prev + 1);
  }, 300);

  useEffect(() => {
    if (data) {
      if (data.investors.length <= 0) {
        toast.error("No more investors available!");
        return;
      } else {
        setTopInvestors((prev) => ({
          ...prev,
          investors: [...(prev?.investors || []), ...data.investors],
          totalDataRows: data.totalDataRows,
        }));
      }
    }
  }, [data]);

  if (isLoading && currentPage <= 1) return <SpinnerLoader />;

  return (
    <>
      <TopBanner
        title={data?.banner?.top_investor_banner_title}
        routeLink="Top Investors"
        bannerSrc={`${imgBasePath}${data?.banner?.image}`}
      />

      <div className="relative pt-8 xl:pt-12 isolate overflow-hidden">
        <LightingComponentSm />

        <section className="container_section_sm">
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 my-8 xl:my-10">
            {topInvestors?.investors?.length > 0 &&
              topInvestors.investors.map((investor, index) => (
                <div
                  key={index}
                  className="p-4 bg-dark-blue2 rounded-lg shadow-blue-700 ring-0 hover:ring-1 text-center"
                >
                  <small className="block text-base text-blue-800 mb-2">
                    {`#${index + 1}`}
                  </small>

                  <div className="flex flex-col items-center justify-center">
                    <p className="font-light">
                      User ID: {investor?.customerInfo?.username || "N/A"}
                    </p>
                    <p className="text-sm text-center bg-blue-800 px-3 py-2 rounded-full mt-2">
                      Investment - ${investor?.investment}
                    </p>
                  </div>
                </div>
              ))}
          </section>

          {topInvestors?.investors.length !== topInvestors?.totalDataRows && (
            <div className="text-center my-4 md:mt-12">
              <BtnPrimary onClick={handlePagination} classes={"group"}>
                {isLoading ? "Loading..." : "Load More"}
                {!isLoading && (
                  <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                    &#10230;
                  </span>
                )}
              </BtnPrimary>
            </div>
          )}
        </section>

        <JoinNishue />
      </div>
    </>
  );
};

export default TopInvestors;
