import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { formatDeliveryDate, getSellingPrice } from "../utils";

const OrderedProductCard = ({ productData, orderDate }) => {
  const { id, title, category, imgUrl, amount, discount, count, deliveryDays } =
    productData;

  const getDeliveryInfo = (daysToDiliver) => {
    const fullDeliveryInMillSec = formatDeliveryDate(daysToDiliver, orderDate);

    const deliveryDateStr = new Date(fullDeliveryInMillSec).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        day: "numeric",
        month: "short",
      }
    );

    const deliveryDate = fullDeliveryInMillSec.getDate();
    let todayDate = new Date().getDate();

    if (deliveryDate === todayDate) {
      return `Delivery on Today`;
    } else if (deliveryDate > todayDate) {
      return `Delivery by ${deliveryDateStr}`;
    } else {
      return `Delivered on ${deliveryDateStr}`;
    }
  };

  return (
    <div key={id} className="flex gap-x-6">
      <Link to={`/products/${category}/${title}/${id}`}>
        <div className="basis-20 h-24">
          <LazyLoadImage
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover rounded-[5px]"
          />
        </div>
      </Link>
      <div className="flex-1 font-medium space-y-1">
        <Link to={`/products/${category}/${title}/${id}`}>
          <div className="text-sm ss:text-[15px] text-sky-900">{title}</div>
        </Link>

        <div className="text-[13px] ss:text-sm">
          &#8377; {getSellingPrice(amount, discount)}
        </div>
        <div className="text-[13px] ss:text-sm">Quantity : {count}</div>
        <div className="text-[13px] ss:text-sm">
          {getDeliveryInfo(deliveryDays)}
        </div>
      </div>
    </div>
  );
};

OrderedProductCard.propTypes = {
  productData: PropTypes.object.isRequired,
  orderDate: PropTypes.string.isRequired,
};

export default OrderedProductCard;
