import React, { useState, useEffect } from 'react';
import BookCards from '../components/BookCards'; // Importerar BookCards-komponenten som visar böckerna

const OtherBooks = () => {
    // Definierar state-variabeln 'books' för att lagra böcker och en funktion 'setBooks' för att uppdatera state
    const [books, setBooks] = useState([]);
  
    // Använder useEffect för att hämta bokdata från API när komponenten laddas
    useEffect(() => {
      // Hämtar böcker från API:et "http://localhost:4000/all-books"
      fetch("http://localhost:4000/all-books")
        .then(res => res.json()) // Omvandlar svaret till JSON
        .then(data => setBooks(data.slice(4,8))); // Väljer två böcker (index 4-5) och lagrar dem i 'books'
    }, []); // Tom array som andra argument säkerställer att detta endast körs när komponenten laddas första gången

    return (
      <div>
        {/* Skickar böckerna och rubriken till BookCards-komponenten */}
        <BookCards books={books} headline="Other Books" />
      </div>
    );
}

export default OtherBooks;
