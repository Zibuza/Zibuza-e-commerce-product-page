import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import { IoCartOutline } from "react-icons/io5";
import avatar from "/images/image-avatar.png";
import menu from "../../assets/images/icon-menu.svg";
import close from "../../assets/images/icon-close.svg";
import Cart from "../cart/Cart";

export default function Header({ cart, setCartIsOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <header className="flex items-center justify-between p-8 border-b border-slate-400 max-w-7xl mx-auto">
      <div className="flex items-center justify-start gap-4">
        <ul className="flex items-center justify-start gap-4">
          {!isOpen && (
            <li onClick={() => setIsOpen(true)}>
              <img src={menu} alt="" className="lg:hidden cursor-pointer" />
            </li>
          )}
          {isOpen && (
            <li onClick={() => setIsOpen(false)}>
              <img src={close} alt="" className="lg:hidden close" />
            </li>
          )}
          <li>
            <img src={logo} alt="" className="cursor-pointer" />
          </li>
        </ul>
        <nav className={isOpen && "open"}>
          <ul>
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setCartIsOpen((prevState) => !prevState)}
          className="relative"
        >
          <IoCartOutline className="text-2xl" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-orange-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
        <img src={avatar} alt="User Avatar" className="rounded-full w-8" />
      </div>
    </header>
  );
}
