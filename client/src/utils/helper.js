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
        starArr.push(<AiFillStar color="orange" />);
    }
    for (let i = 5; i > +stars; i--) {
        starArr.push(<AiOutlineStar color="orange" />);
    }
    return starArr;
};

export const validate = (payload, setInvalidFields) => {
    let invalidCount = 0;
    const formatPayload = Object.entries(payload);
    
    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            invalidCount++;
            setInvalidFields((prev) => [
                ...prev,
                { name: arr[0], message: 'Required field' }
            ]);
        }
    }
    // for (let arr of formatPayload) {
    //     switch (arr[0]) {
    //         case 'email':
    //             const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //             if (!arr[1].match(validRegex)) {
    //                 invalidCount++;
    //                 setInvalidFields((prev) => [
    //                     ...prev,
    //                     { name: arr[0], message: 'Email is not valid' }
    //                 ]);
    //             }
    //             break;
    //         case 'password':
    //             if(!arr[1].length < 6) {
    //                 invalidCount++;
    //                 setInvalidFields((prev) => [
    //                     ...prev,
    //                     { name: arr[0], message: 'The minimum password length required is 6 characters.' }
    //                 ]);
    //             }
    //         default:
    //             break;
    //     }
    // }
    return invalidCount;
}