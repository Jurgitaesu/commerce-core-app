import { useState, useEffect } from 'react';
import clothesSingle from '../assets/clothes_single.PNG';
import clothesMany from '../assets/clothes_many.PNG';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

const Variants = ({ products, sendTotalProduct }) => {
  const [showVariants, setShowVariants] = useState(false);
  const [selectProduct, setSelectProduct] = useState(products[2]);
  const [selectedProduct, setSelectedProduct] = useState(products[2]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (trigger) {
      sendTotalProduct(selectedProduct);
      setTrigger(false);
    }
  }, [trigger]);

  const toggleVariants = () => {
    !showVariants ? setShowVariants(true) : setShowVariants(false);
  };

  const saveTotal = () => {
    setTrigger(true);
    setShowVariants(false);
  };

  return (
    <div className="mb-20">
      <h3 className="mb-2">variants</h3>
      <div className="bg-white border-peach py-10 px-15">
        <div className="d-flex space-between">
          <div className="d-flex align-center">
            <img src={clothesMany} alt="product icon" className="icon" />
            <div className="ml-10">
              <span className="font-bold">{selectedProduct ? selectedProduct.quantity : 3}x</span>{' '}
              CoreProduct&reg;
            </div>
          </div>
          <div className="font-bold text-orange d-flex align-center cursor-pointer" onClick={toggleVariants}>
            Change
            <span className="icon-20 mt-5">{!showVariants ? <MdExpandMore /> : <MdExpandLess />}</span>
          </div>
        </div>
        {showVariants && (
          <div className="pt-10 pb-5">
            <div className="border-top pt-10"></div>
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <div
                    className="d-flex space-between pt-5 cursor-pointer"
                    key={product.id}
                    onClick={() => setSelectProduct(product)}
                  >
                    <div className="d-flex align-center">
                      <img
                        src={clothesSingle}
                        alt="product icon"
                        className={product.id === selectProduct.id ? 'icon border-orange' : 'icon'}
                      />
                      <div className="ml-10">
                        <span className="font-bold">{product.quantity}x</span> {product.name}&reg;
                      </div>
                    </div>
                    <div className="font-bold">{product.price}</div>
                  </div>
                );
              })}
            <button
              className="button-align-right px-40 mt-15"
              onClick={() => {
                setSelectedProduct(selectProduct);
                saveTotal();
              }}
            >
              Save changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Variants;
