import React, { useEffect, useState } from "react";
import { Button, Container, Col, Row, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "../../assets/FoodPlanet.png";
import nouns from "../../enums/nouns.json";
import routes from "../../router/routes.json";
import { chooseRestaurant } from "../../redux/slices/clientOrder";

const tempRestaurants = [
   {
      name: "تست 1",
      workingHours: "از 12 ظهر تا 4 بعد از ظهر",
      deliveryTime: "30 دقیقه",
      deliveryCost: 0,
      id: 1,
   },
   {
      name: "تست 2",
      workingHours: "از 12 ظهر تا 6 بعد از ظهر",
      deliveryTime: "30 دقیقه",
      deliveryCost: 1000,
      id: 2,
   },
   {
      name: "تست 3",
      workingHours: "از 12 ظهر تا 12  شب",
      deliveryTime: "50 دقیقه",
      deliveryCost: 2000,
      id: 3,
   },
   {
      name: "تست 4",
      workingHours: "از 12 ظهر تا 4 بعد از ظهر",
      deliveryTime: "30 دقیقه",
      deliveryCost: 1253,
      id: 4,
   },
   {
      name: "مک دونالد",
      workingHours: "از 12 ظهر تا 4 بعد از ظهر",
      deliveryTime: "30 دقیقه",
      deliveryCost: 0,
      id: 5,
   },
   {
      name: "وندی",
      workingHours: "از 12 ظهر تا 4 بعد از ظهر",
      deliveryTime: "30 دقیقه",
      deliveryCost: 40000,
      id: 6,
   },
];

const RestaurantMenu = () => {
   const [restaurantsList, setRestaurantsList] = useState();
   const history = useHistory();
   const dispatch = useDispatch();

   useEffect(() => {
      setRestaurantsList(tempRestaurants);
   }, []);

   const handleChooseRestaurant = (restaurant) => {
      history.push(routes.RESTAURANT_OVERVIEW + "/" + restaurant.id);
      dispatch(
         chooseRestaurant({
            restaurantName: restaurant.name,
            restaurantId: restaurant.id,
            deliveryCost: restaurant.deliveryCost,
            deliveryTime: restaurant.deliveryTime,
         })
      );
   };

   return (
      <Container className="h-100">
         <Card bg="light" text="dark">
            <Row className="h-100">
               {restaurantsList?.map((restaurant) => (
                  <Col key={restaurant.id} className="my-2 h-100" md="4" sm="6">
                     <Card className="h-90 m-3" bg="light" text="dark">
                        <Card.Img
                           className="restaurant-image"
                           src={logo}
                           variant="top"
                        />
                        <Card.Body>
                           <Card.Title>{restaurant.name}</Card.Title>
                           <Card.Text>
                              {nouns["DEFAULT.WORKING_HOURS"] +
                                 restaurant.workingHours}
                           </Card.Text>
                           <Card.Text>
                              {nouns["DEFAULT.DELIVERY_TIME"] +
                                 restaurant.deliveryTime}
                           </Card.Text>

                           <Card.Text>
                              {nouns["DEFAULT.DELIVERY_COST"] +
                                 (restaurant.deliveryCost ||
                                    nouns["DEFAULT.FREE"])}
                           </Card.Text>
                           <Button
                              block
                              variant="success"
                              onClick={() => handleChooseRestaurant(restaurant)}
                           >
                              {nouns["DEFAULT.GO_TO_RESTAURANT_PAGE"]}
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
               ))}
            </Row>
         </Card>
      </Container>
   );
};

export default RestaurantMenu;
