
import {items1}  from './data.js'
console.log(items1)


var placeform = document.getElementById("placeform");
var locationform = document.getElementById("locationform");
var planform = document.getElementById("planform");
var imageform = document.getElementById("imageform");
var linkform = document.getElementById("linkform");
var dateform = document.getElementById("dateform");
var submitform = document.getElementById("submitform");

var editModal = document.getElementById("edit-modal");
var closeModal = document.getElementById("close-modal");

var editPlace = document.getElementById("edit-place");
var editLocation = document.getElementById("edit-location");
var editPlan = document.getElementById("edit-plan");
var editImage = document.getElementById("edit-image");
var editDate = document.getElementById("edit-date");
var editLink = document.getElementById("edit-link");
var editSubmit = document.getElementById("edit-submit");
var theme = document.getElementById("checkbox");

var cards = document.getElementById("cards");












var currentTheme = 0;
theme.addEventListener("click", () => {
  if (currentTheme === 0) {
    darkmode();
    currentTheme = 1;
  } else {
    lightmode();
    currentTheme = 0;
  }
});

function covertDateFormat(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var newDate = date
    .split("-")
    .reverse()
    .map((e, i) => {
      if (i === 1) {
        return months[e - 1];
      } else {
        return e;
      }
    });
  console.log(newDate.join(" "));
  return newDate.join(" ");
}



function showCard() {
  cards.innerHTML = ""; // Clear existing cards before rendering

  items.forEach((item, index) => {
    
    var card = document.createElement("div");
    card.classList.add("card");

    var image = document.createElement("img");
    image.src = item.image;
    image.alt = item.place;

    var place = document.createElement("h4");
    place.id = "place";
    place.textContent = item.place;

    var location = document.createElement("p");
    location.id = "location";
    location.textContent = item.location;

    var plan = document.createElement("p");
    plan.textContent = item.plan;
    plan.id = "plan";

    var date = document.createElement("p");
    date.textContent = item.date;
    date.id = "date";

    var moreinfo = document.createElement("a");
    moreinfo.id = "moreinfo";
    moreinfo.textContent = "More Info";
    moreinfo.href = item.link;
    moreinfo.target = "_blank";

    var modification = document.createElement("div");
    modification.id = "modification";

    var edit = document.createElement("div");
    edit.id = "edit";
    edit.innerHTML = '<img src="./assets/edit-icon.svg" alt="edit" />';
    edit.addEventListener("click", function () {
    editCard(index);

    });

    var del = document.createElement("div");
    del.id = "del";

    var img = document.createElement("img")
    img.src ="./assets/trash-icon.svg" 
    img.alt="delete"

    del.appendChild(img)
    del.addEventListener("click", function () {
      deleteCard(index);
    });

    modification.appendChild(edit);
    modification.appendChild(moreinfo);
    modification.appendChild(del);

    card.appendChild(image);
    card.appendChild(place);
    card.appendChild(location);
    card.appendChild(plan);
    card.appendChild(date);
    card.appendChild(modification);

    cards.appendChild(card);
  });
  if (currentTheme === 0) {
    deletEditColorInvert();
  }
}

function editCard(index) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var item = items[index];
  editPlace.value = item.place;
  editLocation.value = item.location;
  editPlan.value = item.plan;
  editImage.value = item.image;
  editLink.value = item.link;
  editDate.value = item.date
    .split(" ")
    .reverse()
    .map((e, i) => {
      if (i === 1) {
        return ("0" + (months.indexOf(e) + 1)).slice(-2);
      } else {
        return e;
      }
    })
    .join("-");

  editModal.style.display = "block";

  editSubmit.onclick = function (e) {
    e.preventDefault();
    var place = editPlace.value;
    var location = editLocation.value;
    var plan = editPlan.value;
    var image = editImage.value;
    var link = editLink.value;
    var date = editDate.value;
    date = covertDateFormat(date);

    if (!(place && location && plan && image && link && date)) {
      alert("Please fill all the fields");
      return;
    }

    items[index] = {
      place: place,
      location: location,
      plan: plan,
      image: image,
      date: date,
      link: link,
    };
    localStorage.setItem("items", JSON.stringify(items));
    showCard();

    editModal.style.display = "none";
  };
}

function deleteCard(index) {
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  showCard();
}

function addCard(e) {
  e.preventDefault();
  var place = placeform.value;
  var location = locationform.value;
  var plan = planform.value;
  var image = imageform.value;
  var link = linkform.value;
  var date = dateform.value;
  date = covertDateFormat(date);


hi =`$`

  if (!(place && location && plan && image && link && date)) {
    alert("Please fill all the fields");
    return;
  } 

  var item = {
    place: place,
    location: location,
    plan: plan,
    image: image,
    date: date,
    link: link,
  };
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  showCard();
}

submitform.addEventListener("click", addCard);

let items = null;

if (localStorage.getItem("items") !== null) {
  items = JSON.parse(localStorage.getItem("items"));
} else {
  items = [
    {
      place: "Taj Mahal",
      location: "Agra, India",
      plan: "I'm looking forward to leisurely walking through the lush gardens surrounding the Taj. I'll keep my camera ready for every picturesque corner.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg",
      date: "26 May 2024",
      link: "https://www.indiatajmahaltour.com/holiday-packages/taj-mahal-tours-from-bangalore.htm",
    },
    {
      place: "Eiffel Tower",
      location: "Paris, France",
      plan: "Climbing up the Eiffel Tower is a must-do for me. Whether by elevator or stairs, reaching the top for panoramic views of Paris is going to be unforgettable.",
      image:
        "https://media.cntraveler.com/photos/58de89946c3567139f9b6cca/16:9/w_1920,c_limit/GettyImages-468366251.jpg",
      date: "09 September 2028",
      link: "https://traveltriangle.com/tour-packages/eiffel-tower",
    },
    {
      place: "Great Wall Of China",
      location: "Huairou District, China",
      plan: "I'm beyond excited to finally see the Great Wall of China in person! I'll make sure to take it all in, marveling at its sheer size and historical significance.",
      image:
        "https://th-thumbnailer.cdn-si-edu.com/tTWLQXzOH6vwsp7kSFf6Td7ZpZc=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/80/fa/80facab4-fe0e-4a56-bd99-a71eb1845fa0/01_14_2014_great_wall.jpg",
      date: "14 January 2032",
      link: "https://www.sotc.in/tourism/china-tourism/things-to-do-in-china/great-wall-of-china/2239",
    },
  ];
}

showCard();

closeModal.onclick = function () {
  editModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
};

function lightmode() {
  
  removeStyles([`::-webkit-calendar-picker-indicator`])


  document.documentElement.style.setProperty("--color-primary", "#ff8b66");
  document.documentElement.style.setProperty("--color-accent", "#382f0924");
  document.documentElement.style.setProperty("--color-border", "black");
  document.documentElement.style.setProperty(
    "--color-shadow",
    "rgba(0, 0, 0, 0.24)"
  );
  document.documentElement.style.setProperty(
    "--color-shadow-dark",
    "rgba(0, 0, 0, 0.6)"
  );
  document.documentElement.style.setProperty("--color-secondary", "white");
  document.documentElement.style.setProperty(
    "--color-footer-background",
    "linear-gradient(#f5c3a487, #ef8b8b27, #c9461663)"
  );
  document.documentElement.style.setProperty(
    "--color-footer-text",
    "#b2000094"
  );
  document.documentElement.style.setProperty("--color-place-text", "#712104");
  document.documentElement.style.setProperty(
    "--color-card-background",
    "#ffffffe6"
  );
  document.documentElement.style.setProperty(
    "--color-location-text",
    "#ff000077"
  );
  document.documentElement.style.setProperty(
    "--color-button-background",
    "#e2e2e2e8"
  );
  document.documentElement.style.setProperty(
    "--color-button-background-accent",
    "#ff00004c"
  );
  document.documentElement.style.setProperty(
    "--color-button-text",
    "rgba(255, 255, 255, 0.916)"
  );
  document.documentElement.style.setProperty(
    "--color-text",
    "rgba(180, 173, 173, 0.42)"
  );
  document.documentElement.style.setProperty("--default-color", "black");

  document.documentElement.style.setProperty(
    "--color-text-secondary",
    "#828282"
  );
  document.documentElement.style.setProperty("--text-primary", "#212427");
}

function darkmode() {
  addNewStyles( `::-webkit-calendar-picker-indicator{
  
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%23bbbbbb" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
  }`)
  document.documentElement.style.setProperty(`-webkit-calendar-picker-indicator` , `background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%23bbbbbb" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>')`)
  document.documentElement.style.setProperty("--color-primary", "#1c1c1e");
  document.documentElement.style.setProperty("--color-accent", "#2c2c2e");
  document.documentElement.style.setProperty("--color-border", "#3a3a3c");
  document.documentElement.style.setProperty(
    "--color-shadow",
    "rgba(255, 255, 255, 0.1)"
  );
  document.documentElement.style.setProperty(
    "--color-shadow-dark",
    "rgba(255, 255, 255, 0.2)"
  );
  document.documentElement.style.setProperty("--color-secondary", "#2c2c2e");
  document.documentElement.style.setProperty(
    "--color-footer-background",
    "linear-gradient(#3a3a3c, #2c2c2e)"
  );
  document.documentElement.style.setProperty("--color-footer-text", "#8e8e93");
  document.documentElement.style.setProperty("--color-place-text", "#ff9f0a");
  document.documentElement.style.setProperty(
    "--color-card-background",
    "#1c1c1e"
  );
  document.documentElement.style.setProperty(
    "--color-location-text",
    "#ff453a"
  );
  document.documentElement.style.setProperty(
    "--color-button-background",
    "#3a3a3c"
  );
  document.documentElement.style.setProperty(
    "--color-button-background-accent",
    "#ff453a"
  );
  document.documentElement.style.setProperty(
    "--color-button-text",
    "rgba(255, 255, 255, 0.9)"
  );
  document.documentElement.style.setProperty(
    "--color-text",
    "rgba(255, 255, 255, 0.6)"
  );
  document.documentElement.style.setProperty("--default-color", "white");
  document.documentElement.style.setProperty(
    "--color-text-secondary",
    "#8e8e93"
  );
  document.documentElement.style.setProperty("--text-primary", "#f2f2f7");
  deletEditColorInvert();
}

function deletEditColorInvert() {
  document.querySelectorAll("#edit img").forEach((e) => {
    e.style.filter = "invert(80%)";
  });
  document.querySelectorAll("#del img").forEach((e) => {
    e.style.filter = "invert(83%)";
  });
}

darkmode();

function addNewStyles(newStyles) {
  // Locate the stylesheet by href
  const stylesheet = Array.from(document.styleSheets).find(sheet => sheet.href && sheet.href.endsWith('style.css'));

  if (stylesheet) {
      // Define new CSS rules
    
      // Split the rules into individual rule strings
      const rules = newStyles.split('}');

      // Append new rules to the stylesheet
      rules.forEach(rule => {
          if (rule.trim().length > 0) {
              stylesheet.insertRule(rule + '}', stylesheet.cssRules.length);
          }
      });
  } else {
      console.error('Stylesheet not found.');
  }
}


function removeStyles(selectors) {
  // Locate the stylesheet by href
  const stylesheet = Array.from(document.styleSheets).find(sheet => sheet.href && sheet.href.endsWith('style.css'));

  if (stylesheet) {
      // Iterate over stylesheet rules and remove matching ones
      for (let i = stylesheet.cssRules.length - 1; i >= 0; i--) {
          const rule = stylesheet.cssRules[i];
          if (selectors.some(selector => rule.selectorText && rule.selectorText.includes(selector))) {
              stylesheet.deleteRule(i);
          }
      }
  } else {
      console.error('Stylesheet not found.');
  }
}