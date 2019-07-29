declare const io: any;

(($: any): void => {
    const socket: any = io('/');
    const stopwatch: Stopwatch = new Stopwatch();

    const search = (text: string, callback: any): void => {
        const useSocket: boolean = $('#useSocket').prop('checked');
        const useCache: boolean = $('#useCache').prop('checked');

        const completeRecords = (data: any): void => {
            const time: number = stopwatch.end();

            $('#responseTime').text(`${time} ms`);

            if (data && data.records) {
                callback(data.records);
            }
        };

        stopwatch.start();

        if (useSocket) {
            return socket.emit('getRecord', { text, useCache }, completeRecords);
        }

        $.ajax({
            url: `getRecord/${text}?cache=${useCache ? 1 : 0}`,
            dataType: 'json',
        }).done(completeRecords);
    };

    $(document).ready((): void => {
        $('#autoComplete').autoComplete(search);
    });
})(jQuery);
