const router = require('express').Router();
const multer = require('multer');
const pokemonController = require('./controller');

router.get('/', multer().none(), pokemonController.release);
router.get('/catch', multer().none(), pokemonController.catchPokemon);
router.get('/release', multer().none(), pokemonController.release);
router.delete('/delete/:id', multer().none(), pokemonController.deletePokemon);
router.put('/rename/:id', multer().none(), pokemonController.renamePokemon);

module.exports = router;