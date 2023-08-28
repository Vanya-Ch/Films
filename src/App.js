
import Movies from "./assets/context/MovieContext";
import "./assets/style/style.scss";
import React, { useState, useEffect } from "react";

const API_KEY = "f712bd940293ac6859d9acfd93d4fe40";


function App(){

  const [movies, setMovies] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  
  const [ totalPages, setTotalPages ] = useState();
  const [query, setQuery] = useState("");
    

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`)
        .then((res) => res.json())
        .then((data) => {
            setTotalPages(data.total_pages)
            setMovies(data.results)
        })
    },[currentPage]);

    

    function handlePreviousPage() {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  
    function handleNextPage() {
      setCurrentPage(currentPage + 1);
    }

    const searchMovies = async(e)=>{
      e.preventDefault();
      console.log("Searching")
      try{
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`;
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results)
      }
      catch(er){
        console.log(er)
      }
    }

    const changeHandler = (e) =>{
      setQuery(e.target.value);
    }

  return(
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__content">
            <a href="./" target="_self">
              <h1 className="header__name" href="/home">
                ~Movie DB~
              </h1>
            </a>
            <a href="./" target="_self">
              <div className="header__pop" href="/home">
                Popular
              </div>
            </a>
            <form className="header__form" name="query" onSubmit={searchMovies} value={query}>
              <input className="header__form--input" type="search" placeholder="Enter film name" onChange={changeHandler}/>
              <button className="header__form--button" type="submit">Search</button>
            </form>
          </div>
        </div>
      </header>
      <main className="main">
          {movies.length > 0 ? (
            <div className="container">
            <div className="section-movies">
            {movies.map((movie) =>
              <Movies key={movie.id} {...movie}/>
            )}
            </div>
          </div>
          ) : (
            <div className="noResults">
              Sorry No Results !!!
            </div>
          )}
          <div className={query ? "pagination hidden" : "pagination"}>
            <div className="pagination__container">
              <div className="pagination__content">
                <button className="pagination__buttons" onClick={handlePreviousPage} type="button">
                    Prev
                </button>
                <div className="pagination__numbers">
                    {currentPage}/{totalPages}
                </div>
                <button className="pagination__buttons" onClick={handleNextPage} type="button">
                    Next
                </button>
              </div>
            </div>
          </div>
      </main>
    </>
  )
};

export default App;
