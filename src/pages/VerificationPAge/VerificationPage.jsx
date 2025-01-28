import { NavLink, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { verify } from "../../redux/auth/operations";
import { selectError } from "../../redux/contacts/selectors";
import styles from "./VerificationPage.module.css";

const VerificationPage = () => {
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = searchParams.get("verifyToken");

    if (verifyToken) {
      (async () => {
        await dispatch(verify(verifyToken));
        setIsVerified(true);
      })();
    }
  }, [searchParams, dispatch]);

  return (
    <section title="home page">
      <div className="verify-container">
        {isVerified ? (
          <div className="success-message">
            <h2>Success!</h2>
            <p>
              Your email has been verified successfully. Now you can{" "}
              <NavLink to="/login" className={styles.link}>
                login
              </NavLink>
            </p>
          </div>
        ) : error ? (
          <div className="error-message">
            <h2>Error!</h2>
            <p>{error}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default VerificationPage;
