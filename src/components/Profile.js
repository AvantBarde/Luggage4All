import React, { useState } from 'react';

export default function Profile(props) {
  const [updating, setUpdating] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState();
  // const [address1, setAddress1] = useState();
  // const [address2, setAddress2] = useState();
  // const [state, setState] = useState();
  // const [zip, setZip] = useState();

  const { userInfo } = props;
  return (
    <div className='container rounded bg-white mt-5 mb-4'>
      <div className='row'>
        <div className='col-md-3' style={{ borderRight: '1px solid black' }}>
          <div className='d-flex flex-column align-items-center text-center p-3 py-5'>
            <img
              className='rounded-circle mt-5'
              width='150px'
              height='150px'
              src={'./img/bag2.png'}
              alt='profile'
            />
            <span className='font-weight-bold'>{userInfo.username}</span>
            <span className='text-black-50'>{userInfo.email}</span>
            <span> </span>
          </div>
        </div>
        {updating ? (
          <div className='col-md-7' style={{ borderRight: '1px solid black' }}>
            <div className='p-3 py-5'>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4 className='text-right'>Update Profile Settings</h4>
              </div>
              <div className='row mt-2'>
                <div className='col-md-6'>
                  <label className='labels'>First name</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='first name'
                    value=''
                  />
                </div>
                <div className='col-md-6'>
                  <label className='labels'>Last name</label>
                  <input
                    type='text'
                    className='form-control'
                    value=''
                    placeholder='Last name'
                  />
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col-md-12'>
                  <label className='labels'>Mobile Number</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter phone number'
                    value=''
                  />
                </div>
                <div className='col-md-12'>
                  <label className='labels'>Address Line 1</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter address line 1'
                    value=''
                  />
                </div>
                <div className='col-md-12'>
                  <label className='labels'>Address Line 2</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter address line 2'
                    value=''
                  />
                </div>
                <div className='col-md-12'>
                  <label className='labels'>State</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter state'
                    value=''
                  />
                </div>
                <div className='col-md-12'>
                  <label className='labels'>Zip code</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter zip code'
                    value=''
                  />
                </div>
              </div>
              <div className='mt-5 text-center'>
                <button
                  className='btn btn-primary profile-button'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdating(false);
                  }}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='col-md-7' style={{ borderRight: '1px solid black' }}>
            <div className='p-3 py-5'>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4 className='text-right'>Current Profile Information</h4>
              </div>
              <div className='row mt-2'>
                <div className='col-md-6'>
                  <label className='labels'>First name</label>
                  <div className='form-control'>{userInfo.firstName}</div>
                </div>
                <div className='col-md-6'>
                  <label className='labels'>Last name</label>
                  <div className='form-control'>{userInfo.lastName}</div>
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col-md-12'>
                  <label className='labels'>Mobile Number</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter phone number'
                    value=''
                  />
                </div>
                <div className='col-md-12'>
                  <label className='labels'>Address Line 1</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter address line 1'
                    value=''
                  />
                </div>
                <div className='col-md-12'>
                  <label className='labels'>Address Line 2</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter address line 2'
                    value=''
                  />
                </div>
                <div className='col-md-12'>
                  <label className='labels'>State</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter state'
                    value=''
                  />
                </div>
                <div className='col-md-12'>
                  <label className='labels'>Zip code</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter zip code'
                    value=''
                  />
                </div>
              </div>
              <div className='mt-5 text-center'>
                <button
                  className='btn btn-primary profile-button'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdating(true);
                  }}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}