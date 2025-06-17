import { Minus, Plus, Trash2, AlertCircle } from "lucide-react";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.prodTitle}
          className="w-20 h-20 object-cover rounded-lg bg-gray-100"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">
          {item.product.prodTitle}
        </h3>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-lg font-bold text-green-600">
            &#8377;{item.product.price.org.toFixed(2)}
          </span>
          {/* {item.prescription && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
              <AlertCircle className="w-3 h-3 mr-1" />
              Prescription Required
            </span>
          )} */}
        </div>
        {!item.product.inStock && (
          <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => onRemove(item.product._id)}
            className="p-1 rounded-md hover:bg-white transition-colors"
            disabled={!item.product.inStock}
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.product._id)}
            className="p-1 rounded-md hover:bg-white transition-colors"
            disabled={!item.product.inStock}
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right">
          <div className="font-bold text-gray-800">
            &#8377;{(item.product.price.org * item.quantity).toFixed(2)}
          </div>
        </div>

        {/* Remove Button */}
        {/* <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button> */}
      </div>
    </div>
  );
};

export default CartItem;
