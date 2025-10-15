const digit = document.querySelector(".digit");
const clock = digit.querySelector(".clock");

for (let i = 0; i < 23; i++) {
  const clone = clock.cloneNode(true); // true -> deep clone (include hands)
  digit.appendChild(clone);
}
