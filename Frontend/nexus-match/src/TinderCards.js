import React, { useState } from 'react';
import TinderCard from 'react-tinder-card'
import './TinderCards.css';

function TinderCards() {
  const [people, setPeople] = useState([
    {
        name: 'Elon Musk',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/330px-Elon_Musk_Royal_Society_%28crop2%29.jpg'
    },
    {
        name: 'Jeff Bezos',
        url: 'https://hips.hearstapps.com/hmg-prod/images/jeff-bezos-attends-the-lord-of-the-rings-the-rings-of-power-news-photo-1684851576.jpg?crop=1.00xw:0.861xh;0,0.0205xh&resize=1200:*'
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