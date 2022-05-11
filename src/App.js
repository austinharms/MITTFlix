import React from "react";
import Header from "./components/Header/Header";
import MoiveList from "./components/Moives/MoiveList";

class App extends React.Component {
  state = {
    likedMoives: [],
    searchResults: [],
  };

  async componentDidMount() {
    const moives = await this.getDiscoverMovies();
    console.log(moives);
    this.setState((curState) => ({
      ...curState,
      searchResults: moives,
    }));
  }

  onSearchMoives = async (query, pageCount = 5) => {
    const moives = [];
    if (query && query.trim() && query.length >= 2) {
      const requests = [];
      for (let i = 1; i <= pageCount; ++i) {
        requests.push(this.getMovies(query, i));
      }

      const results = await Promise.all(requests);
      results.forEach((moiveArr) => moives.push(...moiveArr));
    }

    this.setState((curState) => ({
      ...curState,
      searchResults: moives,
    }));
  };

  onToggleMoiveLike = (id) => {
    this.setState((curState) => {
      if (curState.likedMoives.includes(id)) {
        return {
          ...curState,
          likedMoives: curState.likedMoives.filter((movieId) => movieId !== id),
        };
      } else {
        return {
          ...curState,
          likedMoives: [...curState.likedMoives, id],
        };
      }
    });
  };

  getMovies = async function (query, page) {
    const APIURL = "https://api.themoviedb.org/3/";

    try {
      const req = await fetch(
        `${APIURL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=${page}`
      );

      if (!req.ok) {
        throw new Error("fetch status not OK");
      }

      const moives = await req.json();
      return moives.results;
    } catch (e) {
      return [];
    }
  };

  getDiscoverMovies = async function () {
    const APIURL = "https://api.themoviedb.org/3/";
    console.log(process.env);
    try {
      const req = await fetch(
        `${APIURL}discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      if (!req.ok) {
        throw new Error("fetch status not OK");
      }

      const moives = await req.json();
      return moives.results;
    } catch (e) {
      return [];
    }
  };

  render() {
    return (
      <>
        <Header onSearch={this.onSearchMoives} />
        <MoiveList
          moives={this.state.searchResults}
          likedMoives={this.state.likedMoives}
          onToggleLike={this.onToggleMoiveLike}
        />
      </>
    );
  }
}

export default App;
