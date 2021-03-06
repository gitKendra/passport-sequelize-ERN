import React, { Component } from 'react'

class Home extends Component {
    constructor() {
        super()
    }


    render() {
        const imageStyle = {
            width: 400
        }
        return (
            <div>
                <p>It's good to be home</p>
                <img style={imageStyle} src="https://i.ytimg.com/vi/N1icEHtgb3g/maxresdefault.jpg" />
                <br/>
                <button>Button for any user</button>
                {this.props.isLoggedIn &&
                    <button>Button for logged in users</button>
                }
            </div>
        )

    }
}

export default Home
