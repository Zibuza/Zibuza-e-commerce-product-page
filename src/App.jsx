import { useState } from "react";
import { data } from "./data.js";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import minus from "./assets/images/icon-minus.svg";
import plus from "./assets/images/icon-plus.svg";
import Header from "./components/Header/Header.jsx";
import Lightbox from "./components/lightBox/LightBox.jsx";
import Cart from "./components/cart/Cart.jsx";

function App() {
  const [productList] = useState(data);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { mainImage, price } = productList[selectedProductIndex];

  const nextSlide = () => {
    setCurrentSlide(currentSlide === productList.length ? 1 : currentSlide + 1);
  };

  const previousSlide = () => {
    setCurrentSlide(currentSlide === 1 ? productList.length : currentSlide - 1);
  };

  const addToCart = () => {
    const productToAdd = productList[selectedProductIndex];
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === productToAdd.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <>
      <Header cart={cartItems} setCartIsOpen={setIsCartOpen} />

      {isCartOpen && (
        <Cart
          cart={cartItems}
          totalPrice={totalPrice}
          removeFromCart={removeFromCart}
          setCartIsOpen={setIsCartOpen}
        />
      )}

      {isLightboxVisible && (
        <Lightbox
          products={productList}
          slideIndex={currentSlide}
          nextSlide={nextSlide}
          previousSlide={previousSlide}
          setShowLightbox={setIsLightboxVisible}
        />
      )}

      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:place-items-center lg:py-20">
        <article>
          <div className="lg:hidden">
            {productList.map((item, index) => (
              <div
                key={index}
                className={currentSlide === index + 1 ? "relative" : "hidden"}
              >
                <img
                  src={item.mainImage}
                  alt={`Image of ${item.name}`}
                  className="w-full lg:rounded-2xl cursor-pointer"
                  onClick={() => setIsLightboxVisible(true)}
                />
                <ul className="lg:hidden">
                  <li>
                    <button
                      onClick={previousSlide}
                      aria-label="Previous Slide"
                      className="bg-white rounded-full p-5 shadow absolute left-4 top-1/2 -translate-y-1/2"
                    >
                      <FaChevronLeft />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={nextSlide}
                      aria-label="Next Slide"
                      className="bg-white rounded-full p-5 shadow absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <FaChevronRight />
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <img
              src={mainImage}
              alt={`Image of ${productList[selectedProductIndex].name}`}
              className="w-full lg:rounded-2xl cursor-pointer"
              onClick={() => setIsLightboxVisible(true)}
            />
          </div>

          <ul className="hidden lg:flex items-center justify-start gap-5 flex-wrap mt-5">
            {productList.map((item, index) => (
              <li
                key={item.id}
                onClick={() => setSelectedProductIndex(index)}
                className={`${
                  index === selectedProductIndex &&
                  "border-2 border-orange-400 opacity-80"
                } border-2 rounded-2xl overflow-hidden cursor-pointer`}
              >
                <img
                  src={item.thumbnail}
                  alt={`Thumbnail of ${item.name}`}
                  className="w-20"
                />
              </li>
            ))}
          </ul>
        </article>

        <div className="px-8 pb-10">
          <h2 className="bg-slate-100 py-1 px-2 text-orange-400 uppercase tracking-wide text-sm font-bold inline-block rounded shadow mb-10">
            Sneaker company
          </h2>
          <h1 className="text-slate-900 mb-10 font-bold text-3xl lg:text-4xl">
            Fall Limited Edition Sneakers
          </h1>
          <p className="text-slate-600 mb-10 leading-relaxed">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>

          <div className="flex flex-wrap items-center justify-between lg:flex-col lg:items-start lg:gap-2">
            <ul className="flex items-center gap-5">
              <li className="text-slate-900 font-bold text-2xl">${price}</li>
              <li className="bg-orange-100 py-1 px-2 text-orange-400 tracking-wide text-sm font-bold inline-block rounded shadow">
                50%
              </li>
            </ul>

            <p className="text-slate-600 text-sm">
              <s>${price * 2}</s>
            </p>
          </div>

          <div className="mt-10 lg:flex items-center justify-between gap-2">
            <ul className="flex items-center justify-between bg-slate-100 py-2 px-4 rounded shadow lg:flex-1">
              <li
                className="cursor-pointer"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                <img src={minus} alt="Decrease quantity" />
              </li>
              <li>{quantity}</li>
              <li
                onClick={() => setQuantity(quantity + 1)}
                className="cursor-pointer"
              >
                <img src={plus} alt="Increase quantity" />
              </li>
            </ul>

            <div className="lg:flex-1">
              <button
                onClick={addToCart}
                className="flex items-center justify-center gap-4 bg-orange-500 py-2 px-4 text-white font-bold rounded-lg shadow mt-5 w-full lg:mt-0 hover:bg-orange-600 transition-all duration-200"
              >
                <AiOutlineShoppingCart /> Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
