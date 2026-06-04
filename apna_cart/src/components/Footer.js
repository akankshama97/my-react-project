import React from 'react';
export default function Footer(props){
    const payNowClicked = () => {
        if (props.totalAmount === 0){
            alert("your cart is empty!");
        }else {
            alert(`Payment Successful in project! Total: ₹${props.totalAmount}`);
        }
    }
    return (
        <div className="row fixed-bottom align-items-center bg-dark text-white p-2">
            <button className='btn btn-danger col-2'onClick={props.resetCart}>
                Reset
                </button>
            <div className='col-8 bg-dark text-white text-center fw-bold'>
              Total Amount: ₹{Number(props.totalAmount)}
            </div>
            <button className='btn btn-primary col-2'
            onClick={payNowClicked}>
                Pay Now
            </button>
        </div>
    );
}
