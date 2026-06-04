import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import React,{ useState } from 'react';
import AddItem from './components/AddItem';

function App() {
  const initialProducts =[
    {
      price: 99999,
      name: "iPhone 10S Max",
      quantity: 0,
    },
    {
    price: 9999,
    name: "Redmi Note 10 Pro",
    quantity: 0,
  }
]
const [productList, setProductList] = useState(initialProducts);
const [totalAmount, setTotalAmount] = useState(0);
const incrementQuantity = (index) => {
  let newProductList = [...productList];
  let newTotalAmount = totalAmount;
  newProductList[index].quantity += 1;
  newTotalAmount += newProductList[index].price;
  setProductList(newProductList);
  setTotalAmount(newTotalAmount);
}
const decrementQuantity = (index) => {
  let newProductList = [...productList];
  let newTotalAmount = totalAmount;
  if(newProductList[index].quantity > 0){
    newProductList[index].quantity -= 1;
    newTotalAmount -= newProductList[index].price;
    setProductList(newProductList);
    setTotalAmount(newTotalAmount);
  }
};
//reset button functionality
const resetCart = () => {
  setProductList(initialProducts);
  setTotalAmount(0);
};
const removeItem = (index) => {
  let newProductList = [...productList];
  let newTotalAmount = totalAmount;
  newTotalAmount -= newProductList[index].quantity * newProductList[index].price;
  newProductList.splice(index, 1);
  setProductList(newProductList);
  setTotalAmount(newTotalAmount);
};
const addItem = (name, price) => {
  let newProductList = [...productList];
  newProductList.push({
    name: name,
    price: price,
    quantity: 0,
  });
  setProductList(newProductList);
};
const totalItemsCount =productList.reduce((total,item) => total + item.quantity, 0);
return (
    <>
      <Navbar totalItems={totalItemsCount}/>
      <main className="container mt-5" style={{minHeight: "70vh"}}>
       <AddItem addItem={addItem}/>
        <ProductList 
        productList={productList}
         incrementQuantity={incrementQuantity} 
         decrementQuantity={decrementQuantity}
         removeItem={removeItem}
         />
      </main>
     <Footer 
     totalAmount={totalAmount}
     resetCart={resetCart}/>
     </>
     );
     }
export default App;