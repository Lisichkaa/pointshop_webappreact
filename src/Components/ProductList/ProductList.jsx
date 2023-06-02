import React, {useState} from 'react';
import './ProductList.css';
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import ItemCard from '../ItemCard/ItemCard';

const { getData } = require("../../db/db");
const products = getData();

const  ProductList = () => {
    const [cartItems, setCartItems] = useState([]);
    const {tg, queryId} = useTelegram();

    useEffect(() => {
      tg.ready();
    });   

    //проверяем есть продукт в корзине, если да, то quantity++, если не нашли то quantity = 1
    const onAdd = (product) =>{    
        console.log(cartItems.length)
      const alreadyAdded = cartItems.find((item)=> item.id === product.id);
      if(alreadyAdded){
        setCartItems(
          cartItems.map((item) =>
          item.id === product.id ? {...alreadyAdded, quantity: alreadyAdded.quantity + 1} : item
          )
        );
      }
      else {
        setCartItems([...cartItems, {...product, quantity: 1}])
      }          
      if (cartItems.length >= 1){
        tg.MainButton.show();
      } else {
        tg.MainButton.hide();
      }
      console.log(cartItems.length)
    }
  
    const onRemove = (product) => {
      const alreadyAdded = cartItems.find((item)=> item.id === product.id);
      if(alreadyAdded.quantity === 1){
        setCartItems(cartItems.filter(item => item.id !== product.id))    
      }
      else{
        setCartItems(cartItems.map(item => 
          item.id === product.id ? {...alreadyAdded, quantity: alreadyAdded.quantity - 1} : item
          )
        );
      } 
      console.log(cartItems.length)
      if (cartItems.length >= 1){
        tg.MainButton.show();
      } else {
        tg.MainButton.hide();
      }
      console.log(cartItems.length)
    };

    return (
        <>
        <h1 className="heading">Order points!</h1>
        
        <div className='products__container'>
            {products.map(item => (
                <ItemCard
                    product={item}
                    key = {item.id}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    //onShowMainButton={onShowMainButton}
                    //mainButShow={mainButShow}
                    //className={'item'}
                />
            ))}
        </div>
        </>
    );

  };  

export default ProductList;
