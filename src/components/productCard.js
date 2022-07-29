import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { addProductToCart } from '../axios-services'
import { useHistory } from "react-router-dom";
import AddToCart from './addToCart';
import Ratings from './ratings';


function ProductCard(props) {
    const { name, description, price, imageURL, inStock, category } = props


    

  return (
   <Card>
         <Card.Img variant="top" src={imageURL} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>{price}</Card.Text>
                <Card.Text>{inStock}</Card.Text>
                <Card.Text>{category}</Card.Text>
                <AddToCart userId={props.userId} productId={props.productId} />
            </Card.Body>
            <Card.Footer>
              <Ratings props={[...props]}></Ratings>
            </Card.Footer>
        </Card>
  )
}

export default ProductCard;