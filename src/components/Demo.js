import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Bankform from "../components/customer/BankForm";
import AddressForm from "../components/customer/Addressform";

function Demo() {
  const [bankdetails, setBankdetails] = useState(false);
  const [addressDetails, setAddressDetails] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    iban: "",
    branch: "",
  });
  const [address, setaddress] = useState({
    addressType: "",
    customeraddress: "",
    city: "",
    emirates: "",
    country: "",
    zip: "",
  });
  const [savedBankFormData, setSavedBankFormData] = useState(null);
  const [savedAddressFormData, setSavedAddressFormData] = useState(null);

  const bankmodal = () => {
    setBankdetails(!bankdetails);
  };

  const addressModal = () => {
    setAddressDetails(!addressDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleModalClose = () => {
    setBankdetails(false);
    setAddressDetails(false);
  };

  const handleBankModalSave = () => {
    setSavedBankFormData({ ...formData });
    handleModalClose();
  };

  const handleAddressModalSave = () => {
    // Handle the saved address form data here
    setSavedAddressFormData({/* ... */});
    handleModalClose();
  };

  return (
    <>
      <Button
        className="m-1 bg-blue f-12 rounded-1 b-none"
        style={{ backgroundColor: "#25316f", width: "max-content" }}
        onClick={bankmodal}
      >
        Accounting
      </Button>
      <Button
        className="m-1 bg-green f-12 rounded-1 b-none"
        style={{ backgroundColor: "#28a745", width: "max-content" }}
        onClick={addressModal}
      >
        Address
      </Button>
      {bankdetails && (
        <Bankform
          banktoggle={handleModalClose}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      )}
      {addressDetails && (
        <AddressForm addresstoggle={handleModalClose} />
      )}
      {savedBankFormData && (
        <div>
          <h2>Saved Bank Values:</h2>
          <p>Bank Name: {savedBankFormData.bankName}</p>
          <p>Account Number: {savedBankFormData.accountNumber}</p>
          <p>IBAN: {savedBankFormData.iban}</p>
          <p>Branch: {savedBankFormData.branch}</p>
        </div>
      )}
      {savedAddressFormData && (
        <div>
          {/* Display saved address form data here */}
        </div>
      )}
      <Button variant="primary" onClick={handleBankModalSave}>
        Save Bank Data
      </Button>
      <Button variant="primary" onClick={handleAddressModalSave}>
        Save Address Data
      </Button>
    </>
  );
}

export default Demo;
