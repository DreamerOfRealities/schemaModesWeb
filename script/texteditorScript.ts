
// custom class to handle webStorage interaction with htmlElements
class aHtmlElement{
    id: string //must be equal to id of HTMLElement
    elem: HTMLElement
    cont: string = "Schreibe hier über dich..."

    updateHtml(): void{
        if(this.elem) this.elem.textContent = this.cont
        localStorage.setItem(this.id, this.cont)
    }

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

interface dict {
    key: string
    value: string
}

function collectStorage(): string {
    let content: string = "--- #dynamic, local content for schemaModes.html\n"
    for (let key in localStorage){
        if (key=="key") break; //ignore localStorage function keys (assumes they come last)
        content += key + ": >\n" + localStorage.getItem(key) + "\n"
    }
    return content
}

function populateStorage(): void {
    const myDict: dict[] = []
    const file = loadInput.files[0]

    file.text() //resolves as a promise
        .then((value) => {
            localStorage.clear()
            
            //Populate dict
            const content = value.split(": >\n") //assumes this specific separator to be used
            for (let n = 0; n<content.length-1; n++){
                myDict.push({
                    key: content[n].split("\n").slice(-1)[0], 
                    value: content[n+1].split("\n").slice(0,-2).join("\n")
                })
            }

            //Populate html
            for (let item of myDict){
                for (let element of dynText){
                    if (item.key === element.id) {
                        element.cont = item.value
                        element.updateHtml()    
                    }
                }
            }
            location.reload()
        })
        .catch((error) => {
            console.log(error)
        })

    // Populate html
    // console.log("hello")
    // for (let item of myDict){
    //     console.log(item.key)
    //     for (let element of dynText){
    //         console.log(item.key + " VS " + element.id)
    //         if (item.key == element.id) element.cont = item.value; console.log("match found")
    //     }
    // }
    // location.reload()
}

// Initialize html elements
const titleMain = document.getElementById("titleMain")
const descMain = document.getElementById("descMain")
const downloadInput = document.getElementById("downloadInput")
const clearInput = document.getElementById("clearInput")
const loadInput = <HTMLInputElement> document.getElementById("loadInput")

//const textDevAdult = new aHtmlElement("textDevAdult")
// const textHappyChild = new aHtmlElement("textHappyChild")
// const textHurtChild = new aHtmlElement("textHurtChild")
// const textAngryChild = new aHtmlElement("textAngryChild")
// const textIntExp = new aHtmlElement("textIntExp")
// const textFawn = new aHtmlElement("textFawn")
// const textFlight = new aHtmlElement("textFlight")
// const textFight = new aHtmlElement("textFight")

const dynText: aHtmlElement[] = []
dynText.push(new aHtmlElement("textDevAdult"))
dynText.push(new aHtmlElement("textHappyChild"))
dynText.push(new aHtmlElement("textHurtChild"))
dynText.push(new aHtmlElement("textAngryChild"))
dynText.push(new aHtmlElement("textIntExp"))
dynText.push(new aHtmlElement("textFawn"))
dynText.push(new aHtmlElement("textFlight"))
dynText.push(new aHtmlElement("textFight"))


// Check for webStorage support
if (typeof(Storage)==undefined){
//if (!StorageManager.persist()){
    console.log("webStorage not supported")
    if(descMain) descMain.textContent += " " + "Leider unterstützt dein Web-Browser kein webStorage, das heißt dein eingegebener Text wird nicht gespeichert."
    //throw new Error("Web storage unsupported")
}

// Populate button functionality
downloadInput.setAttribute("href", URL.createObjectURL(new Blob([collectStorage()], { type: 'text/plain' })))
clearInput.setAttribute("onclick", "localStorage.clear(); location.reload()")
loadInput.setAttribute("onchange", "populateStorage()")