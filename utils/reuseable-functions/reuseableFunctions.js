/**
 * Preprocesses text by converting it to lowercase, removing punctuation,
 * and splitting it into tokens.
 * @param {string} text - The text to preprocess.
 * @return {Array} - An array of normalized tokens.
 */
export function preprocessText(text) {
    // Convert text to lowercase
    const lowerCased = text.toLowerCase();

    // Remove punctuation using a regular expression
    const cleanedText = lowerCased.replace(/[^\w\s]/g, '');

    // Split text into tokens (words)
    const tokens = cleanedText.split(/\s+/);

    return tokens.filter(token => token.length > 0); // Remove empty tokens
}