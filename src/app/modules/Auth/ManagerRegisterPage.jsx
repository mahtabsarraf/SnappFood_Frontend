import React, { useState } from "react";
import * as Yup from "yup";
import { Button, Container, Col, Row, Card, Form } from "react-bootstrap";
import { useFormik, FormikProvider } from "formik";

import errors from "./../../enums/errors";
import nouns from "../../enums/nouns.json";
import CustomField from "./../../components/common/CustomField";
import CustomDropdown from "./../../components/common/CustomDropdown";
import regions from "./../../enums/regions";
import { useHistory } from "react-router";
import checkPassword from "../../utils/checkPassword";
import routes from "../../router/routes.json";

const schema = Yup.object().shape({
   email: Yup.string()
      .email(errors.SHOULD_BE_EMAIL(nouns["DEFAULT.EMAIL"]))
      .required(errors.REQUIRED),
   password: Yup.string()
      .test(
         "password",
         errors.INVALID(nouns["DEFAULT.USERNAME"]),
         checkPassword
      )
      .required(errors.REQUIRED),
   name: Yup.string().required(errors.REQUIRED),
   address: Yup.string().required(errors.REQUIRED),
});

const ManagerRegisterPage = () => {
   const [chosenRegion, setChosenRegion] = useState();
   const history = useHistory();

   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
         name: "",
         address: "",
      },
      validationSchema: schema,
      onSubmit: async (values) => {
         console.log(values);
         console.log(chosenRegion);
         history.push(routes.MANAGER_PROFILE);
      },
   });

   return (
      <Container className="auth-container w-100 h-100">
         <Row className="w-100 h-100 d-flex justify-content-center align-items-center">
            <Col sm="11" md="6">
               <Card border="dark" bg="light" text="dark">
                  <Card.Header className="d-flex justify-content-between">
                     {nouns["AUTH.REGISTER_MANAGER"]}
                     <Button variant="danger" onClick={() => history.goBack()}>
                        {nouns["DEFAULT.GO_BACK"]}
                     </Button>
                  </Card.Header>
                  <Card.Body>
                     <FormikProvider value={formik}>
                        <Form onSubmit={formik.handleSubmit}>
                           <CustomField
                              name="name"
                              label={nouns["DEFAULT.RESTAURANT_NAME"]}
                           />
                           <CustomField
                              as="textarea"
                              name="address"
                              label={nouns["DEFAULT.ADDRESS_RESTAURANT"]}
                           />
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
                           <CustomDropdown
                              options={regions}
                              onChange={({ value }) => setChosenRegion(value)}
                              title={nouns["DEFAULT.REGION"]}
                              wrapperClass="mb-4"
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

export default ManagerRegisterPage;
