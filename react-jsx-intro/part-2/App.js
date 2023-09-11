function App() {
  return (
    <div class="tweet">
      <Tweet
        username="Bob123"
        name="Bob"
        date="09/08/23"
        message="bob was here"
      />
      <Tweet
        username="Chad123"
        name="Chad"
        date={new Date().toDateString()}
        message="Chad was here"
      />
      <Tweet
        username="Ben123"
        name="Ben"
        date={new Date().toDateString()}
        message="Ben was here"
      />
    </div>
  );
}
