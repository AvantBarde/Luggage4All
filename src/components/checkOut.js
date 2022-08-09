import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { cancelOrder, completeOrder } from '../axios-services';
import Button from 'react-bootstrap/Button';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
export default function Checkout({ userInfo }) {
  const [clientSecret, setClientSecret] = useState('');
  const history = useHistory();
  const states = [
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FM',
    'FL',
    'GA',
    'GU',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MH',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'MP',
    'OH',
    'OK',
    'OR',
    'PW',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VI',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  // need to add orderId to cancel order
  const handleCancelOrder = async () => {
    const confirmCancelOrder = window.confirm('Cancel Order?');
    if (confirmCancelOrder) {
      await cancelOrder();
    }
    alert('Order successfully cancelled');
    history.push(`/`);
  };

  // need to add orderId to complete order
  const handleCompleteOrder = async () => {
    await completeOrder();
    alert('Thanks for you order!');
  };

  return (
    <div className='checkout-page'>
      <div className='col-md-4 container bg-default'>
        <div className='checkout-info'>
          <h4 className='card-title'>Your Info</h4>
          <p className='card-text'>{userInfo.email}</p>
        </div>

        <h4 className='my-4'>Billing Address</h4>
        <form>
          <div className='form-row'>
            <div className='col-md-6 form-group'>
              <label for='firstname'>First Name</label>
              <input
                type='text'
                className='form-control'
                id='firstname'
                placeholder='First Name'
              />
              <div className='invalid-feedback'>
                Valid first name is required.
              </div>
            </div>
            <div className='col-md-6 form-group'>
              <label for='lastname'>Last Name</label>
              <input
                type='text'
                className='form-control'
                id='lastname'
                placeholder='Last Name'
              />
              <div className='invalid-feedback'>
                Valid last name is required.
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label for='adress'>Address</label>
            <input
              type='text'
              className='form-control'
              id='adress'
              placeholder='1234 Main Street'
              required
            />
            <div className='invalid-feedback'>
              Please enter your shipping address.
            </div>
          </div>

          <div className='form-group'>
            <label for='address2'>
              Address 2<span className='text-muted'>(Optional)</span>
            </label>
            <input
              type='text'
              className='form-control'
              id='adress2'
              placeholder='Apt #'
            />
          </div>

          <div className='col-md-4 form-group'>
            <label for='city'>
              City<span className='text-muted'></span>
            </label>
            <input
              type='text'
              className='form-control'
              id='city'
              placeholder='City'
            />
          </div>

          <div className='col-md-4 form-group'>
            <label for='state'>State</label>
            <select type='text' className='form-control' id='state'>
              <option value>Choose...</option>
              {states.map((state) => {
                return <option>{state}</option>;
              })}
            </select>
            <div className='invalid-feedback'>
              Please provide a valid state.
            </div>
          </div>

          <div className='col-md-4 form-group'>
            <label for='zipcode'>
              Zip Code<span className='text-muted'></span>
            </label>
            <input
              type='number'
              className='form-control'
              id='zipcode'
              placeholder='012345'
            />
            <Button
              variant='danger'
              className='checkout-cancel-button'
              onClick={() => {
                handleCancelOrder();
              }}
            >
              Cancel Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}