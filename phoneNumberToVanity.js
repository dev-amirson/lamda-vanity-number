const numberToLetters = {
    '2': ['A', 'B', 'C'],
    '3': ['D', 'E', 'F'],
    '4': ['G', 'H', 'I'],
    '5': ['J', 'K', 'L'],
    '6': ['M', 'N', 'O'],
    '7': ['P', 'Q', 'R', 'S'],
    '8': ['T', 'U', 'V'],
    '9': ['W', 'X', 'Y', 'Z']
};
const combinations = [];
const generateCombinations = (prefix, remainingDigits) => {
    console.log("digits", remainingDigits);
    if (remainingDigits.length === 0) {
       
        return [prefix];
    }
    const digit = remainingDigits.charAt(0);
    const letters = numberToLetters[digit] || [];

    for (const letter of letters) {
        combinations.push(...generateCombinations(prefix + letter, remainingDigits.slice(1)));
    }

    

    return combinations;
};

const phoneNumberToVanity = (phoneNumber) => {
    const digits = phoneNumber.replace(/[^\d]/g, '').replace(/[01]/g, '');
    return generateCombinations('', digits);
};

module.exports = phoneNumberToVanity;

