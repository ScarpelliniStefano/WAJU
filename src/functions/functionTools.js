export function timeString(textToDateTime){
    var date = new Date();
    var stringDateHours = ('0' + date.getHours()).slice(-2);
    var stringDateMinutes = ('0' + date.getMinutes()).slice(-2);
    var stringDateSeconds = ('0' + date.getSeconds()).slice(-2);
    var stringDateMilliseconds = ('00' + date.getMilliseconds()).slice(-3);
    return '[' + stringDateHours + ':' + stringDateMinutes + ':' + stringDateSeconds + '.' + stringDateMilliseconds + '] ' + textToDateTime;
}