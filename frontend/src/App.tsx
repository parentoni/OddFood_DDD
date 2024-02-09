import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { FoodContextProvider } from './modules/food/context/itemsContext';
import { CartContextProvider } from './modules/cart/context/cartContext';

function App() {
  return (
    
      <FoodContextProvider>
        <CartContextProvider>
        <RouterProvider router={router}/>
        </CartContextProvider>
      </FoodContextProvider>
   
  );
}

export default App;
