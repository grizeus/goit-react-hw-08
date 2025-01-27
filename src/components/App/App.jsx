import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout/Layout";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { RestrictedRegRoute } from "../../routes/RestrictedRegisterRoute.jsx";
import { RestrictedLogRoute } from "../../routes/RestrictedLoginRoute.jsx";
import { PrivateRoute } from "../../routes/PrivateRoute";
const ResetPassword = lazy(() =>
  import("../../pages/ResetPassword/ResetPassword.jsx")
);
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const OAuthCallback = lazy(() => import("../OAuthCollback/OAuthCollback.jsx"));
const SendResetMail = lazy(() =>
  import("../../pages/SendResetMail/SendResetMail.jsx")
);
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing...</b>
  ) : (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/registration"
            element={
              <RestrictedRegRoute
                redirectTo="/login"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedLogRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route path="/send-reset-email" element={<SendResetMail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/oauth-callback" element={<OAuthCallback />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
