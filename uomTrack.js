'use strict';

// TO DO 
// Code refactoring, better sorting algorithm (empty last), better validation checking 



document.addEventListener('click', function(e) {
    if (e.target.id != 'edit-button') return;

    const uomTrack = document.getElementById("my-table");
    uomTrack.classList.add("uomTrack");

    let searchField = document.getElementById('search-field');
    searchField.value = "";
    $("tr").show();
    searchField.style.display = "none";

    let saveBut = document.getElementById('save-button');
    saveBut.style.display = "block";

    let editBut = document.getElementById('edit-button');
    editBut.style.display = "none";


    editable();
    tFoot();
    tButtons();
    minMaxAvg();
});

// Change <td> to inputs that contain the initial values

function editable() {
    const uomTrack = document.querySelector(".uomTrack");
    let rowsLength;
    let rows = uomTrack.rows;
    var i, j, y, x, inputArea;

    if (uomTrack.childElementCount == 3) {
        rowsLength = uomTrack.rows.length-1;
    } else {
        rowsLength = uomTrack.rows.length;
    };

    for (i=1; i<(rowsLength); i++) {
        for (j=0; j<(rows[0].cells.length); j++){

            y = rows[i].cells[j].innerText;
            
            inputArea = document.createElement("INPUT");

            if (rows[i].cells[j].classList.contains('position')) {
                inputArea.setAttribute('type', 'number');
                inputArea.setAttribute("min", "1");
                inputArea.setAttribute("name", "rank");
                inputArea.value = y;

            } else if (rows[i].cells[j].classList.contains('lane')) {
                inputArea.setAttribute("type", "number");
                inputArea.setAttribute("min", "1");
                inputArea.setAttribute("max", "8");
                inputArea.setAttribute("name", "lane");
                inputArea.value = y;

            } else if (rows[i].cells[j].classList.contains('time')) {
                inputArea.setAttribute("type", "number");
                inputArea.setAttribute("min", "0");
                inputArea.setAttribute("name", "result");
                inputArea.setAttribute("step", "0.01");
                inputArea.value = y;

            } else if (rows[i].cells[j].classList.contains('a-name')) {
                inputArea.setAttribute("type", "text");
                inputArea.setAttribute("name", "athlete");
                inputArea.value = y;

            } else if (rows[i].cells[j].classList.contains('nation')) {
                inputArea.setAttribute("type", "text");
                inputArea.setAttribute("name", "nation");
                inputArea.setAttribute("maxlength","3");
                inputArea.value = y;

            } else if (rows[i].cells[j].classList.contains('note')) {
                inputArea.setAttribute("type", "text");
                inputArea.setAttribute("name", "note");
                x = rows[i].cells[j].innerText;
                inputArea.value = x;
            };

            while (rows[i].cells[j].lastChild) {
                rows[i].cells[j].removeChild(rows[i].cells[j].lastChild);
            };

            rows[i].cells[j].appendChild(inputArea);
        }
    }
};

// Validity check of input values

/* document.addEventListener('input', e => {
    let inputValue = e.target.name;
    let pattern;

    if (inputValue === "rank") {
        pattern =  /^[0-9]{0,2}$/;
    } else if (inputValue == "nation") {
        pattern =  /[A-Z]+$/;
    } else if (inputValue == "athlete") {
        pattern =  /[a-zA-Z\-]+\s[a-zA-Z\-]+$/;
    } else if (inputValue == "lane") {
        pattern =  /^[1-8]{0,1}$/;
    } else if (inputValue == "result") {
        pattern =   /^[0-9]{0,3}\.\d{0,2}$/;
    } else if (inputValue == "result") {
        pattern =   /^\d+\.\d{0,2}$/;
    }; 

    if (!pattern.test(e.target.value)) {
        e.target.value = "";
    }

}); */


// Create <tfoot>

function tFoot() {
    const uomTrack = document.querySelector(".uomTrack");
    let tfoot = document.createElement("tfoot");
    tfoot.id = "tablefoot";
    let footRow = document.createElement("tr");
    let rowData_1 = document.createElement("td");

    rowData_1.setAttribute("colspan", "2");
    rowData_1.id = "best-result";

    let rowData_2 = document.createElement("td");

    rowData_2.setAttribute("colspan", "2");
    rowData_2.id = "worst-result";

    let rowData_3 = document.createElement("td");

    rowData_3.setAttribute("colspan", "2");
    rowData_3.id = "average-time";

    footRow.appendChild(rowData_1);
    footRow.appendChild(rowData_2);
    footRow.appendChild(rowData_3);
    tfoot.appendChild(footRow);
    uomTrack.appendChild(tfoot);
};


// Min, max and avg of values that update after events

document.addEventListener('input', function(e) {
    if (e.target.parentNode.parentNode.parentNode.parentNode.id != "my-table") return;

    minMaxAvg();
});

function minMaxAvg() {
    const uomTrack = document.querySelector(".uomTrack");
    var i, x, bestTime, worstTime, averageTime;
    bestTime = worstTime = averageTime = "-";
    let rows = uomTrack.rows;
    let count = 0;
    var sumTime = 0;

    for (i = 1; i < (rows.length - 1); i++) {
        x = rows[i].cells[4].firstChild.value;

        if (x === undefined || x === ""){
            continue;
        };

        if (i === 1) {
            bestTime = Number(x);
            worstTime = Number(x);

        } else {
            if (Number(x) < bestTime || bestTime === undefined) {
                bestTime = Number(x);
            };

            if (Number(x) > worstTime || worstTime === undefined) {
                worstTime = Number(x);
            };
        };

        sumTime = sumTime + Number(x);
        count++;
    }
     
    averageTime = (sumTime / count).toFixed(2); 

    let bestResult = document.getElementById("best-result");
    let worstResult = document.getElementById("worst-result");
    let averageResult = document.getElementById("average-time");

    bestResult.innerHTML = "Best Result: " + bestTime;
    worstResult.innerHTML = "Worst Result: " + worstTime;
    averageResult.innerHTML = "Average Time: " + averageTime;

};


// Sorting algorithm on <th> click
    
document.addEventListener('click', function(e) {
    if (e.target.tagName != 'TH') return;
    if (!e.target.parentNode.parentNode.parentNode.classList.contains("uomTrack")) return;

    let th = e.target;

    sortTable(th.cellIndex);
});


function sortTable(n) {
    const uomTrack = document.querySelector(".uomTrack");
    var rows, i, x, y, count = 0;
    var switching = true;

    var direction = "ascending";

    // Highlight <th> using class 'sorted'

    if (document.querySelector(".sorted") !== null) {
        document.querySelector(".sorted").classList.remove("sorted");
    };

    uomTrack.rows[0].cells[n].classList.add("sorted");

    while (switching) {
        switching = false;
        var rows = uomTrack.rows;

        // Loop through rows
        // -2 because <tfoot> exists now

        for (i = 1; i < (rows.length - 2); i++) {
            var shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n].firstChild.value;
            y = rows[i + 1].getElementsByTagName("TD")[n].firstChild.value;

            if (rows[i].getElementsByTagName("TD")[n].firstChild.type === 'text'){

                if (direction == "ascending") {

                    if (x.toLowerCase() > y.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    };

                } else if (direction == "descending") {

                    if (x.toLowerCase() < y.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    };
                };

            } else if (rows[i].getElementsByTagName("TD")[n].firstChild.type === 'number'){

                if (direction == "ascending") {

                    if (Number(x) > Number(y))
                        {
                        shouldSwitch = true;
                        break;
                    };

                } else if (direction == "descending") {

                    if (Number(x) < Number(y))
                        {
                        shouldSwitch = true;
                        break;
                    };
                };
            };
        };

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            count++;

        } else {
            if (count == 0 && direction == "ascending") {
                direction = "descending";
                switching = true;
            };
        };
    };
};


//Create the copy/delete buttons in table

function tButtons (){
    const uomTrack = document.querySelector(".uomTrack");
    var i;
    var rows = uomTrack.rows;
    for (i=1; i < (rows.length - 1); i++) {
        var cpButton = document.createElement("button");

        cpButton.classList.add("copy-button");

        const attr1 = document.createAttribute("title");

        attr1.value = "Copy and paste row";
        cpButton.setAttributeNode(attr1);


        var delButton = document.createElement("button");

        delButton.classList.add("delete-button");

        const attr2 = document.createAttribute("title");

        attr2.value = "Delete row, except the last remaining";
        delButton.setAttributeNode(attr2);
        

        var btns = document.createElement("td");
        btns.classList.add("buttons")
        btns.appendChild(cpButton);
        btns.appendChild(delButton);
        rows[i].appendChild(btns);
    };
};

// Copy <button> in table

document.addEventListener('click', function(e) {
    if (e.target.classList.contains("copy-button") != true) return;

    let tb = e.target;

    copyRow(tb.parentNode.parentNode.rowIndex);
});

function copyRow(n) { 
    const uomTrack = document.querySelector(".uomTrack");
    const selectedRow = uomTrack.rows[n];
    const copiedRow = selectedRow.cloneNode(true);
    selectedRow.parentNode.insertBefore(copiedRow, uomTrack.rows[n]);
};

// Delete <button> in table

document.addEventListener('click', function(e) {
    if (e.target.classList.contains("delete-button") != true) return;

    let tb = e.target;

    deleteRow(tb.parentNode.parentNode.rowIndex);
});

function deleteRow(n) {
    const uomTrack = document.querySelector(".uomTrack");
    if (document.querySelectorAll('.delete-button').length !== 1) {
        const selectedRow = uomTrack.rows[n];
        selectedRow.parentNode.removeChild(selectedRow);
    };
}