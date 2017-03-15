// Items can be added to bag, and assigned to a child.
// The first argument is the gift to be delivered. The second argument is the name of the child.
// Items can be removed from bag, per child. Removing ball from the bag should not be allowed. A child's name must be specified.
// Must be able to list all children who are getting a toy.
// Must be able to list all toys for a given child's name.
// Must be able to set the delivered property of a child, which defaults to false, to true.
const { assert: { isTrue, equal, deepEqual } } = require('chai');
const { getToysByChild, addToy, removeToy, getListOfChildren, makeChildHappy } = require('../lootbag');

describe('lootBag', () => {
  describe('getToysByChild', () => {
    it('should return an array', () => {
      return getToysByChild("Timmy")
      .then( (data) => {
        isTrue(Array.isArray(data));  
      });
    });

    it('should contain a collection of strings', () => {
      let expected = `Furby, soccer ball, stuffed unicorn, Bananagrams`;
      return getToysByChild("Timmy")
      .then( (toyData) => {
        let result = toyData.join(", ");
        equal(result, expected);
      });
    });
  });

  describe('addToy', () => {
    it('should verify that a toy was added', () => {
      return addToy("Barbie Doll", "Fred")
      .then( () => {
        return getToysByChild("Fred")
      })
      .then( (toyArr) => {
        deepEqual(["Barbie Doll"], toyArr)
      });
    });
  });

  describe('removeToy', () => {
    it('should verify that a toy was removed', () => {
      let expected = "Toy removed from database";
      let result = removeToy()
      equal(expected, result);
    });
  });

  describe('getListOfChildren', () => {
    it('should return an array', () => {
      let result = getListOfChildren();
      isTrue(Array.isArray(result));
    });
  });

  describe('makeChildHappy', () => {
    it('should return true', () => {
      isTrue(makeChildHappy());
    })
  });
});
