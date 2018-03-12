"use strict";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("lootbag.sqlite");

// helper function for splitting names
// Add after initital getToysByChild tests pass and we want to split a name again in addToy
function splitName(nameStr) {
  return nameStr.split(" ");
}

module.exports.getToysByChild = name => {
  const [first, last] = splitName(name);
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM toys
      JOIN children
      ON toys.child_id = children.child_id
      WHERE children.first_name = "${first}"
      AND children.last_name = "${last}"`,
      (err, toyData) => {
        if (err) return reject(err);
        // console.log(toyData)
        const toyResult =
          toyData.length > 0 ? toyData : "This child has no toys in the bag";
        resolve(toyResult);
      }
    );
  });
};

module.exports.addToy = (toy, name) => {
  const [first, last] = splitName(name);
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO toys
    VALUES(
      null,
      "${toy}",
      0,
      ( SELECT child_id FROM children WHERE first_name = "${first}" AND last_name = "${last}")
    )`,
      function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      }
    );
  });
};

module.exports.removeToy = (toy, child) => {
  const [first, last] = splitName(child);
  console.log("toy", toy, first, last);
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM toys
      WHERE name = "${toy}"
      AND toys.child_id IN (
        SELECT c.child_id from children c
        JOIN toys t
        ON c.child_id = t.child_id
        WHERE c.first_name = "${first}"
        AND c.last_name="${last}"
      )`,
      function(err) {
        if (err) return reject(err);
        console.log("changes", this.changes);
        resolve(this.changes === 0
          ? "Cannot delete. Please confirm the toy belongs to the child"
          : "Toy removed from database");
      }
    );
  });
};

module.exports.getGoodChildren = () => {
  return new Promise( (resolve, reject) => {
    db.all(`SELECT first_name || " " || last_name as name, isGood
    FROM children
    WHERE isGood = 1`,
    (err, children) => {
      // console.log('children', children );
      resolve(children);
    });
  });
};

module.exports.makeChildHappy = (child) => {
  return new Promise( (resolve, reject) => {
    const [first, last] = splitName(child);
    db.run(
    `UPDATE toys
    SET delivered = 1
    WHERE toys.child_id IN (
      SELECT c.child_id from children c
      WHERE c.first_name = "${first}"
      AND c.last_name = "${last}"
    )`, function(err) {
      if(err) return reject(err);
      console.log("changes to Yeraldi", this.changes);
      resolve("Toys marked as delivered!")
    });
  });
};
