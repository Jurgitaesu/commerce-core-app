import { useEffect, useState } from 'react';
import Payment from './components/Payment';
import Total from './components/Total';
import Variants from './components/Variants';

const App = () => {
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3005/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.allProducts.length > 0) {
          setProducts(data.allProducts);
          setTotalProduct(data.allProducts[2]);
        }
      });
  }, []);

  const sendTotalProduct = (product) => {
    setTotalProduct(product);
  };

  const sendInputs = (user) => {
    fetch('http://localhost:3005/api/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, totalProduct }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        }
      });
  };

  return (
    <div className="d-flex md-dir-column">
      <div className="bg-peach p-55 w-60p md-width">
        {products.length > 0 ? (
          <Variants products={products} sendTotalProduct={(prod) => sendTotalProduct(prod)} />
        ) : null}
        <Payment sendInputs={sendInputs} sendMessage={message} />
      </div>
      <div className="p-40 w-40p md-width">
        {!!totalProduct ? <Total totalProduct={totalProduct} /> : null}
      </div>
    </div>
  );
};

export default App;
