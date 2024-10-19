import { Suspense } from "react";

import AppBar from "../AppBar/AppBar";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <AppBar />
      <Suspense fallback={<span>Loading</span>}>{children}</Suspense>
    </div>
  );
};

export default Layout;
