import { Component } from 'react';
import IssueList from './IssueList';

class App extends Component{
  // componentWillUnmount(){
  //   console.log('componentWillUnmount');
  // }
  render() {
    return (
      <div className="App">
        <IssueList />
      </div>
    );
  }
}

export default App;
