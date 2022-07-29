// We need a MyLeadsVariable
let myLeads = [];
const divEl = document.getElementById("div-el");
const ulEl = document.getElementById("ul-el");
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const delEL = document.getElementById("delete-el");
const saveTab = document.getElementById("save-tab")
const deleteLast = document.getElementById("delete-last")
let listItems = "";

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  localStorage.setItem("myLeads", JSON.stringify(myLeads)); // reset the value for leads
  listItems = "";
  renderLeads(myLeads);
}

inputBtn.addEventListener("click", function () {
  if (inputEl.value != undefined && inputEl.value != "") {
    listItems = "";
    myLeads.push(inputEl.value);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
    inputEl.value = "";
  }
});


delEL.addEventListener("click", function(){
    localStorage.clear(); // First, we clear the local memory
    myLeads = [] // We reset our list
    listItems=""; // We reset the listitems
    renderLeads(myLeads)
})
deleteLast.addEventListener("click", function(){
    myLeads.pop(); listItems=""; // We reset the listitems
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})

saveTab.addEventListener("click", function(){
    // Grab the url of the current tab
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
        let activeTab = tabs[0].url
        myLeads.push(activeTab); listItems=""; // We reset the listitems
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

function renderLeads(leads) {
  for (let i = 0; i < leads.length; ++i) {
    // We use template strings
    listItems += `<li> 
                            <a href='${leads[i]}' target='_blank'>${leads[i]}</a> 
                      </li>`;
  }
  ulEl.innerHTML = listItems;
}
