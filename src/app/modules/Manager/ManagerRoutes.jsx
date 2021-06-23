import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../router/routes.json";
import LoadingScreen from "./../../pages/LoadingScreen";
import ManagerProfile from './ManagerProfile';

const ManagerRoutes = () => {
   return (
      <Suspense fallback={<LoadingScreen />}>
         <Switch>
            <Route exact component={ManagerProfile} path={routes.MANAGER_PROFILE} />
            <Redirect to={routes.MANAGER_MENU} />
         </Switch>
      </Suspense>
   );
};

export default ManagerRoutes;