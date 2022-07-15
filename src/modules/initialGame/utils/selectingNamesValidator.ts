const maxSymbolsInName = 15;

const emptyNameMessage = 'Name is empty!';
const largeNameMessage = `Name should be less then ${maxSymbolsInName} symbols!`;

export const selectingNamesValidator = (nameFields: {
  [key: string]: string;
}) => {
  return Object.keys(nameFields).reduce((acc, key) => {
    if (!nameFields[key].length) {
      acc[key] = emptyNameMessage;
    } else if (nameFields[key].length > maxSymbolsInName) {
      acc[key] = largeNameMessage;
    }
    return acc;
  }, {} as { [key: string]: string });
};
