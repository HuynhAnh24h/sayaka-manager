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

export const speakNumber = (dataNumber) => {
    if (dataNumber === 0) return "không";

    const ones = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const teens = ["mười", "mười một", "mười hai", "mười ba", "mười bốn", "mười lăm", "mười sáu", "mười bảy", "mười tám", "mười chín"];
    const tens = ["", "", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];
    const thousands = ["", "nghìn", "triệu"];

    function convertChunk(dataNumber) {
        let result = "";
        if (dataNumber >= 100) {
            result += ones[Math.floor(dataNumber / 100)] + " trăm";
            dataNumber %= 100;
            if (dataNumber > 0) result += " ";
        }
        if (dataNumber >= 20) {
            result += tens[Math.floor(dataNumber / 10)];
            dataNumber %= 10;
            if (dataNumber > 0) result += " ";
        } else if (dataNumber >= 10) {
            result += teens[dataNumber - 10];
            dataNumber = 0;
        }
        if (dataNumber > 0) {
            result += ones[dataNumber];
        }
        return result;
    }

    let parts = [];
    let unitIndex = 0;

    while (dataNumber> 0) {
        let chunk = dataNumber% 1000;
        if (chunk > 0) {
            let chunkStr = convertChunk(chunk) + (thousands[unitIndex] ? " " + thousands[unitIndex] : "");
            parts.unshift(chunkStr);
        }
        dataNumber= Math.floor(dataNumber/ 1000);
        unitIndex++;
    }

    return parts.join(" ").trim();
}