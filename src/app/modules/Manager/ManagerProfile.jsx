import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import CustomField from "./../../components/common/CustomField";
import nouns from "../../enums/nouns.json";
import CustomDropdown from "./../../components/common/CustomDropdown";
import regions from "./../../enums/regions";
import errors from "./../../enums/errors";
import checkPassword from "./../../utils/checkPassword";

const tempData = {
   username: "kian jalilian",
   password: "12345678",
   email: "kian.jalilian@gmail.com",
   restaurantName: "آویشن",
   address: "تهران، بلوار دانشجو ...",
   region: 3,
   workingHours: "8:00 تا 16:00",
   deliveryCost: 10000,
   deliveryTime: 20
};

const schema = Yup.object().shape({
   password: Yup.string()
      .test(
         "checkPassword",
         errors.INVALID(nouns["DEFAULT.PASSWORD"]),
         checkPassword
      )
      .required(errors.REQUIRED),
   username: Yup.string().required(errors.REQUIRED),
   email: Yup.string().email(errors.SHOULD_BE_EMAIL(nouns["DEFAULT.EMAIL"])),
   restaurantName: Yup.string().required(errors.REQUIRED),
   workingHours: Yup.string().required(errors.REQUIRED),
   deliveryCost: Yup.number().typeError(errors.SHOULD_BE_NUMBER(nouns["DEFAULT.DELIVERY_COST"])).required(errors.REQUIRED),
   deliveryTime: Yup.number().typeError(errors.SHOULD_BE_NUMBER(nouns["DEFAULT.DELIVERY_TIME"])).required(errors.REQUIRED),
   address: Yup.string().required(errors.REQUIRED),
});

const ManagerProfile = () => {
   const [inputValues, setInputValues] = useState();
   const [chosenRegion, setChosenRegion] = useState();

   const formikRef = useRef();

   useEffect(() => {
         setInputValues(tempData);
         setChosenRegion(tempData.region);
   }, []);

   useEffect(() => {
      if (!inputValues) return;
      formikRef?.current?.setValues(tempData);
   }, [inputValues]);

   const onSubmit = async (ref) => {
      console.log(ref.current.values);
   };

   return (
      <Container className="my-3 mx-auto">
         <Card bg="light" text="dark">
            <Card.Header>
               <Card.Title>{nouns["DEFAULT.EDIT_PROFILE"]}</Card.Title>
            </Card.Header>
            <Card.Body>
               <Formik
                  initialValues={{
                     username: "",
                     password: "",
                     email: "",
                     restaurantName: "",
                     workingHours: "",
                     deliveryCost: 0,
                     deliveryTime: 0,
                     address: "",
                  }}
                  innerRef={formikRef}
                  schema={schema}
                  onSubmit={onSubmit}
               >
                  <Form className="d-flex flex-column">
                     <Row>
                        <Col sm="6">
                           <CustomField
                              name="username"
                              label={nouns["DEFAULT.USERNAME"]}
                           />
                        </Col>
                        <Col sm="6">
                           <CustomField
                              name="email"
                              label={nouns["DEFAULT.EMAIL"]}
                              placeholder={
                                 nouns["DEFAULT.PLACEHOLDER.EMAIL"]
                              }
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <CustomField
                              as="textarea"
                              name="address"
                              label={nouns["DEFAULT.ADDRESS_RESTAURANT"]}
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <CustomField
                              type="password"
                              name="password"
                              label={nouns["DEFAULT.PASSWORD"]}
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <CustomDropdown
                              value={regions.find(
                                 (r) => r.value === chosenRegion
                              )}
                              options={regions}
                              onChange={({ value }) => setChosenRegion(value)}
                              title={nouns["DEFAULT.REGION"]}
                              wrapperClass="mb-4"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <CustomField
                              name="restaurantName"
                              label={nouns["DEFAULT.RESTAURANT_NAME"]}
                           />
                        </Col>
                        <Col>
                           <CustomField
                              name="workingHours"
                              label={nouns["DEFAULT.WORKING_HOURS"]}
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <CustomField
                              name="deliveryCost"
                              label={nouns["DEFAULT.DELIVERY_COST"]}
                           />
                        </Col>
                        <Col>
                           <CustomField
                              name="deliveryTime"
                              label={nouns["DEFAULT.DELIVERY_TIME"]}
                           />
                        </Col>
                     </Row>
                     <Col>
                        <Button block variant="primary" type="submit">
                           {nouns["DEFAULT.SAVE_CHANGES"]}
                        </Button>
                     </Col>
                  </Form>
               </Formik>
            </Card.Body>
         </Card>
      </Container>
   );
};

export default ManagerProfile;
