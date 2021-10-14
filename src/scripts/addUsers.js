const database = require('../services/database');

const Usuario = require('../models/usuario');
const usuariosJson = require('../data/usuario.json');

const addUsers = async () => {
    try{
      for(let user of usuariosJson){
        console.log(`Iserindo ${user.nome}`);
        await new Usuario(user).save();
      }
      console.log('Final do script');
    }catch(err){
      console.log(err.message);
    }
}

addUsers();