import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";
interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}
const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  const [cuurentPage, setCurrentPage] = useState(1);
  const [dropDownOpen, SetDropDownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(cuurentPage - 1) * itemsPerPage}`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cuurentPage, keyword]);
  let filteredProducts = products;

  const getFilteredProducts = () => {
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory,
      );
    }
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice,
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice,
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
      );
    }
    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };
  const totalProduct = 100;
  const totalPages = Math.ceil(totalProduct / itemsPerPage);
  const filteredProduct = getFilteredProducts();
  const handelPageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPagenationButton = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, cuurentPage - 2);
    let endPage = Math.min(totalPages, cuurentPage + 2);
    if (cuurentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - cuurentPage - 1));
    }
    if (cuurentPage + 2 > totalPages) {
      startPage = Math.max(1, startPage - (2 - cuurentPage - -cuurentPage));
    }
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }
    return buttons;
  };
  return (
    <section className="xl:w-220 lg:w-220 sm:w-160 xs:w-80 p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              onClick={() => SetDropDownOpen(!dropDownOpen)}
              className="border px-4 py-2 rounded-full flex items-center"
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>
            {dropDownOpen && (
              <div className="absolute bg-white border-gray-300 rounded mt--2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="black px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="black px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="black px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 p-4">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={String(product.id)}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          {/*previous */}
          <button
            onClick={() => handelPageChange(cuurentPage - 1)}
            disabled={cuurentPage === 1}
            className="border px-4 py-2 mx-2 rounded-full"
          >
            Previous
          </button>
          {/*1,2,3,4 */}
          <div className="flex flex-wrap justify-center">
            {/*pagination button*/}
            {getPagenationButton().map((page) => (
              <button
                key={page}
                onClick={() => handelPageChange(page)}
                className={`border px-4 py-2 mx-1 rounded-full ${page === cuurentPage ? "bg-black text-white" : ""}`}
              >
                {page}
              </button>
            ))}
          </div>

          {/*next */}
          <button
            onClick={() => handelPageChange(cuurentPage + 1)}
            disabled={cuurentPage === totalPages}
            className="border px-4 py-2 mx-2 rounded-full"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
