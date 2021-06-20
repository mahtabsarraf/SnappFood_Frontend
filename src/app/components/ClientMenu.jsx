import React, { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import nouns from "../enums/nouns.json";
import messages from "../enums/messages";
import CommentsModal from "./../modals/CommentsModal";
import { addFood, getFoods } from "../redux/slices/clientOrder";

const ClientMenu = ({ food }) => {
   const [modalVisible, setModalVisible] = useState(false);
   const [quantity, setQuantity] = useState(1);
   const [isFoodInOrder, setIsFoodInOrder] = useState(false);
   const foods = useSelector(getFoods);

   useEffect(() => {
      if (!foods) return;
      console.log(foods);
      setIsFoodInOrder(foods.find((f) => f.id === food.id));
   }, [foods, food]);

   const dispatch = useDispatch();

   const getAddButtonTitle = () => {
      if (isFoodInOrder) return nouns["DEFAULT.FOOD_ALREADY_IN_ORDER"];
      else if (!food.isReady) return nouns["DEFAULT.FOOD_NOT_READY"];
      else return nouns["DEFAULT.ADD_FOOD"];
   };

   return (
      <>
         <Card className="m-3 p-2 text-center">
            <h3>{food.name}</h3>
            <Card.Text>{food.price + " " + nouns["DEFAULT.TOMAN"]}</Card.Text>
            <Card.Text>
               {
                  nouns[
                     food.isReady
                        ? "DEFAULT.FOOD_READY"
                        : "DEFAULT.FOOD_NOT_READY"
                  ]
               }
            </Card.Text>
            <Card.Text>
               {messages.rateFromComment(food.rate, food.totalComments)}
            </Card.Text>
            <Row className="d-flex justify-content-center">
               <Button
                  variant="secondary"
                  onClick={() => setQuantity(quantity + 1)}
               >
                  +
               </Button>

               <span className="mx-2">{quantity}</span>

               <Button
                  variant="secondary"
                  disabled={quantity <= 1}
                  onClick={() => {
                     setQuantity(quantity - 1);
                  }}
               >
                  -
               </Button>
            </Row>
            <Row>
               <Button
                  block
                  className="m-2 mx-5"
                  variant="primary"
                  disabled={!food.isReady || isFoodInOrder}
                  onClick={() =>
                     dispatch(
                        addFood({
                           quantity,
                           id: food.id,
                           restaurantId: food.restaurantId,
                        })
                     )
                  }
               >
                  {getAddButtonTitle()}
               </Button>
               <Button
                  block
                  className="m-2 mx-5"
                  variant="success"
                  disabled={!food.totalComments}
                  onClick={() => setModalVisible(true)}
               >
                  {nouns["DEFAULT.SHOW_COMMENTS"]}
               </Button>
            </Row>
         </Card>
         <CommentsModal
            food={food}
            visible={modalVisible}
            onHide={() => {
               setModalVisible(false);
            }}
         />
      </>
   );
};

export default ClientMenu;
