export const format = (string) => {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").split(' ').join('-');
}

export const formatPrice = (price) => {
    return Number(price.toFixed(1)).toLocaleString();
}