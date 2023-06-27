// Did not figure it out fully, this is where I left off
// Websites I was using https://github.com/Jua91/Plotly-Challenge/blob/master/static/js/bonus.js ,
// https://github.com/delacruzfranklyn93/Belly_Button_Biodiversity/blob/master/js/gauge.js.
// https://plotly.com/javascript/gauge-charts/ 
//https://stackoverflow.com/questions/67529286/how-to-add-a-needle-or-dial-to-gauge-indicator-in-plotly-js 
//https://plotly.com/javascript/reference/indicator/#indicator-legendwidth
// https://plotly.com/javascript/gauge-charts/

//ALSO FIGURE OUT HOW TO CHANGE DEMO BOX FROM THAT UGLY BLUE

function gaugeChart(subjectId, data) {
    let metaData = data.metadata;
    let filteredMeta = metaData.filter(meta => meta.id == subjectId);
    let obj = filteredMeta[0].wfreq;

    //Pointer Path and trig
    let level = parseFloat(obj) *20
    let degrees = 180 - level, radius = .5;
    let rad = degrees * Math.PI / 180;
    let x = radius * Math.cos(rad);
    let y = radius * Math.sin(rad);
    let path1 = (degrees <= 45 || degrees >= 135) ? 'M -0.025 -0.025 L 0.025 0.025 L ' : 'M -0.025 -0.025 L 0.025 0.025 L ';
    let path2 = path1, pathX = String(x), space = " ", pathY =  String(y), pathEnd = "Z";
    let finalPath = path2.concat(pathX, space, pathY, pathEnd);

    // Chart
    let gaugeData = [
        { 
        type: 'scatter',
        x: [0], y:[0],
        marker: {size: 14, color:'850000'},
        showlegend: false,
        name: 'Wash Frequency',
        text: obj,
        hoverinfo: 'text+name'
        }, 
    {type: "indicator", mode: "gauge", value: obj, title: {text: "Scrubs Per Week", font: {size: 16}},
    
    gauge: { axis:{range: [null, 10], showticklabels: false, tickcolor:"#ffffff00"}, bar: {color: "#ffffff00"}, steps: [
        {range: [9,10], color:"rgba(14, 127, 0, .5)"},
        {range: [8,9], color:"rgba(50, 143, 10, 0.5)"},
        {range: [7,8], color:"rgba(110, 154, 22, .5)"},
        {range: [6,7], color:"rgba(142, 178, 35, .5)"},
        {range: [5,6], color:"rgba(170, 202, 42, .5)"},
        {range: [4,5], color:"rgba(184, 205, 68, .5)"},
        {range: [3,4], color:"rgba(202, 209, 95, .5)"},
        {range: [2,3], color:"rgba(210, 206, 145, .5)"},
        {range: [1,2], color:"rgba(232, 226, 202, .5)"},
        {range: [0,1], color:"rgba(255, 255, 255, 0)"}],
    }
    }
    // {type: "pie", mode: "gauge", value: obj, title: {text: "Scrubs Per Week", font: {size: 16}},
    // gauge:{ axis:{range: [null, 10],tickwidth:1}, steps: [
    //     {range: [9,10], color:"rgba(14, 127, 0, .5)"},
    //     {range: [8,9], color:"rgba(50, 143, 10, 0.5)"},
    //     {range: [7,8], color:"rgba(110, 154, 22, .5)"},
    //     {range: [6,7], color:"rgba(142, 178, 35 , .5)"},
    //     {range: [5,6], color:"rgba(170, 202, 42, .5)"},
    //     {range: [4,5], color:"rgba(184, 205, 68, .5)"},
    //     {range: [3,4], color:"rgba(202, 209, 95, .5)"},
    //     {range: [2,3], color:"rgba(210, 206, 145, .5)"},
    //     {range: [1,2], color:"rgba(232, 226, 202, .5)"},
    //     {range: [0,1], color:"rgba(255, 255, 255, 0)"}]},
    // values: [
    //         50/9,
    //         50/9,
    //         50/9,
    //         50/9,
    //         50/9,
    //         50/9,
    //         50/9,
    //         50/9,
    //         50/9,
    //         50 // for the bottom half of the pie chart which will be hidden
    //     ], rotation: 90,
    //     text: ["8-9","7-8","6-7","5-6","4-5","3-4","2-3","1-2","0-1",""],
    //     textinfo: 'text',
    //     textposition:'inside',
    //     labels: ["8-9",
    //     "7-8",
    //     "6-7",
    //     "5-6",
    //     "4-5",
    //     "3-4",
    //     "2-3",
    //     "1-2",
    //     "0-1",
    //     ""],
    //     hoverinfo: 'label',
    //     showlegend: false,
    //     hole: .6
    // }
];

    let layout = { shapes:[{
        type: 'path',
        path: finalPath,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }], 
        xaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1]
        },
        yaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false,
            range: [-1, 1]
        }, 
        title: {text: "Belly Button Washing Frequency", font: {size:24}}, width: 500, height:500}
    
    Plotly.newPlot("gaugediv", gaugeData,layout)
}