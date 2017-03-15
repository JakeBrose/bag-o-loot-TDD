// Items can be added to bag, and assigned to a child.
// The first argument is the gift to be delivered. The second argument is the name of the child.
// Items can be removed from bag, per child. Removing ball from the bag should not be allowed. A child's name must be specified.
// Must be able to list all children who are getting a toy.
// Must be able to list all toys for a given child's name.
// Must be able to set the delivered property of a child, which defaults to false, to true.
const { assert: { isTrue, equal } } = require('chai');
const { getToysByChild, addToy, removeToy, getListOfChildren, makeChildHappy } = require('../lootbag');

describe('lootBag', () => {
  describe('getToysByChild', () => {
    it('should return an array', () => {
      let result = getToysByChild();
      isTrue(Array.isArray(result));
    });
  });

  describe('addToy',  () => {
    it('should verify that a toy was added', () => {
      let expected = "Toy added to database";
      equal(expected, addToy());
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
