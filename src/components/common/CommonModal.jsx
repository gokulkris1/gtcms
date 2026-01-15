import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

const CommonModal = ({
  modal,
  toggle,
  className,
  children,
  headerData,
  viewModalCheck,
  size = "md"
}) => {
  return (
    <div>
      <div>
        <Modal
          size={size}
          centered
          isOpen={modal}
          className={className}
          toggle={toggle}
        >
          {viewModalCheck ? (
            <ModalHeader>
              <b>{headerData}</b>
            </ModalHeader>
          ) : (
            ""
          )}
          <ModalBody>{children}</ModalBody>
          {viewModalCheck ? (
            <ModalFooter>
              <Button className=" c-info" onClick={toggle}>
                Close
              </Button>
            </ModalFooter>
          ) : (
            ""
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CommonModal;
