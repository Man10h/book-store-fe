import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../services/cartService';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Cart = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: () => cartService.getCart(user!.id),
    enabled: isAuthenticated && !!user?.id,
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: number; quantity: number }) => {
      await cartService.updateItem(itemId, {
        quantity,
        status: 'PENDING' as const,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: number) => {
      await cartService.deleteItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to view your cart</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const items = cart?.itemResponseList || [];
  const total = items.reduce((sum, item) => {
    return sum + (item.bookResponse.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start adding some books to your cart!</p>
            <Link
              to="/books"
              className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex gap-4">
                    {/* Book Image */}
                    <Link to={`/books/${item.bookResponse.id}`} className="flex-shrink-0">
                      {item.bookResponse.imagesStringUrl && item.bookResponse.imagesStringUrl.length > 0 ? (
                        <img
                          src={item.bookResponse.imagesStringUrl[0]}
                          alt={item.bookResponse.title}
                          className="w-24 h-32 object-cover rounded"
                        />
                      ) : (
                        <div className="w-24 h-32 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-2xl">📚</span>
                        </div>
                      )}
                    </Link>

                    {/* Book Info */}
                    <div className="flex-1">
                      <Link to={`/books/${item.bookResponse.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-amber-700 mb-1">
                          {item.bookResponse.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-2">{item.bookResponse.author}</p>
                      <p className="text-lg font-bold text-amber-700 mb-4">
                        {formatPrice(item.bookResponse.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateItemMutation.mutate({ itemId: item.id, quantity: item.quantity - 1 });
                              }
                            }}
                            disabled={item.quantity <= 1 || updateItemMutation.isPending}
                            className="p-1 border border-gray-300 rounded disabled:opacity-50"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 border border-gray-300 rounded min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              updateItemMutation.mutate({ itemId: item.id, quantity: item.quantity + 1 });
                            }}
                            disabled={updateItemMutation.isPending}
                            className="p-1 border border-gray-300 rounded disabled:opacity-50"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => deleteItemMutation.mutate(item.id)}
                          disabled={deleteItemMutation.isPending}
                          className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{total > 500000 ? 'Free' : formatPrice(50000)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(total + (total > 500000 ? 0 : 50000))}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold">
                  Proceed to Checkout
                </button>
                {total < 500000 && (
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Add {formatPrice(500000 - total)} more for free shipping!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

