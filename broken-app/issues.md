# Broken App Issues


1. Both async and map return promises.The way they are written they run parallel,each promise will resolve/reject as they see fit and not necessarily in the order they are written or expected. So we can do a Promise.all or run them sequentially using a for loop.

2.Error handling is incomplete and/or can be improved upon.The callback is empty -**catch(error) opposed to just catch**and it would be nice to respond with a  message **console.error('Error:',err.message)**. 

3.No test written for the route.

4. There was no package json, so I made one and added the dependencies

