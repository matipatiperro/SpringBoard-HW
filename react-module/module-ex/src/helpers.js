// This file should export two array helper functions:

// - *choice(items)*: returns a randomly selected item from array of items
// - *remove(items, item)*: removes the first matching item from items, if item exists, and returns it.
// Otherwise returns undefined.

function choice(items) {
  let rdm = Math.floor(Math.random() * items.length);
  return rdm;
}

function remove(items, item) {
  let loc = items.indexOf(item);
  if (loc === -1) return undefined;
  return [...items.slice(0, loc), ...items.slice(loc + 1, items.length)];
}
export { choice, remove };
