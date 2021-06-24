import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import moment from "jalali-moment";

import nouns from "../enums/nouns.json";
import messages from "./../enums/messages";

const tempComments = [
   {
      name: "کیان جلیلیان",
      rate: 4,
      text: "غذا سرد بود.",
      date: new Date(),
      id: 0,
   },
   {
      name: "کیان جلیلیان",
      rate: 4,
      text: "غذا سرد بود.",
      date: new Date(),
      response: "ببخشید :(",
      id: 1,
   },
   {
      name: "کیان جلیلیان",
      rate: 4,
      text: "غذا سرد بود.",
      date: new Date(),
      response: "ای بابا :(",
      id: 2,
   },
   {
      name: "کیان جلیلیان",
      rate: 4,
      text: "اسیر شدیم.",
      date: new Date(),
      response: "ببخشید :(",
      id: 3,
   },
];

const CommentsModal = ({ visible, onHide, food }) => {
   const [comments, setComments] = useState([]);

   useEffect(() => {
      const getFoodComments = async () => {
         setComments(tempComments);
      };

      if (visible) getFoodComments();
   }, [food, visible]);

   return (
      <Modal
         size="lg"
         show={visible}
         onHide={onHide}
         className="modal-background-blur"
      >
         <Modal.Header>
            <Modal.Title>
               {nouns["DEFAULT.FOOD_COMMENTS"] + food.name}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {comments.map((comment, index) => (
               <Card className="my-2 text-right" key={index}>
                  <Card.Header>
                     <Card.Text>
                        {messages.commentFromAt(
                           comment.name,
                           moment(comment.date)
                              .locale("fa")
                              .format("DD MMM YYYY")
                        )}
                     </Card.Text>
                  </Card.Header>
                  <Card.Body>
                     <Card.Text>{`${nouns["DEFAULT.FOOD_RATE"]} : ${comment.rate}`}</Card.Text>
                     <Card.Text>{comment.text}</Card.Text>
                     {comment.response ? (
                        <Card>
                           <Card.Header>
                              <Card.Text>
                                 {nouns["DEFAULT.MANAGER_RESPONSE"]}
                              </Card.Text>
                           </Card.Header>
                           <Card.Body>
                              <Card.Text>{comment.response}</Card.Text>
                           </Card.Body>
                        </Card>
                     ) : null}
                  </Card.Body>
               </Card>
            ))}
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={onHide} variant="secondary">
               {nouns["DEFAULT.BACK"]}
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default CommentsModal;
