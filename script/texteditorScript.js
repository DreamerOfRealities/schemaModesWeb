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
    aHtmlElement.prototype.updateHtml = function () {
        if (this.elem)
            this.elem.textContent = this.cont;
        localStorage.setItem(this.id, this.cont);
    };
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
function populateStorage() {
    var myDict = [];
    var file = loadInput.files[0];
    file.text() //resolves as a promise
        .then(function (value) {
        localStorage.clear();
        //Populate dict
        var content = value.split(": >\n"); //assumes this specific separator to be used
        for (var n = 0; n < content.length - 1; n++) {
            myDict.push({
                key: content[n].split("\n").slice(-1)[0],
                value: content[n + 1].split("\n").slice(0, -2).join("\n")
            });
        }
        //Populate html
        for (var _i = 0, myDict_1 = myDict; _i < myDict_1.length; _i++) {
            var item = myDict_1[_i];
            for (var _a = 0, dynText_1 = dynText; _a < dynText_1.length; _a++) {
                var element = dynText_1[_a];
                if (item.key === element.id) {
                    element.cont = item.value;
                    element.updateHtml();
                }
            }
        }
        location.reload();
    })
        .catch(function (error) {
        console.log(error);
    });
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
var titleMain = document.getElementById("titleMain");
var descMain = document.getElementById("descMain");
var downloadInput = document.getElementById("downloadInput");
var clearInput = document.getElementById("clearInput");
var loadInput = document.getElementById("loadInput");
//const textDevAdult = new aHtmlElement("textDevAdult")
// const textHappyChild = new aHtmlElement("textHappyChild")
// const textHurtChild = new aHtmlElement("textHurtChild")
// const textAngryChild = new aHtmlElement("textAngryChild")
// const textIntExp = new aHtmlElement("textIntExp")
// const textFawn = new aHtmlElement("textFawn")
// const textFlight = new aHtmlElement("textFlight")
// const textFight = new aHtmlElement("textFight")
var dynText = [];
dynText.push(new aHtmlElement("textDevAdult"));
dynText.push(new aHtmlElement("textHappyChild"));
dynText.push(new aHtmlElement("textHurtChild"));
dynText.push(new aHtmlElement("textAngryChild"));
dynText.push(new aHtmlElement("textIntExp"));
dynText.push(new aHtmlElement("textFawn"));
dynText.push(new aHtmlElement("textFlight"));
dynText.push(new aHtmlElement("textFight"));
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
loadInput.setAttribute("onchange", "populateStorage()");
//# sourceMappingURL=texteditorScript.js.map