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

  return parseInt(input, bases[base]);
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

function handleConvert() {
  const input = document.getElementById("numberInput").value.trim();
  const base = document.getElementById("baseSelect").value;
  const output = document.getElementById("output");

  try {
    const result = convert(input, base);
    output.textContent = JSON.stringify(result, null, 2);
  } catch (err) {
    output.textContent = err.message;
  }
}
