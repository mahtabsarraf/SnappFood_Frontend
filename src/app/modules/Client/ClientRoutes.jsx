import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../router/routes.json";
import LoadingScreen from "./../../pages/LoadingScreen";
import ProfilePage from "./ProfilePage";
import RestaurantMenu from "./RestaurantMenu";
import ClientRestaurantPage from "./ClientRestaurantPage";

const ClientRoutes = () => {
   return (
      <Suspense fallback={<LoadingScreen />}>
         <Switch>
            <Route exact component={ProfilePage} path={routes.CLIENT_PROFILE} />
            <Route exact component={RestaurantMenu} path={routes.CLIENT_MENU} />
            <Route
               exact
               component={ClientRestaurantPage}
               path={routes.RESTAURANT_OVERVIEW + "/:id"}
            />
            <Redirect to={routes.CLIENT_MENU} />
         </Switch>
      </Suspense>
   );
};

export default ClientRoutes;
