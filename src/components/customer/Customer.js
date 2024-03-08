import { Form } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { FaSearch } from "react-icons/fa";
import InputGroup from "react-bootstrap/InputGroup";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineContacts } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { GET_ALL_CUSTOMERS_API_CALL, RESET_CODE } from "../../utils/Constant";
import ProfilePic from '../../Assets/avatars/1.jpg'
import Close from '../../Assets/images/close.svg';
import CustomerForm from "./CustomerForm";
import { useNavigate } from "react-router-dom";
import { Location } from "react-router-dom";

function Customer(props) {
  const [card, setCards] = useState([]);
  const [cardActive, setCardActive] = useState(true);
  const [tableActive, setTableActive] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleCard = () => {
    setCardActive(true);
    setTableActive(false);
    setSearchValue('');
    if (searchValue.length > 0) {
      setFilteredData(props.customers.customersList);
    }
  };

  const handleTable = () => {
    setTableActive(true);
    setCardActive(false);
    setSearchValue('');
    if (searchValue.length > 0) {
      setFilteredData(props.customers.customersList);
    }
   
  };

  const navigateToNewPage = (id) => {
    navigation('/customer-details', { state: { id: id } });
  }

  useEffect(() => {
    dispatch({ type: GET_ALL_CUSTOMERS_API_CALL })
  }, []);

  useEffect(() => {
    if (props.customers.code == 200) {
      dispatch({ type: GET_ALL_CUSTOMERS_API_CALL })
    } 
    
  }, [props.customers.code]);

  useEffect(() => {
    setCards(props.customers.customersList);
    setFilteredData(props.customers.customersList);
    
  }, [props.customers.customersList]);

  const handleFilter = (e) => {
    const searchInput = e.target.value;
    setSearchValue(searchInput);

    if (searchInput.length > 0) {
      const tempArray = props.customers.customersList.filter((item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredData(tempArray);
    } else {
      setFilteredData(props.customers.customersList);
    }
  }
  return (
    <>
    <div style={{width:'100%', position: 'relative'}}>
      <Stack className="mt-4 d-flex" direction="horizontal" gap={5}>
        <div className="ps-5">
          <Link to="/CustomerForm">
            <Button
              className="rounded text-white btn-blue b-none"
              style={{
                backgroundColor: "#25316f",
                fontSize: "14px",
                width: 75,
                // justifyContent: "space-evenly",               
                //   fontSize: "12px",
                //   width: "100%",
                //   height: "max-content",
                //   padding: "1px",
                
              }}
            >
              New 
            </Button>
          </Link>
        </div>
        <div className="">
          <span style={{ color: "#25316f" }}>Customers</span>
        </div>
        <div
          className="group-search d-flex ml-6p"
          style={{
            width: "50%",
          }}
        >
          <div className="p-2 filter-icon mt-1"></div>
          <div className="p-2">
            <InputGroup className="w-max">
              <InputGroupText style={{ backgroundColor: "#25316f" }}>
                <FaSearch className="text-white" />
              </InputGroupText>
              <Form.Control
                style={{
                  background: "#80808036",
                  boxShadow: "none",
                  outline: "none",
                  borderColor: "white",
                }}
                placeholder="search here"
                value={searchValue}
                onChange={(e) => {
                  handleFilter(e)
                }}
              />

            </InputGroup>
          </div>
        </div>
        <div
          className="icons-set align-items-center"
          style={{ paddingLeft: "18%", width: "33%" }}
        >
          <RiArrowLeftSLine />
          <RiArrowRightSLine />
          <AiOutlineContacts
            onClick={handleCard}
            className={cardActive ? "selectedIcon" : ""}
          />
          <IoMdMenu
            onClick={handleTable}
            className={tableActive ? "selectedIcon" : ""}
          />
        </div>
      </Stack>
      {cardActive ? (
        <div
          className="card-container"
          style={{
            background: "#F2F4FF99",
            margin: 48,
            paddingTop: 15,
            paddingBottom: 50
          }}
        >
          <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap', paddingRight: 8, paddingLeft: 8, paddingTop: 8, paddingBottom: 8 }}>
            {filteredData.length > 0
              ? filteredData.map((item) => (
                <div style={{ flex: '0 0 25%', paddingLeft: 7, paddingRight: 7, paddingTop: 7, paddingBottom: 7, position: 'relative' }}>
                  <Card
                    key={item.id}
                    className="flex container d-flex flex-row align-items-center p-10"
                    style={{
                      width: "100%",
                      height:100,
                    }}

                    onClick={() => {navigateToNewPage(item.id)}}
                  >
                    <div
                      className="image-container d-flex flex-column flex-1"
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <Card.Img
                        style={{ width: "60px", height: "auto" }}
                        src={ProfilePic}
                        className="rounded-circle flex-1"
                      ></Card.Img>
                    </div>
                    <div className="image-container d-flex flex-column flex-1">
                      <Card.Body className="flex-1">
                        <Card.Title style={{fontSize: 15, color: '#222222', margin: 0, marginTop: 8}}>{item.name}</Card.Title>
                        <Card.Text style={{color: '#22222280', fontSize: 12}}>{item.jobPosition}</Card.Text>
                      </Card.Body>
                    </div>
                  </Card>

                  <div style={{position: 'absolute', top: 15, right: 25}}>
                      <img src={Close} style={{width: 7, height: 7}} />
                  </div>
                </div>
              ))
              : <p className="fs-5 f-20 text-center mt-3 ms-5" style={{color:'red'}}>No Data Found</p>}
          </div>
        </div>
      ) : null}

      <div className="table-container mt-5" style={{}}>
        {tableActive ? ( <div style={{marginLeft: 48, marginRight: 48, paddingBottom: 50}}>
              <Table>
            <thead>
              <tr style={{paddingTop: 100, paddingBottom: 100}}>
                <th className="text-start border border-2" style={{backgroundColor:"#25316f",color:"white"}} scope="col" >Name</th>
                <th className="text-start border border-2" style={{backgroundColor:"#25316f",color:"white"}} scope="col" >Phone</th>
                <th className="text-start border border-2" style={{backgroundColor:"#25316f",color:"white"}} scope="col" >Email</th>
                <th className="text-start border border-2" style={{backgroundColor:"#25316f",color:"white"}} scope="col" >Sales Person</th>
                <th className="text-start border border-2" style={{backgroundColor:"#25316f",color:"white"}} scope="col" >Activities</th>
                <th className="text-start border border-2" style={{backgroundColor:"#25316f",color:"white"}} scope="col" >Place</th>
               
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((tableItem) => {
                  console.log(tableItem)
                  return <tr>
                  <td scope="col" className="text-start" style={{textAlign :'text-start' }}> {tableItem.name}</td>
                  <td scope="col" className="text-start" style={{textAlign :'text-start' }}>{tableItem.phone}</td>
                  <td scope="col" className="text-start" style={{textAlign :'text-start' }}>{tableItem.email}</td>
                  <td scope="col" className="text-start" style={{textAlign :'text-start' }}>{tableItem.businessTypeName}</td>
                  <td scope="col" className="text-start" style={{textAlign :'text-start' }}>{tableItem.jobPosition}</td>
                  <td scope="col" className="text-start" style={{textAlign :'text-start' }}>{tableItem.addresses && tableItem?.addresses[0]?.city}, {tableItem.addresses && tableItem?.addresses[0]?.state}, {tableItem.addresses && tableItem?.addresses[0]?.countryName}</td>
                </tr>
                })
              ) : (
                <tr className="fs-5 f-20 text-center mt-5 ms-5 d-flex justify-content-center" style={{color:'red'}}> No Data Found</tr>
              )}
            </tbody>
          </Table>
            </div>
          
        ) : null}
      </div>
      </div>
    </>
  );
}


const mapsToProps = (state) => {
  return {
    customers: state.customers
  }
}

export default connect(mapsToProps)(Customer);