import React from 'react';

const Card = ({ cards, deleteHandler }) => {
  return (
    <div className="cards">
      {cards.map((card, idx) => (
        <div key={idx} className="card">
          <p><strong>Name:</strong> {card.username}</p>
          <p><strong>Description:</strong> {card.description}</p>
          <p><strong>Interests:</strong> {(Array.isArray(card.interests)) ? card.interests.join(', ') : 'No interests specified'}</p>
          <a href={card.linkedIn} target='_blank' rel='noopener noreferrer'>LinkedIn</a>
          <a href={card.twitter} target='_blank' rel='noopener noreferrer'>Twitter</a>
          <button className='buttons' onClick={()=>deleteHandler(idx)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Card;
