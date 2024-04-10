const words = "pride"
let currentWordIndex = 0

window.addEventListener("keydown", (event) => {
    if (event.key === words[currentWordIndex]) {
        currentWordIndex++
        if (currentWordIndex === words.length) {
            prideActivated = true
            currentWordIndex = 0
        }
    } else if (event.key === words[0]) {
        currentWordIndex = 1
    } else {
        currentWordIndex = 0
    }
} ,false)


function capitalize(text) {
    text = text.replaceAll("-", " ")
    return text.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")
}


let showgravytime = false
const gravy = "gravy"
let currentWordIndex1 = 0

window.addEventListener("keydown", (event) => {
    if (event.key === gravy[currentWordIndex1]) {
        currentWordIndex1++
        if (currentWordIndex1 === words.length) {
            showgravytime = true

            currentWordIndex1 = 0
        }
    } else if (event.key === gravy[0]) {
        currentWordIndex1 = 1
    } else {
        currentWordIndex1 = 0
    }
} ,false)


gravyLandTime()
setInterval(gravyLandTime, 1000)
function gravyLandTime() {

    if (showgravytime) {
        const currentTime = new Date();
        let gravytime = currentTime.toLocaleString('en-GB', { timeZone: 'America/St_Johns' });
        document.getElementById("gravytime").innerHTML = `Gravy Time: ${gravytime}`
    }

}


let signedbyktrain = false
const ktrain = "ktrain"
let currentWordIndex2 = 0

window.addEventListener("keydown", (event) => {
    if (event.key === ktrain[currentWordIndex2]) {
        currentWordIndex2++
        if (currentWordIndex2 === words.length) {
            signedbyktrain = true

            currentWordIndex2 = 0
        }
    } else if (event.key === ktrain[0]) {
        currentWordIndex2 = 1
    } else {
        currentWordIndex2 = 0
    }
    if (signedbyktrain) {
        fetch("/assets/signature.json").then((response) => response.json())
        .then((json) => document.getElementById("signedbyktrain").innerHTML = (json["signature"]).slice(38))
    }
} ,false)