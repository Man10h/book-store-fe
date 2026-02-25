import { Link } from 'react-router-dom';
import { BookResponse } from '../services/bookService';

interface BookCardProps {
  book: BookResponse;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <Link
      to={`/books/${book.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Book Image */}
      <div className="relative aspect-[3/4] bg-gray-100">
        {book.imagesStringUrl && book.imagesStringUrl.length > 0 ? (
          <>
            <img
              src={book.imagesStringUrl[0]}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            {book.type && (
              <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded text-xs font-semibold">
                {book.type}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-4xl text-gray-400">📚</span>
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <p className="text-lg font-bold text-amber-700">
          {formatPrice(book.price)}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;

