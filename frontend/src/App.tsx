import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { FoodContextProvider } from './modules/food/context/itemsContext';

function App() {
  return (
    <FoodContextProvider>
      <RouterProvider router={router}/>
    </FoodContextProvider>
  );
}

export default App;
