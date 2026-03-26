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
//console.log(myContent)
// Initialize html elements with webStorage
var titleMain = document.getElementById("titleMain");
var descMain = document.getElementById("descMain");
var textDevAdult = new aHtmlElement("textDevAdult");
var textHappyChild = new aHtmlElement("textHappyChild");
var textHurtChild = new aHtmlElement("textHurtChild");
var textAngryChild = new aHtmlElement("textAngryChild");
var textIntExp = new aHtmlElement("textIntExp");
// Check for webStorage support
if (typeof (Storage) == undefined) {
    //if (!StorageManager.persist()){
    console.log("webStorage not supported");
    if (descMain)
        descMain.textContent += " " + "Leider unterstützt dein Web-Browser kein webStorage, das heißt dein eingegebener Text wird nicht gespeichert.";
    //throw new Error("Web storage unsupported")
}
//# sourceMappingURL=texteditorScript.js.map