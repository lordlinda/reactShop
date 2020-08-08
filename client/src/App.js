import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product,setProduct]=useState({
    name:'React',
    price:10,
    productBy:'facebook'
  })


  const makePayment=token=>{
    const body={
      token,
      product,
    };
    const headers ={
      'Content-Type':'application/json'
    };
     return fetch('http://localhost:5000/payment',{
      method:'POST',
      //headers are a must
      headers,
      body:JSON.stringify(body)
     }).then(response=>{
      console.log(response)
      const {status}=response
     })
       .catch(err=>{
        console.log(err)
       })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <StripeCheckout 
        stripeKey='pk_test_51HD4TXGZmvdMGd5u0B04fLH1vXDAp4a3sIqX1WeVSs59ZLgTICkw7ORLF17xzk3qkEdZ3Jm2s2xRU7CgMCMdQ0rb00wE0zKTga'
        token={makePayment}
        name='Buy'
        amount={product.price*100}
        >
        <button className='btn-large pink'>{product.price}</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
