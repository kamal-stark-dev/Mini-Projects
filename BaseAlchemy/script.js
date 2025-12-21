console.log("I like your MoM <3");

const validators = {
  binary: /^[01]+$/,
  octal: /^[0-7]+$/,
  decimal: /^[0-9]+$/,
  hexadecimal: /^[0-9a-fA-F]+$/,
};

function isValid(input, base) {
  return validators[base].test(input);
}

function toDecimal(input, base) {
  const bases = {
    binary: 2,
    octal: 8,
    decimal: 10,
    hexadecimal: 16,
  };

  if (!isValid(input, base)) {
    throw new Error(`Invalid ${base} number`);
  }

  return parseInt(input, bases[base]); // parseInt('0101', 2); -> 5
}

function fromDecimal(decimalValue) {
  return {
    binary: decimalValue.toString(2),
    octal: decimalValue.toString(8),
    decimal: decimalValue.toString(10),
    hexadecimal: decimalValue.toString(16).toUpperCase(),
  };
}

function convert(input, base) {
  const decimalValue = toDecimal(input, base);
  return fromDecimal(decimalValue);
}

function addPrefix(value, base, programmingMode) {
  if (!programmingMode) return value;

  switch (base) {
    case "binary":
      return "0b" + value;
    case "octal":
      return "0o" + value;
    case "hexadecimal":
      return "0x" + value;
    default:
      return value; // decimal stays naked
  }
}

function handleConvert() {
  const input = document.getElementById("numberInput").value.trim();
  const base = document.getElementById("baseSelect").value;
  const output = document.getElementById("output");
  const programmingMode = document.getElementById("programmingMode").checked;

  output.innerHTML = "";

  try {
    const result = convert(input, base);

    Object.entries(result).forEach(([label, rawValue]) => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.gap = "8px";
      row.style.marginBottom = "6px";

      const baseLabel = document.createElement("strong");
      baseLabel.textContent = label + ":";

      const value = addPrefix(rawValue, label, programmingMode);

      const baseValue = document.createElement("span");
      baseValue.textContent = value;
      baseValue.style.cursor = "pointer";
      baseValue.title = "Click to copy";

      baseValue.addEventListener("click", async () => {
        await navigator.clipboard.writeText(value);

        const originalText = baseValue.textContent;
        baseValue.textContent = "Copied!";
        baseValue.style.color = "green";

        setTimeout(() => {
          baseValue.textContent = originalText;
          baseValue.style.color = "";
        }, 800);
      });

      row.appendChild(baseLabel);
      row.appendChild(baseValue);
      output.appendChild(row);
    });
  } catch (err) {
    output.textContent = err.message;
  }
}

document
  .getElementById("programmingMode")
  .addEventListener("change", handleConvert);
