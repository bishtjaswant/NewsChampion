import React, { Component } from 'react';

class NewsItem extends Component {


    truncate(str,num) {
         
        if ( str.length>num ) {
            return str.substring(0,num)+"...";
        } else {
            return str;
        }
    }
    
    render() {

        const {title,description, image,newsUrl, author, publishedAt, source}=this.props;

        return (
            <>
                <div className="card">
                <span style={{left: "90%",zIndex:1}} class="position-absolute top-0  translate-middle badge rounded-pill bg-danger">
                    {source??"unknown"}
                </span>

                
                    <img src={image} className="card-img-top" alt={title && ""} />
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <p className=" text-muted">By {author?author:"unknown"} </p>
                            <p className=" text-muted"> {new Date(publishedAt).toGMTString() } </p>
                        </div>
                        <h5 className="card-title"> {this.truncate(title ? title:"",22) }</h5>
                        <p className="card-text">{this.truncate(description?description:"",88) }</p>
                        <a href={newsUrl} target="_blank" className="btn btn-outline-primary">read more</a>
                    </div>
                </div>
            </>
        );
    }
}

export default NewsItem;