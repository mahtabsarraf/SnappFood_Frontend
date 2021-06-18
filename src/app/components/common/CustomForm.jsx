import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { Card, Container, ProgressBar, Modal, Spinner } from "react-bootstrap";
import CustomCardHeader from "./CustomCardHeader";
import CustomButton from "./CustomButton";
import nouns from "../../enums/nouns.json";
import clsx from "clsx";

const CustomForm = ({
   asModal,
   backConfirmText,
   children,
   customSubmitFunction = false,
   disableSubmit,
   initialValues,
   loadingData = false,
   needsCheckTouched = false,
   needsConfirm = true,
   needsContainer = true,
   noResetValues = false,
   onHide,
   onRefresh,
   onReset,
   onSubmit,
   outerRef,
   refreshingData = false,
   renderActionChildren,
   title,
   validationSchema,
   visible,
   wrap = true,
}) => {
   const [loading, setLoading] = useState(false);
   const [isInProgress, setIsInProgress] = useState(true);
   const history = useHistory();
   const ref = useRef(null);

   useEffect(() => {
      setTimeout(() => {
         setIsInProgress(false);
      }, 500);
   }, []);

   const customOnSubmit = (e) => {
      setTimeout(() => {
         setLoading(false);
      }, 2000);
      setLoading(true);
      if (outerRef) onSubmit(outerRef);
      else onSubmit(ref);
   };

   const renderActions = (props) => {
      return (
         <div className="d-flex">
            {renderActionChildren}
            {onSubmit && (
               <CustomButton
                  disabled={disableSubmit || !props.isValid}
                  loading={loading}
                  icon="fas fa-save"
                  variant="primary"
                  title={nouns["COMMON.CUSTOM_FORM.SAVE_TITLE"]}
                  onClick={
                     customSubmitFunction
                        ? customSubmitFunction
                        : customOnSubmit
                  }
                  confirm={needsConfirm}
                  className={clsx("d-flex mx-2 loading-button", {
                     "is-loading": loading,
                  })}
               />
            )}
            {onRefresh && (
               <CustomButton
                  icon={"fas fa-sync-alt " + (refreshingData ? "fa-spin" : "")}
                  title={nouns["COMMON.CUSTOM_FORM.REFRESH_TITLE"]}
                  onClick={onRefresh}
                  variant="info"
               />
            )}
            {!noResetValues && !onReset && (
               <CustomButton
                  icon="fa fa-redo"
                  title={nouns["COMMON.CUSTOM_FORM.RESET_TITLE"]}
                  type="reset"
                  variant="secondary"
               />
            )}
            {!noResetValues && onReset && (
               <CustomButton
                  icon="fa fa-redo"
                  title={nouns["COMMON.CUSTOM_FORM.RESET_TITLE"]}
                  type="reset"
                  onClick={() => onReset()}
                  variant="secondary"
               />
            )}
            <CustomButton
               icon="fa fa-arrow-right"
               onClick={() => {
                  if (asModal) return onHide();
                  history.goBack();
               }}
               title={nouns["COMMON.CUSTOM_FORM.BACK_TITLE"]}
               variant="secondary"
               confirmText={backConfirmText}
            />
         </div>
      );
   };

   //some forms need validation in the beginning so that they can't be submitted without changes being made to them.
   //we pass needsCheckTouched = true as prop to trigger this function.
   const checkTouched = (props) => {
      if (!needsCheckTouched) return null;

      let areFieldsTouched = false;
      for (let key in props.touched) {
         if (props.touched[key] === true) areFieldsTouched = true;
      }
      if (!areFieldsTouched) props.isValid = false;
   };

   const renderContent = () => {
      if (asModal) {
         return (
            <Modal
               className="modal-background-blur custom-form-modal"
               show={visible}
               onHide={onHide}
               size="lg"
            >
               <Modal.Header className="text-right py-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                     <h5 className="mb-0">{title}</h5>
                  </div>
               </Modal.Header>
               <Formik
                  innerRef={outerRef ? outerRef : ref}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={
                     customSubmitFunction
                        ? customSubmitFunction
                        : customOnSubmit
                  }
               >
                  {(props) => {
                     checkTouched(props);

                     return (
                        <Form
                           onSubmit={
                              customSubmitFunction
                                 ? customSubmitFunction
                                 : customOnSubmit
                           }
                           noValidate
                        >
                           <Modal.Body>{children}</Modal.Body>
                           <Modal.Footer className="bg-white py-4">
                              {renderActions(props)}
                           </Modal.Footer>
                        </Form>
                     );
                  }}
               </Formik>
            </Modal>
         );
      }

      return (
         <Card className="custom-form">
            {isInProgress && (
               <ProgressBar
                  animated
                  variant="info"
                  now={100}
                  style={{ height: "3px" }}
               />
            )}
            <Formik
               innerRef={outerRef ? outerRef : ref}
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={
                  customSubmitFunction ? customSubmitFunction : customOnSubmit
               }
            >
               {(props) => {
                  checkTouched(props);

                  return (
                     <Form
                        onSubmit={(e) =>
                           customSubmitFunction
                              ? customSubmitFunction(e)
                              : customOnSubmit(e)
                        }
                        // noValidate
                     >
                        <CustomCardHeader title={title}>
                           {renderActions(props)}
                        </CustomCardHeader>
                        {loadingData ? (
                           <Card.Body>
                              <div className="loading-form-spinner">
                                 <span className="load-data-text">
                                    {nouns["DEFAULT.LOADING_DATA"]}
                                 </span>
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    role="status"
                                    aria-hidden="true"
                                    className="table-spinner"
                                    variant="primary"
                                 />
                              </div>
                           </Card.Body>
                        ) : (
                           <Card.Body>{children}</Card.Body>
                        )}
                     </Form>
                  );
               }}
            </Formik>
         </Card>
      );
   };

   return needsContainer ? (
      <Container className={wrap ? "page-wrapper" : ""}>
         {renderContent()}
      </Container>
   ) : (
      <>{renderContent()}</>
   );
};

export default CustomForm;
