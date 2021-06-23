import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import nouns from "../enums/nouns.json";
import routes from "../router/routes.json";

const ManagerLayout = ({ children }) => {
   const location = useLocation();

   return (
      <>
         <Navbar
            className="d-flex justify-content-center"
            bg="light"
            expand="lg"
         >
            <Navbar.Brand className="ml-4" href={routes.MANAGER}>
               {nouns["APP.TITLE"]}
            </Navbar.Brand>
            <Nav>
               <Nav.Link
                  href={routes.MANAGER_PROFILE}
                  active={location.pathname === routes.MANAGER_PROFILE}
               >
                  {nouns["DEFAULT.PROFILE"]}
               </Nav.Link>
               <Nav.Link
                  href={routes.MANAGER_MENU}
                  active={location.pathname === routes.MANAGER_MENU}
               >
                  {nouns["DEFAULT.MENU"]}
               </Nav.Link>
               <Nav.Link
                  href={routes.MANAGER_ORDERS}
                  active={location.pathname === routes.MANAGER_ORDERS}
               >
                  {nouns["DEFAULT.ORDERS"]}
               </Nav.Link>
               <Nav.Link
                  href={routes.MANAGER_COMMENTS}
                  active={location.pathname === routes.MANAGER_COMMENTS}
               >
                  {nouns["DEFAULT.COMMENTS"]}
               </Nav.Link>
               <Nav.Link href={routes.AUTH} className="text-danger">
                  {nouns["DEFAULT.LOGOUT"]}
               </Nav.Link>
            </Nav>
         </Navbar>
         <div className="h-100">{children}</div>
      </>
   );
};

export default ManagerLayout;
