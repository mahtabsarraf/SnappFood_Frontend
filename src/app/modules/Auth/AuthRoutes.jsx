import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../router/routes.json";
import LoadingScreen from "./../../pages/LoadingScreen";
import AuthPage from "./AuthPage";
import ClientLoginPage from "./ClientLoginPage";
import ClientRegisterPage from "./ClientRegisterPage";
import ManagerLoginPage from "./ManagerLoginPage";
import ManagerRegisterPage from "./ManagerRegisterPage";

const AuthRoutes = () => {
   return (
      <Suspense fallback={<LoadingScreen />}>
         <Switch>
            <Route exact path={routes.AUTH} component={AuthPage} />
            <Route
               exact
               path={routes.CLIENT_LOGIN}
               component={ClientLoginPage}
            />
            <Route
               exact
               path={routes.MANAGER_LOGIN}
               component={ManagerLoginPage}
            />
            <Route
               exact
               path={routes.MANAGER_REGISTER}
               component={ManagerRegisterPage}
            />
            <Route
               exact
               path={routes.CLIENT_REGISTER}
               component={ClientRegisterPage}
            />
            <Redirect to={routes.AUTH} />
         </Switch>
      </Suspense>
   );
};

export default AuthRoutes;
