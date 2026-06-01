import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white w-full">
      <Link to={`/product/${id}`} className="block">
        <div className="relative w-full aspect-3/4 sm:aspect-2/3">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-3 sm:p-4">
          <h2 className="font-semibold text-sm sm:text-base leading-tight line-clamp-2 mb-1 text-gray-800">
            {title}
          </h2>
          <p className="text-base sm:text-lg font-bold text-indigo-600">
            ${price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
