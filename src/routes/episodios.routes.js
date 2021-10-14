const express =  require('express');
const router = express.Router();
const Episodio = require('../models/episodio');

router.get('/temporada/:temporada',async (req,res) => {
  try{
    const temporada_id = req.params.temporada;
    const episodios = await Episodio.find({
      temporada_id,
    });

    res.json({error: false, episodios});
  }catch(err){
    res.json({error: true,message: err.message});
  }
})

module.exports = router;
