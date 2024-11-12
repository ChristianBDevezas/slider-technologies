const data = [
  {
    img: "./img/node.jpg",
    name: "Node.js",
    segment: "JS Back-end",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quoeius recusandae officia voluptas sint deserunt dicta Node JS. `,
    number: 1,
  },
  {
    img: "./img/express.jpg",
    name: "Express.js",
    segment: "Node Framework",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quoeius recusandae officia voluptas sint deserunt dicta Express.`,
    number: 2,
  },
  {
    img: "./img/mongo.jpg",
    name: "Mongo DB",
    segment: "NoSQL Database",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quoeius recusandae officia voluptas sint deserunt dicta Mongo.`,
    number: 3,
  },
  {
    img: "./img/javascript.jpg",
    name: "Javascript",
    segment: "JS Front-end",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quoeius recusandae officia voluptas sint deserunt dicta Javascript.`,
    number: 4,
  },
  {
    img: "./img/react.jpg",
    name: "React",
    segment: "JS Framework",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quoeius recusandae officia voluptas sint deserunt dicta React.`,
    number: 5,
  },
];

const container = document.querySelector(".slider__container");
const sliderButtons = document.querySelector(".slider__buttons");

// copy the data array of objects to a new variable
let technologies = [...data];

// if length is 2, add copies of slides
if(data.length === 2) technologies = [...data, ...data];

// populate container with map method
container.innerHTML = technologies.map((technology, slideIndex) => {
    const { img, name, segment, text, number } = technology;
    let position = "next";

    if(slideIndex === 0) position = "active";

    if(slideIndex === technologies.length - 1) position = "last";

    if(data.length <= 1) position = "active";

    return `<article class="slide ${position}">
            <div class="slide-image">
               <img src=${img} class="img" alt="${name}"/>
            </div>
            <h4>${name}</h4>
            <p class="title">${segment}</p>
            <p class="text">${text}</p>
            <p class="number">${number} / ${data.length}</p>
            </article>`;
}).join("");

// populate container with forEach method
// technologies.forEach((technology, slideIndex) => {
//   const { img, name, segment, text, number } = technology;
//     let position = "next";

//     if(slideIndex === 0) position = "active";

//     if(slideIndex === technologies.length - 1) position = "last";

//     if(data.length <= 1) position = "active";

//     container.innerHTML += 
//     `<article class="slide ${position}">
//          <div class="slide-image">
//             <img src=${img} class="img" alt="${name}"/>
//          </div>
//          <h4>${name}</h4>
//          <p class="title">${segment}</p>
//          <p class="text">${text}</p>
//          <p class="number">${number} / ${data.length}</p>
//     </article>`;
// });

// populate buttons
sliderButtons.innerHTML = `
  <button class="btn prev-btn">
    <i class="fas fa-chevron-left"></i>
  </button>

  <button class="btn next-btn">
    <i class="fas fa-chevron-right"></i>
  </button>
`;

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

// if length is 1 hide buttons
if(data.length === 1) {
  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
}

const moveSlider = (type) => {
  // get all three slides active, last and next
  const active = document.querySelector(".active");
  const last = document.querySelector(".last");
  let next = active.nextElementSibling;
  
  // avoid to run out of next siblings (when active one doesn't have the next sibling)
  if(!next) next = container.firstElementChild;
  console.log(next);
  
  // when we have multiple classes, we can specify which class using brackets
  active.classList.remove("active");
  last.classList.remove("last");
  next.classList.remove("next");

  if(type === "previous") {
    active.classList.add("next");
    last.classList.add("active");
    next = last.previousElementSibling;

    if(!next) next = container.lastElementChild;
    
    next.classList.remove("next");
    next.classList.add("last");
    
    // when type === "previous" the function has to return so the next block of code is not executed
    return;
  }

  active.classList.add("last");
  last.classList.add("next");
  next.classList.add("active");
};

prevBtn.addEventListener("click", () => {
  moveSlider("previous");
});

nextBtn.addEventListener("click", () => {
  moveSlider();
});