import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [trn, setTrn] = useState("");
  const [date, setDate] = useState("");
  const [msvf, setMsvf] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("BAB_ALSHAM"); // Default company

  const navigate = useNavigate();

  const companies = {
    BAB_ALSHAM: {
      name: "BAB ALSHAM FOODSTUFF TRADING L.L.C",
      address:
        "IC1-T05-S12, Bur Dubai, Bur Dubai, Dubai, 95145, Dubai +971564616024",
      trn: "104098619000003",
    },
    MUHAMMAD_SIDDIQUE: {
      name: "MUHAMMAD SIDDIQUE VEGETABLES & FRUIT TRADING LLC",
      address:
        "BUILDING T06 SHOP *15 SPAIN CLUSTER, INTERNATIONAL CITY, DUBAI UAE",
      trn: "100312109000003",
    },
  };

  // Function to add a product to the list
  const addProduct = () => {
    if (productName && price && quantity) {
      setProducts([...products, { productName, price, quantity }]);
      setProductName("");
      setPrice("");
      setQuantity("");
    }
  };

  // Function to remove a product by index
  const removeProduct = (indexToRemove) => {
    const updatedProducts = products.filter(
      (_, index) => index !== indexToRemove
    );
    setProducts(updatedProducts);
  };

  // Function to navigate to invoice with all added products
  const handleInvoice = () => {
    if (customerName && products.length > 0 && msvf) {
      navigate("/invoice", {
        state: {
          customerName,
          date,
          trn,
          msvf,
          products,
          company: companies[selectedCompany],
        },
      });
    } else {
      alert(
        "Please enter customer details, MSVF number, and add at least one product."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold text-center mb-5">Select Company</h1>
      <select
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      >
        <option value="BAB_ALSHAM">BAB ALSHAM FOODSTUFF TRADING L.L.C</option>
        <option value="MUHAMMAD_SIDDIQUE">
          MUHAMMAD SIDDIQUE VEGETABLES & FRUIT TRADING LLC
        </option>
      </select>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Customer Name:</h1>
        <input
          type="text"
          placeholder="Enter customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <h1 className="text-xl font-semibold mt-4 mb-2">MSVF Number:</h1>
        <input
          type="text"
          placeholder="Enter MSVF number"
          value={msvf}
          onChange={(e) => setMsvf(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <h1 className="text-xl font-semibold mt-4 mb-2">Product Name:</h1>
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <h1 className="text-xl font-semibold mt-4 mb-2">Price:</h1>
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <h1 className="text-xl font-semibold mt-4 mb-2">Quantity:</h1>
        <input
          type="number"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <h1 className="text-xl font-semibold mt-4 mb-2">TRN:</h1>
        <input
          type="number"
          placeholder="Enter TRN "
          value={trn}
          onChange={(e) => setTrn(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <h1 className="text-xl font-semibold mt-4 mb-2">Date:</h1>
        <input
          type="date"
          placeholder="Enter Date "
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addProduct}
          className="mt-4 w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition-all"
        >
          Add Product
        </button>

        <button
          onClick={handleInvoice}
          className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Generate Invoice
        </button>
      </div>

      {/* Displaying Added Products */}
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Added Products:</h2>
        {products.length > 0 ? (
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-pink-500 text-white">
                <th className="border px-2 py-1">SR NO</th>
                <th className="border px-2 py-1">DESCRIPTION</th>
                <th className="border px-2 py-1">PRICE (AED)</th>
                <th className="border px-2 py-1">QUANTITY</th>
                <th className="border px-2 py-1">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1 text-center">{index + 1}</td>
                  <td className="border px-2 py-1">{product.productName}</td>
                  <td className="border px-2 py-1 text-center">
                    {product.price}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {product.quantity}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    <button
                      onClick={() => removeProduct(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No products added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
