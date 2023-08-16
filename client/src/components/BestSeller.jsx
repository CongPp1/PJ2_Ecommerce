import { apiGetProducts } from "../APIs/product";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "./Product";

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [activeTab, setActiveTab] = useState(1);

    const tab = [
        { id: 1, name: "Best Sellers", isActive: false },
        { id: 1, name: "New Arrivals", isActive: false },
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 250,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const fetchedProducts = async () => {
        const [bestSellers, newProducts] = await Promise.all([
            apiGetProducts({ sort: '-createdAt' }),
            apiGetProducts({ sort: '-sold' }),
        ]);
        if (bestSellers.message === 'Get all products successfully') {
            setBestSellers(bestSellers.data.products);
        }
        if (newProducts.message === 'Get all products successfully') {
            setNewProducts(newProducts.data.products);
        }
    };

    useEffect(() => {
        fetchedProducts();
    }, []);
    return (
        <div>
            <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
                {tab.map((element) => (
                    <span
                        key={element.id}
                        className={`font-bold capitalize border-r cursor-pointer text-gray-400 ${activeTab === element.id ? 'text-black' : ''}`}
                        onClick={() => setActiveTab(element.id)}
                    >
                        {element.name}
                    </span>
                ))}
            </div>
            <div className="mt-4 mx-[-10px]">
                <Slider {...settings}>
                  {bestSellers?.map((element, index) => (
                    <Product key={index} productData={element}/>
                  ))}
                </Slider>
            </div>
        </div>
    )
}

export default BestSeller;