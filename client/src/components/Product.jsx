import { formatPrice, renderStars } from "../utils/helper";
import label from "../../src/assets/label.png";
import label_new from "../../src/assets/label-new.png";
import SelectOption from "./SelectOption";
import icons from '../utils/icons.js';
import { memo, useState } from "react";
import { Link } from 'react-router-dom';
import path from "../utils/path.js"

const Product = ({ productData, isNew }) => {
    const { AiFillEye, BsFillSuitHeartFill, IoIosMenu } = icons;
    const [isShowOption, setIsShowOption] = useState(false);

    const handleOnMouseEnter = (event) => {
        event.stopPropagation();
        setIsShowOption(true);
    };

    const handleOnMouseLeave = (event) => {
        event.stopPropagation();
        setIsShowOption(false);
    };

    return (
        <div className="w-full text-base px-[10px]">
            <div
                className="w-full border p-[15px] flex flex-col items-center"
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
            >
                <div className="w-full relative">
                    <div className="relative">
                        {isShowOption && <div className="absolute flex left-0 right-0 justify-center bottom-0 gap-2 animate-slide-top">
                            <SelectOption icon={<AiFillEye color="red" />} />
                            <SelectOption icon={<BsFillSuitHeartFill color="red" />} />
                            <SelectOption icon={<IoIosMenu color="red" />} />
                        </div>}
                        <Link to={ `/${productData?.category?.title?.toLowerCase()}/${productData?._id}/${productData?.title}`}>
                            <img src={productData?.images[0] || ''} alt="image" className="w-full object-cover" />
                        </Link>
                        {isNew === true ?
                            <img src={label_new} alt="label" className="absolute top-[-15px] left-[-20px] w-[100px] h-[35px] object-cover" />
                            :
                            <img src={label} alt="label_new" className="absolute top-[-15px] left-[-20px] w-[100px] h-[35px] object-cover" />
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-start w-full">
                    <span className="flex mt-4">{renderStars(productData?.totalRatings)}</span>
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{formatPrice(productData?.price)} VND</span>
                </div>
            </div>
        </div>
    )
}

export default memo(Product);     