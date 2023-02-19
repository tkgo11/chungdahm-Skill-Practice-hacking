var xhr = new XMLHttpRequest();

function start() {
  try {
    run();
  }
  catch (e) {
    console.log(e);
    var button = document.createElement("button");
  }
}

function run() {
  // get the iframe element by its id
  var contentsFrame = document.getElementById("contentsFrame");

  // access the src attribute of the iframe
  var iframeSrc = contentsFrame.src;


  // remove the "?mode=s" parameter from the link
  var cleanedLink = iframeSrc.replace("?mode=s", "?");

  // open a GET request to the cleaned link
  xhr.open("GET", cleanedLink);

  // set the response type to "document"
  xhr.responseType = "document";

  // handle the response when it loads
  xhr.onload = () => {
    // check if the response was successful
    if (xhr.status === 200) {
      // get the answerLine element by its class name
      var answerLineElement = xhr.responseXML.getElementsByClassName("answerLine STRevealGroup")[0];

      const final = answerLineElement.querySelector('.answerLine.STRevealGroup strong:first-of-type').nextSibling.textContent.trim();

      // log the HTML code of the answerLine element to the console
      alert("정답:\n" + final + "\n고태경이 만든 \"청담 Skill Practice 해킹\" 확장프로그램");
    } else {
      // log an error message if the response was unsuccessful
      alert("HTTP GET request failed with status", xhr.status);
    }
  };

  // send the HTTP request
  xhr.send();
}


var button = document.createElement("button");
button.innerHTML = "답 보기";
button.addEventListener("click", start);
button.style.backgroundColor = "blue";
button.style.color = "white";
button.style.fontSize = "16px";
button.style.padding = "10px 20px";
document.body.appendChild(button);

