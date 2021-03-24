module.exports = function stringToInt(data){
    Object.keys(data).forEach((each) => {
        if(!isNaN(data[each])) {
            data[each] = parseFloat(data[each]);
        }
    });
    return data;
};