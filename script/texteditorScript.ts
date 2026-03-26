
// custom class to handle webStorage interaction with htmlElements
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

function collectStorage(): string {
    let content: string = "--- #dynamic, local content for schemaModes.html\n"
    for (let key in localStorage){
        if (key=="key") break; //ignore localStorage function keys (assumes they come last)
        content += key + ": >\n" + localStorage.getItem(key) + "\n"
    }
    return content
}

// Initialize html elements
const titleMain = document.getElementById("titleMain")
const descMain = document.getElementById("descMain")
const linkDownload = document.getElementById("linkDownload")

const textDevAdult = new aHtmlElement("textDevAdult")
const textHappyChild = new aHtmlElement("textHappyChild")
const textHurtChild = new aHtmlElement("textHurtChild")
const textAngryChild = new aHtmlElement("textAngryChild")
const textIntExp = new aHtmlElement("textIntExp")
const textFawn = new aHtmlElement("textFawn")
const textFlight = new aHtmlElement("textFlight")
const textFight = new aHtmlElement("textFight")


// Check for webStorage support
if (typeof(Storage)==undefined){
//if (!StorageManager.persist()){
    console.log("webStorage not supported")
    if(descMain) descMain.textContent += " " + "Leider unterstützt dein Web-Browser kein webStorage, das heißt dein eingegebener Text wird nicht gespeichert."
    //throw new Error("Web storage unsupported")
}

// Populate download functionality
linkDownload.setAttribute("href", URL.createObjectURL(new Blob([collectStorage()], { type: 'text/plain' })))