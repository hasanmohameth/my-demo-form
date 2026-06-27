'use client';

import { useFormContext } from "@/_context/provider";
import Image from "next/image";

function Products() {
  const { state, dispatch } = useFormContext();

  const clearAll = () => {
    dispatch({ type: "CLEAR_PRODUCTS" });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground ">Products List ({state.products.length})</h1>

      {state.products.length === 0 ? (
        <p className="text-center text-foreground">No products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.products.map((product, index) => (
            <div key={index} className="border rounded-2xl p-5 bg-myblue-500">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Description:</strong> {product.discription}</p>
              
              {product.image && (
                <Image
             src={URL.createObjectURL(product.image)}
             alt={product.name}
             width={500}
             height={200}
             className="mt-3 w-full h-48 object-cover rounded-xl"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {state.products.length > 0 && (
        <button 
          onClick={clearAll}
          className="mt-8 px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700"
        >
          Clear All Products
        </button>
      )}
    </div>
  );
}

export default Products;