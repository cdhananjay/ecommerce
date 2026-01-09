

import ProductCard from "@/components/ProductCard";
import axios from "axios";
export default async function Home() {
    const req = await axios.get("http://localhost:3000/api/products");
    const products = req.data;

    try{

        const resources = performance.getEntriesByType("resource");

        resources.forEach(r => {
            if (r.transferSize === 0) {
                console.log("Cached:", r.name);
            }
        });
    } catch(e) {console.log(e);};

    return (
      <>
          <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  <h2 className="sr-only">Products</h2>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {products.map((product) => (
                              <ProductCard key={product._id} product={product} />
                      ))}
                  </div>
              </div>
          </div>
      </>
  );
}
