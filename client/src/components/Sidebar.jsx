import { useEffect, useState } from "react";
import { apiGetCategories } from "../APIs/app";

const Sidebar = () => {
    const [categories, setCategories] = useState(null);

    const fetchCategories = async () => {
        const response = await apiGetCategories();
        // if (response.message === "Success") {
        //     setCategories(response.ProductCategories);
        // }
        console.log(response);
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    console.log(categories);
    return <div className="">Sidebar</div>;
};

export default Sidebar;
