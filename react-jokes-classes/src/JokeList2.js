import React, { useState } from "react";
import axios from "axios";
import Joke2 from "./Joke2";
import "./JokeList.css";

function JokeList2({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getJokes() {
    let buildJokes = [...jokes];
    let seenJokes = new Set();
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      while (buildJokes.length < props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { ...jokeRes } = res.data;

        if (!seenJokes.has(jokeRes.id)) {
          seenJokes.add(jokeRes.id);
          buildJokes.push({ ...jokeRes, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }

      setJokes = buildJokes;
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
    if (jokes.length === 0) getJokes();
  }
  /* empty joke list and then call getJokes */

  function generateNewJokes() {
    setJokes([]);
    setIsLoading(true);
  }

  /* change vote for this id by delta (+1 or -1) */

  function vote(id, delta) {
    setJokes((st) => ({
      jokes: st.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ),
    }));
  }
  /* render: either loading spinner or list of sorted jokes. */

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  }
  let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={this.generateNewJokes}>
        Get New Jokes
      </button>

      {sortedJokes.map((j) => (
        <Joke2 text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
      ))}
    </div>
  );
}
export default JokeList2;
