import React from 'react';
import { Product } from '../types/Product';
import { Edit2, Trash2, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-100' };
    if (stock < 10) return { text: 'Low Stock', color: 'text-orange-600 bg-orange-100' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-100' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors duration-200"
            title="Edit product"
          >
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
            title="Delete product"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
          <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {product.category}
          </span>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Package className="w-4 h-4" />
            <span>{product.stock} units</span>
          </div>
          <span>Added {formatDate(product.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};