const datavisEL = document.getElementById("datavis");

Plotly.d3.json("dataset.json", myCoolFunction);

function myCoolFunction(jsonData) {
    const xValues = jsonData.map((row) => row.time);

    const count = {
        x: xValues,
        y: jsonData.map((row) => row.count),
        type: 'bar',
        name: 'count',
        marker: {
            color: "#c9c9c9",
        },

    };

    const male = {
        x: xValues,
        y: jsonData.map((row) => row.male),
        type: 'bar',
        name: 'male',
        marker: {
            color: xValues.map((data) => {
                if (data === "18:00") {
                    return "#0442de";
                }
                return "#7f99db";
            }),
        },
    };

    const female = {
        x: xValues,
        y: jsonData.map((row) => row.female),
        type: 'bar',
        name: 'female',
        marker: {
            color: xValues.map((data) => {
                if (data === "18:00") {
                    return "#de0ba5";
                }
                return "#f5abe1";
            }),
        },
    };

    const data = [count, male, female];

    const layout = {
        xaxis: {
            linewidth: 1.5,
            linecolor: "#E64626",
        },
    };

    Plotly.newPlot(datavisEL, data, layout);

    datavisEL.on("plotly_hover", function (data) {
        let barId = 0;
        let alreadyClicked;
        const originalColours = Array(jsonData.length).fill("#c9c9c9");
        data.points.forEach((point) => {
            barId = point.pointNumber;
            alreadyClicked = point.data.marker.color.indexOf("#5e5e5e");
        });
        if (barId !== alreadyClicked) {
            originalColours.splice(barId, 1, "#5e5e5e");
        }
        const updatedAttributes = {
            marker: {
                color: originalColours,
            },
        };
        Plotly.restyle(datavisEL, updatedAttributes, [0]);
    });

    datavisEL.on("plotly_number", function () {
        const updatedAttributes = {
            marker: {
                color: "#c9c9c9",
            },
        };
        Plotly.restyle(datavisEl, updatedAttributes, [0]);
    });
}