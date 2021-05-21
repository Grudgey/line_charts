const chart = document.getElementById('chart').getContext('2d');

const width = 580;
const height = 280;
let rows = 8;

const generateRandomDatapoints = (range, count) => {
  const {lower, upper} = range;
  console.log(range)

  const datapoints = new Array(count);

  for(let i = 0; i < count; i++) {
    datapoints[i] = (lower+Math.random()*upper).toFixed(2);
  }
 return datapoints;
};

const handleFilterUpdate = (e) => {

  const lower = document.getElementById(e.target.name + '-lower').value;
  const upper = document.getElementById(e.target.name + '-upper').value;

  console.log("filter update clicked");

        if(upper-1 > lower) {
          document.getElementById('filter-error').innerHTML = '';
          draw(datapoints.slice(lower, upper), chart, "#ff5b5b");
        } else {
          document.getElementById('filter-error').innerHTML = 'Upper has to be 2 higher than lower';
        }

  //will need to make sure lower is not higher than upper
  //simply slice the input array and redraw all
};


const drawChart = (e) => {
  const count = Number(document.getElementById(e.target.name + '-count').value);
  const upper = Number(document.getElementById(e.target.name + '-upper').value);
  const lower = Number(document.getElementById(e.target.name + '-lower').value);

  console.log({count, upper, lower});

  const datapoints = generateRandomDatapoints({lower: lower, upper: upper}, count);

  draw(datapoints, chart, "red");
};

document.getElementById('filter-button').addEventListener('click', handleFilterUpdate);

document.getElementById('draw-datapoints').addEventListener('click', drawChart)

const findMax = (datapoints) => {
  let max = 0;
  let maxIndex = 0;

  datapoints.forEach((datapoint, index) => {
    if (datapoint > max) {
      max = datapoint;
      maxIndex = index;
    }
  });

  return {
    max,
    maxIndex
  };
};

//draw charts
const draw = (datapoints, chart, colour) => {
  const columns = datapoints.length;
  chart.canvas.width = width + 20;
  chart.canvas.height = height + 14;

  //draw rows
  for (let i = 0; i < rows; i++) {
    chart.beginPath();
    chart.strokeStyle = '#d1d1d1';
    chart.moveTo(10, (height / rows * i));
    chart.lineTo(width, (height / rows * i));
    chart.stroke();
  };
  //draw divisions
  for (let i = 0; i < columns; i++) {
    chart.beginPath();
    chart.strokeStyle = '#373737';
    chart.moveTo(width / columns * i + 10, height);
    chart.lineTo(width / columns * i + 10, height + 5);
    chart.stroke();
  };

  //draw x and y axis
  chart.beginPath();
  chart.strokeStyle = '#202020';
  chart.lineWidth = 3;
  chart.moveTo(10, 0);
  chart.lineTo(10, height);
  chart.lineTo(width, height);
  chart.stroke();

  //draw numbers
  chart.beginPath();
  chart.strokeStyle = '#000000';
  chart.font = '0.8rem sans-serif';
  chart.fillText('0', 0, height);
  chart.stroke();

  for (let i = 0; i < columns; i++) {
    if (i === 0 || i % 4 === 0) {
      chart.beginPath();
      chart.strokeStyle = '#000000';
      chart.fillText(i + 1, width / columns * i + 10, height + 14);
      chart.stroke();
    }
  };

  const {max, maxIndex} = findMax(datapoints);

  //could merge these operations??
  //draw datapoints
  chart.beginPath();
  chart.strokeStyle = colour;
  chart.lineWidth = 2;
  for (let i = 0; i < columns; i++) {
    if (i === 0) {
      chart.moveTo(width / columns * i + 10, height - (height / max) * datapoints[i]);
    } else {
      chart.lineTo(width / columns * i + 10, height - (height / max) * datapoints[i]);
    }
  }
  chart.stroke();

  //draw circle
  for (let i = 0; i < columns; i++) {
    chart.beginPath();
    chart.fillStyle = colour;
    if (i !== 0) {
      chart.arc(width / columns * i + 10, height - (height / max) * datapoints[i], 3, 0, 2 * Math.PI);
    }
    chart.fill();
  }

  //draw max
  chart.beginPath();
  chart.strokeStyle = '#373737';
  chart.fillStyle = '#373737';
  chart.fillText(max, width / columns * maxIndex + 16, height - (height / max) * max + 10);
  chart.stroke();
};

draw([], chart, "red");
