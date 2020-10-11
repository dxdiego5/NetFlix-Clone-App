import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './componentes/MovieRow';
import FeaturedMovie from './componentes/FeaturedMovie';
import Header from './componentes/Header';


export default () => {
 
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() =>{
    const loadAll = async () =>{
      //Pegando a lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o filme em destaque Fwatured
      let originals = list.filter(i=>i.slug === 'originals');
      let radomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[radomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();

  }, []);

    useEffect(() => {
      const scrollListener = () => {
        if(window.scrollY > 10){
          setBlackHeader(true);
        }else{
          setBlackHeader(false);
        }
      }

      window.addEventListener('scroll', scrollListener);
      return() => {
        window.removeEventListener('scroll', scrollListener);
      }
    }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Feito com <span className="footer-icon" role="img" aria-label="coração"> ♥ </span> por Diego Felipe da Slva Bez
          Direitos de imagens da NETFLIX
      </footer>

      {movieList.length <=0 &&
        <div className="loading">
          <img src="Loading.gif" alt="Carregando"></img>
        </div>
      }
    </div>
  )
}