Shop project built with Express, MongoDB and React. It has user authentication as well as many other features such as being able to add products to the cart, delete them, etc. These products can also be sorted by color, size, price... Once the user decides on his favorite sneakers, he will be able to make the payment thanks to the Stripe payment processing platform. 
<br>
The website was styled with Styled-Components and the state was handled by Redux Toolkit, which it reduces the amount of fluff code you have to write to implement Redux. <br>
The way I implemented Redux Toolkit was by adding a 'features' folder which contains both the Slice and Actions of each one of these features (user & cart). With createSlice we provide an object with the reducer functions, and it generates action type strings and creator functions based on the reducer function names. 
Regarding the user feature, it was also needed the use of Redux Thunk middleware in order to make asynchronous calls to our backend. <br>
Finally, Redux Persist library was required on the store so I could save the Redux store in persistent storage (local storage). Therefore, even after refreshing the browser, both the cart and the authenticated user will still be preserved. <br>
You can check the project by deploying it locally. <br> Backend -> https://github.com/fpalessi/BACKEND_ICYGB <br> Small Live Preview -> https://fpalessi.netlify.app/assets/icygb.7a0547bb.mp4
