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
    
    const mainButShow = (count) =>{
        if(count === 0) {
            tg.MainButton.hide();
        } if(count > 0) {
            tg.MainButton.show();        
            }
    }
    //проверяем есть продукт в корзине, если да, то quantity++, если не нашли то quantity = 1
    const onAdd = (product) =>{    
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

      if(cartItems.length === 0) {
        tg.MainButton.hide();
    } if(cartItems.length >= 1) {
        tg.MainButton.show();        
        }
        
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
      if(cartItems.length === 0) {
        tg.MainButton.hide();
    } if(cartItems.length >= 1) {
        tg.MainButton.show();        
        }
    };
  
    // return (
    // <>    
    //     <h1 className="heading">Order points!</h1>
    // {/* {<Button title={'add'} disable={false} type={'add'}/>
    // <Button title={'remove'} disable={false} type={'remove'}/>
    // <Button title={'view order'} disable={false} type={'checkout'}/>} */}  
    //     <div className='products__container'>
    //     {products.map( (product) => {
    //     return <ItemCard product = {product} key = {product.id} onAdd={onAdd} onRemove={onRemove} />; //onShowMainButton={onShowMainButton}
    //     })  }    
    //     </div>  
    //     <Cart cartItems={cartItems} />    
    // </>  
    // ); 
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
                    mainButShow={mainButShow}
                    //className={'item'}
                />
            ))}
        </div>
        </>
    );

  };  

export default ProductList;
