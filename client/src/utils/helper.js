import icons from "./icons";

export const format = (string) => {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');
}

export const formatPrice = (price) => {
    return Number(price.toFixed(1)).toLocaleString();
}

const { AiOutlineStar, AiFillStar } = icons;
export const renderStars = (stars) => {
    const starArr = [];
    if (!Number(stars)) {
        return;
    }
    for (let i = 0; i < +stars; i++) {
        starArr.push(<AiFillStar color="orange"/>);
    }
    for (let i = 5; i > +stars; i--) {
        starArr.push(<AiOutlineStar color="orange"/>);
    }
    return starArr;
};