const express = require('express');
const router = express.Router();
const charactersRepository = require('../../repository/characters.repository');
const authMiddleware = require('../../middleware/auth.middleware');

// Swagger docs for this router
require('./characters.swagger');

/**
 * GET /api/characters
*/
router.get('/', async (req, res) => {
  const characters = await charactersRepository.getAllCharacters();
  return res.send(characters);
});

/**
 * GET /api/characters/:id
*/
router.get('/:id', async (req, res) => {
  const charId = parseInt(req.params.id, 10);

  if (!charId || charId < 1) {
    return res.status(400).send({ status: 400, message: 'Invalid id provided!' });
  }

  const character = await charactersRepository.getCharacterById(charId);

  if (!character) {
    return res.status(404).send({ status: 404, message: 'Character not found!' });
  }

  res.send(character);
});


/**
 * GET /api/characters/:id/slow
*/
router.get('/:id/slow', async (req, res) => {

  const charId = parseInt(req.params.id, 10);

  if (!charId || charId < 1) {
    return res.status(400).send({ status: 400, message: 'Invalid id provided!' });
  }

  const character = await charactersRepository.getCharacterByIdSlowed(charId);
  res.setHeader('X-Response-Duration', '60 000ms');

  if (!character) {
    return res.status(404).send({ status: 404, message: 'Character not found!' });
  }

  res.send(character);
});

/**
 * POST /api/characters/new
*/
router.post('/new', authMiddleware, async (req, res) => {

  if (!req.body) {
    return res.status(400).send({ status: 400, message: 'Invalid create request!' });
  }

  const newCharacter = await charactersRepository.createCharacter(req.body);
  res.status(201).send(newCharacter);
});

/**
 * PUT /api/characters/update/:id
*/
router.put('/update/:id', authMiddleware, async (req, res) => {
  const charId = parseInt(req.params.id, 10);

  if (!charId || charId < 1) {
    return res.status(400).send({ status: 400, message: 'Invalid id provided!' });
  }

  if (!req.body) {
    return res.status(400).send({ status: 400, message: 'Invalid update request!' });
  }

  const updatedCharacter = await charactersRepository.updateCharacter(charId, req.body);

  if (!updatedCharacter) {
    return res.status(404).send({ status: 404, message: 'Character not found!' });
  }

  res.send(updatedCharacter);
});

/**
 * DELETE /api/characters/delete/:id
*/
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  const charId = parseInt(req.params.id, 10);

  if (!charId || charId < 1) {
    return res.status(400).send({ status: 400, message: 'Invalid id provided!' });
  }

  const deletedCharacter = await charactersRepository.deleteCharacter(charId);

  if (!deletedCharacter) {
    return res.status(404).send({ status: 404, message: 'Character not found!' });
  }

  return res.send({ status: 200, message: 'Character deleted successfully!' });
});

/**
 * GET /api/characters/test/not-allowed
*/
router.get('/test/not-allowed', (req, res) => {
  return res
    .set('Allow', 'HEAD, OPTIONS')
    .status(405)
    .send('<h1>Method not allowed!</h1>');
});


/**
 * PUT /api/characters/update/:id/broken
*/
router.put('/update/:id/broken', authMiddleware, async (req, res) => {

  // random response
  const oneOrZero = (Math.random() >= 0.5) ? 1 : 0;

  if (!oneOrZero) {
    return res
      .set('Allow', 'HEAD, OPTIONS, GET')
      .status(405)
      .send('<h1>Method not allowed!</h1>');
  }

  res.set('Allow', 'HEAD, OPTIONS, GET, PUT');

  const charId = parseInt(req.params.id, 10);

  if (!charId || charId < 1) {
    return res.status(400).send({ status: 400, message: 'Invalid id provided!' });
  }

  if (!req.body) {
    return res.status(400).send({ status: 400, message: 'Invalid update request!' });
  }

  const updatedCharacter = await charactersRepository.updateCharacter(charId, req.body);

  if (!updatedCharacter) {
    return res.status(404).send({ status: 404, message: 'Character not found!' });
  }

  res.send(updatedCharacter);
});


module.exports = router;
