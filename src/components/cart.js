import React, { useEffect, useState } from 'react';
import { getUserCart, updateCartProduct } from '../axios-services';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


function GetAndDisplayCart(props) {
    const [cart, setCart] = useState({})
    const [cartProds, setCartProds] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [trigger, setTrigger] = useState(false)
    const {token} = props
    const salesTax = parseFloat((subTotal*.0625).toFixed(2))
    
    const setQuantity = (product, amount) => {
        setCartProds(cartProd => cartProd.map(prod => prod.id===product.id ?({
            ...prod,
            quantity: prod.quantity + amount,
        }) : prod))
        setTrigger(!trigger)
    }

    useEffect(() => {
        let isMounted = true

        const fetchCart = async () => {
            const result = await getUserCart(token)
            if(isMounted) {
                setCart(result)
                setCartProds(result.products)
                var sum = 0
                result.products.forEach((product) => {
                    let price = parseFloat(product.price)
                    sum += price * product.quantity
                })
                setSubTotal(sum)
            }
        };
        fetchCart()
        return() => {
            isMounted= false
        }
    }, [token])

    useEffect(() => {
        cartProds.map(cartprod => updateCartProduct(cartprod))
    }, [trigger])
    
    return (
        <Container>
            <h2> Cart</h2>
            
            <Row>
                <Col>
                {cartProds.map((product) => {
                    return (
                    <Card key={product.id} className="product-details" style={{marginBottom: '10px', paddingTop: '15px', width: '800px'}}>
                        <Row>
                            <Col md="auto">
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
                                        <Card.Text>Price: ${(product.price)} |</Card.Text>
                                    </Col>
                                    <Col>
                                        {product.quantity >0? 
                                        <Button size='sm' onClick={(e) => {e.preventDefault(); setQuantity(product, -1)}} variant='outline-dark'>-</Button>
                                        : null}
                                        <Card.Text style={{display: "inline", marginLeft:"10px", marginRight:"10px"}}>Quantity: {product.quantity}</Card.Text>
                                        <Button size='sm' onClick={(e) => {e.preventDefault(); setQuantity(product, 1)}} variant='outline-dark'>+</Button>
                                    </Col>
                                </Row>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card> 
                    )
                })}
            </Col>
                <Col>
                    <Card>
                        <Card.Title style={{textAlign: 'center'}}> Summary of Charges</Card.Title>
                        <Row className="justify-content-md-center">
                            <Col>
                                <Card.Text style= {{marginLeft: '50px'}}> Subtotal</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text style={{marginLeft: '150px'}}> ${(subTotal).toFixed(2)}</Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Text style={{marginLeft: '50px'}}>Shipping</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text style={{marginLeft: '150px'}}>FREE</Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Text style={{marginLeft: '50px'}}>Est. Tax</Card.Text>
                            </Col>
                            <Col>
                                {/* Sales Tax of Il */}
                                <Card.Text style={{marginLeft: '150px'}}>${salesTax}</Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <div></div>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Text style={{marginLeft: '50px'}}> TOTAL</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text style={{marginLeft: '150px'}}>${(subTotal + salesTax)}</Card.Text>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
      )
}   

export default GetAndDisplayCart;