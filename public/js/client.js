(function ($) {
    var socket = io('/');
    var stopwatch = new Stopwatch();
    var search = function (text, callback) {
        var useSocket = $('#useSocket').prop('checked');
        var useCache = $('#useCache').prop('checked');
        var completeRecords = function (data) {
            var time = stopwatch.end();
            $('#responseTime').text(time + " ms");
            if (data && data.records) {
                callback(data.records);
            }
        };
        stopwatch.start();
        if (useSocket) {
            return socket.emit('getRecord', { text: text, useCache: useCache }, completeRecords);
        }
        $.ajax({
            url: "getRecord/" + text,
            dataType: 'json',
        }).done(completeRecords);
    };
    $(document).ready(function () {
        $('#autoComplete').autoComplete(search);
    });
})(jQuery);
