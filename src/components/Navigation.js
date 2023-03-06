import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { useContext } from 'react';

const Navigation = () => {
  const cartStyle = {
    background: '#F59E0D',
    display: 'flex',
    padding: '6px 12px',
    borderRadius: '50px'
  }
  const { cart } = useContext(CartContext);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <img src="images/logo.png" style={{height: 45}} alt="Logo"/>
        </Link>
        <ul className='flex items-center'>
          <li><Link to="/">Home</Link></li>
          <li className='ml-6'><Link to="/products">Products</Link></li>
          <li className='ml-6'>
            <Link to="/cart">
              <div style={cartStyle}>
                <span className='mr-2 text-black'>{cart.totalItems || 0}</span>
                <img src="images/cart.png" alt="cart"/>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation;
