//absolute path
import PageNotFound from "common/components/404";
import Header from "common/components/Header";
import { fetchProfileAction } from "features/authentication/action";
// import Signin from "features/authentication/pages/Signin";
// import Signup from "features/authentication/pages/Signup";
// import Booking from "features/booking/pages/Booking";
// import Detail from "features/booking/pages/Detail";
// import Home from "features/booking/pages/Home";
// import Payment from "features/booking/pages/Payment";
// import MovieManagement from "features/movies/pages/MovieManagement";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./Guard";

const Home = lazy(() => import("features/booking/pages/Home"));
const Detail = lazy(() => import("features/booking/pages/Detail"));
const Booking = lazy(() => import("features/booking/pages/Booking"));
const Payment = lazy(() => import("features/booking/pages/Payment"));
const Signin = lazy(() => import("features/authentication/pages/Signin"));
const Signup = lazy(() => import("features/authentication/pages/Signup"));
const MovieManagement = lazy(() =>
  import("features/movies/pages/MovieManagement")
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileAction);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/booking" component={Booking} />
          <Route path="/payment" component={Payment} />

          <AuthRoute path="/signin" component={Signin} redirectPath="/" />
          <AuthRoute path="/signup" component={Signup} redirectPath="/" />
          <PrivateRoute path="/movies" component={MovieManagement} />

          {/* <Route path="*" component={PageNotFound} /> */}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

// optimize performance : image, vỉtualize data (pagination , long list , lazy loading, )
// Kiểm soát Component render  (shouldComponentUpdate)
//  product build

// redux toolkit + typescript

