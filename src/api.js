const findThing = async function(id, type) {
  if (!id) {
    return {};
  }
  const result = await fetch(
    `/.netlify/functions/geekitems?id=${window.encodeURIComponent(
      id
    )}&type=${window.encodeURIComponent(type)}`
  );
  if (result.status !== 200) {
    throw new Error("bad status = " + result.status);
  }
  const json = await result.json();
  return json.msg;
};

const findVersions = async function(id) {
  if (!id) {
    return {};
  }
  const result = await fetch(
    `/.netlify/functions/linkeditems?id=${window.encodeURIComponent(id)}`
  );
  if (result.status !== 200) {
    throw new Error("bad status = " + result.status);
  }
  const json = await result.json();
  return json.msg;
};

const searchGame = async function(text, abortSignal) {
  const result = await fetch(
    `/.netlify/functions/gamesearch?query=${window.encodeURIComponent(text)}`,
    {
      mode: "cors",
      signal: abortSignal
    }
  );
  if (result.status !== 200) {
    throw new Error("bad status = " + result.status);
  }
  const json = await result.json();
  return json.msg;
};

export { findThing, findVersions, searchGame };
