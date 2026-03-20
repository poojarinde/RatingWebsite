const movies = [
  {
    id:1,
    title:"Inception",
    genre:"Sci-Fi",
    year:2010,
    img:"https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
    trailer:"https://www.youtube.com/watch?v=YoHD9XEInc0"
  },
  {
    id:2,
    title:"Avengers",
    genre:"Action",
    year:2012,
    img:"https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    trailer:"https://www.youtube.com/watch?v=eOrNdBpGMv8"
  },
  {
    id:3,
    title:"Interstellar",
    genre:"Sci-Fi",
    year:2014,
    img:"https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    trailer:"https://www.youtube.com/watch?v=zSWdZVtXT7E"
  },
  {
    id:4,
    title:"Joker",
    genre:"Drama",
    year:2019,
    img:"https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    trailer:"https://www.youtube.com/watch?v=zAGVQLHvwOY"
  },
  {
    id:5,
    title:"Titanic",
    genre:"Romance",
    year:1997,
    img:"https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    trailer:"https://www.youtube.com/watch?v=2e-eXJ6HgkQ"
  },
  {
    id:6,
    title:"Avatar",
    genre:"Fantasy",
    year:2009,
    img:"https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
    trailer:"https://www.youtube.com/watch?v=5PSNL1qE6VY"
  },
  {
    id:7,
    title:"Batman",
    genre:"Action",
    year:2008,
    img:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailer:"https://www.youtube.com/watch?v=EXeTwQWrcwY"
  },
  {
    id:8,
    title:"Frozen",
    genre:"Animation",
    year:2013,
    img:"https://image.tmdb.org/t/p/w500/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg",
    trailer:"https://www.youtube.com/watch?v=TbQm5doF_Uc"
  },
  {
    id:9,
    title:"Spider-Man",
    genre:"Action",
    year:2021,
    img:"https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    trailer:"https://www.youtube.com/watch?v=JfVOs4VSpmA"
  }
];

let ratings = JSON.parse(localStorage.getItem("ratings")) || {};
const container = document.getElementById("movieContainer");

function displayMovies(data) {
  container.innerHTML = "";

  data.forEach(movie => {
    let avg = getAvg(movie.id);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${movie.img}" alt="${movie.title}">
      <div class="card-content">
        <h3>${movie.title}</h3>
        <p>${movie.genre} | ${movie.year}</p>

        <div class="stars" data-id="${movie.id}">
          ${[1,2,3,4,5].map(n => `<span data-val="${n}">&#9733;</span>`).join("")}
        </div>

        <p>⭐ ${avg}</p>
      </div>
    `;

    card.onclick = () => {
      window.open(movie.trailer, "_blank");
    };

    container.appendChild(card);
  });

  addRating();
}

function addRating() {
  document.querySelectorAll(".stars span").forEach(star => {
    star.onclick = (e) => {
      e.stopPropagation();

      let val = Number(e.target.dataset.val);
      let id = e.target.parentElement.dataset.id;

      if (!ratings[id]) ratings[id] = [];
      ratings[id].push(val);

      localStorage.setItem("ratings", JSON.stringify(ratings));
      displayMovies(movies);
    };
  });
}

function getAvg(id) {
  if (!ratings[id]) return "0";
  let sum = ratings[id].reduce((a,b)=>a+b,0);
  return (sum/ratings[id].length).toFixed(1);
}

document.getElementById("search").addEventListener("input", (e) => {
  let val = e.target.value.toLowerCase();
  let filtered = movies.filter(m => m.title.toLowerCase().includes(val));
  displayMovies(filtered);
});

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

document.getElementById("reviewForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("✅ Review Submitted Successfully!");
  this.reset();
});

displayMovies(movies);