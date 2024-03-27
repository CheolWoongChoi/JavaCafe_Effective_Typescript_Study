"use strict";
exports.__esModule = true;
var jsdom_1 = require("jsdom");
var DOM_STRING = "\n  <!DOCTYPE html>\n  <html>\n    <body>\n      <input type=\"text\" />\n    </body>\n  </html>\n";
var _a = new jsdom_1.JSDOM(DOM_STRING).window, window = _a.window, document = _a.document, alert = _a.alert;
{
    /**
     * class 메서드에 this를 사용
     */
    var C = /** @class */ (function () {
        function C() {
            this.vals = [1, 2, 3];
        }
        C.prototype.logSquares = function () {
            for (var _i = 0, _a = this.vals; _i < _a.length; _i++) {
                var val = _a[_i];
                console.log(val * val);
            }
        };
        return C;
    }());
    var c = new C();
    // c.logSquares();
    /**
     * method에 c.logSquares를 할당
     */
    var method = c.logSquares;
    // method();
    /**
     * call을 이용해서 this를 바인딩
     */
    var c2 = new C();
    var method2 = c.logSquares;
    // method2.call(c2);
    /**
     * DOM 이벤트 핸들러에서 this는 이벤트가 발생한 엘리먼트를 가리킴
     */
    document.querySelector("input").addEventListener("change", function (e) {
        console.log(this);
    });
    /**
     * ResetButton에서 onClick을 호출하면, this 바인딩 문제로 "Reset이 정의되지 않았습니다" ?
     * 잘 되는데?
     */
    var makeButton_1 = function (config) {
        var $button = document.createElement("button");
        $button.textContent = config.text;
        $button.addEventListener("click", config.onClick);
        document.body.appendChild($button);
        return $button;
    };
    var ResetButton = /** @class */ (function () {
        function ResetButton() {
        }
        ResetButton.prototype.render = function () {
            return makeButton_1({ text: "Reset", onClick: this.onClick });
        };
        ResetButton.prototype.onClick = function () {
            console.log(this);
            console.log("Reset " + this);
        };
        return ResetButton;
    }());
    var resetButton = new ResetButton();
    resetButton.render();
    var btn = document.querySelector("button");
    btn === null || btn === void 0 ? void 0 : btn.click();
    // resetButton.onClick();
    console.dir(resetButton);
    /**
     * ResetButton의 onClick에 this를 바인딩
     */
    var ResetButton2 = /** @class */ (function () {
        function ResetButton2() {
            this.onClick = this.onClick.bind(this);
        }
        ResetButton2.prototype.render = function () {
            return makeButton_1({ text: "Reset", onClick: this.onClick });
        };
        ResetButton2.prototype.onClick = function () {
            console.log(this);
            console.log("Reset " + this);
        };
        return ResetButton2;
    }());
    var resetButton2 = new ResetButton2();
    console.dir(resetButton2);
    /**
     * onClick 함수를 화살표 함수로 변경
     */
    var ResetButton3 = /** @class */ (function () {
        function ResetButton3() {
            var _this = this;
            this.onClick = function () {
                console.log(_this);
                console.log("Reset " + _this);
            };
        }
        ResetButton3.prototype.render = function () {
            return makeButton_1({ text: "Reset", onClick: this.onClick });
        };
        return ResetButton3;
    }());
}
