import React from "react";
import "./Joke.css";

function Joke2({ vote, votes, text, id }) {
  function upvote(evt) {
    vote(id, +1);
  }
  function downVote(evt) {
    vote(id, -1);
  }
  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={upvote}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={downVote}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke2;
