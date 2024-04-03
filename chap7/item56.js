/**
 * 자바스크립트 클래스에서
 * 비공개 private를 사용하는 경우
 */
{
    var Foo = /** @class */ (function () {
        function Foo() {
            this._private = "secret123";
        }
        return Foo;
    }());
    var f = new Foo();
    f._private; // 'secret123'
}
/**
 * 타입스크립트에서
 * 접근 제어자를 사용하는 경우
 */
{
    var Diary = /** @class */ (function () {
        function Diary() {
            this.secret = "cheated on my English test";
        }
        return Diary;
    }());
    var diary = new Diary();
    diary.secret;
}
