import React, { Component } from "react";
import './Quote.css'

class Quote extends Component {
    constructor(props) {
        super(props);
        this.state = {
          apiResult: null,
          author: '',
          text: '',
          isLoaded: false,
          bgColor: '#f99192',
          clickCount: 0,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
      handleClick() {
        this.generateQuote();
      }
    
      componentDidMount() {
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', {
          headers: {
            Accept: "application/json",
          }
        })
        .then(response => response.json())
        .then((responseData) => {
          this.setState({
            apiResult: responseData.quotes,
            isLoaded: true,
            author: responseData.quotes[0].author,
            text: responseData.quotes[0].quote,
            quotesArrayLength: responseData.quotes.length,
          });
        })
        .catch(error => this.setState({ error }));
      }
    
      generateQuote = () => {
        const chosenQuote = [];
        const quotes = this.state.apiResult;
        let randomNumber = Math.floor((Math.random() * this.state.apiResult.length) + 1);
    
        quotes.forEach(function(element, index) {
          if(index === randomNumber) {
            chosenQuote.push(element)
          }
        })
        this.setState({
          text:chosenQuote[0].quote,
          author:chosenQuote[0].author,
        })
      }

  render() {
    return (
      <div id="quote-box">
      <div id="grid">
        <blockquote id="text">"{this.state.text}"</blockquote>
        <p id="author">- {this.state.author}</p>
        <div id="buttons">
            <button id="new-quote" onClick={this.handleClick}>
            New Quote
            </button>
            
            
            <div id="tweet">
            <a
            href={`https://twitter.com/share?text=${this.state.text}- ${this.state.author}`}
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_blank"
            rel="noopener noreferrer"
            >
            <img alt="twitter" id="twitter" src="https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c53e.png"></img>
            </a>      
                    <a
                    href={`https://twitter.com/share?text=${this.state.text}- ${this.state.author}`}
                    className="button"
                    id="tweet-quote"
                    title="Tweet this quote!"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    
                    
                    <button id="new-quote">Tweet this quote!</button>
                        
                    </a>
                </div>    
        </div>
        </div>
      </div>
    );
  }
}

export default Quote;
