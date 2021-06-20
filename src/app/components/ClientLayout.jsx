import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import nouns from "../enums/nouns.json";
import routes from "../router/routes.json";

const ClientLayout = ({ children }) => {
   const location = useLocation();

   return (
      <>
         <Navbar
            className="d-flex justify-content-center"
            bg="light"
            expand="lg"
         >
            <Navbar.Brand className="ml-4" href={routes.CLIENT}>
               {nouns["APP.TITLE"]}
            </Navbar.Brand>
            <Nav>
               <Nav.Link
                  href={routes.CLIENT_PROFILE}
                  active={location.pathname === routes.CLIENT_PROFILE}
               >
                  {nouns["DEFAULT.PROFILE"]}
               </Nav.Link>
               <Nav.Link
                  href={routes.CLIENT_MENU}
                  active={location.pathname === routes.CLIENT_MENU}
               >
                  {nouns["DEFAULT.MENU"]}
               </Nav.Link>
               <Nav.Link
                  href={routes.CLIENT_ORDER}
                  active={location.pathname === routes.CLIENT_ORDER}
               >
                  {nouns["DEFAULT.ORDER"]}
               </Nav.Link>
               <Nav.Link
                  href={routes.CLIENT_FAVORITE}
                  active={location.pathname === routes.CLIENT_FAVORITE}
               >
                  {nouns["DEFAULT.FAVORITE_FOOD"]}
               </Nav.Link>

               {/* <h1>موجودی</h1> */}
            </Nav>
         </Navbar>
         <div className="h-100">{children}</div>
      </>
   );
};

export default ClientLayout;
