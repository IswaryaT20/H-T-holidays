import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Bankform({ addresstoggle }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    addresstoggle();
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Bank Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Bank Form Content</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Bankform;
