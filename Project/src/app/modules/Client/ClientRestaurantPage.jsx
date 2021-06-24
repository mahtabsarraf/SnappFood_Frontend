import React, { useState, useEffect } from "react";
import { Card, Col, Container, ListGroup, Row, Tab } from "react-bootstrap";

import logo from "../../assets/FoodPlanet.png";
import RestaurantOverview from "./../../components/RestaurantOverview";
import ClientMenu from "./../../components/ClientMenu";

const tempRestaurantData = {
   name: "مک دونالد",
   workingHours: "از 12 ظهر تا 4 بعد از ظهر",
   deliveryTime: "30 دقیقه",
   deliveryCost: 0,
   id: 5,
   menu: [
      {
         name: "کباب کوبیده",
         price: 40000,
         isReady: true,
         rate: 4.5,
         totalComments: 41,
         restaurantId: 1,
         id: 1,
      },
      {
         name: "جوجه کباب",
         price: 35000,
         isReady: true,
         rate: 3.8,
         totalComments: 10,
         restaurantId: 1,
         id: 2,
      },
      {
         name: "کباب برگ",
         price: 60000,
         isReady: false,
         rate: 5,
         totalComments: 12,
         restaurantId: 1,
         id: 3,
      },
      {
         name: "خورشت قیمه",
         price: 25000,
         isReady: false,
         rate: 3.7,
         totalComments: 50,
         restaurantId: 1,
         id: 4,
      },
      {
         name: "خورشت قورمه سبزی",
         price: 25000,
         isReady: true,
         rate: 4.2,
         totalComments: 203,
         restaurantId: 1,
         id: 5,
      },
      {
         name: "برنج",
         price: 12500,
         isReady: true,
         rate: 3,
         totalComments: 14,
         restaurantId: 1,
         id: 6,
      },
      {
         name: "دوبل برگر",
         price: 3535,
         isReady: true,
         rate: 5,
         totalComments: 40,
         restaurantId: 1,
         id: 7,
      },
      {
         name: "چیزبرگر",
         price: 348956,
         isReady: false,
         rate: 4.5,
         totalComments: 30,
         restaurantId: 1,
         id: 8,
      },
   ],
};

const ClientRestaurantPage = () => {
   const [restaurantData, setRestaurantData] = useState();

   useEffect(() => {
      setRestaurantData(tempRestaurantData);
   }, []);

   return (
      <Container className="my-3">
         {restaurantData && (
            <Tab.Container
               id="list-group-tabs-example"
               defaultActiveKey="#overview"
            >
               <Row>
                  <Col sm="3">
                     <ListGroup>
                        <ListGroup.Item action href="#overview">
                           overview
                        </ListGroup.Item>
                        <ListGroup.Item action href="#menu">
                           menu
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
                  <Col sm="9">
                     <Card bg="light" text="dark">
                        <Tab.Content>
                           <Tab.Pane eventKey="#overview">
                              {restaurantData && (
                                 <RestaurantOverview
                                    data={restaurantData}
                                    logo={logo}
                                 />
                              )}
                           </Tab.Pane>
                           <Tab.Pane eventKey="#menu">
                              <Card.Body>
                                 <Row>
                                    {restaurantData.menu.map((food) => (
                                       <Col md="6" key={food.id}>
                                          {food && <ClientMenu food={food} />}
                                       </Col>
                                    ))}
                                 </Row>
                              </Card.Body>
                           </Tab.Pane>
                        </Tab.Content>
                     </Card>
                  </Col>
               </Row>
            </Tab.Container>
         )}
      </Container>
   );
};

export default ClientRestaurantPage;
