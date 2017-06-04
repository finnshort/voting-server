import {expect} from 'chai';
import {List, Map} from 'immutable';

//Numbers are naturally immutable- ie would say 42 + 1 = 43
//not 42.setState(43);

describe('immutability', () => {
  describe('a number', () => {

    function increment(currentState){
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });


//Can apply the same logic to a data structure like a list
  describe('a list', () => {

    function addMovie(currentState, movie){
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Trainspotting', '28 Days Later');
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ));
      expect(state).to.equal(List.of(
        'Trainspotting',
        '28 Days Later'
      ));
    });
  });


//Could also apply to a map structure with key 'movies' that contains a list of movies
//adding a movie creates a new map, and movie key points to a new list

  describe('a tree', () => {
    /*
    // Old function
    function addMovie(currentState, movie) {
      return currentState.set(
        'movies',
        currentState.get('movies').push(movie)
      );
    }
    */


    //to operate on nested data structures, immutable provides helper function to reach into data structure
    //for ex 'update':

    function addMovie(currentState, movie) {
        return currentState.update('movies', movies => movies.push(movie));
      }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
      });
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        )
      }));
      expect(state).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later'
        )
      }));
    });

  });

});
