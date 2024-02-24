import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import avtar1 from '../Assets/avatars/1.jpg';
import avtar2 from '../Assets/avatars/2.jpg';
import avtar3 from '../Assets/avatars/3.jpg';
import avtar4 from '../Assets/avatars/4.png';
import avtar5 from '../Assets/avatars/5.png';
import profile from '../Assets/images/profile.jpg';

const AvatarSelection = () => {
  const [selectedAvatars, setSelectedAvatars] = useState([]);
  const [selectedImage, setSelectedImage] = useState(profile);
  const [isAvatarsOpen, setIsAvatarsOpen] = useState(false);

  const avatars = [
    { id: '1', name: 'avatar1', src: avtar1 },
    { id: '2', name: 'avatar2', src: avtar2 },
    { id: '3', name: 'avatar3', src: avtar3 },
    { id: '4', name: 'avatar4', src: avtar4 },
    { id: '5', name: 'avatar5', src: avtar5 },
    { id: '6', name: 'avatar6', src: profile },
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
      <Row>
        <Image className='h-10 w-10 rounded-circle' src={selectedImage} alt='no image found' onClick={openAvatars} />
        {isAvatarsOpen && (
          <div className='border h-max m-2'>
            <Col xs={6} md={4}>
              {avatars.map((item) => (
                <Image
                  className='h-20 w-20 ms-2 cursor-pointer  rounded-full border p-1'
                  name={item.name}
                  key={item.id}
                  src={item.src}
                  rounded
                  onClick={captureImage}
                />
              ))}
            </Col>
          </div>
        )}
      </Row>
    </div>
  );
};

export default AvatarSelection;
