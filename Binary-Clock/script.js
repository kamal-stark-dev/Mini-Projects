const blocks = document.getElementsByClassName("block");
console.log(blocks);

function updateTime() {
  let time = new Date();
  let binary_vals = [];
  let spanText = "";

  let hours = time.getHours().toString().padStart(2, "0");
  binary_vals.push(Number(hours[0]).toString(2).padStart(4, "0"));
  binary_vals.push(Number(hours[1]).toString(2).padStart(4, "0"));

  let minutes = time.getMinutes().toString().padStart(2, "0");
  binary_vals.push(Number(minutes[0]).toString(2).padStart(4, "0"));
  binary_vals.push(Number(minutes[1]).toString(2).padStart(4, "0"));

  let seconds = time.getSeconds().toString().padStart(2, "0");
  binary_vals.push(Number(seconds[0]).toString(2).padStart(4, "0"));
  binary_vals.push(Number(seconds[1]).toString(2).padStart(4, "0"));

  // showing logic
  for (let i = 0; i < blocks.length; i++) {
    const values = blocks[i].getElementsByClassName("bit_val");
    for (let j = 0; j < 4; j++) {
      values[j].innerText = binary_vals[i][j];
      values[j].classList.toggle("on", binary_vals[i][j] == "1");
    }
  }
  setTimeout(updateTime, 1000);
}

setTimeout(updateTime, 1000);
