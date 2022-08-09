// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';

// function FrontPage() {
//   let history = useHistory();

//   return (
//     <>
//       <div className='hero'>
//         <h1>Shop Luggage!</h1>
//         <p>Enjoy the best quality luggage</p>
//         <Button
//           variant='primary'
//           type='submit'
//           size='lg'
//           className='front-page-button'
//           onClick={() => {
//             history.push('./products');
//           }}
//         >
//           Start Shopping
//         </Button>
//       </div>
//     </>
//   );
// }

// export default FrontPage;

import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function FrontPage() {
  return (
    <div style={{height: '100vh'}}>
    <Carousel style={{marginTop: '30px'}}>
      <Carousel.Item>
      <Card style={{ width: '470px', height: '318px' }}>
        <Card.Img
          className="d-block w-100"
          src= {require('./img/pexels-dids-1986996.jpg')}
          style={{ objectFit: 'cover', height: 'auto' }}
        />
        <Carousel.Caption>
          <Link to='/products'> <Button variant="info">Shop Now</Button>{' '}</Link>
        </Carousel.Caption>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
      <Card style={{ width: '30rem' }}>
        <Card.Img
          className="d-block w-100"
          src= {require('./img/bag9.jpg')}
          alt="Second slide"
        />

        <Carousel.Caption>
        <Link to='/products'> <Button variant="info">Shop Now</Button>{' '}</Link>
        </Carousel.Caption>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
      <Card style={{ width: '30rem' }}>
        <Card.Img
          className="d-block w-100"
          src= {require('./img/bag8.jpg')}
        />
        <Carousel.Caption>
        <Link to='/products'> <Button variant="info">Shop Now</Button>{' '}</Link>
        </Carousel.Caption>
        </Card>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default FrontPage;