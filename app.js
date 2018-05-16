// D3 Scatterplot Assignment
var svgWidth = 1200;
var svgHeight = 1200;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv", function (err, Data) {
  if (err) throw err;

  // Step 1: Parse Data/Cast as numbers
   // ==============================
  Data.forEach(function (data) {
    data.advanceddegree = +data.advanceddegree;
    data.excellenthealth = +data.excellenthealth;
  });

  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([6, d3.max(Data, d => d.advanceddegree)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(Data, d => d.excellenthealth)])
    .range([height, 0]);

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(Data)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.advanceddegree))
  .attr("cy", d => yLinearScale(d.excellenthealth))
  .attr("r", "15")
  .attr("fill", "lightblue")
  .attr("opacity", ".5")

  chartGroup.append("text")
    .selectAll("tspan")
    .data(Data)
    .enter()
    .append("tspan")
    .attr("x", (data, index) => xLinearScale(data.advanceddegree))
    .attr("y", (data, index) => yLinearScale(data.excellenthealth))
    .attr("class", "state-abbr")
    .text((data) => data.abbr)
  


// Create axes labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 40)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("Overall Excellent Health Data");

chartGroup.append("text")
.attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
.attr("class", "axisText")
.text("Percentage of population with advanced degrees");


});
