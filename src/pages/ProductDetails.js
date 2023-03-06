import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const ProductDetails = () => {

    const [product, setProduct] = useState({});
    const params = useParams();
    useEffect(() => {
        fetch(`https://star-spark-pasta.glitch.me/api/products/${params._id}`)
        .then(res => res.json())
        .then(product => setProduct(product))
    }, []);
    const history = useHistory();

  return (
    <div className="container mx-auto mt-12">
        <button className="mb-12 font-bold" onClick={() => history.goBack()}>Back</button>
        <div className="flex justify-center">
            <img src={product.image} alt="pizza"/>
            <div className="ml-16 flex flex-col justify-center">
                <h1 className="text-xl font-bold">{product.name}</h1>
                <div className="text-md">{product.size}</div>
                <div className="font-bold mt-2">{product.price}</div>
                {/* <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">Add to cart</button> */}
            </div>
        </div>
    </div>
  )
}

export default ProductDetails
