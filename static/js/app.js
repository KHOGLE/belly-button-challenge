const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


function init() {
    d3.json(URL).then(function(data){
       let subjectIds = data.names;
       let dropDown = d3.select("#selDataset");

       for (let id of subjectIds){
        dropDown.append("option").attr('value', id).text(id);
       }

       optionChanged(subjectIds[0]);
    });
}

function optionChanged(subjectId){
    console.log(subjectId);
    d3.json(URL).then(function(data){
        demoBox(subjectId, data);
        barGraph(subjectId, data);
        bubbleGraph(subjectId, data);
    });
}

function demoBox(subjectId, data){
    let metaData = data.metadata;
    let filteredMeta = metaData.filter(meta => meta.id == subjectId);
    let obj = filteredMeta[0];
 
    let PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    for (key in obj) {
        PANEL.append("h6").text(key.toUpperCase() + ":  " + obj[key]);
    }
}

function barGraph(subjectId, data){
    let sample = data.samples;
    let filteredData = sample.filter((sample) => sample.id === subjectId);
    let obj = filteredData[0];

    let otuData = [{x: obj.sample_values.slice(0,10).reverse(), y: obj.otu_ids.slice(0,10).reverse().map(i => "OTU " + i), 
        text: obj.otu_labels.slice(0,10).reverse(), type: "bar", orientation: "h", marker: {color:"yellowgreen"}}];
    let layout = {title: "Top 10 Operational Taxonomic Units (OTUs)", margin:{t:100, l:90}};

    Plotly.newPlot("bardiv", otuData, layout);
}

function bubbleGraph(subjectId, data){
    let sample = data.samples;
    let filteredData = sample.filter((sample) => sample.id === subjectId);
    let obj = filteredData[0];
    
    let bubbleData = [{x: obj.otu_ids, y: obj.sample_values, text: obj.otu_labels, mode: "markers", 
        marker: {color: obj.otu_ids, colorscale: 'Earth', opacity: 0.75, size: obj.sample_values}}]
    let layout = {title: "", xaxis: {title: "OTU ID"}, margin:{t:100,l:150}};
    
    Plotly.newPlot("bubblediv", bubbleData, layout);
}

init();