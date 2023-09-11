/** takes as props the username of the user who wrote the tweet,
 * the name of the user who wrote the tweet,
 * the date of the tweet, and the message being tweeted..*/

function Tweet(props) {
  return (
    <div>
      <span class="username">{props.username}</span>
      <div>{props.name} joined on </div>
      <span className="date">{props.date}</span>
      <p>message: {props.message}</p>
      <div> </div>
    </div>
  );
}
