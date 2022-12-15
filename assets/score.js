
let tableEl = document.querySelector("#table");
let clearEl = document.querySelector("#clear");

function renderTable() {
    
    removeAllChildNodes(tableEl);
    
    let row1 = document.createElement("tr");
    let tableHeader1 = document.createElement("th");
    let tableHeader2 = document.createElement("th");
    
    tableHeader1.textContent ="Initials";
    tableHeader2.textContent= "Score";
    
    tableHeader1.setAttribute("class", "p-2 border table-light border-primary");
    tableHeader2.setAttribute("class", "p-2 border table-success border-primary");
    
    tableEl.appendChild(row1);
    tableEl.appendChild(tableHeader1);
    tableEl.appendChild(tableHeader2);
    
    if(localStorage.getItem("userData") !== null){
        let userData= JSON.parse(localStorage.userData);
        
        for (let i = 0; i < userData.length; i++){
            let initial = userData[i].initials;
            let score = userData[i].score;
            let tableRow = document.createElement("tr");
            let tableDataInitials = document.createElement("td");
            let tableDataScore = document.createElement("td");
            tableDataInitials.textContent = initial;
            tableDataInitials.setAttribute("class", "p-2 border table-warning text-center text-uppercase");
            tableDataScore.textContent = score;
            tableDataScore.setAttribute("class", "p-2 border table-success text-center text-uppercase");
            tableRow.appendChild(tableDataInitials);
            tableRow.appendChild(tableDataScore);
            tableEl.appendChild(tableRow);
        };
    };
};

function settings() {
    const easy = 5;
    const moderate = 10;
    const hard = 15;
    let timer = 75;
    timer = document.querySelector("#timerLength").value;
    difficulty = document.querySelector("#difficulty").value;
    if (difficulty === "easy"){
        difficulty = easy;
    } else if (difficulty === "moderate"){
        difficulty = moderate;
    } else if (difficulty === "hard"){
        difficulty = hard;
    } else {
        console.log("Error user did not select a valid difficulty.");
    };
   localStorage.setItem("timer", timer); 
   localStorage.setItem("difficulty", difficulty);
};
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};
clearEl.addEventListener("click", function() {
    localStorage.removeItem("userData");
    renderTable();
})
renderTable();