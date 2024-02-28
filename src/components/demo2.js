<Row className='mt-2 d-flex justify-content-evenly w-100'>
        <Col lg={6} xxl={6} className='col-5 p-1'  >
          <div className='p-2 shadow border-0 rounded-3' style={{ background: '#87ceeb2e', height: 180 }}>
            <h6 className='pt-3 f-20' style={{ marginLeft: '20px', marginBottom: '20px' }}>Invoice Summary</h6>
            <div style={{ display: 'flex' }} >
              <p style={{ marginBottom: '10 px', marginLeft: '3%', color: 'grey', fontSize: '14px', fontWeight: '500' }}>Total Amount<br /><span style={{ color: 'black' }}>AED 0.00</span></p>
              <p style={{ marginBottom: '10px', marginLeft: '19%', color: 'red', fontSize: '14px', fontWeight: '500' }}>Unpaid<br /><span style={{ color: 'black' }}>AED 0.00</span></p>
              <p style={{ marginBottom: '10px', marginLeft: '26%', color: 'blue', fontSize: '14px', fontWeight: '500' }}>Paid<br /><span style={{ color: 'black' }}>AED 0.00</span></p>
            </div>
          </div>
        </Col>

        <Col lg={6} xxl={6} className='col-5 p-1'  >
          <div className='p-2 shadow  border-0 rounded-3' style={{ background: '#87ceeb2e', height: 180 }}>
            <h6 className='pt-3 f-20 ' style={{ marginLeft: '20px', marginBottom: '20px' }}>Invoice Summary</h6>
            <div style={{ display: 'flex' }} >
              <p style={{ marginBottom: '10px', marginLeft: '3%', color: 'grey', fontSize: '14px', fontWeight: '500' }}>Total Amount : <span style={{ color: 'black' }}>AED 0.00</span></p>
              <p style={{ marginLeft: '51%', color: 'red', fontSize: '14px', fontWeight: '500' }}>Unpaid : <span style={{ color: 'black' }}>AED 0.00</span></p>
            </div>
            <ProgressBar className='progress' now={60} style={{ width: '93%', marginLeft: '21px' }} />
            <div className='d-flex'>
              <div class="square"></div>
              <p style={{ marginLeft: '-7%', fontSize: '14px', marginTop: '2px', fontWeight: '500' }}>Paid<br />0.00</p>
              <div class="square" style={{ marginLeft: '15%', background: '#d2d4d7' }}></div>
              <p style={{ marginLeft: '-6%', fontSize: '14px', fontWeight: '500' }}>Unpaid<br />0.00</p>
            </div>

          </div>
        </Col>
      <