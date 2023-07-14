import React, { useEffect, useState } from 'react';

import { Products } from './features/Products/Products';
import { fetchAsyncCart } from './features/Cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Cart } from './features/Cart/Cart';
import { fetchAsync } from './features/Products/productsSlice';
import './App.css';

function App() {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    dispatch(fetchAsyncCart());
  }, [])

  useEffect(() => {
    dispatch(fetchAsync())
  }, [])

  return (
    <div className='a'>

      <button onClick={() => setShowCart(!showCart)}>Cart [{items.length}]</button>
      {showCart ? <Cart></Cart> : <Products></Products>}
    </div>
  );
}

export default App;
