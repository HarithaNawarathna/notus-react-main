import React from "react";
import { useLocation } from "react-router-dom";

// components
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const location = useLocation();
  const isSmartPlugPage = location.pathname === "/smartplug/register";

  return (
    <>
      {/* Header */}
      {!isSmartPlugPage ? (
        <div
          style={{ backgroundColor: "#b23200" }}
          className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12"
        >
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="Sessions"
                    statTitle="0"
                    statArrow="up"
                    statPercent="3.48"
                    statPercentColor="text-red-500"
                    statDescripiron="Since last month"
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-red-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="Total Consumption"
                    statTitle="0.000 kWh"
                    statArrow="down"
                    statPercent="3.48"
                    statPercentColor="text-red-500"
                    statDescripiron="Since last week"
                    statIconName="fas fa-chart-pie"
                    statIconColor="bg-lightBlue-500"
                    statBgColor="#0fafb8"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="Total Duration"
                    statTitle="0.00.00"
                    statArrow="down"
                    statPercent="1.10"
                    statPercentColor="text-orange-500"
                    statDescripiron="Since yesterday"
                    statIconName="fas fa-users"
                    statIconColor="bg-pink-500"
                    statBgColor="#910fb8"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="Total Expense"
                    statTitle="N/A"
                    statArrow="up"
                    statPercent="12"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since last month"
                    statIconName="fas fa-percent"
                    statIconColor="bg-orange-500"
                    statBgColor="#b80f"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#b23200" }}
          className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12"
        >
          <div className="px-4 md:px-10 mx-auto w-full">
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}
