import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {
  static defaultProps = {
    pageSize: 5,
    country: 'us',
    category: 'general'
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {  
    super(props);        
    this.state = { 
      articles : [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - MyNews`;
  }

  async UpdateNewsPage(){
    this.props.setProgress(15);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ApiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedata = await data.json();
    this.props.setProgress(75);

    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.UpdateNewsPage();
  }

  handlePrevious = async() => {
    this.UpdateNewsPage();
    this.setState({
        page: this.state.page - 1
    })
  }

  handleNext = async() => {
    this.UpdateNewsPage();
    this.setState({
          page: this.state.page + 1
    })
  }

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ApiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedata = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      loading: false
    });
  }

  render() {  
    return (
      <>
        <h2 className='text-center' style={{ margin: '40px 0px' }}>Main NEWS - Trending from {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">

              {this.state.articles.map((elmnt) => {
                return <div className="col-md-4" key={elmnt.url}>
                <NewsItem title={elmnt.title?elmnt.title:""} description={elmnt.description?elmnt.description:""} imageUrl={elmnt.urlToImage} newsUrl={elmnt.url} author={elmnt.author} date={elmnt.publishedAt} source={elmnt.source.name}/>
              </div>
              })}
              
            </div>
          </div>

        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
