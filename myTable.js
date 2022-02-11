'use strict';

// TO DO refactoring, mvc, more than 1 table



// check if table exists in localStorage

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('localData') ) {
        let localData = JSON.parse(localStorage.getItem('localData') );

    clearMain();
    parseTable(localData);
    };
});


// parse table from localStorage

function parseTable(array) {
    let main = document.getElementById('mytables');

    let divH2 = document.createElement("div");
    divH2.classList.add("add-to-home");

    let span1 = document.createElement("span");
    span1.id = "placeholder";
    span1.innerHTML = "A2HS";
    let span2 = document.createElement("span");
    span2.id = "install";
    span2.innerHTML = "A2HS";

    let h2Title = document.createElement("h2");
    h2Title.innerHTML = "My Tables";

    divH2.appendChild(span1);
    divH2.appendChild(h2Title);
    divH2.appendChild(span2);
    main.appendChild(divH2);

    let h3Title = document.createElement("h3");
    h3Title.innerHTML = array[0].nameTable;
    main.appendChild(h3Title);

    createButtons();
    let saveButton = document.getElementById('save-button');
    saveButton.style.display = "none";
    let editButton = document.getElementById('edit-button');
    editButton.style.display = "block";

    let myTable = document.createElement("table");
    myTable.id = "my-table";

    let tBody = document.createElement("tbody");
    let tHead = document.createElement("thead");
    let tBRow = document.createElement("tr");
    let tD = document.createElement("td");
    
    let tHRow = document.createElement("tr");

    for (var i=0; i<6; i++) {
        let tH = document.createElement("th");
        if (i == 0) {
            tH.innerHTML = "Rank";
        } else if (i == 1) {
            tH.innerHTML = "Nation";
        } else if (i == 2) {
            tH.innerHTML = "Athlete";
        } else if (i == 3) {
            tH.innerHTML = "Lane";
            tH.classList.add("lane");
        } else if (i == 4) {
            tH.innerHTML = "Result";
        } else if (i == 5) {
            tH.innerHTML = "Notes";
        }
        tHRow.appendChild(tH);
        tBRow.appendChild(tD);
    };
    tHead.appendChild(tHRow)
    myTable.appendChild(tHead);

    for (i=0; i<array.length-1; i++) {
        let tBRow = document.createElement("tr");

        for (let j=0; j<6; j++) {
            let tD = document.createElement("td");

            // array[i+1] because the name of the table is in the array

            if (j == 0) {
                tD.classList.add("position");
                tD.innerText = array[i+1].position;
            } else if (j == 1) {
                tD.classList.add("nation");
                tD.innerText = array[i+1].nation;
            } else if (j == 2) {
                tD.classList.add("a-name");
                tD.innerText = array[i+1].athlete;
            } else if (j == 3) {
                tD.classList.add("lane");
                tD.innerText = array[i+1].lane;
            } else if (j == 4) {
                tD.classList.add("time");
                tD.innerText = array[i+1].result;
            } else if (j == 5) {
                tD.classList.add("note");
                tD.innerText = array[i+1].note;
            }
            
            tBRow.appendChild(tD);
        }
        tBody.appendChild(tBRow);
    };

    myTable.appendChild(tBody);
    main.appendChild(myTable);
};



// first sumbit 

window.addEventListener('submit', function(e) {
    e.preventDefault();

    let eventName = $("#eventname").val();
    let eventDistance = $("#eventdistance").val();
    let evendCont = $("#contnumber").val();
        
    /*
    let eventName = document.getElementById('eventname');
    let eventDistance = document.getElementById('eventdisctance');
    let evendCont = document.getElementById('contnumber');
    console.log(eventName);
    console.log(eventDistance);
    console.log(evendCont);
    */

    clearMain();
    createFirstTable(eventName, eventDistance, evendCont);
});



//prepare the main for the creation of the table

function clearMain() {
    let elem = document.getElementById('mytables');
    while (elem.firstChild) {
        elem.removeChild(elem.lastChild);
    };
};



// edit and save buttons

function createButtons() {
    let main = document.getElementById('mytables');

    let divButtons = document.createElement("div");
    divButtons.classList.add("tablediv");

    let editButton = document.createElement("button");
    editButton.setAttribute('id', 'edit-button');
    editButton.setAttribute('class', 'button-28');
    editButton.setAttribute('type', 'button');
    editButton.innerHTML = "Edit";
    editButton.style.display = "none";

    let saveButton = document.createElement("button");
    saveButton.setAttribute('id', 'save-button');
    saveButton.setAttribute('class', 'button-28');
    saveButton.setAttribute('type', 'button');
    saveButton.innerHTML = "Save";

    let searchField = document.createElement("input");
    searchField.setAttribute('id', 'search-field');
    searchField.setAttribute('type', 'search');
    searchField.setAttribute('placeholder', 'Search...');

    divButtons.appendChild(searchField);
    divButtons.appendChild(editButton);
    divButtons.appendChild(saveButton);

    main.append(divButtons);
    
}



// creation of the first table

function createFirstTable(name, dist, contNumber) {
    let main = document.getElementById('mytables');
    
    let divH2 = document.createElement("div");
    divH2.classList.add("add-to-home");

    let span1 = document.createElement("span");
    span1.id = "placeholder";
    span1.innerHTML = "A2HS";
    let span2 = document.createElement("span");
    span2.id = "install";
    span2.innerHTML = "A2HS";

    let h2Title = document.createElement("h2");
    h2Title.innerHTML = "My Tables";

    divH2.appendChild(span1);
    divH2.appendChild(h2Title);
    divH2.appendChild(span2);
    main.appendChild(divH2);

    let h3Title = document.createElement("h3");
    h3Title.innerHTML = name + " " + dist;
    main.appendChild(h3Title);

    createButtons() 

    let myTable = document.createElement("table");
    myTable.id = "my-table"
    myTable.classList.add("uomTrack");

    let tBody = document.createElement("tbody")
    let tHead = document.createElement("thead");
    let tBRow = document.createElement("tr");
    let tD = document.createElement("td");
    
    let tHRow = document.createElement("tr");

    for (var i=0; i<6; i++) {
        let tH = document.createElement("th");
        if (i == 0) {
            tH.innerHTML = "Rank";
        } else if (i == 1) {
            tH.innerHTML = "Nation";
        } else if (i == 2) {
            tH.innerHTML = "Athlete";
        } else if (i == 3) {
            tH.innerHTML = "Lane";
            tH.classList.add("lane");
        } else if (i == 4) {
            tH.innerHTML = "Result";
        } else if (i == 5) {
            tH.innerHTML = "Notes";
        }
        tHRow.appendChild(tH);
        tBRow.appendChild(tD);
    };
    tHead.appendChild(tHRow)
    myTable.appendChild(tHead);

    for (i=0; i<Number(contNumber); i++) {
        let tBRow = document.createElement("tr");

        for (let j=0; j<6; j++) {
            let tD = document.createElement("td");

            if (j == 0) {
                tD.classList.add("position");
            } else if (j == 1) {
                tD.classList.add("nation");
            } else if (j == 2) {
                tD.classList.add("a-name");
            } else if (j == 3) {
                tD.classList.add("lane");
            } else if (j == 4) {
                tD.classList.add("time");
            } else if (j == 5) {
                tD.classList.add("note");
            }
            
            tD.innerHTML = ""
            tBRow.appendChild(tD);
        }
        tBody.appendChild(tBRow);
    };

    myTable.appendChild(tBody);
    main.appendChild(myTable);

    editable();
    tFoot();
    tButtons();
    minMaxAvg();
};



//save button (edit button is in uomTrack.js)

window.addEventListener('click', function(e) {
    if (e.target.id != 'save-button') return;
    
    localStorage.clear();

    let editBut = document.getElementById('edit-button');
    editBut.style.display = "block";

    let saveBut = document.getElementById('save-button');
    saveBut.style.display = "none";

    let searchField = document.getElementById('search-field');
    searchField.style.display = "inline-block";

    let arr = new Array();
    let tableName = document.querySelector('h3').innerText;
    arr.push({nameTable: tableName});
    
    let uomTable = document.querySelector(".uomTrack");
    
    for (let i=1; i<uomTable.rows.length-1; i++) {
        arr.push({
            position: uomTable.rows[i].cells[0].firstChild.value,
            nation: uomTable.rows[i].cells[1].firstChild.value,
            athlete: uomTable.rows[i].cells[2].firstChild.value,
            lane: uomTable.rows[i].cells[3].firstChild.value,
            result: uomTable.rows[i].cells[4].firstChild.value,
            note: uomTable.rows[i].cells[5].firstChild.value,
        });

        localStorage.setItem("localData", JSON.stringify(arr));
    };

    unEditable();
});

function unEditable() {
    const uomTrack = document.querySelector(".uomTrack");
    let rows = uomTrack.rows;

    if (uomTrack.childElementCount == 3) {
        uomTrack.removeChild(uomTrack.lastChild);
    };

    for (let i=1; i<(rows.length); i++) {
        if (rows[i].cells.length == 7) {
            rows[i].removeChild(rows[i].cells[6]);
        }
        for (let j=0; j<(rows[i].cells.length); j++){ 
            let x = rows[i].cells[j].firstChild.value;
            rows[i].cells[j].innerHTML = x;
        };
    };

    uomTrack.classList.remove("uomTrack");
};



// Altering .nation input to uppercase

window.addEventListener('keyup', function(e) {
    if (!e.target.parentNode.classList.contains("nation")) return;

    e.target.value = e.target.value.toUpperCase();
})



//filtering when searching

document.addEventListener("input", function(e) {
    if (e.target.id != "search-field") return;

    myFunction();
})

const myFunction = () => {
    const trs = document.querySelectorAll('#my-table tbody > tr')
    const filter = document.querySelector('#search-field').value
    const regex = new RegExp(filter, 'i')
    const isFoundInTds = td => regex.test(td.innerHTML)
    const isFound = childrenArr => childrenArr.some(isFoundInTds)
    
    const setTrStyleDisplay = ({ style, children }) => {
      style.display = isFound([
        ...children // <-- All columns
      ]) ? '' : 'none' ;
    }
    
    trs.forEach(setTrStyleDisplay)
}


