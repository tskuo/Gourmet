import React, { Component } from 'react';

class HomePageGallery extends Component {
  genGallery(articles, galleryClassName) {
    return articles.map((article, index) => 
    {
      console.log('article: ' , article);
      return (
        <div className={galleryClassName} key={index}>
          <img width="100%" src="https://www.bostonsausage.co.uk/wp-content/uploads/2013/11/Rump-Steak-Meal-Deal.jpg"></img>
          <h6><a style={{ color: 'black' }} href={`#/articles/${article._id}`}>{article.title}</a></h6>
          <h6><a style={{ color: 'black' }} href={`#/users/${article.userId}`}>{article.author}</a></h6>
          <h6>Popularity: {article.popularity}</h6>
        </div>
      );
    });
  }

  render() {
    const num = 12/this.props.num;
    const galleryClassName = 'col-md-'+num;
    let { articles, heading } = this.props;
    return (
  	<div>
      <div className="row">
        <div className="col-md-12">
          <h3><span className="glyphicon glyphicon-check" aria-hidden="true"></span>{heading}</h3>
        </div>
      </div>
      <div className="row">
        { this.genGallery(articles, galleryClassName) }
      </div>
    </div>
    );
  }
}

export default HomePageGallery;
