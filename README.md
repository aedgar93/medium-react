# Medium Clone

This is a simple project that allows you to read and publish articles. The only things I did not build myself are the WSYWIG editor and the Google login component.

I created my own hooks for querying the api. Normally I would use something like [React Query](https://github.com/tannerlinsley/react-query) for simplicity, but I wanted to demonstrate my understanding of hooks.

Please note that the authentication is not very robust. You can sign in using Google. All this does is save your name and profile picture and allow you to post. If this were a production app, I would add in a better authentication layer and security checks. For the sake of this project, I wanted to focus on the front-end, so I did the bare minimum in that regard.


deploy https://github.com/mars/heroku-cra-node


## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root ``
1. **React UI** in `react-ui/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node

```bash
npm install package-name --save
```


### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```