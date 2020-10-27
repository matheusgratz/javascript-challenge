// from data.js
var tableData = data;

// Select the button Filter (#filter-btn)
var filterButton = d3.select("#filter-btn")

// Select the table (#ufo-table)
var ufoTable = d3.select("#ufo-table")
var ufoTableBody = ufoTable.select("tbody")

// Select the dropdown value
var dropDown = d3.select("#dropDownMenu")

// Select the input element and get the raw HTML node
var inputElement = d3.select("#inputDataFilter");

// Create event handlers 
filterButton.on("click", runFilter);
ufoTableBody.on("change", runFilter);

dropDown.on("change", function(){

    var dropDownValue = parseInt(dropDown.property('value'));

    if (dropDownValue === 1) {
        inputElement.attr("placeholder", "1/11/2010");
    } else {
        if (dropDownValue === 2) {
            inputElement.attr("placeholder", "fresno");
        } else {
            if (dropDownValue === 3) {
                inputElement.attr("placeholder", "ca");
            } else {
                if (dropDownValue === 4) {
                    inputElement.attr("placeholder", "us");
                } else {
                    inputElement.attr("placeholder", "light");
                }
            }
        }
    }
    
});

// Complete the event handler function for the form
function runFilter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // Filter Data

    var dropDownValue = parseInt(dropDown.property('value'));

    if (dropDownValue === 1) {
        var filteredData = tableData.filter(tableData => tableData.datetime === inputValue);
    } else {
        if (dropDownValue === 2) {
            var filteredData = tableData.filter(tableData => tableData.city === inputValue.toLowerCase());
        } else {
            if (dropDownValue === 3) {
                var filteredData = tableData.filter(tableData => tableData.state === inputValue.toLowerCase());
            } else {
                if (dropDownValue === 4) {
                    var filteredData = tableData.filter(tableData => tableData.country === inputValue.toLowerCase());
                } else {
                    var filteredData = tableData.filter(tableData => tableData.shape === inputValue.toLowerCase());
                }
            }
        }
    }

    // Pop-up if search is empty!
    if (filteredData.length === 0 ) {
        alert("Sorry, your search returned empty. Check your search input and try again!")
    }

    // remove any children from the table
    ufoTableBody.html("");

    for (let event = 0; event < filteredData.length; event++) {
        
        ufoTableBody.append("tr")
        ufoTableBody.append("td").text(filteredData[event].datetime);
        ufoTableBody.append("td").text(filteredData[event].city);
        ufoTableBody.append("td").text(filteredData[event].state);
        ufoTableBody.append("td").text(filteredData[event].country);
        ufoTableBody.append("td").text(filteredData[event].shape);
        ufoTableBody.append("td").text(filteredData[event].durationMinutes);
        ufoTableBody.append("td").text(filteredData[event].comments);
                
    }
};