import Banner from "../../components/Banner";
import Sidebar from "../../components/Sidebar";
import BestSeller from "../../components/BestSeller";
import DealDaily from "../../components/DealDaily";
import FeaturedProducts from "../../components/FeaturedProducts";
import NewArrvals from "../../components/NewArrvals";
import HotCollection from "../../components/HotCollection";
import BlogPosts from "../../components/BlogPosts";
import { memo } from "react";

const Home = () => {

    return (
        <div className="">
            <div className="w-main flex">
                <div className="flex flex-col gap-5 w-[20%] flex-auto">
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className="flex flex-col gap-5 pl-5 w-[80%] flex-auto">
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className="my-8">
                <FeaturedProducts />
            </div>
            <div className="my-8">
                <NewArrvals />
            </div>
            <div className="my-8">
                <HotCollection />
            </div>
            <div className="my-8">
                <BlogPosts />
            </div>
        </div>
    )
}

export default memo(Home);