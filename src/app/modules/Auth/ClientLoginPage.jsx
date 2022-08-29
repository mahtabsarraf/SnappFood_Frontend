import React from "react";
import * as Yup from "yup";
import { Button, Container, Col, Row, Card, Form } from "react-bootstrap";
import { useFormik, FormikProvider } from "formik";
import { useHistory } from "react-router";

import errors from "./../../enums/errors";
import nouns from "../../enums/nouns.json";
import { phoneRegex } from "./../../utils/regex";
import CustomField from "./../../components/common/CustomField";
import routes from "../../router/routes.json";

const schema = Yup.object().shape({
   phoneNumber: Yup.string()
      .matches(
         phoneRegex,
         errors.SHOULD_BE_PHONE_NUMBER(nouns["DEFAULT.PHONE_NUMBER"])
      )
      .required(errors.REQUIRED),
   password: Yup.string().required(errors.REQUIRED),
});

const ClientLoginPage = () => {
   const history = useHistory();

   const formik = useFormik({
      initialValues: {
         phoneNumber: "",
         password: "",
      },
      validationSchema: schema,
      onSubmit: async (values) => {
         console.log(values);
         history.push(routes.CLIENT_PROFILE)
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
                              name="phoneNumber"
                              label={nouns["DEFAULT.PHONE_NUMBER"]}
                              placeholder={
                                 nouns["DEFAULT.PLACEHOLDER.PHONE_NUMBER"]
                              }
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

export default ClientLoginPage;
