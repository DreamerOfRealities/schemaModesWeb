// custom class to handle webStorage interaction with htmlElements
var aHtmlElement = /** @class */ (function () {
    function aHtmlElement(myId) {
        this.cont = "Schreibe hier über dich...";
        this.id = myId;
        this.elem = document.getElementById(this.id);
        if (!localStorage.getItem(this.id)) { //if no local data
            if (this.elem)
                this.elem.textContent = this.cont; //set to current content
            //DEB console.log("no local data found")
        }
        else {
            if (this.elem)
                this.elem.textContent = localStorage.getItem(this.id); //set to existing content
        }
        if (this.elem)
            this.elem.addEventListener("input", function () {
                localStorage.setItem(this.id, this.textContent);
                //DEB console.log("eventListener of " + this.id + " triggered with " + this.textContent)
            });
    }
    return aHtmlElement;
}());
function collectStorage() {
    var content = "--- #dynamic, local content for schemaModes.html\n";
    for (var key in localStorage) {
        if (key == "key")
            break; //ignore localStorage function keys (assumes they come last)
        content += key + ": >\n" + localStorage.getItem(key) + "\n";
    }
    return content;
}
function clearStorage() {
    localStorage.clear();
    location.reload();
}
// Initialize html elements
var titleMain = document.getElementById("titleMain");
var descMain = document.getElementById("descMain");
var downloadInput = document.getElementById("downloadInput");
var clearInput = document.getElementById("clearInput");
var textDevAdult = new aHtmlElement("textDevAdult");
var textHappyChild = new aHtmlElement("textHappyChild");
var textHurtChild = new aHtmlElement("textHurtChild");
var textAngryChild = new aHtmlElement("textAngryChild");
var textIntExp = new aHtmlElement("textIntExp");
var textFawn = new aHtmlElement("textFawn");
var textFlight = new aHtmlElement("textFlight");
var textFight = new aHtmlElement("textFight");
// Check for webStorage support
if (typeof (Storage) == undefined) {
    //if (!StorageManager.persist()){
    console.log("webStorage not supported");
    if (descMain)
        descMain.textContent += " " + "Leider unterstützt dein Web-Browser kein webStorage, das heißt dein eingegebener Text wird nicht gespeichert.";
    //throw new Error("Web storage unsupported")
}
// Populate button functionality
downloadInput.setAttribute("href", URL.createObjectURL(new Blob([collectStorage()], { type: 'text/plain' })));
clearInput.setAttribute("onclick", "localStorage.clear(); location.reload()");
//# sourceMappingURL=texteditorScript.js.map