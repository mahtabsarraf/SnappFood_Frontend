import React from "react";
import * as Yup from "yup";
import { Button, Container, Col, Row, Card, Form } from "react-bootstrap";
import { useFormik, FormikProvider } from "formik";
import { useHistory } from "react-router";

import errors from "./../../enums/errors";
import nouns from "../../enums/nouns.json";
import CustomField from "./../../components/common/CustomField";

const schema = Yup.object().shape({
   email: Yup.string().email(errors.SHOULD_BE_EMAIL).required(errors.REQUIRED),
   password: Yup.string().required(errors.REQUIRED),
});

const ManagerLoginPage = () => {
   const history = useHistory();
   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: schema,
      onSubmit: async (values) => {
         console.log(values);
      },
   });

   return (
      <Container className="auth-container w-100 h-100">
         <Row className="w-100 h-100 d-flex justify-content-center align-items-center">
            <Col sm="11" md="6">
               <Card border="dark" bg="light" text="dark">
                  <Card.Header className="d-flex justify-content-between">
                     {nouns["AUTH.LOGIN_CLIENT"]}
                     <Button variant="danger" onClick={() => history.goBack()}>
                        {nouns["DEFAULT.GO_BACK"]}
                     </Button>
                  </Card.Header>
                  <Card.Body>
                     <FormikProvider value={formik}>
                        <Form onSubmit={formik.handleSubmit}>
                           <CustomField
                              name="email"
                              label={nouns["DEFAULT.EMAIL"]}
                              placeholder={nouns["DEFAULT.PLACEHOLDER.EMAIL"]}
                           />
                           <CustomField
                              type="password"
                              name="password"
                              label={nouns["DEFAULT.PASSWORD"]}
                           />
                           <Col>
                              <Button block variant="primary" type="submit">
                                 {nouns["DEFAULT.LOGIN"]}
                              </Button>
                           </Col>
                        </Form>
                     </FormikProvider>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   );
};

export default ManagerLoginPage;
