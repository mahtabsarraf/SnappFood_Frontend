import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomField from "./../../components/common/CustomField";
import nouns from "../../enums/nouns.json";
import CustomDropdown from "./../../components/common/CustomDropdown";
import regions from "./../../enums/regions";
import { phoneRegex } from "./../../utils/regex";
import errors from "./../../enums/errors";
import checkPassword from "./../../utils/checkPassword";
import MapComponent from "../../components/common/MapComponent";

const tempData = {
   username: "kian jalilian",
   password: "123456",
   phoneNumber: "09117709693",
   address: "somewhere somewhere somewhere",
   region: 3,
};

const schema = Yup.object().shape({
   phoneNumber: Yup.string()
      .matches(
         phoneRegex,
         errors.SHOULD_BE_PHONE_NUMBER(nouns["DEFAULT.PHONE_NUMBER"])
      )
      .required(errors.REQUIRED),
   password: Yup.string()
      .test(
         "checkPassword",
         errors.INVALID(nouns["DEFAULT.PASSWORD"]),
         checkPassword
      )
      .required(errors.REQUIRED),
   username: Yup.string().required(errors.REQUIRED),
   address: Yup.string().required(errors.REQUIRED),
});

const ProfilePage = () => {
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
                     phoneNumber: "",
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
                              name="phoneNumber"
                              label={nouns["DEFAULT.PHONE_NUMBER"]}
                              placeholder={
                                 nouns["DEFAULT.PLACEHOLDER.PHONE_NUMBER"]
                              }
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <CustomField
                              as="textarea"
                              name="address"
                              label={nouns["DEFAULT.ADDRESS_CLIENT"]}
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
                     <Row className="m-4 d-flex justify-content-center">
                        <iframe
                           src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3235.729015130011!2d51.39110669835887!3d35.80658537785358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snl!4v1624453321992!5m2!1sen!2snl"
                           width="600"
                           height="450"
                           allowfullscreen=""
                           loading="lazy"
                        ></iframe>
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

export default ProfilePage;
