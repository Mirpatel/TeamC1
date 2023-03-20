/*import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    navigate("/");
  }, [navigate]);

  return <div>Confirmation page</div>;
}

export default ConfirmEmail;
*/