export default function Cart({
  cart,
  totalPrice,
  removeFromCart,
  setCartIsOpen,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50">
      <div className="bg-white w-80 h-full p-6 overflow-y-auto relative">
        <button
          onClick={() => setCartIsOpen(false)}
          className="absolute top-4 right-4 text-xl text-gray-600"
        >
          &times;
        </button>
        <h2 className="font-bold text-xl mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-sm">{item.name}</p>
                  <p className="text-sm">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 border-t pt-4">
          <h3 className="font-bold">Total: ${totalPrice}</h3>
        </div>
      </div>
    </div>
  );
}
