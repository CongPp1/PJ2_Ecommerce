import icons from "./icons";

export const format = (string) => {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');
}

export const formatPrice = (price) => {
    return Number(price?.toFixed(1)).toLocaleString();
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
    for (let arr of formatPayload) {
        switch (arr[0]) {
            case 'email':
                const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (!arr[1].match(validRegex)) {
                    invalidCount++;
                    setInvalidFields((prev) => [
                        ...prev,
                        { name: arr[0], message: 'Email is not valid' }
                    ]);
                }
                break;
            case 'password':
                if (arr[1].length < 6) {
                    invalidCount++;
                    setInvalidFields((prev) => [
                        ...prev,
                        { name: arr[0], message: 'The minimum password length required is 6 characters.' }
                    ]);
                }
                break;
            default:
                break;
        }
    }
    return invalidCount;
}

export const formatMoney = (price) => {
    return Math.round(price / 1000) * 1000;
}

export const generateRange = (start, end) => {
    const length = end + 1 - start; // 10 = 10 + 1 - 1
    return Array.from({ length }, (_, index) => start + index);
};

export function getBase64(file) {
    if (!(file instanceof Blob)) {
        return Promise.reject(new Error('Đầu vào không phải là đối tượng Blob hợp lệ'));
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
            // Khi thành công, resolve với dữ liệu base64
            resolve(reader.result);
        };
        
        reader.onerror = (error) => {
            // Khi xảy ra lỗi, reject với thông báo lỗi
            reject(error);
        };
        
        // Đọc dữ liệu thành dạng base64
        reader.readAsDataURL(file);
    });
}


