const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock("fs");

test("Creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "2001a" },
    zookeepers
  );
  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("2001a");
});

test("Filters by query", () => {
  const startingZookeepers = [
    {
      id: "3",
      name: "Erica",
      favoriteAnimal: "gorilla",
      age: 32,
    },
    {
      id: "4",
      name: "Noel",
      favoriteAnimal: "tiger",
      age: 21,
    },
  ];
  const updatedZookeepers = filterByQuery(
    { favoriteAnimal: "gorilla" },
    startingZookeepers
  );
  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingZookeepers = [
    {
      id: "3",
      name: "Erica",
      favoriteAnimal: "gorilla",
      age: 32,
    },
    {
      id: "4",
      name: "Noel",
      favoriteAnimal: "tiger",
      age: 21,
    },
  ];

  const result = findById("3", startingZookeepers);

  expect(result.name).toBe("Erica");
});

test("validates personality traits", () => {
  const zookeeper = {
    id: "3",
    name: "Erica",
    favoriteAnimal: "gorilla",
    age: 32,
  };

  const invalidZookeeper = {
    id: "3",
    name: "Erica",
    age: 32,
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
