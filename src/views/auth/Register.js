import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom";
import ceb from "../../assets/img/ceb.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eAccountNo, seteAccountNo] = useState("");
  const history = useHistory();

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return strongPasswordRegex.test(password);
  };

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      alert(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8088/EV/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
        body: JSON.stringify({
          name,
          email,
          eaccountNo: eAccountNo,
          password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        alert("Email Already Registered");
        history.push("/auth/login");
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful", data);
      // Handle successful registration (e.g., redirect to login page)
      alert("Registration successful");
      history.push("/auth/login");
    } catch (error) {
      console.error("Registration failed", error);
      // Handle registration error
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
                  Sign Up With Credentials
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-sm mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-sm mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-sm mb-2"
                      htmlFor="grid-password"
                    >
                      Electricity Account Number
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Electricity Account Number"
                      value={eAccountNo}
                      maxLength={10}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          // Only allow digits (0-9)
                          // console.log("Updated eAccountNo:", value);
                          seteAccountNo(value);
                        }
                      }}
                    />
                    {eAccountNo.length < 10 && eAccountNo.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        10 digit account number required. eg:1234567890"
                      </p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-sm mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {!validatePassword(password) && password.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        Password must be at least 6 characters, include one
                        uppercase letter, one lowercase letter, one number, and
                        one special character.
                      </p>
                    )}
                  </div>

                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div> */}

                  <div className="text-center mt-6">
                    <button
                      className="text-white active:bg-red-600 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      style={{ backgroundColor: "#7c0000" }}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 justify-center relative">
              <div className="w-1/2 text-blueGray-400 text-sm">
                Have an account?{" "}
                <Link to="/auth/login" className="text-blueGray-600 text-sm">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
