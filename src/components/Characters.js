import React, { useRef, useEffect, useState } from "react";
import env from "react-dotenv";
import md5 from "md5";

const Characters = () => {
  const apiPublic = process.env.REACT_APP_PUBLIC_KEY;
  const apiPrivate = process.env.REACT_APP_PRIVATE_KEY;
  const date = new Date();
  const timeStamp = date.getTime();
  console.log(timeStamp);
  const hashString = timeStamp + apiPrivate + apiPublic;
  let hash = md5(hashString);
  const searchname = "Thor";

  const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchname}&ts=${timeStamp}&apikey=${apiPublic}&hash=${hash}`;
  console.log(apiUrl);
  console.log("this is hash", hash);

  const [characters, setCharacters] = useState(null);

  const getCharacters = useRef(() => {});
  getCharacters.current = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setCharacters(data);
    console.log(characters);
  };

  useEffect(() => {
    getCharacters.current();
  }, []);

  const loaded = () => {
    return characters.data.results.map((character, index) => {
      const imgJoin = [
        `${character.thumbnail.path}`,
        `.`,
        `${character.thumbnail.extension}`,
      ];
      const newImgString = imgJoin.join("");
      return (
        <div className="container">
          <h1 className="title">{character.name}</h1>
          <img src={newImgString} alt="thumbnail" />
        </div>
      );
    });
  };
  const loading = () => {
    return <h1 className="loading">Loading...</h1>;
  };
  return characters ? loaded() : loading();
};

export default Characters;
