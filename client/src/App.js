import './App.css';

import { useState, useEffect } from 'react';

function App() {
  const URL_TO_FETCH = 'http://localhost:8000/';

  const [data, setData] = useState([]);
  const[atualizar, setAtualizar] = useState(0);

  function getData() {
    fetch(URL_TO_FETCH+"data", {
      method: 'get' // opcional
    })
    .then(function(response) {
      response.text()
      .then(function(result) {
        console.log("resultado" + result);
        setData(JSON.parse(result));
      })
    })
    .catch(function(err) { 
      console.error(err);
    });
  }

  function like(id) {
    setAtualizar(atualizar + 1);
    fetch(URL_TO_FETCH+"data/like/" + id, {
      method: 'put',
      body: JSON.stringify({
        id
      })
    })
    .then(function(response) {
      response.text()
      .then(function(result) {
        console.log("resultado" + result);
      })
    })
    .catch(function(err) { 
      console.error(err);
    });
  }

  function dislike(id) {
    setAtualizar(atualizar + 1);
    fetch(URL_TO_FETCH+"data/dislike/" + id, {
      method: 'put',
      body: JSON.stringify({
        id
      })
    })
    .then(function(response) {
      response.text()
      .then(function(result) {
        console.log("resultado" + result);
      })
    })
    .catch(function(err) { 
      console.error(err);
    });
  }

  function sortear() {
    setAtualizar(atualizar + 1);
    fetch(URL_TO_FETCH+"data/sortear", {
      method: 'get' // opcional
    })
    .then(function(response) {
      response.text()
      .then(function(result) {
        console.log("resultado" + result);
      })
    })
    .catch(function(err) { 
      console.error(err);
    });
  }


  useEffect(() => {
    getData();
  },[atualizar]);

  return (
    <div className="App">
      <div className="header">
        EnemEu
      </div>
      <div className="add">
        <button onClick = {() => sortear()}>Sortear Conteúdo</button>
      </div>
      <div className="lista">
        {data.map((item, id) => (
          <div className="div-item" key={id}>
              <p id="conteudo">{item.conteudo}</p>
              <p>{item.materia}</p>
            <div className="like-dislike">
              <p id="item-quantidade">{item.quantidade}</p>
              <button id = "like" onClick = {() => like(item.id)}>↑</button>
              <button id = "dislike" onClick = {() => dislike(item.id)}>↓</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
