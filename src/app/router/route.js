import React, { lazy, Suspense } from "react";
import { Redirect, Route, Router, Switch, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "./routes.json";
import { getAuthenticated, getType } from "../redux/slices/auth";
import LoadingScreen from "../pages/LoadingScreen";
import ClientLayout from "../components/ClientLayout";

const AuthRoutes = lazy(() => import("../modules/Auth/AuthRoutes"));
const ClientRoutes = lazy(() => import("../modules/Client/ClientRoutes"));

const Routes = withRouter(({ history }) => {
   const authenticated = useSelector(getAuthenticated);
   const type = useSelector(getType);

   const getInitialRoute = () => {
      if (authenticated) {
         if (type === "manager") return routes.DASHBOARD;
         else return routes.CLIENT_MENU;
      } else return routes.AUTH;
   };

   return (
      <Router history={history}>
         <Suspense fallback={<LoadingScreen />}>
            <Switch>
               <Redirect exact from="/" to={getInitialRoute()} />
               {/* <Route path={routes.NOT_FOUND} component={Error404} />
               <Route path={routes.SERVER_ERROR} component={Error500} /> */}
               <Route path={routes.AUTH} component={AuthRoutes} />
               <Route path={routes.CLIENT}>
                  <ClientLayout path={history.location.pathname}>
                     <ClientRoutes />
                  </ClientLayout>
               </Route>
               {/* <Route path={routes.MANAGER}>
                  <ManagerLayout path={history.location.pathname}>

                  </ManagerLayout>
               </Route> */}
            </Switch>
         </Suspense>
      </Router>
   );
});

export default Routes;
