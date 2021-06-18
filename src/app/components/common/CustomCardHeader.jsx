import React from "react";
import { Card } from "react-bootstrap";

function CustomCardHeader({ title, children }) {
   return (
      <Card.Header className="d-flex justify-content-between bg-white px-5 py-4 align-items-center">
         <h5 className="mb-0 text-center">{title}</h5>
         {children}
      </Card.Header>
   );
}

export default CustomCardHeader;
