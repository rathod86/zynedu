import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Read token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Save token
      localStorage.setItem("token", token);

      // Decode token to get user
      const userData = JSON.parse(atob(token.split(".")[1]));

      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <h2>Processing login...</h2>;
}

export default AuthCallback;
