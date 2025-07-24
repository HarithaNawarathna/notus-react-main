import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; 
import axios from "axios"; // Make sure axios is installed


export default function FogotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const history = useHistory();
  
  // Debug logging for component state
  useEffect(() => {
    console.log("isOtpSent state:", isOtpSent);
  }, [isOtpSent]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    console.log("Sending OTP for email:", email);
    
    try {
      // Force the state change before API call for testing
      setIsOtpSent(true);
      console.log("Set isOtpSent to true");

      const response = await fetch(`http://127.0.0.1:8088/EVProject-0.0.1-SNAPSHOT/api/v1/forgot-password?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa("user:admin123"),
        },
        credentials: "include", // Include cookies in the request
      });
      
      console.log("API Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        setMessage("OTP sent successfully to your email");
        // This line might be redundant if we set it before the API call
        // setIsOtpSent(true);
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to send OTP. Please try again.");
        // Don't reset isOtpSent here - keep it true for testing
      }
    } catch (error) {
      console.error("Error details:", error);
      setMessage("Failed to send OTP. Please try again.");
      // Don't reset isOtpSent here - keep it true for testing
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp, "for email:", email);
    
    try {
      const response = await fetch(`http://127.0.0.1:8088/EVProject-0.0.1-SNAPSHOT/api/v1/verify-otp?email=${email}&otp=${otp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa("user:admin123"),
        },
        credentials: "include", // Include cookies in the request
      });
      
      console.log("Verify API Response status:", response.status);
      
      if (response.ok) {
        // First check if the response is JSON or text
        const contentType = response.headers.get("content-type");
        
        // Process the successful response
        let successMessage;
        
        if (contentType && contentType.includes("application/json")) {
          // If JSON response
          const data = await response.json();
          successMessage = data.message || "OTP verified successfully";
        } else {
          // If text response
          successMessage = await response.text();
        }
        
        setMessage(successMessage);
        
        // Show success alert
        alert("OTP verified successfully. Redirecting to password reset page.");
        
        // Store email in session storage to use on reset password page
        sessionStorage.setItem("resetEmail", email);
        
        // Navigate to reset password page
        history.push("/auth/reset");
      } else {
        // Handle error response
        let errorMessage;
        
        try {
          // Try to parse as JSON first
          const error = await response.json();
          errorMessage = error.message || "Failed to verify OTP. Please try again.";
        } catch (jsonError) {
          // If not JSON, read as text
          errorMessage = await response.text() || "Failed to verify OTP. Please try again.";
        }
        
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Verification error details:", error);
      setMessage("Failed to verify OTP. Please try again.");
    }
  };
  // Manual toggle function for testing
  const toggleOtpSent = () => {
    setIsOtpSent(!isOtpSent);
    console.log("Manually toggled isOtpSent to:", !isOtpSent);
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
                {message && <p className={`text-sm mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                

                <button 
                  onClick={toggleOtpSent} 
                  className="text-xs text-blue-500 mb-2"
                  type="button"
                >
                  
           
                </button>
                
                {!isOtpSent ? (
                  <form onSubmit={handleSendOtp}>
                    <div className="relative w-full mb-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Send OTP
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="text-gray-600 text-sm mb-4">We've sent a 6-digit code to your email: {email}</p>
                    <form onSubmit={handleVerifyOtp}>
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          maxLength="6"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Enter OTP"
                          required
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Verify OTP
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}