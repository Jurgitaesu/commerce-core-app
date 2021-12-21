import clothesMany from '../assets/clothes_many.PNG';
import refund from '../assets/refund.PNG';

const Total = ({ totalProduct }) => {
  return (
    <div>
      <div className="d-flex space-between pb-15 pt-5 align-center border-bottom">
        <div className="d-flex align-center">
          <img src={clothesMany} alt="product icon" className="icon w-40" />
          <div className="ml-10">
            <span className="font-bold">{totalProduct.quantity}x</span> CoreProduct&reg;
          </div>
        </div>
        <div className="font-bold">{totalProduct.price}</div>
      </div>
      <div className="d-flex space-between my-15">
        <div className="text-grey">Total</div>
        <div className="font-bold">
          <span className="font-8">USD</span> <span className="font-20">{totalProduct.price}</span>
        </div>
      </div>
      <div className="border-grey p-15">
        <div className="d-flex align-center mb-10">
          <img src={refund} className="w-30 mr-10" alt="refund" />
          <div className="text-uppercase font-bold">60-day fit guarantee</div>
        </div>
        <p className="text-grey">
          Either it doesn't fit or simply you don't like it. You can return it within 60 days for a full
          refund. No questions asked.
        </p>
      </div>
    </div>
  );
};

export default Total;
