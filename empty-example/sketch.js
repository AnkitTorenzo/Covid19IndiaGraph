const API_URL = "https://api.covid19india.org/data.json";

let covid19 = [];

let dailyCases = [];
let dailyRecovery = [];
let dailyDeath = [];

let dailyDeathColor = ["#FF0400", "#FF9B99"];
let dailyCasesColor = ["#F2BD1D", "#F2BF5E"];
let dailyRecoverColor = ["#3AD834", "#8AFF19"];

let seperation = 20
let something = false;

function setup()
{
  createCanvas(window.innerWidth - 2, window.innerHeight * 2);
  loadJSON(API_URL, ParseJsonData);
  background(0);
  scale(0.8);
}

function draw()
{
}

function ParseJsonData(jsonData)
{
  covid19 = jsonData.cases_time_series;
  let i = 0;
  let day = 0;

  seperation = map(covid19.length, 0, covid19.length + 80, 0, width) / 50;
  console.log("Seperation: " + seperation);

  covid19.forEach(e => {
    v = new V2 (day, e.dailyconfirmed * -1);
    vDead = new V2(day, e.dailydeceased * -1);
    vRecov = new V2(day, e.dailyrecovered * -1);

    dailyCases[i] = v;
    dailyDeath[i] = vDead;
    dailyRecovery[i] = vRecov;

    i++;
    day += seperation;
  });
  
  translate(0, height - 20);
  DrawLineGraph(dailyCases, dailyCasesColor[0], dailyCasesColor[1], "Daily Cases");
  DrawLineGraph(dailyDeath, dailyDeathColor[1], dailyDeathColor[0], "Daily Death");
  DrawLineGraph(dailyRecovery, dailyRecoverColor[1], dailyRecoverColor[0], "Daily Recover");

}

function DrawLineGraph(arrayOfElements, dotcolor, lineColor, nameOfArray)
{
  for(let i = 1; i < arrayOfElements.length; i++)
  {
    let p = arrayOfElements[i - 1];
    let p1 = arrayOfElements[i] 
    
    strokeWeight(2);
    stroke(lineColor);
    line(p.x, p.y, p1.x, p1.y);

    strokeWeight(10);
    stroke(dotcolor);
    point(p.x, p.y);

  }
  
  if(arrayOfElements.length > 0)
  {
    let p = arrayOfElements[arrayOfElements.length - 1];
    point(p.x, p.y);
    console.log(p.y + " :" + nameOfArray);
  }
}

V2 = function(x, y)
{
  this.x = x;
  this.y = y;
}