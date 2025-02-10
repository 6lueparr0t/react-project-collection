function addLines(c) {
    var total = 0;
    for (var _i = 0, _a = Object.keys(c); _i < _a.length; _i++) {
        var axis = _a[_i];
        var length_1 = c[axis];
        total += length_1;
    }
    return total;
}
var namedCube = {
    width: 6,
    height: 5,
    depth: 4,
    name: "SweetCube",
};
console.log(addLines(namedCube));
