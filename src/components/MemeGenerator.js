import React, { Component } from "react";

export default class MemeGenerator extends Component {
    constructor(){
        super()

        this.state = {
            topText: '',
            botText: '',
            imgSrc: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Updates the corresponding state on every change of the input box
    handleChange(event){
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const randomIndex = Math.floor(Math.random()*this.state.allMemeImgs.length)
        const newImgUrl = this.state.allMemeImgs[randomIndex].url
        this.setState({
            imgSrc: newImgUrl
        })
    }


    // Fetch array of images from API and assign them to state property 'allMemeImgs'
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(res => {
                const { memes } = res.data
                this.setState({ allMemeImgs: memes })
            })
    }


    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="topText" 
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange} 
                    />
                    <input 
                        type="text" 
                        name="botText" 
                        placeholder="Bot Text" 
                        value={this.state.botText}
                        onChange={this.handleChange} 
                    />   
                    <button>Generate</button>           
                </form>

                <div className="img-container">
                    <img src={this.state.imgSrc} alt="#"/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bot">{this.state.botText}</h2>
 
                </div>


            </div>
        );
    }
}
