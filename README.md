# React and Express Comment Box

This is based on the React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html).
I the made some enhancements
- Separated jsx files
- Created api with mongodb instead of using .json file
- Set up [webpack](https://webpack.github.io/)
- Shitcanned jQuery using [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) instead

## Install Dependencies
```sh
npm install
```
## To run Dev
```sh
npm run dev
```

## To run Server
```sh
npm start
```


## Database info

using this app you will need to modify this line
```
  mongoose.connect("mongodb://172.17.0.2/comment");

```
point to your database
