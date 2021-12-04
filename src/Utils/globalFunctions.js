import moment from 'moment';

export const multiplyPercent = (num) => {
    return (num * 100).toString().substr(0, 5) + '%'
}

export const roundNumber = (num) => {
    if ([NaN, 'none'].includes(num)) {
        return 0;
    } else {
        return Math.round(num * 100) / 100;
    }
}

export const roundNumberNew = (num, scale) => {
    if (!("" + num).includes("e")) {
        return +(Math.round(num + "e+" + scale) + "e-" + scale);
    } else {
        var arr = ("" + num).split("e");
        var sig = ""
        if (+arr[1] + scale > 0) {
            sig = "+";
        }
        return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
}

export const headerYearFormatChange = (year, currentFormat, requireFormat) => {
    return year ? moment(year, currentFormat).format(requireFormat) : null;
}
