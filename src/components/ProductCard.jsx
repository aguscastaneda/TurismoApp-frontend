import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, getProductMessage, clearProductMessage } = useCart();
  const { isAuthenticated } = useAuth();
  const { convertPrice, formatPrice } = useCurrency();
  const navigate = useNavigate();

  const { success, error } = getProductMessage(product.id);

  // Convertir precio a la moneda seleccionada
  const convertedPrice = convertPrice(product.price, 'USD');
  const formattedPrice = formatPrice(convertedPrice);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsAdding(true);
    try {
      await addToCart(product.id, quantity);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{product.description}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0">
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            {formattedPrice}
          </span>
          <span
            className={`text-xs sm:text-sm font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
          </span>
        </div>
        <div className="flex flex-col space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center sm:justify-start">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-gray-500 hover:text-gray-700 p-1"
              disabled={quantity <= 1}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.min(
                    product.stock,
                    Math.max(1, parseInt(e.target.value) || 1)
                  )
                )
              }
              className="w-12 sm:w-16 text-center border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm mx-2"
            />
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="text-gray-500 hover:text-gray-700 p-1"
              disabled={quantity >= product.stock}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {/* Mensajes de éxito y error específicos del producto */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 text-green-700 text-xs sm:text-sm flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="flex-1">{success}</span>
              </div>
              <button
                onClick={() => clearProductMessage(product.id)}
                className="text-green-600 hover:text-green-800 ml-2 flex-shrink-0"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-3 text-red-700 text-xs sm:text-sm flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="flex-1">{error}</span>
              </div>
              <button
                onClick={() => clearProductMessage(product.id)}
                className="text-red-600 hover:text-red-800 ml-2 flex-shrink-0"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className={`w-full bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded hover:bg-blue-700 flex items-center justify-center space-x-2 text-sm sm:text-base ${
              product.stock === 0 || isAdding ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAdding ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                <span>Agregando...</span>
              </>
            ) : product.stock === 0 ? (
              'Agotado'
            ) : (
              'Agregar al carrito'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
