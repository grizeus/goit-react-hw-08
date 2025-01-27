import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch } from "react-redux";
import { verify } from "../../redux/auth/operations";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = searchParams.get("verifyToken");

    if (verifyToken) {
      (async () => {
        await dispatch(verify);
      })();
    }
  }, [searchParams, dispatch]);

  return (
    <section title="home page">
      <PageTitle title={"Verification"} />
      <div className="verify-container">
        {isVerified ? (
          <div className="success-message">
            <h2>Success!</h2>
            <p>Your email has been verified successfully.</p>
            <button onClick={() => (window.location.href = "/")}>
              Back to Home
            </button>
          </div>
        ) : error ? (
          <div className="error-message">
            <h2>Error!</h2>
            <p>{error}</p>
            <button onClick={() => (window.location.href = "/login")}>
              Try Again
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default HomePage;
