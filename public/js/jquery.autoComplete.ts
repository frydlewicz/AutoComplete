declare const jQuery: any;

(($: any): void => {
    if (typeof $ === 'undefined') {
        throw new Error('No jQuery library found!');
    }

    const prefix: string = 'autoComplete';
    const className: string = `${prefix}__list`;
    const classNameItem: string = `${prefix}__list-item`;
    const classNameActiveItem: string = `${prefix}__list-item--active`;
    let counter: number = 0;

    $.fn.autoComplete = function (search: any): void {
        if (typeof this.val !== 'function') {
            throw new Error('Invalid component used!');
        }
        ++counter;

        const self = this;
        const idName: string = `${prefix}-${counter}__list`;
        const $body = $('body');
        const $list = $(`<div class="${className}" id="${idName}"></div>`);
        let current: number = null;

        const showList = (): void => {
            const position = this.position();

            $list.css('left', position.left);
            $list.css('top', position.top + this.outerHeight() + 1);
            $list.show();
        };

        const hideList = (): void => {
            $list.hide();
            current = null;
        };

        const isListHidden = (): boolean => $list.css('display') === 'none';
        const clearList = (): void => $list.empty();
        const getText = (): string => this.val().trim();

        const completeList = (list: any): void => {
            clearList();

            for (const elem of list) {
                const { display_text, output_text } = elem;
                const boldText: string = getBoldText(display_text, getText());
                const $elem = $(`<div class="${classNameItem}" data-output="${output_text}">${boldText}</div>`);

                $list.append($elem);
            }
            showList();
        };

        const getBoldText = (text: string, sub: string): string => {
            const pos: number = text.toLowerCase().indexOf(sub.toLowerCase());
            const len: number = sub.length;

            if (pos === -1) {
                return text;
            }

            return text.substr(0, pos)
                + '<b>'
                + text.substr(pos, len)
                + '</b>'
                + text.substr(pos + len);
        };

        const changeText = (): void => {
            const text: string = getText();

            if (text === '') {
                return clearList();
            }
            search(text, completeList);
        };

        const onKeyUp = (event: any): void => {
            const key: string = event.key.toLowerCase();

            if (key === 'escape' || key === 'esc') {
                hideList();
            } else if (key === 'arrowup') {
                changeCurrent(-1);
            } else if (key === 'arrowdown') {
                changeCurrent(1);
            } else if (key === 'enter') {
                if (current !== null) {
                    self.val($list.find(`.${classNameItem}:eq(${current})`).data('output'));
                }
                hideList();
            } else {
                changeText();
            }
        };

        const onClick = function (): void {
            if ($(this).hasClass(classNameItem) && $(this).data('output')) {
                return self.val($(this).data('output'));
            }

            hideList();
        };

        const changeCurrent = (increment: number): void => {
            if (isListHidden()) {
                return;
            }

            const $items = $list.find(`.${classNameItem}`);
            const last: number = $items.length - 1;

            if (current === null && increment > 0) {
                current = 0;
            } else if (current === null && increment < 0) {
                current = last;
            } else {
                current += increment;
            }

            if (current > last) {
                current = 0;
            } else if (current < 0) {
                current = last;
            }

            $items.removeClass(classNameActiveItem);
            $list.find(`.${classNameItem}:eq(${current})`).addClass(classNameActiveItem);
        };

        this.on('keyup', onKeyUp);
        $(document).on('click', '*', onClick);

        $body.append($list);
    };
})(jQuery);
