import React from 'react';
import 'App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'components/button' //load button early so other components can override css
import Header from 'components/header'
import Home from 'pages/home'
import Article from 'pages/article'
import Editor from 'pages/editor'
import Profile from 'pages/profile'
import { ArticlesContext } from 'hooks/articles/useArticles'
import { AuthContext } from 'hooks/auth/useAuth'


function App() {
  return (
    <div className="App">
      <ArticlesContext>
        <AuthContext>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/articles/:id">
                <Article />
              </Route>
              <Route path="/profile/:id">
                <Profile />
              </Route>
              <Route path="/editor">
                <Editor />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        </AuthContext>
      </ArticlesContext>
    </div>
  );
}

export default App;
