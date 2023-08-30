import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
        <div className="card">
          <div style={{
            display: 'flex', 
            justifyContent: 'flex-end', 
            position: 'absolute', 
            right: '0'
          }}>
            <span className="badge rounded-pill bg-danger">
            {source}
            </span>
          </div>

          <img src={!imageUrl?"https://clipart-library.com/image_gallery/n1199081.png":imageUrl} className="card-img-top" alt='...'/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} at {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-primary">Read More...</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
