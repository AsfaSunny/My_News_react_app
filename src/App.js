import './App.css';


import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router, 
  Routes, 
  Route, 
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';



export default class App extends Component {
  pageSize = 5;
  ApiKey = process.env.REACT_APP_NEWS_API;
  
  state = {
    progress: 0
  }

  setProgress = async(progress) => {
    this.setState({progress: progress})
  }
  render() {
    
    return (
      <div>
        {/* <Navbar/> */}
        {/* <News setProgress={this.setProgress} ApiKey={this.ApiKey} pageSize={this.pageSize} country="us" category="sports"/> */}
        <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={4}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} ApiKey={this.ApiKey} key="general" pageSize={this.pageSize} country="us" category="general"/>}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} ApiKey={this.ApiKey} key="business" pageSize={this.pageSize} country="us" category="business"/>}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} ApiKey={this.ApiKey} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/>}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} ApiKey={this.ApiKey} key="health" pageSize={this.pageSize} country="us" category="health"/>}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} ApiKey={this.ApiKey} key="science" pageSize={this.pageSize} country="us" category="science"/>}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} ApiKey={this.ApiKey} key="sports" pageSize={this.pageSize} country="us" category="sports"/>}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} ApiKey={this.ApiKey} key="technology" pageSize={this.pageSize} country="us" category="technology"/>}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
