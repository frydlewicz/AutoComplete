var Stopwatch = (function () {
    function Stopwatch() {
    }
    Stopwatch.prototype.start = function () {
        this.time = Date.now();
    };
    Stopwatch.prototype.end = function () {
        return Date.now() - this.time;
    };
    return Stopwatch;
}());
