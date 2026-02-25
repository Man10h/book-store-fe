// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { bookService } from '../services/bookService';
// import BookCard from '../components/BookCard';

// const BookList = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [page, setPage] = useState(0);
//   const [searchText, setSearchText] = useState(searchParams.get('search') || '');
//   const [type, setType] = useState(searchParams.get('type') || '');
//   const size = 24;

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ['books', searchText, type, page],
//     queryFn: () => bookService.getBooks({ text: searchText, type, page, size }),
//   });

//   useEffect(() => {
//     refetch();
//   }, [searchText, type, page, refetch]);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setPage(0);
//     setSearchParams({ search: searchText, ...(type && { type }) });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Search and Filters */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <form onSubmit={handleSearch} className="mb-4">
//             <div className="flex gap-4">
//               <input
//                 type="text"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 placeholder="Search by title or author..."
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//               />
//               <select
//                 value={type}
//                 onChange={(e) => {
//                   setType(e.target.value);
//                   setPage(0);
//                 }}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
//               >
//                 <option value="">All Types</option>
//                 <option value="Fiction">Fiction</option>
//                 <option value="Non-Fiction">Non-Fiction</option>
//                 <option value="Children">Children's Books</option>
//                 <option value="Romance">Romance</option>
//                 <option value="Crime">Crime & Thriller</option>
//                 <option value="Sci-Fi">Sci-Fi & Fantasy</option>
//               </select>
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
//               >
//                 Search
//               </button>
//             </div>
//           </form>


//           {data && (
//             <p className="text-gray-600">
//               Found {data.totalElements} book{data.totalElements !== 1 ? 's' : ''}
//             </p>
//           )}
//         </div>

//         {/* Books Grid */}
//         {isLoading ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
//             {[...Array(12)].map((_, i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//               </div>
//             ))}
//           </div>
//         ) : data && data.content.length > 0 ? (
//           <>
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
//               {data.content.map((book) => (
//                 <BookCard key={book.id} book={book} />
//               ))}
//             </div>

//             {/* Pagination */}
//             {data.totalPages > 1 && (
//               <div className="flex justify-center items-center space-x-2">
//                 <button
//                   onClick={() => setPage((p) => Math.max(0, p - 1))}
//                   disabled={page === 0}
//                   className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   Previous
//                 </button>
//                 <span className="px-4 py-2 text-gray-700">
//                   Page {page + 1} of {data.totalPages}
//                 </span>
//                 <button
//                   onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
//                   disabled={page >= data.totalPages - 1}
//                   className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">📚</div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No books found</h3>
//             <p className="text-gray-600">Try adjusting your search criteria</p>
//           </div>
//         )}
//       </div>
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { bookService } from '../services/bookService';
import BookCard from '../components/BookCard';

const BookList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const size = 24;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['books', searchText, type, page],
    queryFn: () => bookService.getBooks({ text: searchText, type, page, size }),
  });

  useEffect(() => {
    refetch();
  }, [searchText, type, page, refetch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setSearchParams({ search: searchText, ...(type && { type }) });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by title or author..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setPage(0);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Types</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Children">Children's Books</option>
                <option value="Romance">Romance</option>
                <option value="Crime">Crime & Thriller</option>
                <option value="Sci-Fi">Sci-Fi & Fantasy</option>
              </select>
              <button
                type="submit"
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {data && (
            <p className="text-gray-600">
              Found {data.totalElements} book{data.totalElements !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Books Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : data && data.content.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
              {data.content.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {page + 1} of {data.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
                  disabled={page >= data.totalPages - 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;