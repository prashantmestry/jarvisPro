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


export const getJSDate = (value, splitter = "-") => {
    var dateParts = (value || "").split(splitter);
    return new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
    );
}
export const textFilterParam = {
    filters: [
        {
            filter: 'agTextColumnFilter',
            filterParams: {
                defaultOption: 'startsWith',
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            filter: 'agSetColumnFilter',
        },
    ],
}
export const numberFilterParam = {
    filters: [
        {
            filter: 'agNumberColumnFilter',
            filterParams: {
                defaultOption: 'greaterThan',
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
    ],
}
export const dateFilterParams = {
    filters: [
        {
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: function (filterDate, cellValue) {
                    if (cellValue == null) return -1;
                    return getJSDate(cellValue, '-')?.getTime() - filterDate.getTime();
                },
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            filter: 'agSetColumnFilter',
            filterParams: {
                comparator: function (a, b) {
                    return getJSDate(a, '-').getTime() - getJSDate(b, '-').getTime();
                },
            },
        },
    ],
};