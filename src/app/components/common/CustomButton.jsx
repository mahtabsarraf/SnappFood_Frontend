import React, { useState, useRef } from "react";
import { Button, Overlay, Popover, Spinner } from "react-bootstrap";
import cls from "classnames";
import nouns from "../../enums/nouns.json";

/**
 * Custom Button with several optional props
 * @author Kian Jalilian // 2020/09/23
 * @Component CustomButton
 * @param {boolean} confirm whether or not the button click needs confirmation or not
 * @param {string} className className string to override default classes if needed
 * @param {boolean} onTable if true, appropriate classes are added to make the button fit the table
 * @param {string} variant type of button base on variant in bootstrap button
 * @param {string} type Defines HTML button type attribute. base on bootstrap
 * @param {string} title title of the button (title is optional)
 * @param {string} icon icon of button (icon is optional)
 * @param {function} onClick function that is executed after button click
 * @param {boolean} disabled whether or not the button is disabled,
 * @param {boolean} loading additional styles and classes are added to button if its in loading state
 * @param {number} size changes icon size
 * @dependencies 'react-bootstrap'
 * @documentation https://react-bootstrap.github.io/components/buttons/
 */

const CustomButton = ({
   buttonStyle,
   confirm,
   confirmText = nouns["COMMON.CUSTOM_BUTTON.CONFIRM_QUESTION"],
   className,
   onTable = false,
   variant,
   type,
   title,
   icon,
   onClick,
   disabled,
   loading,
   size,
   ...props
}) => {
   const disableStyle = {
      userSelect: "none",
      pointerEvents: "none",
   };

   const [visible, setVisible] = useState(false);
   const [target, setTarget] = useState(null);
   const ref = useRef(null);

   const handleClick = event => {
      if (confirm) {
         setVisible(!visible);
         setTarget(event.target);
      } else {
         onClick && onClick(event);
      }
   };

   const onConfirm = c => {
      setVisible(!visible);
      if (c && type !== "submit") onClick(target);
   };

   return (
      <>
         <Button
            {...props}
            // className={className ? className + " " + (onTable ? "" : " mx-2") : "mx-2"}
            className={className ? className : "mx-2"}
            disabled={disabled || loading ? true : false}
            onClick={handleClick}
            variant={variant}
            type={type}
            style={
               disabled || loading
                  ? { ...disableStyle, buttonStyle }
                  : buttonStyle
            }
         >
            {title ? <span>{title}</span> : null}
            {!loading && icon ? (
               <i
                  className={cls(icon, { "ml-2": title })}
                  style={{ margin: 0, padding: 0, fontSize: `${size}px` }}
               />
            ) : null}
            {loading ? (
               <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="loading-spinner"
               />
            ) : null}
         </Button>
         {confirm && (
            <Overlay
               onHide={() => setVisible(false)}
               show={visible}
               rootClose
               target={target}
               placement="top"
               container={ref.current}
            >
               <Popover style={{ fontFamily: "inherit", direction: "rtl" }}>
                  <Popover.Title className="text-center">
                     {confirmText}
                  </Popover.Title>
                  <Popover.Content className="d-flex justify-content-center">
                     <Button
                        variant="primary"
                        type={type}
                        onClick={() => onConfirm(true)}
                        className="rounded-0"
                     >
                        {nouns["DEFAULT.ACCEPT"]}
                        <i className="fas fa-check ml-1" />
                     </Button>
                     <Button
                        variant="danger"
                        className="rounded-0"
                        onClick={() => onConfirm(false)}
                     >
                        {nouns["DEFAULT.CANCEL"]}
                        <i className="fas fa-times ml-1" />
                     </Button>
                  </Popover.Content>
               </Popover>
            </Overlay>
         )}
      </>
   );
};

export default CustomButton;
