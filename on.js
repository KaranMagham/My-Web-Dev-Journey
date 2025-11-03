// onClick Event
document.getElementById("clickBtn").onclick = function() {
  alert("Button was clicked!");
};

// onMouseOver & onMouseOut Events
let hoverText = document.getElementById("hoverText");

hoverText.onmouseover = function() {
  hoverText.style.color = "rgb(255, 108, 108)";
};

hoverText.onmouseout = function() {
  hoverText.style.color = "black";
};

// onChange Event
document.getElementById("username").onchange = function() {
  let name = document.getElementById("username").value;
  alert("Hello, " + name + "!");
};
