import React from 'react';

const CartButton = ({ cartCount }) => {
  return (
    <div className="relative inline-block cursor-pointer text-2xl">
      <span className="text-2.7xl text-black">🛒</span>
      {cartCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">{cartCount}</span>}
    </div>
  );
};

export default CartButton;
