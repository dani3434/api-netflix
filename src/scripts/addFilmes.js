const database = require('../services/database');

const Filme = require('../models/filme');
const filmesJson = require('../data/filme.json');

const addFilmes = async () => {
    try{
      for(let filme of filmesJson){
        console.log(`Iserindo ${filme.titulo}`);
        await new Filme(filme).save();
      }
      console.log('Final do script');
    }catch(err){
      console.log(err.message);
    }
}

addFilmes();