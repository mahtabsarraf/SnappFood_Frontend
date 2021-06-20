import React from "react";
import { Button, Card, Container, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

import routes from "../../router/routes.json";
import nouns from "../../enums/nouns.json";
import {
   decreaseQuantity,
   getOrder,
   increaseQuantity,
   removeFood,
} from "../../redux/slices/clientOrder";

const OrderInformation = () => {
   const order = useSelector(getOrder);
   const dispatch = useDispatch();
   const history = useHistory();

   return (
      <Container>
         {order.restaurantName && (
            <Card className="m-3">
               <Card.Header>
                  <Card.Title>{nouns["DEFAULT.ORDER"]}</Card.Title>
               </Card.Header>
               <Card.Body>
                  <Card.Text>
                     {`${nouns["DEFAULT.RESTAURANT_NAME"]} : ${order.restaurantName}`}
                  </Card.Text>
                  <Card.Text>
                     {`${nouns["DEFAULT.DELIVERY_COST"]} : ${
                        order.deliveryCost || nouns["DEFAULT.FREE"]
                     }`}
                  </Card.Text>
                  <Card.Text>
                     {`${nouns["DEFAULT.DELIVERY_TIME"]} : ${order.deliveryTime}`}
                  </Card.Text>
                  <Table className="text-center" striped bordered hover>
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>{nouns["DEFAULT.FOOD_NAME"]}</th>
                           <th>{nouns["DEFAULT.PRICE"]}</th>
                           <th>{nouns["DEFAULT.QUANTITY"]}</th>
                           <th>{nouns["DEFAULT.TOTAL_PRICE"]}</th>
                           <th>{nouns["DEFAULT.OPERATIONS"]}</th>
                        </tr>
                     </thead>
                     <tbody>
                        {order.foods.map((food, index) => (
                           <tr>
                              <td>{index + 1}</td>
                              <td>{food.name}</td>
                              <td>{food.price}</td>
                              <td>{food.quantity}</td>
                              <td>{food.quantity * food.price}</td>
                              <td>
                                 <Button
                                    onClick={() =>
                                       dispatch(increaseQuantity(index))
                                    }
                                 >
                                    <FontAwesomeIcon icon={faPlus} />
                                 </Button>
                                 <Button
                                    className="mx-2"
                                    onClick={() =>
                                       dispatch(decreaseQuantity(index))
                                    }
                                    disabled={food.quantity <= 1}
                                 >
                                    <FontAwesomeIcon icon={faMinus} />
                                 </Button>
                                 <Button
                                    onClick={() => dispatch(removeFood(index))}
                                 >
                                    <FontAwesomeIcon icon={faTrash} />
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
                  <Card.Text>
                     {`${nouns["DEFAULT.FINAL_PRICE"]} : ${
                        order.price + order.deliveryCost
                     }`}
                  </Card.Text>
               </Card.Body>
               <Card.Footer>
                  <Row>
                     <Button className="m-2" variant="success">
                        {nouns["DEFAULT.SUBMIT_ORDER"]}
                     </Button>
                     <Button
                        className="m-2"
                        variant="primary"
                        onClick={() =>
                           history.push(
                              routes.RESTAURANT_OVERVIEW +
                                 "/" +
                                 order.restaurantId
                           )
                        }
                     >
                        {nouns["DEFAULT.ADD_FOOD"]}
                     </Button>
                     <Button
                        className="m-2"
                        variant="secondary"
                        onClick={() => history.push(routes.CLIENT_MENU)}
                     >
                        {nouns["DEFAULT.NEW_ORDER"]}
                     </Button>
                  </Row>
               </Card.Footer>
            </Card>
         )}
      </Container>
   );
};

export default OrderInformation;
