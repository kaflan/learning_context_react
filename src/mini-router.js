import React, { createContext, useState  } from "react";
import { createBrowserHistory } from "history";


const Context = createContext()
const { Provider, Consumer } = Context;
const history = createBrowserHistory();

const  Router = ({ children }) =>  {
  const [ url, setUrl ] = useState(window.location.pathname)
  const action = {
    go: (url) => {
      setUrl( url)
      history.push(url)
    }
  }

  return (
    <Provider value={{  url , action  }}>
      {children}
    </Provider>
  );

}

const RouteConsumer = ({ exact, render, path, url , component: Component }) => {
  const match = exact
    ? url === path
    : url.startsWith(path)

  if (match) {
    if (render) {
      return render()
    } else if (Component) {
      return <Component />
    }
  }
  
  return null
}

const Route = (props) => (
  <Consumer>
    {(context) => <RouteConsumer
      {...props}
      {...context}
    />}
  </Consumer>
);    


const Link = (props) => {
  const handleClick = context => event => {
    event.preventDefault();
    const { to } = props
    context.action.go(to)
  };

  return (
    <Consumer>
      {context =>
        <a href={`${props.to}`} onClick={handleClick(context)}>
          {props.children}
        </a>
      }
    </Consumer>
  );

}


export { Router, Route, Link };
