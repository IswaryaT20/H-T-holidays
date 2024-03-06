import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useLocation } from "react-router-dom";
import { SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL } from "../../utils/Constant";

const VendorDetails = (props) => {


    const dispatch = useDispatch();
    const location = useLocation();

    console.log(location)

    useEffect(() => {
        dispatch({
            type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
            data: location.state.id,
          });
    }, [location.state.id])

    return <div>
        <label>Vendor details</label>
    </div>
}

const mapsToProps = (state) => {
    return {
      customers: state.customers,
    };
  };

export default connect(mapsToProps)(VendorDetails);