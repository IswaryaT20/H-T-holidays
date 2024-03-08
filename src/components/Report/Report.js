import React from 'react';
import { Link } from 'react-router-dom/dist';
// import './Report.css'; 
function Report() {
    return (
        <div style={{marginTop:75}}>
            <h6 className='ms-5 mt-1 fw-bold fs-4 '>Reports</h6>
            <div className="d-flex ms-5 mt-4 me-5" >
                <p className='ms-4 mt-2 fw-bold fs-5' >Standard</p>
             </div>
            <div className="ms-5 mt-4 me-5">
            <h6 className='mt-2 p-2 bold mb-5 ms-2 fs-5' style={{color:'#1b1b8e'}}>Business Overview</h6>
                <div className="row">
                    <div className="col">
                    <p className="p-2 ms-2">
                         <Link to="/ProfilLoss">
                            Statement of Profit and Loss
                             </Link>
                             </p>
                        <hr />
                <p className="p-2 ms-2"> <a href="Customers" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}>Statement of Customer</a></p>
                        <hr />
                    </div>
                    <div className="col">
                    <p className="p-2 ms-2"> <a href="Vendor" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}>Statement of  Vendor</a></p>
                        <hr />
                    </div>
                </div>
            </div>
   


            <div className="ms-5 mt-4 me-5">
            <h6 className='mt-1 p-2 bold mb-5 ms-2 fs-5' style={{color:'#1b1b8e'}}>Sales</h6>
                <div className="row">
                    <div className="col">
                    <p className="p-2 ms-2"> <a href="Salesproduct" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}>Customer Sales Statement</a></p>
                        <hr />
                        <p className="p-2 ms-2"> <a href="Saleinvoice" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}>Invoice Sale Statement</a></p>
                        <hr />
                    </div>
                    <div className="col">
                    <p className="p-2 ms-2"> <a href="Salecategory" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}>Category Sales Statement</a></p>
                        <hr />
                    </div>
                </div>
            </div>






            <div className="ms-5 mt-4 me-5">
            <h6 className='mt-1 p-2 bold mb-5 ms-2 fs-5' style={{color:'#1b1b8e'}}>Purchase</h6>
                <div className="row">
                    <div className="col">
                    <p className="p-2 ms-2"> <a href="Vendarpurchase" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}> Purchase Vendor Statement</a></p>
                        <hr />
                        <p className="p-2 ms-2"> <a href="Vendarproduct" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}>Vendor Product Statement</a></p>
                        <hr />
                    </div>
                    <div className="col">
                 
                 
                    </div>
                </div>
            </div>
     {/*outstanding report */}

            <div className="ms-5 mt-4 me-5">
            <h6 className='mt-1 p-2 bold mb-5 ms-2 fs-5' style={{color:'#1b1b8e'}}>Accounts Report</h6>
                <div className="row">
                    <div className="col">
                    <p className="p-2 ms-2"> <a href="Expensereport" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}>Expense Statement of Accounts</a></p>
                        <hr />
                        <p className="p-2 ms-2" style={{color: 'rgb(6, 6, 6, 0.74)'}}> <a href="Accountsincome" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}>Income Statement of Accounts</a></p>
                        <hr />
                    </div>
                    <div className="col">
                    <p className="p-2 ms-2" > <a href="Accountsupplier" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}>Supplier Statement of Accounts</a></p>
                        <hr />
                        <p className="p-2 ms-2"> <a href="Accountscustomer" className="text-decoration-none" style={{color: 'rgb(6, 6, 6, 0.74)'}}>Customer Statement of Accounts</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Report;