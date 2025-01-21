function generateRandomAlphaNumeric(length, specificCase) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }

  if(specificCase && specificCase === 'lowercase'){
    return result.toLowerCase()
  } else if (specificCase && specificCase === 'uppercase'){
    console.log("UPPERCASE");
    console.log(result.toUpperCase());
    return result.toUpperCase()
  }

  return result;
}

function sessionCodeFromName(sesisonName) {
  const string = sesisonName.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();
  const elements = string.split(" ");
  console.log(elements);
  
  const acronym = elements.map((str) => str[0]).join("").toUpperCase();
  const combined = acronym + generateRandomAlphaNumeric(5, 'uppercase');
  console.log(combined)
  return combined.slice(0,5);
}

module.exports = { generateRandomAlphaNumeric, sessionCodeFromName };
