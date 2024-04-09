import { Outlet, useNavigation } from "react-router-dom";
import { Header } from "./Header";
import { Loader } from "./Loader";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      {isLoading && <Loader/> }
        <Header/>
        <main>
            <h1>Content</h1>
            <Outlet/>
        </main>
        </div>
  );
};

export default AppLayout