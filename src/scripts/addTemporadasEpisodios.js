const database = require('../services/database');
const Filme = require('../models/filme');
const Temporada = require('../models/temporada');
const Episodio = require('../models/episodio');


const addTemporadasEpisodios = async () => {
    try{
      const series = await Filme.find({tipo: 'serie'}).select('_id');
      for(let serie of series){
        console.log(`Serie ${serie}-------`);
        const numTemporadas = Math.floor(Math.random() * 5) + 1;

        for(let i = 1; i <= numTemporadas; i++){
          console.log(`Inserindo Temporada ${i} de ${numTemporadas}`);

          const temporada = await new Temporada({
            filme_id: serie,
            titulo: `Temporada ${i}`
          }).save();

          const numEpisodios = Math.floor(Math.random() * 5) + 1;
          for(let x = 1; x <= numEpisodios; x++){
            console.log(`Inserindo Episodios ${x} de ${numEpisodios}`);
            await new Episodio({
              temporada_id: temporada._id,
              titulo: `Episodio ${x}`,
              descricao: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
              numero: x,
              capa: 'https://picsum.photos/300/200'
            }).save()
          }
        }
      }

      console.log('Final do Script');
    }catch(err){
      console.log(err.message);
    }
}

addTemporadasEpisodios();