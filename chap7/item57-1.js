{
    function addCounter(el) {
        var clickCount = 0;
        var button = document.createElement("button");
        button.textContent = "Click me";
        button.addEventListener("click", function () {
            clickCount++;
            button.textContent = "Click me (" + clickCount + ")";
        });
        el.appendChild(button);
    }
    addCounter(document.body);
}
