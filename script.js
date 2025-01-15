var cardsel = document.querySelector(".cards");

var cards = [];
var imgs = [
  "https://cdn.pixabay.com/photo/2020/09/11/13/29/mango-5563159_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/02/10/13/03/grapes-6002003_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/01/24/13/20/banana-5945166_1280.png",
  "https://cdn.pixabay.com/photo/2017/01/31/17/13/apple-2025667_1280.png",
];

for (let i = 0; i < 8; i++) {
  let el = document.createElement("div");
  el.classList.add("card");
  el.innerHTML = `<img class="hide" src="${imgs[i % 4]}" alt="image ${i}" />`; // Use the URL directly
  cards.push(el);
}

cards.sort(() => Math.random() - 0.5);

for (let c of cards) {
  cardsel.append(c);
}

let first = null;
let second = null;

for (let c of cards) {
  c.addEventListener("click", async () => {
    if (first === null && second === null) {
      c.children[0].classList.remove("hide");
      first = c;
    }
    else if (first && second === null) {
      c.children[0].classList.remove("hide");
      second = c;

      if (first.children[0].src !== second.children[0].src) {
        await new Promise((r) => setTimeout(r, 1000)); 
        first.children[0].classList.add("hide");
        second.children[0].classList.add("hide");
      } else {
        if (checkWin()) {
          window.location.href = "win.html";
        }
      }

      first = null;
      second = null;
    }
  });
}

const checkWin = () => {
  for (let c of cards) {
    if (c.children[0].classList.contains("hide")) {
      return false;
    }
  }
  return true;
};
