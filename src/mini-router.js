import React, {createContext} from "react";
import { createBrowserHistory } from "history";


const Context = createContext()
const {Provider, Consumer} = Context;
const history = createBrowserHistory();
class Router extends React.Component {
  state = {url: window.location.pathname}
  action = {
    go: (url) =>this.setState(state => ({...state, url}), () => history.push(url))
  }
  
  render() {
    return (
      <Provider value={{state: this.state, action:this.action}}>
        {this.props.children}
      </Provider>
    );
  }
}
const RouteConsumer = ({exact, render,path, state: {url}, component: Component}) =>{
    const match = exact
      ? url === path
      : url.startsWith(path)
    // debugger  
    if (match) {
      if (render) {
        return render()
      } else if (Component) {
        return <Component/>
      }
    } 
      return null
}

class Route extends React.Component {
  render() {
    return <Consumer>
            {(context) => <RouteConsumer
                {...this.props}
                {...context}
            />}
    </Consumer>;
  }
}

class Link extends React.Component {
  handleClick = context => e => {
    e.preventDefault();
    const {to} = this.props
    context.action.go(to)
  };

  render() {
    return (
     <Consumer>  
      { context =>
        <a href={`${this.props.to}`} onClick={this.handleClick(context)}>
        {this.props.children}
        </a>
    }
      </Consumer>  
    );
  }
}

export { Router, Route, Link };
