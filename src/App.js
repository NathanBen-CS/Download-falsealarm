import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const ZIP_FILE_URL = 'http://download-falsealarm.vercel.app/FalseAlarm.zip';

function App() {
  const { data: reviews, isPending: isPendingReviews, error: errorReviews } = useFetch('https://falsealarm-reviews-api.vercel.app/comments');
  const { data: prefixes, isPending: isPendingPrefixes, error: errorPrefixes } = useFetch('https://falsealarm-reviews-api.vercel.app/prefixes');
  const { data: suffixes, isPending: isPendingSuffixes, error: errorSuffixes } = useFetch('https://falsealarm-reviews-api.vercel.app/suffixes');

  const [visibleReviews, setVisibleReviews] = useState(10); // Initially display 10 reviews

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 20); // Load 20 more reviews
  };

  const download = () => {
    const aTag = document.createElement('a');
    aTag.href = ZIP_FILE_URL;
    aTag.setAttribute('download', 'FalseAlarm.zip');
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }

  const createRating = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    const min = 0;
    const maxPrefixes = Math.floor(prefixes.length);
    const maxSuffixes = Math.floor(suffixes.length);
  
    const randomPrefix = prefixes[Math.floor(Math.random() * (maxPrefixes - min)) + min];
    const randomSuffix = suffixes[Math.floor(Math.random() * (maxSuffixes - min)) + min];
    const userName = ${randomPrefix}${randomSuffix}_${reviews.length};

    const formData = new FormData(e.target);
    const stringed =  JSON.stringify({
      id: reviews.length,
      username: userName,
      rating: parseInt(formData.get('userRating')),
      comment: formData.get('userReview'),
    });

    console.log(stringed);

    fetch('https://falsealarm-reviews-api.vercel.app/comments', {
      method: 'POST', // Use POST to create a new review
      headers: {
        'Content-Type': 'application/json'
      },
      body: stringed
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(HTTP error! Status: ${response.status});
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Optionally refresh the list of reviews after submitting
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
      alert(Failed to submit review: ${error.message});
    });
  }

  return (
    <div className='appWrapper'>
      <div className="app">
        <h1>Download False Alarm</h1>
        <b>
          False Alarm is a traffic racing game designed to be played on a gamepad/controller. The aim of the game is to dodge cars on the road while maintaining a certain speed limit
          that is constantly rising in increments. Failure to keep up or crashing into other cars results in the player exploding. There are multiple styles of cars on the road that all
          have different behaviors, and it is your job to act accordingly. The game also tracks various achievements and scores during each run and saves them to a file.
          To support False Alarm, please leave a rating and comment for feedback. This is a game programmed in XNA/Monogame using C# to demonstrate OOP, polymorphism,
          custom data structures such as linked lists and queues, and more. Thanks for checking out False Alarm!
        </b>

        <button onClick={download}>Download FalseAlarm</button>
      </div>
      <div className='reviewsWrapper'>
        <div className='reviews'>
            <h2>Reviews on FalseAlarm</h2>

            <form className='reviewForm' onSubmit={createRating}>
              <label htmlFor="userRating">Enter rating from 1-5 (5 is best):</label>
              <input type="number" id="userRating" name="userRating" min="1" max="5" required />
              <label htmlFor="userReview">Enter Review:</label>
              <input type="text" id="userReview" name="userReview" required />
              <button type="submit">Submit as Random Username</button>
            </form>

            {errorReviews && <div>{errorReviews}</div>}
            {isPendingReviews && <div>Loading...</div>}
            {reviews && reviews.slice(0, visibleReviews).map((review) => (
              <div key={review.username}>
                <h3>{review.username}</h3>
                <b>{review.rating}/5</b>
                <p>{review.comment}</p>
              </div>
            ))}
            {reviews && visibleReviews < reviews.length && (
              <button onClick={loadMoreReviews}>Load More</button>
            )}
            
          </div>
      </div>
    </div>
  );
}

export default App;
