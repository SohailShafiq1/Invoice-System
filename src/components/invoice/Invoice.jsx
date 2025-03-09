import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { toWords } from "number-to-words";

const Invoice = () => {
  const handlePrint = () => {
    window.print();
  };

  const date = new Date().toLocaleDateString();
  const location = useLocation();
  const { customerName, products = [] } = location.state || { products: [] };

  // Function to calculate total price for each product
  const calculateTotal = (price, quantity) => Number(price) * Number(quantity);

  // Function to calculate 5% tax
  const tax = (total) => (total / 100) * 5;

  // Calculate grand total and tax
  const grandTotal = products.reduce((acc, product) => acc + calculateTotal(product.price, product.quantity), 0);
  const totalTax = tax(grandTotal);
  const finalAmount = grandTotal + totalTax;

  // Convert amount to words
  const grandTotalInWords = toWords(finalAmount).toUpperCase() + " ONLY";

  return (
    <div className="max-w-5xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
      {/* Header Section */}
      <h1 className="text-xl font-bold text-center">
        MUHAMMAD SIDDIQUE VEGETABLES & FRUIT TRADING LLC
      </h1>
      <p className="text-center text-sm">
        BUILDING T06 SHOP *15 SPAIN CLUSTER, INTERNATIONAL CITY, DUBAI UAE
      </p>
      <p className="text-center font-semibold">TAX INVOICE</p>
      <p className="text-center text-sm">TRN: 100312109000003</p>

      {/* Customer & Invoice Details */}
      <div className="mt-4 grid grid-cols-2 text-sm">
        <div>
          <p><strong>Customer:</strong> {customerName}</p>
          <p>FRUITS & VEGETABLE MARKET DUBAI</p>
          <p><strong>TRN:</strong> 100453349100003</p>
        </div>
        <div className="text-right">
          <p><strong>Invoice #:</strong> MSVF/0101/2025</p>
          <p><strong>Date:</strong> {date}</p>
        </div>
      </div>

      {/* Invoice Table - Scrollable on Mobile */}
      <div className="overflow-x-auto">
        <table className="w-full mt-4 border-collapse border text-sm min-w-[600px]">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border px-2 py-1">SR NO</th>
              <th className="border px-2 py-1">DESCRIPTION</th>
              <th className="border px-2 py-1">QTY</th>
              <th className="border px-2 py-1">PRICE</th>
              <th className="border px-2 py-1">VALUE EXL. VAT</th>
              <th className="border px-2 py-1">VAT%</th>
              <th className="border px-2 py-1">VAT VALUE</th>
              <th className="border px-2 py-1">VALUE INC. VAT</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const total = calculateTotal(product.price, product.quantity);
              const vatValue = tax(total);
              return (
                <tr key={index}>
                  <td className="border px-2 py-1 text-center">{index + 1}</td>
                  <td className="border px-2 py-1">{product.productName}</td>
                  <td className="border px-2 py-1 text-center">{product.quantity}</td>
                  <td className="border px-2 py-1 text-center">AED {product.price}</td>
                  <td className="border px-2 py-1 text-center">AED {total.toFixed(2)}</td>
                  <td className="border px-2 py-1 text-center">5%</td>
                  <td className="border px-2 py-1 text-center">AED {vatValue.toFixed(2)}</td>
                  <td className="border px-2 py-1 text-center">AED {(total + vatValue).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="mt-4 text-right text-sm">
        <p><strong>Subtotal:</strong> AED {grandTotal.toFixed(2)}</p>
        <p><strong>Total VAT (5%):</strong> AED {totalTax.toFixed(2)}</p>
        <p className="text-lg font-bold"><strong>Grand Total:</strong> AED {finalAmount.toFixed(2)}</p>
      </div>

      {/* Amount in Words & Declaration */}
      <div className="mt-6 text-sm">
        <p><strong>Amount in Words:</strong> {grandTotalInWords}</p>
        <p className="mt-4">
          <strong>Declaration:</strong> We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.
        </p>
        <div className="mt-6 md:mt-12">
          <p className="font-bold">MUHAMMAD SIDDIQUE VEGETABLES & FRUIT TRADING LLC</p>
          <p className="text-right mt-6">Authorized Signatory</p>
        </div>
      </div>

      {/* Buttons for Navigation & Print */}
      <div className="flex justify-between mt-4">
        <NavLink to={"/"}>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
            Back
          </button>
        </NavLink>
        <button 
          onClick={handlePrint} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
          Print
        </button>
      </div>
    </div>
  );
};

export default Invoice;
