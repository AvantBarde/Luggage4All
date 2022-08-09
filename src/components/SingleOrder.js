import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleOrder } from '../axios-services';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function SingleOrder({ id }) {
    const [order, setOrder] = useState({});
    const [productOnOrder, setProductsOnOrder] = useState([])
    const { orderId } = useParams()

    const fetchSingleOrder = async () => {
      const result = await getSingleOrder(orderId || id);
      setOrder(result);
      setProductsOnOrder(result.products)
    };

  useEffect(() => {
    fetchSingleOrder();
  }, [orderId, id]);

  return (
    <Container>
      <div className='order-details'>
          <h2> Order Details</h2>
          <Row>
            <Card style={{ marginBottom: '25px'}}>
              <Card.Body>
                
                <Row>
                  <Card.Title style={{textAlign: 'center'}}> Order Summary</Card.Title>
                </Row>
                <Row>
                  <Col>
                    <Card.Text> Ordered on: {order.datePLaced}</Card.Text>
                  </Col>
                  <Col>
                    <Card.Text> Order number: {order.id}</Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>Order status: {order.status}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <Row>
          {productOnOrder.map((product) => {
              return (
                <Card key={product.id} className="product-details" style={{marginBottom: '10px', justifyContent: 'space-around', paddingTop: '23px'}}>
                  <Row>
                    <Col>
                      <Card.Img className= 'd-inline-flex p-2' src={product.imageURL} style={{width: '7rem'}} />
                    </Col>
                    <Col>
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Row>
                          <Col>
                            <Card.Text>Size: {product.size} |</Card.Text>
                          </Col>
                          <Col>
                            <Card.Text>Price: {product.price} |</Card.Text>
                          </Col>
                          <Col>
                            <Card.Text>Quantity: {product.quantity}</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              )
          })}
          </Row>
          
      </div>
    </Container>
  )
}

export default SingleOrder;