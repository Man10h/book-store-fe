

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { bookService, BookResponse } from '../services/bookService';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'books'>('users');
  const [page, setPage] = useState(0);
  const [usernameSearch, setUsernameSearch] = useState('');

  const [bookPage, setBookPage] = useState(0);
  const [bookSearch, setBookSearch] = useState('');
  const [bookTypeFilter, setBookTypeFilter] = useState('');

  const [showBookForm, setShowBookForm] = useState(false);
  const [editingBook, setEditingBook] = useState<BookResponse | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<FileList | null>(null);

  const queryClient = useQueryClient();
  const { isAuthenticated, isAdmin } = useAuth();

  /* ================= USERS ================= */

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users', page, usernameSearch],
    queryFn: () => userService.getUsers(page, 10, usernameSearch || undefined),
    enabled: activeTab === 'users' && isAuthenticated && isAdmin,
  });

  const updateRoleMutation = useMutation({
    mutationFn: userService.updateUserRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const deleteUserMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  /* ================= BOOKS ================= */

  const { data: booksData, isLoading: booksLoading } = useQuery({
    queryKey: ['admin-books', bookPage, bookSearch, bookTypeFilter],
    queryFn: () =>
      bookService.getBooks({
        text: bookSearch,
        type: bookTypeFilter,
        page: bookPage,
        size: 10,
      }),
    enabled: activeTab === 'books' && isAuthenticated && isAdmin,
  });

  const resetBookForm = () => {
    setEditingBook(null);
    setTitle('');
    setAuthor('');
    setType('');
    setPrice('');
    setDescription('');
    setImages(null);
    setShowBookForm(false);
  };

  const addBookMutation = useMutation({
    mutationFn: (formData: FormData) => bookService.addBook(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      resetBookForm();
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: (payload: { id: number; formData: FormData }) =>
      bookService.updateBook(payload.id, payload.formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      resetBookForm();
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: (id: number) => bookService.deleteBook(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-books'] }),
  });

  const handleEditBook = (book: BookResponse) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setType(book.type);
    setPrice(book.price ?? '');
    setDescription(book.description ?? '');
    setImages(null);
    setShowBookForm(true);
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('type', type);
    if (price !== '') formData.append('price', String(price));
    formData.append('description', description);

    if (images) {
      Array.from(images).forEach((file) =>
        formData.append('imageMultipartFiles', file)
      );
    }

    if (editingBook) {
      updateBookMutation.mutate({ id: editingBook.id, formData });
    } else {
      addBookMutation.mutate(formData);
    }
  };

  return (
        <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'users'
                      ? 'border-b-2 border-amber-600 text-amber-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={() => setActiveTab('books')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'books'
                      ? 'border-b-2 border-amber-600 text-amber-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Books
                </button>
              </nav>
            </div>
          </div>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <input
                  type="text"
                  value={usernameSearch}
                  onChange={(e) => {
                    setUsernameSearch(e.target.value);
                    setPage(0);
                  }}
                  placeholder="Search by username..."
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md"
                />
              </div>

              {usersLoading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {usersData?.content.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  user.roleName === 'ADMIN'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {user.roleName}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              {user.roleName !== 'ADMIN' && (
                                <button
                                  onClick={() => updateRoleMutation.mutate(user.id)}
                                  disabled={updateRoleMutation.isPending}
                                  className="text-amber-600 hover:text-amber-900 disabled:opacity-50"
                                >
                                  Make Admin
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this user?')) {
                                    deleteUserMutation.mutate(user.id);
                                  }
                                }}
                                disabled={deleteUserMutation.isPending}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {usersData && usersData.totalPages > 1 && (
                    <div className="mt-4 flex justify-center space-x-2">
                      <button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2">
                        Page {page + 1} of {usersData.totalPages}
                      </span>
                      <button
                        onClick={() => setPage((p) => Math.min(usersData.totalPages - 1, p + 1))}
                        disabled={page >= usersData.totalPages - 1}
                        className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Books Tab */}
          {activeTab === 'books' && (
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {/* Search & Filter */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 flex gap-3">
                  <input
                    type="text"
                    value={bookSearch}
                    onChange={(e) => {
                      setBookSearch(e.target.value);
                      setBookPage(0);
                    }}
                    placeholder="Search by title or author..."
                    className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                  />
                  <select
                    value={bookTypeFilter}
                    onChange={(e) => {
                      setBookTypeFilter(e.target.value);
                      setBookPage(0);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Types</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Children">Children's Books</option>
                    <option value="Romance">Romance</option>
                    <option value="Crime">Crime & Thriller</option>
                    <option value="Sci-Fi">Sci-Fi & Fantasy</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBookForm(true)}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  New Book
                </button>
              </div>

              {/* Book Form */}
              {showBookForm && (
                <form onSubmit={handleBookSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Author
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <input
                          type="text"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g. Fiction"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price (VND)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={price}
                          onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Images
                      </label>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                        className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                      />
                      {editingBook && editingBook.imagesStringUrl?.length > 0 && (
                        <p className="mt-1 text-xs text-gray-500">
                          Existing images will be kept. Upload new ones to add more.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={addBookMutation.isPending || updateBookMutation.isPending}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
                      >
                        {editingBook
                          ? updateBookMutation.isPending
                            ? 'Updating...'
                            : 'Update Book'
                          : addBookMutation.isPending
                            ? 'Creating...'
                            : 'Create Book'}
                      </button>
                      <button
                        type="button"
                        onClick={resetBookForm}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Books Table */}
              {booksLoading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded" />
                  ))}
                </div>
              ) : booksData && booksData.content.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Author
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {booksData.content.map((book) => (
                          <tr key={book.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {book.id}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 max-w-xs">
                              <div className="line-clamp-2">{book.title}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {book.author}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {book.type}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {book.price
                                ? new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND',
                                }).format(book.price)
                                : 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                type="button"
                                onClick={() => handleEditBook(book)}
                                className="text-amber-600 hover:text-amber-900"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this book?')) {
                                    deleteBookMutation.mutate(book.id);
                                  }
                                }}
                                disabled={deleteBookMutation.isPending}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {booksData.totalPages > 1 && (
                    <div className="mt-4 flex justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setBookPage((p) => Math.max(0, p - 1))}
                        disabled={bookPage === 0}
                        className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2">
                        Page {bookPage + 1} of {booksData.totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setBookPage((p) => Math.min(booksData.totalPages - 1, p + 1))
                        }
                        disabled={bookPage >= booksData.totalPages - 1}
                        className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-600">No books found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;

