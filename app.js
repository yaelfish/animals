window.onload = function() {

    // Get a reference to the table body and UI elements
    const tbodyEl = document.getElementById('tbody');
    const nameColTitleEl = document.getElementById('nameTitle');
    const btnClearFilterEl = document.querySelectorAll('.clearFilters');
    const dropdown = document.getElementById("dropdown");
    const inputMaximalAge = document.forms[0].querySelector("input[name='maximalAge']");
    const inputMinimalAge = document.forms[0].querySelector("input[name='minimalAge']");
    const btnMaximalAge = document.getElementById('maximalBtn');
    const btnMinimalAge = document.getElementById('minimalBtn');
    const btnRangeAge = document.getElementById('ageRangeBtn');

    // Create array of types
    function getAllTypes(){
        let types = []; 
        for (let i = 0; i < originalData.length; i++) {
            if (types.includes(originalData[i].type)){
                types = types;
            } else {
                types.push(originalData[i].type)
            }
        }
        return types;
    }

    let types = getAllTypes();

    // Create dropdown options
    function createDropdownOptions(types){
        types.map(type => {
            let optionEl = document.createElement("option");
            optionEl.text = type;
            optionEl.value = type;
            dropdown.options.add(optionEl);
        });
    }

    createDropdownOptions(types);
    
    // Event Listeners

    // Listen to name column header click
    nameColTitleEl.addEventListener('click', () => filterDataByName(originalData));

    // Listen to dropdown filter click
    dropdown.addEventListener('mouseup', function(e){
        // Determine wich option was picked
        let optionText = dropdown.options[dropdown.selectedIndex].text;
        filterDataByType(optionText);
    });

    // Listen to Maximal age btn
    btnMaximalAge.addEventListener('click', function (e) {
        filterDataByMaximalAge(this.previousElementSibling.value);
        e.preventDefault();
    });

    // Listen to Maximal age btn
    btnMinimalAge.addEventListener('click', function (e) {
        filterDataByMinimalAge(this.previousElementSibling.value);
        e.preventDefault();
    });

    // Listen to range age btn
    btnRangeAge.addEventListener('click', function (e) {
        filterDataByRangeAge(inputMinimalAge.value, inputMaximalAge.value);
        e.preventDefault();
    });

    // Listen to type button click
    btnClearFilterEl[0].addEventListener('click', clearAllFilters);

    // Updating table by adding a new row
    function addRow(number, name, age, type) {

        // Insert a row at the end of the tbody
        let newRow = tbodyEl.insertRow(-1);

        // Insert an ID number cell in the row at index 0
        let newCellIDNum = newRow.insertCell(0);

        // Append a text node to the cell
        let newTextIDNum = document.createTextNode(number);
        newCellIDNum.appendChild(newTextIDNum);

        // Insert a Name cell in the row at index 1
        let newCellName = newRow.insertCell(1);

        // Append a text node to the cell
        let newTextName = document.createTextNode(name);
        newCellName.appendChild(newTextName);

        // Insert an Age cell in the row at index 2
        let newCellAge = newRow.insertCell(2);

        // Append a text node to the cell
        let newTextAge = document.createTextNode(age);
        newCellAge.appendChild(newTextAge);

        // Insert a type cell in the row at index 3
        let newCellType = newRow.insertCell(3);

        // Append a text node to the cell
        let newTextType = document.createTextNode(type);
        newCellType.appendChild(newTextType);

        // Create delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.textContent = 'X';   

        // Insert button to last row cell
        newCellType.insertBefore(deleteBtn, newCellType.nextSibling);

         // Event Listener for delete button
        deleteBtn.addEventListener('click', deleteRow);

    }

    function displayArray(originalData){
        for (let i = 0; i < originalData.length; i++) {
            addRow(i + 1, originalData[i].name, originalData[i].age, originalData[i].type);
        }
    }

    displayArray(originalData);

    // Deleting a row
    function deleteRow(e){
        
        // Delete from DB
        for (let i = 0; i < originalData.length; i++) {
            if (originalData[i].name === this.parentElement.previousElementSibling.previousElementSibling.innerText){
                originalData.splice(i, 1);
            }   
        }
        // Delete row from UI table
        this.parentElement.parentElement.remove();
    
        e.preventDefault();
    }

    // Deleting entire UI table
    function emptyUITable() {
        return tbodyEl.textContent = '';
    }

    // Filter by name
    function filterDataByName(array) {
        
        emptyUITable();
        
        // Sort array by name
        let sortedArray = array.sort(function (a, b) {
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });
        return displayArray(sortedArray);
    }

    // Filter by type
    function filterDataByType(type) {
        emptyUITable();
        let result = originalData.filter(animal => animal.type === type);
        displayArray(result);
    }

    // Filter by age
   
    // Minimal age
    function filterDataByMinimalAge(age) {
        emptyUITable();
        let minFilterResult = originalData.filter(animal => animal.age >= age);
        displayArray(minFilterResult);
    }
    // Maximal age
    function filterDataByMaximalAge(age) {
        emptyUITable();
        let maxFilterResult = originalData.filter(animal => animal.age <= age);
        displayArray(maxFilterResult);
    }
    // filter by range of age
    function filterDataByRangeAge(minAge, maxAge) {
        emptyUITable();
        let result = originalData.filter(animal => animal.age >= minAge && animal.age <= maxAge);
        displayArray(result);
    }

    // Clear Filters
    function clearAllFilters(){
        emptyUITable();
        displayArray(originalData);
    }
};

// Practice AJAX 

document.getElementById('button1').addEventListener('click',loadJson);

function loadJson(e) {
    e.preventDefault();
    
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'animals.json', true);

    xhr.onload = function() {
        if (this.status === 200){
            console.log(this.responseText);
        }
    }

    xhr.send();
}
