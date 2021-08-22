import { useState, useEffect } from "react";
import "./styles.css";
const apikey = "PCW8V-VYDCR-7HTSX-L9YMB";

export default function App() {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [surname, setSurname] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://ws.postcoder.com/pcw/${apikey}/address/uk/'${postcode}'`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => setData(response))
      .catch((error) => console.log(error));
  }, [postcode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { name, surname, secondName, postcode, email, data };

    fetch("http://mockbin.org/bin/eb9f8556-ff61-41c7-bd65-b144531d6058", {
      method: "POST",
      headers: {
        cookie: "foo=bar; bar=baz",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Second Name"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="ex WC2N 5DU"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        {data.map((d, i) => (
          <div key={i}>
            <div className="input">{d.street}</div>
            <div className="input">{d.number}</div>
            <div className="input">{d.postcode}</div>
            <div className="input">{d.posttown}</div>
          </div>
        ))}
        <input
          type="text"
          required
          placeholder="email@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Add post</button>
      </form>
    </div>
  );
}
