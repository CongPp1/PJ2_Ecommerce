import { formatPrice } from "../utils/helper";
import label from "../../src/assets/label.png";

const Product = ({ productData }) => {
    return (
        <div className="w-full text-base px-[10px]">
            <div className="w-full border p-[15px] flex flex-col items-center">
                <div className="w-full relative">
                    <img src={productData?.images[0] || ''} alt="image" className="w-full object-cover" />
                </div>
                <img src={label} alt="label" className="absolute top-0 left-0 w-[70px] h-[25px] object-cover"/>
                <div className="flex flex-col gap-1 items-start w-full">
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{formatPrice(productData?.price)} VND</span>
                </div>
            </div>
        </div>
    )
}

export default Product;     