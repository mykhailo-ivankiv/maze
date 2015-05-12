define(["exports"], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  exports.getRandomInt = getRandomInt;
  exports.getFirstUniqueInt = getFirstUniqueInt;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getFirstUniqueInt(arr) {
    var result = 0;
    while (arr.indexOf(result) >= 0) {
      result += 1;
    }
    return result;
  }
});
//# sourceMappingURL=../../js/utils/helper.js.map