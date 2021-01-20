export const CaseToSentence = (word: string) => {
  var result = word.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};
