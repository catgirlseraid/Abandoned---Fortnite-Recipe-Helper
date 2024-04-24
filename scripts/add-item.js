"use strict"
let input = undefined
document.getElementById("generateitem").addEventListener("click", generateitems)
document.getElementById("generateitemrecipes").addEventListener("click", generateitemrecipes)

document.getElementById("name").addEventListener("blur", fillotherfieldsname)

document.getElementById("add-additional-items").addEventListener("click", additeminputfield)
document.getElementById("remove-additional-items").addEventListener("click", removeiteminputfield)

// setting up defaults for buildables
document.getElementById("attributes-rarity").value = "buildable"
document.getElementById("attributes-max-stack").value = "1"
document.getElementById("workbench").value = "buildable"
document.getElementById("amount").value = "1"


/** @type {HTMLElement[]} */
let listofadditionalitemelements = []

function generateitems() {
    let name = document.getElementById("name").value
    let id = document.getElementById("id").value
    let description = document.getElementById("description").value
    let flavourtext = document.getElementById("flavour-text").value

    let attributesrarity = document.getElementById("attributes-rarity").value
    let attributesmaxstack = document.getElementById("attributes-max-stack").value
    let attributesdimensions = document.getElementById("attributes-dimensions").value

    let itemstooutput = 
    {
        "name": name === ""? undefined : name,
        "id": id === ""? undefined : id,
        "description": description === ""? undefined : description,
        "flavour-text": flavourtext === ""? undefined : flavourtext,
        "attributes": {
            "rarity": attributesrarity === ""? undefined : attributesrarity,
            "max-stack": attributesmaxstack === ""? undefined : attributesmaxstack,
            "dimensions": attributesdimensions === ""? undefined : attributesdimensions
        }
    }

    let outputdisplay = document.getElementById("item-input-display-output")
    let settingitem = document.createElement("pre")
    settingitem.innerText = `${JSON.stringify(itemstooutput, null, 2)},`
    outputdisplay.append(settingitem)
}

function generateitemrecipes() {
    let workbench = document.getElementById("workbench").value

    let items = {}
    listofadditionalitemelements.forEach(element => {

        let item = element.querySelector("input:first-child")

        let itemamount = element.querySelector("input:last-child")
        if ((itemamount.value) && (item.value)) {
            if (parseInt(itemamount.value)) {
                items[item.value] = parseInt(itemamount.value)
            } else {
                items[item.value] = 0
            }
            
        }
    });

    let amount = document.getElementById("amount").value
    let output = document.getElementById("output").value
    

    let itemstooutput = 
    {
        "workbench": workbench === ""? undefined : workbench,
        items,
        "amount": amount === ""? undefined : amount,
        "output": output === ""? undefined : output,
    }

    let outputdisplay = document.getElementById("item-input-display-output-recipe")
    let settingitem = document.createElement("pre")
    settingitem.innerText = `${JSON.stringify(itemstooutput, null, 2)},`
    outputdisplay.append(settingitem)
}

function fillotherfieldsname() {
    let name = document.getElementById("name").value

    id = name.split(" ").join("-").toLowerCase();

    document.getElementById("id").value = id
    document.getElementById("output").value = id
}

additeminputfield()
function additeminputfield() {
    let placetobeadded = document.getElementById("placetobeadded")

    let settingitem = document.createElement("div")
    settingitem.classList.add("display-side-by-side")
    settingitem.innerHTML = `
    <input type="text" placeholder="Item ${placetobeadded.children.length}">
    <input type="text" placeholder="Amount">
    `

    listofadditionalitemelements.push(settingitem)
    
    placetobeadded.append(settingitem)
}

function removeiteminputfield() {
    if (listofadditionalitemelements.length > 1) {
        listofadditionalitemelements.pop().remove()
    }
}