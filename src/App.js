 
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/news/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar';

class App extends Component {
  
 constructor(props) {
   super(props);
   this.state={
    progress:0,
    apiKey:process.env.REACT_APP_NEWS_API,
   }
 }
 setProgress=(progress)=> {
   this.setState({progress: progress})
 }
  
  render() {
    return (
      <>
        <Router>
        <Navbar/>
    
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        loaderSpeed={200}
        height={4}
        waitingTime={2000}
        transitionTime={800}
        onLoaderFinished={() => this.setProgress(0)}
      />
        <Switch>
          <Route path="/" exact> <News  apiKey={this.state.apiKey}  setProgress={this.setProgress} key="general" category="general" pageSize={4}/> </Route>
          <Route exact path="/business">  <News  apiKey={this.state.apiKey}  setProgress={this.setProgress} key="business" category="business" pageSize={4}/>     </Route>
          <Route exact path="/entertainment">  <News  apiKey={this.state.apiKey}  setProgress={this.setProgress} key="entertainment" category="entertainment" pageSize={4}/>     </Route>
          <Route exact path="/health">  <News  apiKey={this.state.apiKey}  setProgress={this.setProgress} key="health" category="health" pageSize={4}/>     </Route>
          <Route exact path="/science">  <News  apiKey={this.state.apiKey}  setProgress={this.setProgress} key="science" category="science" pageSize={4}/>     </Route>
          <Route exact path="/sports">  <News  apiKey={this.state.apiKey}  setProgress={this.setProgress} key="sports" category="sports" pageSize={4}/>     </Route>
          <Route exact path="/technology">  <News  apiKey={this.state.apiKey}  setProgress={this.setProgress} key="technology" category="technology" pageSize={4}/>     </Route>      
        </Switch>
        </Router>
      </>
    );
  }
}
 
export default App;
