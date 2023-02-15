import React, { useState, useEffect, useCallback } from "react";

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    // fetch("https://swapi.dev/api/films/")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     const transformedMovies = data.results.map((movieData) => {
    //       return {
    //         id: movieData.episode_id,
    //         title: movieData.title,
    //         openingText: movieData.opening_crawl,
    //         releaseDate: movieData.release_date,
    //       };
    //     });
    //     setMovies(transformedMovies);
    //   });

    // .then 을 체이닝 메소드 형식으로 쓸 수도 있지만
    // async / await 으로 쓰게 될 경우 코드가 좀 더 읽기 쉬워진다.
    try {
      // const response = await fetch("https://swapi.dev/api/films/");
      // firebase-endpoint : https://console.firebase.google.com 에서 Realtime Database 확인
      const response = await fetch("https://firebase-endpoint/movies.json");
      if (!response.ok) {
        throw new Error(`에러가 발생했습니다! (${response.status})`);
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      // setMovies(transformedMovies);

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler])

  const addMovieHandler = async (movie) => {
    const response = await fetch("https://firebase-endpoint/movies.json", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p>결과가 없습니다.</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>불러오는 중...</p>
  }

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: "Some Dummy Movie",
  //     openingText: "This is the opening text of the movie",
  //     releaseDate: "2021-05-18",
  //   },
  //   {
  //     id: 2,
  //     title: "Some Dummy Movie 2",
  //     openingText: "This is the second opening text of the movie",
  //     releaseDate: "2021-05-19",
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>
          영화 리스트 불러오기
        </button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && (content)}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>불러오는 중...</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
