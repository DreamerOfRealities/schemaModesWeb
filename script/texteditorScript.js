"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myContent = require("../content/contentDe.json");
//NOconst myContent = require("../content/contentDe.json")
//import * as myContent from await "../content/contentDe.json"
//import myContent =  require("../content/contentDe.json")
//await import("../content/contentDe.json")
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
console.log(myContent);
// Find html elements
var titleMain = document.getElementById("title-main");
var descMain = document.getElementById("desc-main");
var daText = new aHtmlElement("da-text");
var ceText = new aHtmlElement("ce-text");
// Populate "static" content
if (descMain)
    descMain.textContent = myContent.descMain;
// Check for webStorage support
if (typeof (Storage) == undefined) {
    //if (!StorageManager.persist()){
    console.log("webStorage not supported");
    if (descMain)
        descMain.textContent += " " + "Leider unterstützt dein Web-Browser kein webStorage, das heißt dein eingegebener Text wird nicht gespeichert.";
    //throw new Error("Web storage unsupported")
}
//# sourceMappingURL=texteditorScript.js.map