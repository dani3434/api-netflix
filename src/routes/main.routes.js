const express = require('express');
const router = express.Router();
const _ = require('underscore');
const Filme = require('../models/filme');
const Temporada = require('../models/temporada');
const Temporadas = require('../models/temporada');


// Recuperar a tela home
router.get('/home', async (req, res) => {
  try {
    //  Recuperar todos os filmes
    let filmes = await Filme.find({});
    let finalFilmes = [];

    //  Recuperando temporadas
    for (let filme of filmes) {
      const temporadas = await Temporada.find({
        filme_id: filme._id,
      });

      const newFilme = { ...filme._doc, temporadas };
      finalFilmes.push(newFilme);
    }

    // Misturar resultados aleatoriamente
    finalFilmes = _.shuffle(finalFilmes);

    // Filme principal
    const principal = finalFilmes[0];
  
    // separar em seção
    const secoes = _.chunk(finalFilmes,5);

    res.json({error: false,principal,secoes})
  } catch (err) {
    res.json({ error: true, message: err.menssage })
  }
})


// RECUPERAR TODOS OS REGISTROS
router.get('/', async (req, res) => {
  try {
    const filmes = await Filme.find({});
    res.json({ error: false, filmes });
  } catch (err) {
    res.json({ error: true, menssage: err.message });
  }
})

// PEGAR SOMENTE O REGISTROS COM ID:
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filme = await Filme.findById(id)
    res.json({ error: false, filme });
  } catch (err) {
    res.json({ error: true, menssage: err.message });
  }
})

// CRIAR UM REGISTRO
router.post('/', async (req, res) => {
  try {
    const filme = req.body;
    const response = await new Filme(filme).save();
    res.json({ error: false, filme: response });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
})

// ATUALIZAR SOMENTE O REGISTROS COM ID:
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const novoFilme = req.body;
    const filmeAtualizado = await Filme.findByIdAndUpdate(id, novoFilme);

    res.json({ error: false, filmeAtualizado });
  } catch (err) {
    res.json({ error: true, menssagem: err.message });
  }
})

// Deletar SOMENTE O REGISTROS COM ID:
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Filme.findByIdAndDelete(id);
    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, menssagem: `DELETAR SOMENTE O REGISTROS COM ID: ${id}` });
  }
})

module.exports = router;

