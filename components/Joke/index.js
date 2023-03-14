import { useState } from "react";
import useSWR from "swr";

export default function Joke() {
  const [id, setId] = useState(0);

  const [jokesInfo, setJokesInfo] = useState([]);

  const info = jokesInfo.find((info) => info.id === id) ?? { isFunny: false };

  // destructuring of info object
  const { isFunny } = info;

  const { data, isLoading } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  function handleToggleFunny(id) {
    setJokesInfo((jokesInfo) => {
      const info = jokesInfo.find((info) => info.id === id);

      if (info) {
        return jokesInfo.map((info) =>
          info.id === id ? { ...info, isFunny: !info.isFunny } : info
        );
      }
      return [...jokesInfo, { id, isFunny: true }];
    });
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>
        {data.joke}{" "}
        <span
          role="img"
          aria-label={isFunny ? "A laughing face" : "An unamused face"}
        >
          {isFunny ? "🤣" : "😒"}
        </span>
      </h1>
      <div>
        <button type="button" onClick={() => handleToggleFunny(id)}>
          {isFunny ? "Stop laughing" : "Start laughing"}
        </button>
      </div>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
