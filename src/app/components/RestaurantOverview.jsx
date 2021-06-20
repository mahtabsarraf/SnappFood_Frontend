import React from "react";
import { Col, Image, Row } from "react-bootstrap";

import nouns from "../enums/nouns.json";

const RestaurantOverview = ({ logo, data }) => {
   return (
      <Row className="my-3">
         <Col sm="4">
            <Image src={logo} />
         </Col>
         <Col>
            <h1>{data.name}</h1>
            <p>{nouns["DEFAULT.WORKING_HOURS"] + data.workingHours}</p>
            <p>{nouns["DEFAULT.DELIVERY_TIME"] + data.deliveryTime}</p>
            <p>
               {nouns["DEFAULT.DELIVERY_COST"] +
                  (data.deliveryCost || nouns["DEFAULT.FREE"])}
            </p>
         </Col>
      </Row>
   );
};

export default RestaurantOverview;
