//Firebase Connections
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leadstrackerapp-b27a9-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

//Application Functional Area
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist){
        const snapshotValues = snapshot.val()
        // const leads = []

        const leads = Object.values(snapshotValues)

        //Alternate way to achieve the result
        // for (let key in snapshotValues) {
        //     leads.push(snapshotValues[key])
        // }

        render(leads)
    }


})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})
