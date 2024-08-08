import { useEffect, useState } from 'react'
import axios from 'axios';
import Card from './Card'
import './App.css'
const interestList = ["Coding", "Music", "Sports", "Reading", "Traveling"];
function App() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [interests, setInterests] = useState([]);
  const [linkedIn, setLinkedIn] = useState('');
  const [twitter, setTwitter] = useState('');
  const [cards, setCards] = useState([]);

  function clickHandler() {
    const newCard = { username, description, interests, linkedIn, twitter };
    axios.post('http://localhost:3000/', newCard)
      .then(response => {
        const createdCard = response.data.card; // Make sure to access the card correctly
        console.log(createdCard);
        setCards([...cards, createdCard]);
        console.log(Array.isArray(createdCard.interests));
      })
    setUsername('');
    setDescription('');
    setInterests([]);
    setLinkedIn('');
    setTwitter('');
  }


  function handleInterestChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter(interest => interest !== value));
    }
  }


  function deleteHandler(idx) {
    const card = cards[idx];
    axios.delete(`http://localhost:3000/${card._id}`)
      .then(response => {
        console.log("Delete response: ", response.data);
        setCards(cards.filter((_, index) => index != idx));
      })
      .catch(error => {
        console.error('There was an error deleting the card!', error);
      });
  }


  useEffect(() => {
    // Fetch cards from the backend
    axios.get('http://localhost:3000/')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cards!', error);
      });
  }, []);

  return (
    <div>
      <div id="input-container">
        <h1>Enter your details</h1>
        <input type='text' placeholder='Enter your name' value={username} onChange={(e) => { setUsername(e.target.value) }}></input>
        <input type='text' placeholder='Enter your description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
        <div>
          <p>Select your interests:</p>
          {
            interestList.map((interest, index) => (
              <label key={index} style={{ display: 'block' }}>
                <input type='checkbox' value={interest} checked={interests.includes(interest)} onChange={handleInterestChange} />
                {interest}
              </label>
            ))
          }
        </div>
        <input type='text' placeholder='Linkedin' value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
        <input type='text' placeholder='Twitter' value={twitter} onChange={(e) => setTwitter(e.target.value)} />
        <button onClick={() => clickHandler()}>Add Card</button>
      </div>
      <div className='cards'>
        <Card cards={cards} deleteHandler={deleteHandler} />
      </div>
    </div>
  )
}

export default App
