// === THE PYTHON SCRIPT WILL GENERATE AND UPDATE 'imageNames' ===

const imageNames = [
  "bellsprout.png",
  "bulbasaur.png",
  "caterpie.png",
  "charmander.png",
  "ditto.png",
  "dragonite.png",
  "eevee.png",
  "gegnar.png",
  "geodude.png",
  "gyarados.png",
  "ho-oh.png",
  "jigglypuff.png",
  "koffing.png",
  "mew.png",
  "mewth.png",
  "mewtwo.png",
  "pidgey.png",
  "pikachu.png",
  "poliwag.png",
  "psyduck.png",
  "snorlax.png",
  "squirtle.png",
  "staryu.png",
  "togepi.png",
];

function CapitalizeString(string) {
  if (string.length == 0) return;
  return string[0].toUpperCase() + string.slice(1);
}

// Run the DOM generation after the page loads
document.addEventListener("DOMContentLoaded", () => {
  const flipbook = document.querySelector(".flipbook");

  if (!flipbook) {
    console.error("Count not find an element with class='flipbook'");
    return;
  }

  // Loop through the Python-generated list
  imageNames.forEach((name) => {
    // Create an image element
    const img = document.createElement("img");
    img.src = `./pokemons/${name}`;
    img.alt = name;

    // Create a small label element
    const small = document.createElement("small");
    small.textContent = CapitalizeString(name.split(".")[0]);

    // Create a wrapper page container and put them inside it
    const page = document.createElement("div");
    page.className = "page";
    page.appendChild(img);
    page.appendChild(small);

    // Inject the page div inside the flipbook
    flipbook.appendChild(page);
  });

  // add an empty page at the end if the number of pages is even to fix the last back hard cover
  if (imageNames.length % 2 == 0) {
    const emptyPage = document.createElement("div");
    emptyPage.className = "page";
    flipbook.appendChild(emptyPage);
  }

  /* Add back hard cover in the end
    <!-- back cover -->
    <div class="page hard"></div>
    <div class="page hard">Thank You <small>~ Kamal Stark</small></div>
  */
  const backHardCover1 = document.createElement("div");
  backHardCover1.classList.add("page", "hard");

  const backHardCover2 = document.createElement("div");
  backHardCover2.classList.add("page", "hard");
  backHardCover2.innerHTML = `<h2>Thank You</h2> <small>~ Kamal Stark</small>`;

  flipbook.appendChild(backHardCover1);
  flipbook.appendChild(backHardCover2);

  //  NOW initialize Turn.js because all .page divs finally exist in the DOM!
  $(".flipbook").turn({
    autoCenter: true,
  });
});
