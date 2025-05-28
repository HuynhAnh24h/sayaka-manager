export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(',', ' -');
}

export const formatNumber = (number) => {
    return number.toLocaleString('vi-VN');
}

export const removeWord = (str, word) => {
    return str.replace(new RegExp(`\\b${word}\\b`, 'g'), '').replace(/\s+/g, ' ').trim();
};

export const formatRestaurantName = (originalString) => {
    return removeWord(originalString, "Sayaka");
};