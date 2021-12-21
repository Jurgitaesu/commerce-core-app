import { useState } from 'react';
import paymentMethods from '../assets/payment_methods.PNG';
import securityLogos from '../assets/security_logos.PNG';
import { MdLock, MdOutlineInfo } from 'react-icons/md';

const Payment = ({ sendInputs, sendMessage }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cvv, setCvv] = useState(0);
  const [message, setMessage] = useState('');

  const validateInputs = (e) => {
    e.preventDefault();
    setMessage('');
    if (
      firstName &&
      lastName &&
      email &&
      address &&
      city &&
      country &&
      region &&
      postalCode &&
      cardNumber &&
      cardExpiry &&
      cvv
    ) {
      if (cardNumber.match(/\D/)) {
        return setMessage('Credit card must contain only numbers');
      }
      if (cardNumber.length !== 16) {
        return setMessage('Credit card must be 16 symbols');
      }
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardExpiry)) {
        return setMessage("Credit card's expiry date format must be MM/YY");
      }
      let b = cardExpiry.split('/');
      if (b[0] < 1 || b[0] > 12) {
        return setMessage("Credit card's expiry month must be from 00 to 12");
      }
      let today = new Date();
      let c = (today.getFullYear() / 100) | (0 + '');
      if (new Date(c + b[1], b[0], 1) < today) {
        return setMessage("Credit card's expiry date must be this month or later");
      }
      const user = {
        firstName,
        lastName,
        email,
        address,
        city,
        country,
        region,
        postalCode,
        cardNumber,
        cardExpiry,
        cvv,
      };
      sendInputs(user);
      return setMessage(sendMessage);
    } else {
      setMessage('Not all required fields are filled');
    }
  };

  return (
    <div>
      <h3 className="mb-2">payment and shipping</h3>
      <form className="d-flex dir-column border-peach bg-white py-10 px-15">
        <p className="mb-5 font-bold">Customer Information</p>
        <p className="text-grey">
          <span className="font-bold">Fields marked as (*)</span> are required.
        </p>
        <div className="d-flex space-between sm-dir-column">
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            className="grow-1 mr-8 sm-mr-0"
            placeholder="*First name"
            required
          />
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            className="grow-1 ml-8 sm-ml-0"
            placeholder="*Last name"
            required
          />
        </div>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="*Email" required />
        <p className="pt-15 font-bold">Shipping Address</p>
        <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder="*Address" required />
        <input type="text" onChange={(e) => setCity(e.target.value)} placeholder="*City" required />
        <div className="d-flex space-between sm-dir-column">
          <div className="select-wrap mr-8 sm-mr-0 sm-w-auto">
            <label className="font-11 font-regular">*Country</label>
            <select onChange={(e) => setCountry(e.target.value)} className="w-100 text-grey pt-10" required>
              <option value="">Select</option>
              <option value="LT">Lithuania</option>
              <option value="LV">Latvia</option>
            </select>
          </div>
          <div className="select-wrap mr-8 sm-mr-0 sm-w-auto">
            <label className="font-11 font-regular">*Region/State</label>
            <select required onChange={(e) => setRegion(e.target.value)} className="w-100 text-grey pt-10">
              <option value="">Select</option>
              <option value="Vilnius">Vilnius</option>
              <option value="Kaunas">Kaunas</option>
            </select>
          </div>
          <input
            type="text"
            onChange={(e) => setPostalCode(e.target.value)}
            className="grow-2"
            placeholder="*Postal code"
            required
          />
        </div>
        <p className="pt-10 font-bold">Payment Method</p>
        <p className="text-grey my-5 d-flex align-center">
          <span className="icon-18">
            <MdLock />
          </span>
          All Transactions are secure and encrypted
        </p>
        <div className="border-grey my-15">
          <div className="d-flex space-between align-center p-10 border-wide sm-dir-column sm-align-left">
            <div className="sm-mb-10">
              <label>
                <input type="radio" defaultChecked />
                <span>Credit Card</span>
              </label>
            </div>
            <div>
              <img src={paymentMethods} className="w-250 sm-w-100" alt="Payment methods" />
            </div>
          </div>
          <div className="bg-grey p-10 d-flex dir-column">
            <input
              type="text"
              onChange={(e) => setCardNumber(e.target.value.replace(/(\s|\.|-)/g, ''))}
              placeholder="Card number"
              required
            />
            <div className="d-flex">
              <input
                type="text"
                pattern="^(0[1-9]|1[0-2])\/?([0-9]{2})$"
                onChange={(e) => setCardExpiry(e.target.value)}
                className="w-60 mr-8"
                placeholder="MM/YY"
                required
              />
              <div className="p-relative">
                <input
                  type="number"
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-60"
                  placeholder="CVV"
                  required
                />
                <span className="input-icon">
                  <MdOutlineInfo />
                </span>
              </div>
            </div>
          </div>
        </div>
        {message && <h3 className="pb-5">{message}</h3>}
        <button className="w-100" onClick={validateInputs}>
          Complete order
        </button>
        <div className="d-flex my-15 j-center">
          <img src={securityLogos} className="w-250 sm-w-100" alt="Security logos" />
        </div>
      </form>
    </div>
  );
};

export default Payment;
