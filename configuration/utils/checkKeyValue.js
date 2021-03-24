const checkKeyValue = (object, key, value) => {
    const len = object.length;
    var bool = false;
    for(var i = 0; i < len; i++) {
        if(Object.is(object[i][key], value)) {
            bool = true;
        }
    }
    return bool;
}

module.exports = {checkKeyValue}