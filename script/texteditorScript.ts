//import * as myContent from "../content/contentDe.json"
//NOconst myContent = require("../content/contentDe.json")
//import * as myContent from await "../content/contentDe.json"
//import myContent =  require("../content/contentDe.json")
//await import("../content/contentDe.json")
 
class aHtmlElement{
    id: string //must be equal to id of HTMLElement
    elem: HTMLElement
    cont: string = "Schreibe hier über dich..."

    constructor(myId:string){
        this.id = myId
        this.elem = document.getElementById(this.id)
        if(!localStorage.getItem(this.id)){ //if no local data
            if(this.elem) this.elem.textContent = this.cont //set to current content
            //DEB console.log("no local data found")
        } else {
            if(this.elem) this.elem.textContent = localStorage.getItem(this.id) //set to existing content
        }
        if(this.elem) this.elem.addEventListener("input", function(){ //store changes made by input
            localStorage.setItem(this.id, this.textContent)
            //DEB console.log("eventListener of " + this.id + " triggered with " + this.textContent)
        })
    }
}


//console.log(myContent)

// Find html elements
const titleMain = document.getElementById("title-main")
const descMain = document.getElementById("desc-main")
const daText = new aHtmlElement("da-text")
const ceText = new aHtmlElement("ce-text")

// Populate "static" content
//if(descMain) descMain.textContent = myContent.descMain

// Check for webStorage support
if (typeof(Storage)==undefined){
//if (!StorageManager.persist()){
    console.log("webStorage not supported")
    if(descMain) descMain.textContent += " " + "Leider unterstützt dein Web-Browser kein webStorage, das heißt dein eingegebener Text wird nicht gespeichert."
    //throw new Error("Web storage unsupported")
}

    