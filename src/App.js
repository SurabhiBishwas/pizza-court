import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { CartContext } from './CartContext';
import { useState, useEffect } from 'react';

const App = () => {

    const [cart, setCart] = useState({items:{}, totalItems: 0});
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <>
            <Router>
                <CartContext.Provider value={{cart, setCart}}>
                    <Navigation/>
                    <Switch>
                        <Route path="/" component={Home} exact></Route>
                        <Route path="/products" exact component={ProductsPage}></Route>
                        <Route path="/products/:_id" component={ProductDetails}></Route>
                        <Route path="/cart" component={Cart}></Route>
                    </Switch>
                </CartContext.Provider>
            </Router>
        </>
    )
}

export default App;