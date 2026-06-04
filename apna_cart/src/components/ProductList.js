import React from 'react';
import Product from './Product';
export default function ProductList(props) {
    console.log(props);
    return (
      props.productList.length > 0 ? (
        props.productList.map((product, i)=>{
            return (
             <Product 
             key={i}
             product={product}
             index={i}
             incrementQuantity={props.incrementQuantity}
             decrementQuantity={props.decrementQuantity}
             removeItem={props.removeItem}
          />
            );
        })
    ) : (
        <h1>No products Found in Cart</h1>
    )
    );
  }



