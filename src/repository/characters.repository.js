const fs = require('node:fs/promises');
const { setTimeout } = require('node:timers/promises');
const path = require('node:path');

const dataPath = path.join(__dirname, '../db/data.json');

// Read JSON file
async function readCharacters() {
  const raw = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(raw);
}

 // Override existing file content with new
async function writeCharacters(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

async function getAllCharacters() {
  const data = await readCharacters();
  return data.characters;
}

async function getCharacterById(id) {
  const data = await readCharacters();
  return data.characters.find(char => char.id === id);
}

async function getCharacterByIdSlowed(id) {
  await setTimeout(60_000);
  const data = await readCharacters();
  return data.characters.find(char => char.id === id);
}

async function createCharacter({ name, profession, race }) {
  const data = await readCharacters();

  const character = {
    id: data.characters.length + 1,
    name,
    profession,
    race
  };

  data.characters.push(character);

  await writeCharacters(data);

  return character;
}

async function updateCharacter(id, { name, profession, race }) {
  const data = await readCharacters();

  const index = data.characters.findIndex(char => char.id === id);
  if (index === -1) {
    return null;
  }

  // Update the existing object without changing its position
  data.characters[index] = {
    ...data.characters[index],
    name,
    profession,
    race
  };

  await writeCharacters(data);
  return data.characters[index];
}

async function deleteCharacter(id) {
  const data = await readCharacters();

  const index = data.characters.findIndex(char => char.id === id);
  if (index === -1) {
    return false;
  }

  const deleted = data.characters.splice(index, 1)[0];

  await writeCharacters(data);
  return deleted;
}

module.exports = {
  getAllCharacters,
  getCharacterById,
  getCharacterByIdSlowed,
  createCharacter,
  updateCharacter,
  deleteCharacter
};