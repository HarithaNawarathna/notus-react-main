/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import ceb from "../../assets/img/ceb.png";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const userLevel = sessionStorage.getItem("userLevel");

  return (
    <>
      {userLevel === "ROLE_SOLAROWNER" && (
        <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            {/* Toggler */}
            <button
              className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
            >
              <i className="fas fa-bars"></i>
            </button>
            {/* Brand */}
            <Link
              className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
              to="/"
            >
              <div className="flex justify-center items-center sticky">
                <img alt="ceb logo" className="w-20 h-20" src={ceb} />
              </div>
            </Link>
            {/* User */}
            <ul className="md:hidden items-center flex flex-wrap list-none">
              <li className="inline-block relative">
                <NotificationDropdown />
              </li>
              <li className="inline-block relative">
                <UserDropdown />
              </li>
            </ul>
            {/* Collapse */}
            <div
              className={
                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                collapseShow
              }
            >
              {/* Collapse header */}
              <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                <div className="flex flex-wrap">
                  <div className="w-6/12">
                    <Link
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                      to="/"
                    >
                      Notus React
                    </Link>
                  </div>
                  <div className="w-6/12 flex justify-end">
                    <button
                      type="button"
                      className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                      onClick={() => setCollapseShow("hidden")}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Form */}
              <form className="mt-6 mb-4 md:hidden">
                <div className="mb-3 pt-0">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                  />
                </div>
              </form>

              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center mb-2">
                  <Link
                    className={
                      "text-sm py-3 " +
                      (window.location.href.indexOf("/admin/maps") !== -1
                        ? ""
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/maps"
                    style={
                      window.location.href.indexOf("/admin/maps") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                  >
                    <i
                      className={
                        "fas fa-map-marked mr-2 text-sm " +
                        (window.location.href.indexOf("/admin/maps") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Maps
                  </Link>
                </li>
                <li className="items-center mb-2">
                  <Link
                    className={
                      "text-sm py-3 " +
                      (window.location.href.indexOf("/smartplug/register") !==
                      -1
                        ? ""
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/smartplug/register"
                    style={
                      window.location.href.indexOf("/smartplug/register") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                  >
                    <i
                      className={
                        "fas fa-plug mr-3 text-sm " +
                        (window.location.href.indexOf("/smartplug/register") !==
                        -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Smart Plug Registration
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 " +
                      (window.location.href.indexOf("/admin/payment") !== -1
                        ? ""
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/payment"
                    style={
                      window.location.href.indexOf("/smartplug/qrscan") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                  >
                    <i
                      className={
                        "fas fa-qrcode mr-2 text-sm " +
                        (window.location.href.indexOf("/smartplug/qrscan") !==
                        -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    QR Scan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      {userLevel === "ROLE_EVOWNER" && (
        <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            {/* Toggler */}
            <button
              className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
            >
              <i className="fas fa-bars"></i>
            </button>
            {/* Brand */}
            <Link
              className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
              to="/"
            >
              <div className="flex justify-center items-center sticky">
                <img alt="ceb logo" className="w-20 h-20" src={ceb} />
              </div>
            </Link>
            {/* User */}
            <ul className="md:hidden items-center flex flex-wrap list-none">
              <li className="inline-block relative">
                <NotificationDropdown />
              </li>
              <li className="inline-block relative">
                <UserDropdown />
              </li>
            </ul>
            {/* Collapse */}
            <div
              className={
                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                collapseShow
              }
            >
              {/* Collapse header */}
              <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                <div className="flex flex-wrap">
                  <div className="w-6/12">
                    <Link
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                      to="/"
                    >
                      Notus React
                    </Link>
                  </div>
                  <div className="w-6/12 flex justify-end">
                    <button
                      type="button"
                      className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                      onClick={() => setCollapseShow("hidden")}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Form */}
              <form className="mt-6 mb-4 md:hidden">
                <div className="mb-3 pt-0">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                  />
                </div>
              </form>

              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center mb-2">
                  <Link
                    className={
                      "text-sm py-3 " +
                      (window.location.href.indexOf("/admin/maps") !== -1
                        ? ""
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/maps"
                    style={
                      window.location.href.indexOf("/admin/maps") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                  >
                    <i
                      className={
                        "fas fa-map-marked mr-2 text-sm " +
                        (window.location.href.indexOf("/admin/maps") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Maps
                  </Link>
                </li>
                <li className="items-center mb-2">
                  <Link
                    className={
                      "text-sm py-3 " +
                      (window.location.href.indexOf("/smartplug/register") !==
                      -1
                        ? ""
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/smartplug/register"
                    style={
                      window.location.href.indexOf("/smartplug/register") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                  >
                    <i
                      className={
                        "fas fa-plug mr-3 text-sm " +
                        (window.location.href.indexOf("/smartplug/register") !==
                        -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Charging EV
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 " +
                      (window.location.href.indexOf("/admin/payment") !== -1
                        ? ""
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/payment"
                    style={
                      window.location.href.indexOf("/admin/payment") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                  >
                    <i
                      className={
                        "fas fa-credit-card mr-2 text-sm " +
                        (window.location.href.indexOf("/admin/payment") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Payments
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
