import { useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selectors";
import PageTitle from "../../components/PageTitle/PageTitle";

const HomePage = () => {
  const user = useSelector(selectUser);
  const userName = user.name !== null ? user.name : "stranger";
  return (
    <section title="home page">
      <PageTitle title={`Welcome, ${userName}!`} />
    </section>
  );
};

export default HomePage;
