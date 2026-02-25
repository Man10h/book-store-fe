import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookService } from '../services/bookService';
import { cartService, ItemDTO } from '../services/cartService';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();

  const { data: book, isLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: () => bookService.getBookById(Number(id)),
    enabled: !!id,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (item: ItemDTO) => {
      if (!user?.id) throw new Error('User not authenticated');
      await cartService.addItem(user.id, item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('Item added to cart!');
    },
    onError: (error: Error) => {
      alert(`Failed to add item to cart: ${error.message}`);
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!book) return;

    const item: ItemDTO = {
      quantity,
      status: 'PENDING',
    };
    addToCartMutation.mutate(item);
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Images Section */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8">
              {book.imagesStringUrl && book.imagesStringUrl.length > 0 ? (
                <div className="space-y-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <img
                      src={book.imagesStringUrl[0]}
                      alt={book.title}
                      className="relative w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-amber-700">Bestseller</span>
                    </div>
                  </div>
                  {book.imagesStringUrl.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                      {book.imagesStringUrl.slice(1, 5).map((url, index) => (
                        <div key={index} className="relative group cursor-pointer">
                          <img
                            src={url}
                            alt={`${book.title} ${index + 2}`}
                            className="w-full aspect-square object-cover rounded-xl shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <svg className="w-32 h-32 text-amber-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-amber-600 font-medium">No Image Available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Book Info Section */}
            <div className="p-8 lg:p-12 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{book.title}</h1>
                    <p className="text-xl lg:text-2xl text-gray-600 font-light">by {book.author}</p>
                  </div>
                </div>
                {book.type && (
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-200">
                      {book.type}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-600 ml-2">(4.8)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Price */}
              {book.price && (
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-3">
                    <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {formatPrice(book.price)}
                    </p>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(book.price * 1.2)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">-20% OFF</span>
                    <span className="text-sm text-gray-600">Limited time offer</span>
                  </div>
                </div>
              )}

              {/* Description */}
              {book.description && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <svg className="w-6 h-6 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Description
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">{book.description}</p>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">In Stock</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Fast Delivery</span>
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="border-t border-gray-200 pt-8 space-y-6">
                <div className="space-y-3">
                  <label className="text-gray-700 font-semibold text-lg">Quantity:</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 px-3 py-3 text-center border-0 focus:ring-0 font-semibold"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-600">{book.price ? formatPrice(book.price * quantity) : 'N/A'}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={addToCartMutation.isPending}
                    className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {addToCartMutation.isPending ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </span>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Secure payment
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      30-day return
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

