import React from "react";
import { Form, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";

const CustomInput = ({
   additionalClasses,
   icon,
   onIconClick,
   label,
   hint,
   tooltip,
   error,
   valid,
   type,
   children,
   value = "",
   readOnly = false,
   asRow = false,
   needValidation = true,
   inTable = false,
   dir,
   labelClasses = "",
   ...props
}) => {
   if (type === "select") {
      return (
         <Form.Group>
            <Form.Label className="d-flex align-items-center">
               {label}
               <CustomTooltip tooltip={tooltip} />
            </Form.Label>
            <Form.Control dir={dir ? dir : "rtl"} {...props} as="select">
               {children}
            </Form.Control>
            <CustomHint
               hint={hint}
               valid={valid}
               needValidation={needValidation}
               error={error}
            />
         </Form.Group>
      );
   }

   if (type === "checkbox" || type === "switch" || type === "radio") {
      return (
         <Form.Group>
            <Form.Label className="d-flex align-items-center">
               <Form.Check
                  {...props}
                  type={type}
                  inline={asRow}
                  id={type === "switch" ? `switch-${label}` : props.id}
               />
               {label}
            </Form.Label>
            <CustomHint
               hint={hint}
               valid={valid}
               needValidation={needValidation}
               error={error}
            />
         </Form.Group>
      );
   }

   const getFormInput = (isRow) => (
      <>
         <Form.Control
            {...props}
            dir={dir || "rtl"}
            className={additionalClasses || "text-right"}
            value={value || ""}
            isInvalid={error}
            isValid={valid}
            type={type}
            readOnly={readOnly}
         />
         <CustomHint
            hint={hint}
            valid={valid}
            needValidation={needValidation}
            error={error}
         />
      </>
   );

   return asRow ? (
      <Form.Group as={Row} className={inTable ? "m-0" : ""}>
         <Col xs={3}>
            <Form.Label column className={labelClasses || "text-center"}>
               {label}
               <CustomTooltip tooltip={tooltip} />
            </Form.Label>
         </Col>

         <Col xs={9}>{getFormInput(true)}</Col>
      </Form.Group>
   ) : (
      <Form.Group as={Col} className={inTable && "m-0"}>
         <Form.Label className={labelClasses || "d-flex align-items-center"}>
            {label}
            <CustomTooltip tooltip={tooltip} />
         </Form.Label>
         {getFormInput(false)}
      </Form.Group>
   );
};

function CustomTooltip({ tooltip }) {
   if (!tooltip) return null;
   return (
      <OverlayTrigger placement="left" overlay={<Tooltip>{tooltip}</Tooltip>}>
         <i className="fa fa-info-circle ml-2 text-primary" />
      </OverlayTrigger>
   );
}

export function CustomHint({ hint, error, classes }) {
   if (error) {
      return (
         <Form.Control.Feedback className={classes} type="invalid">
            {error}
         </Form.Control.Feedback>
      );
   }
   return <Form.Text className={classes}>{hint}</Form.Text>;
}

export default CustomInput;
