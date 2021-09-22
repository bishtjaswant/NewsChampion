import React, { Component } from 'react';
import Spinner from '../Spinner';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


class News extends Component {
    

  static defaultPropTypes = {
       country:"in",
       pageSize:5,
       category:"general",
  }
   static propTypes = {
       country: PropTypes.string,
       category: PropTypes.string,
       pageSize: PropTypes.number,
   }

   capitalize =(string)=> {
     return string.charAt(0).toUpperCase() + string.slice(1);
   }

    constructor(props) {
        super(props);
         this.state={
             articles:[],
             loading: false,
             page: 1,
             totalResults: 0, 
          
         }

         document.title=`NewsChampion- ${ this.capitalize(  this.props.category ) } News`;
    } 

  async  componentDidMount() {
    this.props.setProgress(10);
      this.setState({loading:true});
      let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`);
     let data= await  response.json();
     this.props.setProgress(55);
        this.setState({ 
         articles: data.articles,
         totalResults: data.totalResults,       
        });
      this.setState({loading:false});
     
      this.props.setProgress(100);

  }
    /* 

    handleNextButton = async (e) => {
      this.setState({loading:true});

      this.setState({page:this.state.page+1})  

        if (    this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize)  ) {
            
        } else {
            
                let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}&apiKey=${this.props.apiKey}`);
                let data= await  response.json();
                 this.setState({ articles: data.articles});
        }

      this.setState({loading:false});

    } */
    
   /*  handlePrevButton = async (e) => {
      this.setState({loading:true});

        this.setState({page:this.state.page-1})  
        let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}&apiKey=${this.props.apiKey}`);
        let data= await  response.json();
        this.setState({ articles: data.articles});
      this.setState({loading:false});

    } */

    
  fetchMoreData = async () => { 
    this.props.setProgress(10);

    this.setState({page:this.state.page+1,loading:true});
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}&apiKey=${this.props.apiKey}`);
        let data= await  response.json();
      this.props.setProgress(55);
      this.setState({
                    articles: this.state.articles.concat (data.articles),
                    loading:false
                  });
      this.props.setProgress(100);
  };
   


    render() {
        return (
            <div>
                 <InfiniteScroll
                          dataLength={this.state.articles.length}
                          next={this.fetchMoreData}
                          hasMore={this.state.articles.length !== this.state.totalResults}
                          loader={<Spinner/>}
                        >

               <div className="container">
                 <h1>top head lines</h1>
                 <p className=" text-muted"> <strong className="text-capitalize">  {this.props.category} </strong> : <strong> {this.state.totalResults} </strong> found  </p>
             
                   <div className="row">
                
                      
                       {
                           this.state.articles.map(article=>{
                               return(
     
                                <div className="col-md-4 my-4" key={article.url}>
                                    <NewsItem source={article.source.name} title={article.title} author={article.author}  publishedAt={article.publishedAt} newsUrl={article.newsUrl} image={article.urlToImage} description={article.description}/>
                                </div>

                               )
                           })
                       }
                  
                     
                   </div>
               </div>

               {/* <div className="container d-flex justify-content-between">
                   <button disabled={this.state.page<=1} onClick={this.handlePrevButton} className="btn btn-dark ">&larr;Previous</button>
                   <button disabled={this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize )  } onClick={this.handleNextButton} className="btn btn-dark ">&rarr;Next</button>
               </div> */}
               
               </InfiniteScroll>   

            </div>
        );
    }
}

export default News;