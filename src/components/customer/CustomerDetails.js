import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL } from "../../utils/Constant";

const CustomerDetails = (props) => {

    console.log(props);

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL, data: location.state.id})
    }, [location.state.id])
    return <div>
        <label>Customer Details</label>
    </div>
}

const mapsToProps = (state) => {
    return {
        customers: state.customers
    }
}

export default connect(mapsToProps)(CustomerDetails);