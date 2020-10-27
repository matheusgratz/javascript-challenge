// from data.js
var tableData = data;

// Select the button Filter (#filter-btn)
var filterButton = d3.select("#filter-btn")

// Select the table (#ufo-table)
var ufoTable = d3.select("#ufo-table")
var ufoTableBody = ufoTable.select("tbody")

// Create event handlers 
filterButton.on("click", runFilter);
ufoTableBody.on("submit",runFilter);

// Complete the event handler function for the form
function runFilter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    //console.log(inputValue);

    // Filter Data
    var filteredData = tableData.filter(tableData => tableData.datetime === inputValue);
    //console.log(filteredData);

    // Pop-up if search is empty!
    if (filteredData.length === 0 ) {
        alert("Sorry, your search returned empty. Check your search input and try again!")
    };

    // remove any children from the list to
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

// {
//     datetime: "1/1/2010",
//     city: "fresno",
//     state: "ca",
//     country: "us",
//     shape: "light",
//     durationMinutes: "1 min",
//     comments: "Fresno cal. bright light hovers over head then vanished"
//   },