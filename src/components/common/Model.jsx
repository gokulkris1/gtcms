import React from "react";
import { Modal, ModalBody } from "reactstrap";
import closeicon from "assets/images/closeicon.svg";

export default function Model(props) {
  let { isOpen, toggle, children } = props;

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} centered size="sm">
        <img
          src={closeicon}
          height={32}
          width={32}
          alt="icon"
          style={{ position: "absolute", right: 10, top: 10 }}
          onClick={() => toggle()}
        />
        <ModalBody className="mt-40">{children}</ModalBody>
      </Modal>
    </div>
  );
}
