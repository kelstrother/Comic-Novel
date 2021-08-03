import React, { useRef, useEffect, useState } from "react";
import env from "react-dotenv";
import md5 from "md5";
import styled from 'styled-components'

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

      const Container = styled.div`
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        width: 100vw;
        /* padding-left: 5em; */
        /* height: 100vh; */
      `;
      const Name = styled.h1`
      text-align: center;
      color: #fff;
      margin: 0;
      `
      const CharacterImg = styled.img`
      display: inline-block;
      width: 250px;
      height: 250px;
      `
      const CharacterRow = styled.div`
      display: flex;
      width: 90vw;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      /* height: 10vh; */
      padding-bottom: 2em;
      `
      return (
        <Container className="container">
          <CharacterRow className="character-info">
            <CharacterImg src={newImgString} alt="thumbnail" />
            <Name className="title">{character.name}</Name>
          </CharacterRow>
        </Container>
      );
    });
  };
  const loading = () => {
    return <h1 className="loading">Loading...</h1>;
  };
  return characters ? loaded() : loading();
};

export default Characters;
