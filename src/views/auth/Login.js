import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ceb from "../../assets/img/ceb.png";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState(""); // changed from email
  const [password, setPassword] = useState("");
  const history = useHistory();

  const baseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8088/EV";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // match backend sample body
        body: JSON.stringify({ username, password }),
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
        throw new Error("Unexpected response format: " + data);
      }

      if (response.ok) {
        console.log("Login successful:", data);
        // Store JWT token
        sessionStorage.setItem("token", data.token);

        // Store user details if backend sends them
        if (data.username) sessionStorage.setItem("username", data.username);
        if (data.roles) sessionStorage.setItem("Roles", data.roles[0]);
        if (data.eAccountNo)
          sessionStorage.setItem("eAccountNo", data.eAccountNo);
        sessionStorage.setItem("sessionStart", Date.now().toString());

        const Roles = data.roles[0]; // remove prefix
        sessionStorage.setItem("userLevel", Roles);

        console.log("Session storage saved:", {
          token: sessionStorage.getItem("token"),
          username: sessionStorage.getItem("username"),
          userLevel: sessionStorage.getItem("userLevel"),
          eAccountNo: sessionStorage.getItem("eAccountNo"),
          sessionStart: sessionStorage.getItem("sessionStart"),
        });

        // Redirect based on user level
        if (Roles === "ROLE_EVOWNER") {
          console.log("Redirecting to /admin/EvDashboard");
          history.push("/admin/evdashboard");
        } else if (Roles === "ROLE_SOLAROWNER") {
          history.push("/admin/dashboardsolar");
        } else {
          //history.push("/admin/maps");
        }

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        alert(
          "If you don't have an account, please register. If registered, verify your account. Otherwise, check your username and password."
        );
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("Error:", error.message || error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex justify-center items-center mt-8">
                <img alt="ceb logo" className="w-20 h-20" src={ceb} />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-2">
                <div className="text-blueGray-400 text-center text-sm">
                  Sign In With Credentials
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-sm mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-sm mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm text-blueGray-600">
                        Remember Me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="text-white active:bg-red-200 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      style={{ backgroundColor: "#7c0000" }}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/forgot" className="text-blueGray-400 text-sm">
                  Forgot password?
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-400 text-sm">
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
