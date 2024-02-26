import React, { useState } from "react";
import { Row, Col, Image,Form } from "react-bootstrap";
import avtar1 from "../Assets/avatars/1.jpg";
import avtar2 from "../Assets/avatars/2.jpg";
import avtar3 from "../Assets/avatars/3.jpg";
import avtar4 from "../Assets/avatars/4.png";
import avtar5 from "../Assets/avatars/5.png";
import profile from "../Assets/images/profile.jpg";

const AvatarSelection = () => {
  const [selectedImage, setSelectedImage] = useState(profile);
  const [isAvatarsOpen, setIsAvatarsOpen] = useState(false);

  const avatars = [
    { id: "1", name: "avatar1", src: avtar1 },
    { id: "2", name: "avatar2", src: avtar2 },
    { id: "3", name: "avatar3", src: avtar3 },
    { id: "4", name: "avatar4", src: avtar4 },
    { id: "5", name: "avatar5", src: avtar5 },
    { id: "6", name: "avatar6", src: profile },
  ];

  const openAvatars = () => {
    setIsAvatarsOpen(!isAvatarsOpen);
  };

  const captureImage = (e) => {
    const selectedImageSrc = e.target.src;
    setSelectedImage(selectedImageSrc);
    setIsAvatarsOpen(false);
  };

  return (
    <div>
      <Col xs={2} sm={2} md={2} lg={2} xxl={2} className="mt-1">
              <Form.Group className="text-end">
                <img
                  src={selectedImage}
                  alt="Profile picture for cusotmer"
                  className=" f-14 img-thumbnail rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                  }}
                  onClick={openAvatars}
                />
                 <Form.Label className="">Profile Picture</Form.Label>
                {isAvatarsOpen && (
                  <div className="border border-3 h-max w-100 p-2">
                   
                      <div
                        className="d-flex flex-wrap position-relative"
                        style={{ width: "fit-content", overflowY: "scroll",WebkitScrollSnapType:'inline' }}
                      >
                        {avatars.map((item) => (
                          <img
                            className="ms-2 p-2 cursor-pointer  rounded-full border p-1"
                            style={{zIndex:'99',width:'42%' }}
                            name={item.name}
                            key={item.id}
                            src={item.src}
                            rounded
                            onClick={captureImage}
                          />
                        ))}
                      </div>
                    
                  </div>
                )}

               
              </Form.Group>
            </Col>
    </div>
  );
};

export default AvatarSelection;
