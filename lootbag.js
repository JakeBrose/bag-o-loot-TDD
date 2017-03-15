'use strict';

const { readFile, writeFile } = require('fs'),
      toyDataFile = 'data/toyData.json';

module.exports.getToysByChild = (childName) => {
  return new Promise( (resolve, reject) => {
    readFile('data/toyData.json', (err, data) => {
      if (err) return reject(err);
      let toys = JSON.parse(data).toys[childName].toyList;
      resolve(toys);
    });
  });
};

module.exports.addToy = (toy, childName) => {
    return new Promise( (resolve, reject) => {
    readFile(toyDataFile, (err, data) => {
      if (err) reject(err);

      let toyData = JSON.parse(data);
      let toyList = toyData.toys[childName] ?
      toyData.toys[childName].toyList :
      null;

      // does child's list exist, and is the toy not in the list?
      if (toyList !== null && toyList.indexOf(toy) === -1) {
        // console.log("adding to existing array", toy );
        toyList.push(toy);
      } else {
        toyData.toys[childName] = {
          delivered: false,
          toyList: [toy]
        }
      }
      writeFile(toyDataFile, JSON.stringify(toyData), (err) => {
        if (err) reject(err);
        resolve("New toy added");
      });
    });
  });
};

module.exports.removeToy = () => {
  return "Toy removed from database";
};

module.exports.getListOfChildren = () => {
  return [];
};

module.exports.makeChildHappy = () => {
  return true;
};
