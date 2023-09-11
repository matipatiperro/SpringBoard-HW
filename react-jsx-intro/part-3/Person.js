// Create a component called *Person*. Inside of this component, render a *p* tag which displays
//“Learn some information about this person”. Each person should have name and age properties.

// If the person is over 18 years old, display an additional *h3* that says “please go vote!”.
//Otherwise, display an *h3* that says “you must be 18”. If the person’s name is longer than 8 characters,
//only display the first six characters of their name.
function Person({ age, name }) {
  let voteText = "";
  if (age >= 18) {
    voteText = "please go vote!";
  } else {
    voteText = "you must be 18";
  }
  return (
    <div>
      <p>Learn some information about this person:</p>
      <ul>
        <li>Name: {name.slice(0, 6)}</li>
        <li>Age: {age}</li>
      </ul>
      <h3>{voteText}</h3>
    </div>
  );
}
