import Server from 'socket.io';

// Create a socket.io server as well as regular http server bound to port 8090
export default function startServer() {
  const io = new Server().attach(8090);

  // We want our server to be able to broadcast to the users when something
  // changes (ie is there a winner yet). For server to know when something
  // changed, we need it to /subscribe/ to the redux store.

  // Need to subscribe a listener to the store that reads in the current state,
  // turns it to plain JS object, and emits a state event on the socket.io server.
  // The result is a JSON-serialized snapshot of the state that is sent to all
  // active socket.io connections.

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  // We also want clients to receive the current state as soon as they connect
  // to the application, so that they can sync their client side state to the
  // server side state right away.

  // Similarly we need to receive updates (votes) from our clients- do this by
  // emitting action events that we pass to redux store

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
/*
Our server now operates essentially like this:

A client sends an action to the server.
The server hands the action to the Redux Store.
The Store calls the reducer and the reducer executes the logic related to the action.
The Store updates its state based on the return value of the reducer.
The Store executes the listener function subscribed by the server.
The server emits a 'state' event.
All connected clients - including the one that initiated the original action - receive the new state.
*/
