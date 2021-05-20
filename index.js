const dmCanvas = document.getElementById('dm').getContext('2d');

const width = 580;
const height = 280;
let rows = 6;
let upperLimit = 52;
let lowerLimit = 0;

const handleFilterUpdate = (e) => {

  const lower = document.getElementById(e.target.name + "-lower").value;
  const upper = document.getElementById(e.target.name + "-upper").value;

      switch (e.target.name) {
        case "dm-btn-filter":
        if(upper-1 > lower) {
          document.getElementById("dm-filter-error").innerHTML = "";
          draw(dataset.DM.slice(lower, upper), charts.dmCanvas, "#ff5b5b");
        } else {
          document.getElementById("dm-filter-error").innerHTML = "Upper has to be 2 higher than lower";
        }
          break;
        case "tv-btn-filter":
        if(upper-1 > lower) {
          document.getElementById("tv-filter-error").innerHTML = "";
          draw(dataset.TV.slice(lower, upper), charts.tvCanvas, "#40e269");
        } else {
          document.getElementById("tv-filter-error").innerHTML = "Upper has to be 2 higher than lower";
        }
          break;
        case "ooh-btn-filter":
        if(upper-1 > lower) {
          document.getElementById("ooh-filter-error").innerHTML = "";
          draw(dataset.OOH.slice(lower, upper), charts.oohCanvas, "#713fdd");
        } else {
          document.getElementById("ooh-filter-error").innerHTML = "Upper has to be 2 higher than lower";
        }
          break;
        case "ppc-btn-filter":
        if(upper-1 > lower) {
          document.getElementById("ppc-filter-error").innerHTML = "";
          draw(dataset.PPC.slice(lower, upper), charts.ppcCanvas, "#5bc4ff");
        } else {
          document.getElementById("ppc-filter-error").innerHTML = "Upper has to be 2 higher than lower";
        }
          break;
        default:
      }

  //will need to make sure lower is not higher than upper
  //simply slice the input array and redraw all
}

const filterButtons = document.querySelectorAll('button');

filterButtons.forEach(filterButton => {
  filterButton.addEventListener('click', handleFilterUpdate);
});

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
    chart.strokeStyle = "#d1d1d1";
    chart.moveTo(10, (height / rows * i));
    chart.lineTo(width, (height / rows * i));
    chart.stroke();
  };
  //draw divisions
  for (let i = 0; i < columns; i++) {
    chart.beginPath();
    chart.strokeStyle = "#373737";
    chart.moveTo(width / columns * i + 10, height);
    chart.lineTo(width / columns * i + 10, height + 5);
    chart.stroke();
  };

  //draw x and y axis
  chart.beginPath();
  chart.strokeStyle = "#202020";
  chart.lineWidth = 3;
  chart.moveTo(10, 0);
  chart.lineTo(10, height);
  chart.lineTo(width, height);
  chart.stroke();

  //draw numbers
  chart.beginPath();
  chart.strokeStyle = "#000000";
  chart.font = '0.8rem sans-serif';
  chart.fillText(`0`, 0, height);
  chart.stroke();

  for (let i = 0; i < columns; i++) {
    if (i === 0 || i % 4 === 0) {
      chart.beginPath();
      chart.strokeStyle = "#000000";
      chart.fillText(i + 1, width / columns * i + 10, height + 14);
      chart.stroke();
    }
  };

  const max = findMax(datapoints);

  //could merge these operations??
  //draw datapoints
  chart.beginPath();
  chart.strokeStyle = colour;
  chart.lineWidth = 2;
  for (let i = 0; i < columns; i++) {
    if (i === 0) {
      chart.moveTo(width / columns * i + 10, height - (height / max.max) * datapoints[i]);
    } else {
      chart.lineTo(width / columns * i + 10, height - (height / max.max) * datapoints[i]);
    }
  }
  chart.stroke();

  //draw circle
  for (let i = 0; i < columns; i++) {
    chart.beginPath();
    chart.fillStyle = colour;
    if (i !== 0) {
      chart.arc(width / columns * i + 10, height - (height / max.max) * datapoints[i], 3, 0, 2 * Math.PI);
    }
    chart.fill();
  }

  //draw max
  chart.beginPath();
  chart.strokeStyle = "#373737";
  chart.fillStyle = "#373737";
  chart.fillText(max.max, width / columns * max.maxIndex + 16, height - (height / max.max) * max.max + 10);
  chart.stroke();
};

draw(dataset.DM, charts.dmCanvas, "#ff5b5b");
