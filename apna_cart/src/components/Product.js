import React from 'react';
export default function Product(props) {
    return (
        <div className="row mt-3 align-items-center my-3 text-center text-md-start">
            <div className='col-4'>
                <h2 className="mb-0">
                    {props.product.name}{" "}
                    <span className="badge bg-secondary ms-2">₹{props.product.price}</span>
                </h2>
            </div>
            <div className='col-3 d-flex justify-contact-center justify-content-md-start'>
                <div className="btn-group" role="group" aria-label="Basic mixed style example">
                    <button 
                     type="button"
                     className="btn btn-danger"
                     onClick={() => {props.decrementQuantity(props.index);
                        }}>
                        -
                        </button>
                    <button type="button" className="btn btn-warning disabled text-dark fw-bold">
                        {props.product.quantity}
                        </button>
                    <button 
                     type="button"
                     className="btn btn-success"
                     onClick={()=>{
                        props.incrementQuantity(props.index);
                     }}>
                        +
                        </button>
                </div>
            </div>
            <div className='col-3'>
                 ₹{props.product.quantity * props.product.price}
            </div>
            <button className="col-2 btn btn-danger" 
            onClick={() => props.removeItem(props.index)}>
               Remove
            </button>
        </div>
    )
}