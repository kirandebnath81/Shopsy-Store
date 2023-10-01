import { Link } from "react-router-dom";

import { categoriesList } from "../../constants";

import { LazyLoadImage } from "react-lazy-load-image-component";

const Categories = () => {
  return (
    <div className="w-full">
      <div className="text-center font-medium text-[22px] xs:text-2xl mb-12">
        Featured Categories
      </div>

      <div className="w-full flex flex-wrap flex-col ss:flex-row items-center  justify-center gap-x-9 gap-y-10">
        {categoriesList.map(({ image, title, id }) => (
          <Link
            key={id}
            to={`/products?category=${id}`}
            className="w-full ss:basis-[22%] max-w-[220px] min-w-[200px] ss:h-[150px]  rounded-lg overflow-hidden relative cursor-pointer"
          >
            <LazyLoadImage
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 w-full h-full bg-black opacity-0 hover:opacity-100 bg-opacity-70 flex justify-center items-center font-medium text-lg text-white tracking-wider transition-opacity duration-300">
              {title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
