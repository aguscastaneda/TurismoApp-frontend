import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CurrencySelector from "./CurrencySelector";
import logo from "../assets/logo.png";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 shadow-lg border-b border-slate-200" style={{ backgroundColor: '#03045E' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-lg sm:text-xl lg:text-2xl font-bold text-white hover:text-blue-300 transition-colors duration-200"
            >
              <img src={logo} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 transition-transform duration-200 hover:scale-110" />
              <span className="hidden sm:block">TurismoApp</span>
              <span className="sm:hidden">Turismo</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-3">
            <CurrencySelector />
            {!isAuthenticated ? (
              <>
                <Link to="/help">
                  <button className="flex items-center space-x-2 border border-slate-200 text-white border-white hover:bg-[#CAF0F8] hover:border-[#CAF0F8] hover:text-[#03045E] transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ayuda</span>
                  </button>
                </Link>
                <div className="flex items-center space-x-2 ml-4">
                  <Link to="/login">
                    <button className="border border-slate-200 text-white border-white hover:bg-[#CAF0F8] hover:border-[#CAF0F8] hover:text-[#03045E] transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium">
                      Ingresa
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="border border-slate-200 text-white border-white hover:bg-[#CAF0F8] hover:border-[#CAF0F8] hover:text-[#03045E] transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium">
                      Registrate
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative group">
                  <button className="flex items-center space-x-2 border border-slate-200 text-white border-white hover:bg-[#CAF0F8] hover:border-[#CAF0F8] hover:text-[#03045E] transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium">
                    <svg className="h-5 w-5 text-white group-hover:text-[#03045E] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Carrito</span>
                    {cartItemsCount > 0 && (
                      <span className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-pink-500 group-hover:bg-pink-600 text-white rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                </Link>

                <Link to="/my-orders">
                  <button className="flex items-center space-x-2 border border-slate-200 text-white border-white hover:bg-[#CAF0F8] hover:border-[#CAF0F8] hover:text-[#03045E] transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Mis Órdenes</span>
                  </button>
                </Link>

                <Link to="/help">
                  <button className="flex items-center space-x-2 border border-slate-200 text-white border-white hover:bg-[#CAF0F8] hover:border-[#CAF0F8] hover:text-[#03045E] transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ayuda</span>
                  </button>
                </Link>

                {user?.role === "ADMIN" && (
                  <>
                    <Link to="/admin/products">
                      <button className="flex items-center space-x-2 border border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Productos</span>
                      </button>
                    </Link>
                    <Link to="/admin/orders">
                      <button className="flex items-center space-x-2 border border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>Órdenes</span>
                      </button>
                    </Link>
                  </>
                )}

                <div className="relative group">
                  <button className="flex items-center space-x-2 border border-slate-200 text-white border-white hover:bg-[#CAF0F8] hover:border-[#CAF0F8] hover:text-[#03045E] transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden xl:block">{user?.name} {user?.role === "ADMIN" && "(Admin)"} {user?.role === "SALES_MANAGER" && "(Manager)"}</span>
                    <span className="xl:hidden">{user?.name}</span>
                  </button>
                 
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <CurrencySelector />
            {isAuthenticated && (
              <Link to="/cart" className="relative">
                <button className="flex items-center space-x-1 border border-slate-200 text-white border-white hover:bg-[#CAF0F8] hover:border-[#CAF0F8] hover:text-[#03045E] transition-all duration-200 p-2 rounded-md">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-pink-500 text-white rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </Link>
            )}
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-1 border border-slate-200 text-white border-white hover:bg-[#CAF0F8] hover:border-[#CAF0F8] hover:text-[#03045E] transition-all duration-200 p-2 rounded-md"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!isAuthenticated ? (
                <>
                  <Link to="/help" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md">
                    Ayuda
                  </Link>
                  <div className="border-t border-slate-200 pt-2 mt-2">
                    <Link to="/login" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md">
                      Ingresa
                    </Link>
                    <Link to="/register" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md">
                      Registrate
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/my-orders" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md">
                    Mis Órdenes
                  </Link>
                  <Link to="/help" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md">
                    Ayuda
                  </Link>
                  {user?.role === "ADMIN" && (
                    <>
                      <Link to="/admin/products" className="block px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 rounded-md">
                        Productos
                      </Link>
                      <Link to="/admin/orders" className="block px-3 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50 rounded-md">
                        Órdenes
                      </Link>
                    </>
                  )}
                  <div className="border-t border-slate-200 pt-2 mt-2">
                    <div className="px-3 py-2 text-sm text-slate-500">
                      {user?.name} {user?.role === "ADMIN" && "(Admin)"} {user?.role === "SALES_MANAGER" && "(Manager)"}
                    </div>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;