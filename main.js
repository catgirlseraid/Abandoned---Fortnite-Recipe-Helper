let prideActivated = false

 //importing jsons
let display = document.getElementById("display") 
let items = []
fetch("/data/items.json").then((response) => response.json()).then((json) => items = json)


let workbenches = []
let buildables = []
let blueprints = []
fetch("/data/workbenches.json").then((response) => response.json()).then((json) => workbenches = json)
fetch("/data/buildables.json").then((response) => response.json()).then((json) => buildables = json)
fetch("/data/blueprints.json").then((response) => response.json()).then((json) => blueprints = json)


let itemrecipes = []
let buildablerecipes = []
fetch("/data/itemrecipes.json").then((response) => response.json()).then((json) => itemrecipes = json)
fetch("/data/buildablerecipes.json").then((response) => response.json()).then((json) => buildablerecipes = json)


//TODO this json is invalid so is removed for now
// let mobs = []
// fetch("/data/mobs.json").then((response) => response.json()).then((json) => mobs = json)


let sandboxitems = []
let sandboxbuilds = []
let sandboxrecipes = []
fetch("/data/sandboxitems.json").then((response) => response.json()).then((json) => sandboxitems = json)
fetch("/data/sandboxbuilds.json").then((response) => response.json()).then((json) => sandboxbuilds = json)
fetch("/data/sandboxrecipes.json").then((response) => response.json()).then((json) => sandboxrecipes = json)


//not used yet
// let obtaining = []
// fetch("/data/obtaining.json").then((response) => response.json()).then((json) => obtaining = json)


// let villages = []
// fetch("/data/villages.json").then((response) => response.json()).then((json) => villages = json)


let egg = []
fetch("/data/egg.json").then((response) => response.json()).then((json) => egg = json)

let searched = undefined
document.getElementById("searchbar").addEventListener("change", search)


function search() {
    searched = document.getElementById("searchbar").value
    console.log("searched")
    //TODO add search filters later
    let allobjects = []
    let allobjectsrecipes = []
    
    if (prideActivated) {
        allobjects = [].concat(items, workbenches, buildables, blueprints, sandboxitems, sandboxbuilds, egg)
    } else {
        allobjects = [].concat(items, workbenches, buildables, blueprints, sandboxitems, sandboxbuilds)
    }
    allobjectsrecipes = [].concat(sandboxrecipes, buildablerecipes, itemrecipes)
    
    filtereddata = allobjects.filter((item) => item.name.toLowerCase().includes(searched.toLowerCase()))

    if (filtereddata.length === 0) {
        console.log("no items found")
        //TODO create a reporting page and change the link
        display.innerHTML = `    <div class="message-container">
        <h2 class="message-container-title">No Items Found</h2>
        <div class="message-container-border"></div>
        <p>No items found for "${searched}".</p>
        <p>If you think this is incorrect please <a href="other-pages/item-add.html">send a report.</a></p>
        </div>`

        return
    }


    

    display = document.getElementById("display")

    console.log(filtereddata)
    display.innerHTML = ""

    for (let item of filtereddata) {
        let displayperitem = document.createElement("div")
        displayperitem.classList.add("display-per-item")
        displayperitem.classList.add(`${item.attributes["rarity"]}-rarity-border`)
        display.append(displayperitem)
        

        let displayperitemheader = document.createElement("div")
        displayperitemheader.classList.add("display-per-item-header")
        displayperitem.append(displayperitemheader)

        let displayperitemheader2 = document.createElement("div")
        displayperitemheader.append(displayperitemheader2)

        let displayperitemheaderimg = document.createElement("img")
        displayperitemheaderimg.setAttribute("src", `/fortnite-images/${item.id}.png`)
        displayperitemheader.append(displayperitemheaderimg)

        let diplayperitemtitleflavourtext = document.createElement("div")
        diplayperitemtitleflavourtext.classList.add("display-per-item-title-flavour-text")
        displayperitemheader.append(diplayperitemtitleflavourtext)

        let displayperitemtitle = document.createElement("h2")
        displayperitemtitle.classList.add("display-per-item-title")
        displayperitemtitle.textContent = item.name
        diplayperitemtitleflavourtext.append(displayperitemtitle)
        

        let displayperitemflavourtext = document.createElement("p")
        displayperitemflavourtext.classList.add("display-per-item-flavour-text")
        if (item["flavour-text"] === undefined && item.attributes["dimensions"] !== undefined) {
            displayperitemflavourtext.textContent = item.attributes["dimensions"]
        } else {
            displayperitemflavourtext.textContent = item["flavour-text"]
        }
        diplayperitemtitleflavourtext.append(displayperitemflavourtext)


        
        let displayperitemstats = document.createElement("div")
        displayperitemstats.classList.add("display-per-item-stats")
        displayperitem.append(displayperitemstats)

        if (item.attributes["rarity"] !== undefined) {
            let displayperitemstats1 = document.createElement("p")
            let rarity = `${item.attributes["rarity"].toUpperCase()}`
            displayperitemstats1.innerHTML = `<strong>Rarity:</strong> <p class="display-per-item-stats-rarity-display ${item.attributes["rarity"]}-rarity-display">${rarity}</p>`
            displayperitemstats1.classList.add("display-per-item-rarity-whole-line")
            displayperitemstats.append(displayperitemstats1)
        }

        if (item.attributes["max-stack"] !== undefined && item.attributes["max-stack"] !== 1) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Stack Size:</strong> ${item.attributes["max-stack"]}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["equipment-type"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Equipment Type:</strong> <img src="fortnite-images/${item.attributes["equipment-type"]}-icon.png"> ${capitalize(item.attributes["equipment-type"])}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["health-restored"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Health Restored:</strong> <img src="fortnite-images/health-restored-icon.png"> +${item.attributes["health-restored"]}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["hunger-restored"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Hunger Restored:</strong> <img src="fortnite-images/hunger-restored-icon.png"> +${item.attributes["hunger-restored"]}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["health"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Health Gained:</strong> <img src="fortnite-images/health-icon.png"> ${item.attributes["health"]}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["defense"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Defense Gained:</strong> <img src="fortnite-images/defense-icon.png"> ${item.attributes["defense"]}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["damage"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Weapon Damage:</strong> <img src="fortnite-images/damage-icon.png"> ${item.attributes["damage"]}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["heat-resistance"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Heat Resistance:</strong> <img src="fortnite-images/heat-resistance-icon.png"> ${item.attributes["heat-resistance"]}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["cold-resistance"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Cold Resistance:</strong> <img src="fortnite-images/cold-resistance-icon.png"> ${item.attributes["cold-resistance"]}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["bonus-health"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Bonus Health Gained:</strong> <img src="fortnite-images/bonus-health-icon.png"> +${item.attributes["bonus-health"]}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["stamina"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Stamina: </strong> <img src="fortnite-images/stamina-effect-level-icon-${(item.attributes["stamina"])[0]}.png"> ${(item.attributes["stamina"]).slice(1)}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.attributes["regeneration"] !== undefined) {
            let displayperitemstats2 = document.createElement("p")
            displayperitemstats2.innerHTML = `<strong>Regeneration:</strong> ${item.attributes["regeneration"]}`
            displayperitemstats.append(displayperitemstats2)
        }

        if (item.description !== undefined) {
            let displayperitemdescription = document.createElement("div")
            displayperitemdescription.classList.add("display-per-item-description")
            displayperitem.append(displayperitemdescription)
    
            let displayperitemdescriptiontitle = document.createElement("h3")
            displayperitemdescriptiontitle.textContent = "Description"
            displayperitemdescription.append(displayperitemdescriptiontitle)
    
            let displayperitemdescriptionparagraph = document.createElement("p")
            displayperitemdescriptionparagraph.textContent = item.description
            displayperitemdescription.append(displayperitemdescriptionparagraph)
        }


        if (item.easteregg !== undefined) {
            return
        }
        let recipesdropdown = document.createElement("details")
        recipesdropdown.setAttribute("id", "recipes-dropdown");
        //TODO remove this line later, it was added for debug
        recipesdropdown.open = true
        recipesdropdown.innerHTML = "<summary><strong>Recipes</strong></summary>"
        displayperitem.append(recipesdropdown)
        let hasbeenopenrecipes = false
        recipesdropdown.addEventListener("toggle", () => {
            if (recipesdropdown.open && !hasbeenopenrecipes) {
                hasbeenopenrecipes = true
                let receipesToDisplay = []

                receipesToDisplay = allobjectsrecipes.filter((recipe) => item.id === recipe.output)
                //TODO message if there are no recipes



                for (recipe of receipesToDisplay) {
                    let displayperitemrecipe = document.createElement("div")
                    displayperitemrecipe.classList.add("display-per-item-recipe")
                    recipesdropdown.append(displayperitemrecipe)

                    let displayperitemrecipeheader = document.createElement("div")
                    displayperitemrecipeheader.classList.add("display-per-item-recipe-header")
                    displayperitemrecipe.append(displayperitemrecipeheader)

                    let displayperitemrecipeheaderimg = document.createElement("img")
                    displayperitemrecipeheaderimg.setAttribute("src", `/fortnite-images/${recipe.workbench}.png`)
                    displayperitemrecipeheader.append(displayperitemrecipeheaderimg)

                    let displayperitemrecipeheadertitle = document.createElement("h3")
                    displayperitemrecipeheadertitle.innerText = capitalize(recipe.workbench)
                    displayperitemrecipeheadertitle.classList.add("display-per-item-recipe-header-bench-used")
                    displayperitemrecipeheader.append(displayperitemrecipeheadertitle)

                    let displayperitemrecipeproducedamount = document.createElement("p")
                    displayperitemrecipeproducedamount.classList.add("display-per-item-recipe-produced-amount")
                    displayperitemrecipeproducedamount.innerHTML = `<strong>x${recipe.amount}</strong>`
                    displayperitemrecipeheader.append(displayperitemrecipeproducedamount)

                    let displayperitemrecipeallitems = document.createElement("div")
                    displayperitemrecipeallitems.classList.add("display-per-item-recipe-all-items")
                    recipesdropdown.append(displayperitemrecipeallitems)

                   
                    for (const [recipeitem, amount] of Object.entries(recipe.items)) {

                        let displayperitemsingleline = document.createElement("div")
                        displayperitemsingleline.classList.add("display-per-item-single-line")
                        displayperitemrecipeallitems.append(displayperitemsingleline)

                        //TODO turn this into a link to the item later
                        let displayperitemitem = document.createElement("p")
                        displayperitemitem.innerText = capitalize(recipeitem)
                        displayperitemsingleline.append(displayperitemitem)

                        let displayperitemamount = document.createElement("p")
                        displayperitemamount.innerHTML = `<strong>x${amount}</strong>`
                        displayperitemsingleline.append(displayperitemamount)

                    }
                    
                }
            }
        })

        let displayperitemobtainedin = document.createElement("details")
        displayperitemobtainedin.setAttribute("id", "obtained-in-dropdown");
        displayperitemobtainedin.innerHTML = "<summary><strong>Obtained In</strong></summary>"
        displayperitem.append(displayperitemobtainedin)

        let displayperitemusedin = document.createElement("details")
        displayperitemusedin.setAttribute("id", "used-in-dropdown");
        displayperitemusedin.innerHTML = "<summary><strong>Used In</strong></summary>"
        displayperitem.append(displayperitemusedin)

        let displayperitemtodolistoptions = document.createElement("div")
        displayperitemtodolistoptions.classList.add("display-per-item-todo-list-options")
        displayperitem.append(displayperitemtodolistoptions)

        let displayperitemtodolistoptionsbutton1 = document.createElement("button")
        displayperitemtodolistoptionsbutton1.innerHTML = "<strong>Add to TODO list.</strong>"
        displayperitemtodolistoptionsbutton1.classList.add("display-per-item-todo-add-button")
        displayperitemtodolistoptions.append(displayperitemtodolistoptionsbutton1)

        let displayperitemtodolistoptionsinput = document.createElement("input")
        displayperitemtodolistoptionsinput.setAttribute("placeholder", "Amount To Add")
        displayperitemtodolistoptionsinput.setAttribute("min", "0")
        displayperitemtodolistoptionsinput.setAttribute("maxlength", "7")
        displayperitemtodolistoptions.append(displayperitemtodolistoptionsinput)

        let displayperitemtodolistinpuptbuttons = document.createElement("div")
        displayperitemtodolistinpuptbuttons.classList.add("display-per-item-todo-list-buttons")
        displayperitemtodolistoptions.append(displayperitemtodolistinpuptbuttons)

        let displayperitemtodolistbuttonup = document.createElement("button")
        displayperitemtodolistbuttonup.classList.add("display-per-item-todo-list-button-up")
        displayperitemtodolistbuttonup.textContent = "+"
        displayperitemtodolistinpuptbuttons.append(displayperitemtodolistbuttonup)

        let displayperitemtodolistbuttondown = document.createElement("button")
        displayperitemtodolistbuttondown.classList.add("display-per-item-todo-list-button-down")
        displayperitemtodolistbuttondown.textContent = "-"
        displayperitemtodolistinpuptbuttons.append(displayperitemtodolistbuttondown)
    }
}



