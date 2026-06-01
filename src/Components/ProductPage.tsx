import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}
const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-4 sm:p-5 w-full sm:w-[80%] md:w-[60%] mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 bg-black text-white rounded"
      >
        Back
      </button>
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full sm:w-[70%] md:w-[50%]"
      />
      <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-700w-[70%]">{product.description}</p>
      <div className="flex">
        <p>${product.price}</p>
        <p className="ml-10">Rating:{product.rating}</p>
      </div>
    </div>
  );
};

export default ProductPage;
