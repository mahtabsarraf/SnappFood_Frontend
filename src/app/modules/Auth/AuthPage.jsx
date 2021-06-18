import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";

import nouns from "../../enums/nouns.json";
import routes from "../../router/routes.json";

const AuthPage = () => {
   const history = useHistory();
   return (
      <Container className="auth-container w-100 h-100">
         <Row className="w-100 h-100 d-flex justify-content-center align-items-center text-center">
            <Col sm="11" md="6">
               <Card border="dark" bg="light" text="dark">
                  <Card.Body>
                     <h2>{nouns["AUTH.WELCOME"]}</h2>
                     <Row className="m-2">
                        <Col sm="6">
                           <Button
                              variant="primary"
                              block
                              onClick={() => history.push(routes.CLIENT_LOGIN)}
                           >
                              {nouns["AUTH.LOGIN_CLIENT"]}
                           </Button>
                        </Col>
                        <Col sm="6">
                           <Button
                              variant="primary"
                              block
                              onClick={() =>
                                 history.push(routes.CLIENT_REGISTER)
                              }
                           >
                              {nouns["AUTH.REGISTER_CLIENT"]}
                           </Button>
                        </Col>
                     </Row>
                     <Row className="m-2">
                        <Col sm="6">
                           <Button
                              variant="primary"
                              block
                              onClick={() => history.push(routes.MANAGER_LOGIN)}
                           >
                              {nouns["AUTH.LOGIN_MANAGER"]}
                           </Button>
                        </Col>
                        <Col sm="6">
                           <Button
                              variant="primary"
                              block
                              onClick={() =>
                                 history.push(routes.MANAGER_REGISTER)
                              }
                           >
                              {nouns["AUTH.REGISTER_MANAGER"]}
                           </Button>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   );
};

export default AuthPage;
