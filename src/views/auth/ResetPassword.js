import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  // Retrieve email from session storage on component mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirect to forgot password page if email is not available
      history.push("/auth/forgot");
    }
  }, [history]);

  const validatePassword = (password) => {
    // Updated regex to include period (.) as an allowed special character
  //const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{6,}$/;
  
  // For debugging
  console.log("Password:", password);
  //console.log("Validation result:", strongPasswordRegex.test(password));
  return true;
  //return strongPasswordRegex.test(password);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    // if (!validatePassword(password)) {
    //   alert("Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
    //   return;
    // }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Encode parameters for URL safety
      const encodedEmail = encodeURIComponent(email);
      const encodedPassword = encodeURIComponent(password);
      const encodedConfirmPassword = encodeURIComponent(confirmPassword);
      
      console.log("Making reset password request with:", {
        email: email,
        password: password,
        encodedPassword: encodedPassword
      });

      const response = await fetch(
      `http://127.0.0.1:8088/EVProject-0.0.1-SNAPSHOT/api/v1/reset-password?email=${email}&newPassword=${password}&confirmPassword=${confirmPassword}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa("user:admin123"),
        },
       
        credentials: "include", // Include cookies in the request
      }
    );

    console.log("Reset password API response status:", response.status);

    if (response.ok) {
      // Handle success - check if response is JSON or text
      const contentType = response.headers.get("content-type");
      let successMessage;
      
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        successMessage = data.message || "Password reset successful!";
      } else {
        successMessage = await response.text();
      }
      
      setMessage(successMessage);
       // Show success alert
       alert("Password reset successful! You will be redirected to the login page.");
        
      // Clear the email from session storage
      sessionStorage.removeItem("resetEmail");
      
      // Redirect to login page
      history.push("/auth/login");
    } else {
      // Handle error
      let errorMessage;
      
      try {
        const error = await response.json();
        errorMessage = error.message || "Failed to reset password. Please try again.";
      } catch (jsonError) {
        errorMessage = await response.text() || "Failed to reset password. Please try again.";
      }
      
      setMessage(errorMessage);
        alert("Failed to reset password: " + errorMessage);
      }
  } catch (error) {
    console.error("Reset password error:", error);
    setMessage("An error occurred while resetting your password. Please try again.");
    alert("An error occurred while resetting your password. Please try again.");
  }
};
return (
    <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <h2 className="text-xl font-semibold mb-4">
                  Reset Your Password
                </h2>
                {email && <p className="text-sm text-gray-600 mb-4">Resetting password for: {email}</p>}
                {message && (
                  <div className={`text-sm mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                    {message}
                  </div>
                )}
                <form onSubmit={handlePasswordReset}>
                  <div className="relative w-full mb-3">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="New Password"
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    
              );
}
