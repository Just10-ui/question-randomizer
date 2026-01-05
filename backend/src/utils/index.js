const array = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];

//* Shuffle the questions
export const shuffle = (array) => {
  return array.map(item => ({item, sort: Math.random()}))
              .sort((a, b) => a.sort - b.sort)
              .map(obj => obj.item);
};

console.log(shuffle(array));