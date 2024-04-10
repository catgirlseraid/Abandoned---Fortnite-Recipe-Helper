let input = undefined
document.getElementById("generateitem").addEventListener("click", generateitems)
document.getElementById("generateitemrecipes").addEventListener("click", generateitemrecipes)

document.getElementById("name").addEventListener("blur", fillotherfieldsname)

// setting up defaults for buildables
document.getElementById("attributes-rarity").value = "buildable"
document.getElementById("attributes-max-stack").value = "1"
document.getElementById("workbench").value = "buildable"
document.getElementById("amount").value = "1"

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
    let item1 = document.getElementById("items-1").value || undefined
    let item2 = document.getElementById("items-2").value || undefined
    let item3 = document.getElementById("items-3").value || undefined
    let item4 = document.getElementById("items-4").value || undefined

    let item1amount = parseInt(document.getElementById("items-1-amount").value)
    let item2amount = parseInt(document.getElementById("items-2-amount").value)
    let item3amount = parseInt(document.getElementById("items-3-amount").value)
    let item4amount = parseInt(document.getElementById("items-4-amount").value)

    let amount = document.getElementById("amount").value
    let output = document.getElementById("output").value
    

    let itemstooutput = 
    {
        "workbench": workbench === ""? undefined : workbench,
        "items": {
            [item1]: item1 && item1amount,
            [item2]: item2 && item2amount,
            [item3]: item3 && item3amount,
            [item4]: item4 && item4amount
        },
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