import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Demo() {
  const [address, setAddress] = useState(false);

  const addressmodal = (event) => {
    if (event.target.id === "address") {
      setAddress(true);
    }
  };

  const handleClose = () => {
    setAddress(false);
  };

  return (
    <>
      <Button
        className="m-1 bg-blue f-12 rounded-1 b-none"
        style={{ backgroundColor: "#25316f", width: "max-content" }}
        id="address"
        onClick={addressmodal}
      >
        Contact & Address
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={address}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
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

export default Demo;
