(function ($) {
    if (typeof $ === 'undefined') {
        throw new Error('No jQuery library found!');
    }
    var prefix = 'autoComplete';
    var className = prefix + "__list";
    var classNameItem = prefix + "__list-item";
    var classNameActiveItem = prefix + "__list-item--active";
    var counter = 0;
    $.fn.autoComplete = function (search) {
        var _this = this;
        if (typeof this.val !== 'function') {
            throw new Error('Invalid component used!');
        }
        ++counter;
        var self = this;
        var idName = prefix + "-" + counter + "__list";
        var $body = $('body');
        var $list = $("<div class=\"" + className + "\" id=\"" + idName + "\"></div>");
        var current = null;
        var showList = function () {
            var position = _this.position();
            $list.css('left', position.left);
            $list.css('top', position.top + _this.outerHeight() + 1);
            $list.show();
        };
        var hideList = function () {
            $list.hide();
            current = null;
        };
        var isListHidden = function () { return $list.css('display') === 'none'; };
        var clearList = function () { return $list.empty(); };
        var getText = function () { return _this.val().trim(); };
        var completeList = function (list) {
            clearList();
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var elem = list_1[_i];
                var display_text = elem.display_text, output_text = elem.output_text;
                var boldText = getBoldText(display_text, getText());
                var $elem = $("<div class=\"" + classNameItem + "\" data-output=\"" + output_text + "\">" + boldText + "</div>");
                $list.append($elem);
            }
            showList();
        };
        var getBoldText = function (text, sub) {
            var pos = text.toLowerCase().indexOf(sub.toLowerCase());
            var len = sub.length;
            if (pos === -1) {
                return text;
            }
            return text.substr(0, pos)
                + '<b>'
                + text.substr(pos, len)
                + '</b>'
                + text.substr(pos + len);
        };
        var changeText = function () {
            var text = getText();
            if (text === '') {
                return clearList();
            }
            search(text, completeList);
        };
        var onKeyUp = function (event) {
            var key = event.key.toLowerCase();
            if (key === 'escape' || key === 'esc') {
                hideList();
            }
            else if (key === 'arrowup') {
                changeCurrent(-1);
            }
            else if (key === 'arrowdown') {
                changeCurrent(1);
            }
            else if (key === 'enter') {
                if (current !== null) {
                    self.val($list.find("." + classNameItem + ":eq(" + current + ")").data('output'));
                }
                hideList();
            }
            else {
                changeText();
            }
        };
        var onClick = function () {
            if ($(this).hasClass(classNameItem) && $(this).data('output')) {
                return self.val($(this).data('output'));
            }
            hideList();
        };
        var changeCurrent = function (increment) {
            if (isListHidden()) {
                return;
            }
            var $items = $list.find("." + classNameItem);
            var last = $items.length - 1;
            if (current === null && increment > 0) {
                current = 0;
            }
            else if (current === null && increment < 0) {
                current = last;
            }
            else {
                current += increment;
            }
            if (current > last) {
                current = 0;
            }
            else if (current < 0) {
                current = last;
            }
            $items.removeClass(classNameActiveItem);
            $list.find("." + classNameItem + ":eq(" + current + ")").addClass(classNameActiveItem);
        };
        this.on('keyup', onKeyUp);
        $(document).on('click', '*', onClick);
        $body.append($list);
    };
})(jQuery);
