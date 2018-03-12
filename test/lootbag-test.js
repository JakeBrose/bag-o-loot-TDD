// Must be able to set the delivered property of a child, which defaults to false, to true.
const {
  assert: { isTrue, equal, isObject, deepEqual, isArray, notInclude }
} = require("chai");
const {
  getToysByChild,
  addToy,
  removeToy,
  getGoodChildren,
  makeChildHappy
} = require("../js/lootbag");
const { createTables } = require("../db/makeTables");

describe("lootBag", () => {

  beforeEach(done => {
    createTables().then(() => {
      done();
    });
  });

  // Must be able to list all toys for a given child's name.
  describe("getToysByChild", () => {
    it("should return an array", () => {
      return getToysByChild("Sally Smith").then(data => {
        isTrue(Array.isArray(data));
      });
    });

    it("should contain a collection of objects", () => {
      return getToysByChild("Sally Smith").then(toyData => {
        isObject(toyData[0]);
      });
    });

    it("should return a message if there are no toys for a child", () => {
      return getToysByChild("Günter Berger").then(msg => {
        equal("This child has no toys in the bag", msg);
      });
    });
  });

  // Items can be added to bag, and assigned to a child.
  describe("addToy", () => {
    it("should return ID of added item", () => {
      return addToy("Barbie Doll", "Bubba Dorkus").then(lastID => {
        equal(lastID, 6);
      });
    });

    it("should add a new toy to the db", () => {
      return addToy("Barbie Doll", "Bubba Dorkus")
        .then(lastID => {
          return getToysByChild("Bubba Dorkus");
        })
        .then(toys => {
          deepEqual(toys.pop(), {
            toy_id: 6,
            name: "Barbie Doll",
            delivered: 0,
            child_id: 5,
            first_name: "Bubba",
            last_name: "Dorkus",
            isGood: 0
          });
        });
    });
  });

  // Items can be removed from bag, per child only. Removing ball from the bag should not be allowed. A child's name must be specified.
  describe("removeToy", () => {
    it("should verify that a toy was removed", () => {
      let expected = "Toy removed from database";
      return removeToy("ATV helmet", "Bubba Dorkus").then(msg => {
        equal(expected, msg);
      });
    });

    it("should only remove a toy if paired with correct child", () => {
      return removeToy("ATV helmet", "Fanny Haymaker").then(msg => {
        console.log("message", msg);
        let expected =
          "Cannot delete. Please confirm the toy belongs to the child";
        equal(expected, msg);
      });
    });
  });

  // Must be able to list all children who are getting a toy.
  describe("getGoodChildren", () => {
    it("should return an array", () => {
      return getGoodChildren().then(childData => {
        isArray(childData);
      });
    });

    it("should return only kids who are good", () => {
      return getGoodChildren().then(children => {
        children.forEach(child => {
          notInclude(child, { isGood: 0 });
        });
      });
    });
  });

  // // Must be able to set the delivered property of a child, which defaults to false to true.
  describe("makeChildHappy", () => {
    it("should return confirmation", () => {
      return makeChildHappy("Yeraldi Morales")
      .then( (msg) => {
        equal(msg, "Toys marked as delivered!");
      });
    });
  });
});
