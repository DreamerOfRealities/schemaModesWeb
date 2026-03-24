var aHtmlElement = /** @class */ (function () {
    function aHtmlElement(myId) {
        this.cont = "Schreibe hier über dich...";
        this.id = myId;
        this.elem = document.getElementById(this.id);
        if (!localStorage.getItem(this.id)) //if no local data
            if (this.elem)
                this.elem.textContent = this.cont; //set to current content
            else if (this.elem)
                this.elem.textContent = localStorage.getItem(this.id); //set to existing content
        if (this.elem)
            this.elem.addEventListener("input", function () {
                localStorage.setItem(this.id, this.textContent);
            });
    }
    return aHtmlElement;
}());
// Check for webStorage support
if (typeof (Storage) == undefined) {
    //if (!StorageManager.persist()){
    console.log("webStorage not supported");
    var descMain = document.getElementById("desc-main");
    if (descMain)
        descMain.textContent += " " + "Leider unterstützt dein Web-Browser kein webStorage, das heißt dein eingegebener Text wird nicht gespeichert.";
    //throw new Error("Web storage unsupported")
}
var daText = new aHtmlElement("da-text");
var ceText = new aHtmlElement("ce-text");
// const daText: HTMLElement = document.getElementById("da-text")
// if(!localStorage.getItem("da-text"))
//     if(daText) daText.textContent = "Füge hier deine Beschreibung ein..."
// else
//     if(daText) daText.textContent = localStorage.getItem("da-text")
// //if(daText) daText.onchange = localStorage.setItem( "da-text", daText.textContent)
// if(daText) daText.addEventListener("input", function(){localStorage.setItem("da-text", daText.textContent)})
//# sourceMappingURL=texteditorScript.js.map