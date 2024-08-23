

function GetStyledChart({labels, inputData, chartTitle, xLabel, yLabel}) {
    const data = {
        labels: labels,
        datasets: [],
    };
    inputData.forEach(element => {
        data.datasets.push( 
            {
                backgroundColor: element.color,
                borderColor: element.color,
                label: element.label,
                data: element.values,
        })
    });
    const options = { 
        plugins:{
            title: {
                display: true,
                position: 'top',
                text: chartTitle,
                color: '#e8ebee',
                font: {
                    family: 'Poppins,Arial,Helvetica,sans-serif,Russo One',
                    size: 24,
                    weight: '700',
                },
                padding: {top: 0, left: 0, right: 0, bottom: 20}
            },
            legend: {
                display: true,
                labels: {
                    color: '#e8ebee',
                    font: {
                        size: 14,
                    },
                    padding: 10,
                },
                position: "right",
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: xLabel,
                    color: '#e8ebee',
                    font: {
                        family: 'Poppins,Arial,Helvetica,sans-serif,Russo One',
                        size: 20,
                        lineHeight: 1.2,
                    },
                    padding: {top: 24, left: 0, right: 0, bottom: 0}
                },
                ticks: {
                    color: '#e8ebee',
                    font: {
                        size: 14,
                        family: 'Poppins,Arial,Helvetica,sans-serif,Russo One',
                    }
                }
            },
            y: {
                display: true,
                title: {
                display: true,
                text: yLabel,
                color: '#e8ebee',
                font: {
                    family: 'Poppins,Arial,Helvetica,sans-serif,Russo One',
                    size: 20,
                    lineHeight: 1.2,
                },
                padding: {top: 0, left: 0, right: 0, bottom: 24}
                },
                ticks: {
                    color: '#e8ebee',
                    font: {
                        size: 14,
                        family: 'Poppins,Arial,Helvetica,sans-serif,Russo One',
                    }
                }
            },
        },
        elements: {
            line: {
                tension: 0.5,
            }, 
            point: {
                radius: 3,
            }
        },
    };

    return [data, options];
}

export default GetStyledChart;