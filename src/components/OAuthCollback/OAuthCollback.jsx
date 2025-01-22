import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginOAuth } from "../../redux/auth/operations";

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        await dispatch(loginOAuth()).unwrap();
        // If login successful, redirect to home or dashboard
        navigate("/");
      } catch (error) {
        console.log(error.message);
        navigate("/login");
      }
    };

    handleOAuthCallback();
  }, [dispatch, navigate]);

  return <div>Processing login...</div>;
};

export default OAuthCallback;
