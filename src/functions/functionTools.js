export function timeString(textToDateTime) {
    var date = new Date();
    var stringDateHours = ('0' + date.getHours()).slice(-2);
    var stringDateMinutes = ('0' + date.getMinutes()).slice(-2);
    var stringDateSeconds = ('0' + date.getSeconds()).slice(-2);
    var stringDateMilliseconds = ('00' + date.getMilliseconds()).slice(-3);
    return '[' + stringDateHours + ':' + stringDateMinutes + ':' + stringDateSeconds + '.' + stringDateMilliseconds + '] ' + textToDateTime;
}


export function delArrayViaIndex(array, index) {
    let founded = false;
    let arrCopy = [];
    for (let i = 0; i < array.length && !founded; i++) {
        if (array[i].index == index) {
            for (let j = i + 1; j < array.length; j++) {
                arrCopy.push(array[j]);
                array.pop();
            }
            array.pop();
            for (let j = 0; j < arrCopy.length; j++) {
                array.push(arrCopy[j]);
            }
            founded = true;
        }
    }
    return array;
}

export function delDoubleArrayViaIndex(arrayObject, arrayString, index) {
    let founded = false;
    let arrCopy = [];
    let arrCopyS = [];
    for (let i = 0; i < arrayObject.length && !founded; i++) {
        if (arrayObject[i].index == index) {
            for (let j = i + 1; j < arrayObject.length; j++) {
                arrCopy.push(arrayObject[j]);
                arrCopyS.push(arrayString[j]);
                arrayObject.pop();
                arrayString.pop();
            }
            arrayObject.pop();
            arrayString.pop();
            for (let j = 0; j < arrCopy.length; j++) {
                arrayObject.push(arrCopy[j]);
                arrayString.push(arrCopyS[j]);
            }
            founded = true;
        }
    }
    return arrayObject, arrayString;
}