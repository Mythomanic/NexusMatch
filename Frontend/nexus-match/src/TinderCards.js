import React, { useState } from 'react';
import TinderCard from 'react-tinder-card'
import './TinderCards.css';

function TinderCards() {
  const [people, setPeople] = useState([
    {
        name: 'Elon Musk',
        url: 'https://picsum.photos/200'
    },
    {
        name: 'Jeff Bezos',
        url: 'https://picsum.photos/201'
    }
  ]);

  return (
    <div>
        <h1>Match Cards</h1>

        <div className='tinderCards__cardContainer'>
            {people.map((person) => (
            <TinderCard 
            className='swipe'
            key={person.name} 
            preventSwipe={['up', 'down']}>
                <div 
                style={{backgroundImage: `url(${person.url})`}}
                className='card'>
                    <h3>{person.name}</h3>
                </div>
            </TinderCard>
        ))}
        </div>
        
    </div>
  );
}

export default TinderCards;