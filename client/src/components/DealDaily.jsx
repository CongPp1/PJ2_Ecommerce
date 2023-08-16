import icons from "../utils/icons";
import { apiGetProducts } from "../APIs/product";
import { useEffect, useState } from "react";
import { formatPrice, renderStars } from "../utils/helper";
import CountdownTimer from "./CountdownTimer";

const DealDaily = () => {
    const { AiFillStar, IoIosMenu } = icons;
    const targetDate = new Date().getTime() + 86400000; // Thời gian hiện tại + 1 ngày (86400000 milliseconds)
    const [dealDaily, setDealDaily] = useState(null);

    const fetchedDealDaily = async () => {
        const response = await apiGetProducts();
        console.log('Deal Daily', response);
        if (response.message === 'Get all products successfully') {
            const productArr = response.data.products;
            const randomDealDailyIndex = Math.floor(Math.random() * +productArr.length);
            const randomProduct = productArr[randomDealDailyIndex];
            setDealDaily(randomProduct);
        } else {
            return;
        }
    }

    useEffect(() => {
        fetchedDealDaily();
    }, []);

    return (
        <div className="w-full border flex-auto">
            <div className="flex items-center ">
                <span className="flex-1">
                    <AiFillStar color="red" size={20} />
                </span>
                <span className="flex-5 font-bold text-[20px] text-center">Deal Daily</span>
            </div>
            <div className="mt-10 flex flex-col">
                <img src={dealDaily?.images[0]} alt="image" className="w-full object-contain flex justify-center" />
                <span className="mt-4 text-center">{dealDaily?.title}</span>
                <span className="flex mt-4 items-center">{renderStars(dealDaily?.totalRatings)}</span>
                {/* <span className="flex mt-4 items-center">{formatPrice(dealDaily?.price)} VND</span> */}
            </div>
            <div className="mt-4">
                <CountdownTimer targetDate={targetDate} />
            </div>
            <div className="px-4">
                <button type="button" className="flex w-2/3 gap-4 mt-4 items-center justify-center bg-main hover:bg-gray-800 text-white font-medium py-2">
                    <IoIosMenu />
                    <span>Option</span>
                </button>
            </div>
        </div>
    )
}

export default DealDaily;