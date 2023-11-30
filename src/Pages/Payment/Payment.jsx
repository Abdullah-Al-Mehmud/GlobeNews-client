import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../Components/Heading";

const Payment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    navigate("/paymentSuccess");
  };
  return (
    <div className="bg-green-100 pb-20   rounded-xl justify-center">
      <Heading heading={`Payment `}></Heading>

      <div className="max-w-md mx-auto mt-10 p-6 bg-[#6c5ce7] text-main-blue-50 rounded-xl  border-green-600 border-2">
        <label className="block text-lg font-semibold text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          className=" w-full text-[#000]  input "
          placeholder="Enter your card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <div className="flex mt-4">
          <div className="w-1/2 pr-2">
            <label className="block text-lg font-semibold text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              className=" w-full text-[#000] input "
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-lg font-semibold text-gray-700">
              CVV
            </label>
            <input
              type="text"
              className=" w-full text-[#000] input "
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center ">
          <button
            onClick={handlePayment}
            className="px-7 mt-5 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]  ">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
