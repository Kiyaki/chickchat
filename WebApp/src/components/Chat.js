import moment from "moment"
import React, {PropTypes} from "react"
import {connect} from "react-redux"
import ReplyBox from "./ReplyBox"

import classes from "./Bubble.css"

export class Chat extends React.Component {
    render () {
        return (
            <div style={rootStyle}>
                <ul style={ulStyle} ref="messages">
                    {this.props.messages.map(renderMessage)}
                </ul>

                {/* Exercise 2: Add a ReplyBox component */}
                <ReplyBox />

            </div>
        )
    }

    componentDidUpdate (prevProps) {
        if (prevProps.messages.length === this.props.messages.length) {
            return
        }

        const element = this.refs.messages
        if (element) {
            element.scrollTop = element.scrollHeight
        }
    }
}

function renderMessage (message) {
    return (
        <div>
        <div>
        <span style={{color: "white"}}>{message.author.name + " "}</span>
        </div>

        <li style={{wordBreak: "break-all"}} key={message.messageId}>


            {/* Exercise 3: Add message author */}
            <img style ={imageStyle} src = {message.author.picture}/>

            {getMessageBody(message)}


        </li>
        </div>
    )
}

const ulStyle = {
    overflowY: "scroll",
    fontFamily: "DejaVu sans",
    listStyle: "none",

    /* Exercise 4: Add your own styles */

}

const imageStyle = {
    maxWidth: "50px",
    maxHeight: "50px",
    borderRadius: "50px",
    objectFit: "contain"
}

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%",
    backgroundImage: "url('http://vignette3.wikia.nocookie.net/mystic-messenger/images/5/50/Wiki-background/revision/latest?cb=20160911154012')"
}

function getMessageDate (message) {
    return moment(message.timestampUtc).format("dddd, h:mm A")
}

function getMessageBody (message) {
    if (message.data) {
        return <img src={message.data} style={imageStyle} />
    } else {
        return(
          <div className={classes.talkBubble + " " + classes.round + " " + classes.leftIn + " " + classes.triRight}>
          <div style={{color: "black"}} className={classes.talktext}>
          {message.text}
        </div>
        </div>
      )
    }
}

Chat.propTypes = {
    messages: PropTypes.array
}

function mapStateToProps (state) {
    return {
        messages: state.messages
    }
}

export default connect(
    mapStateToProps
)(Chat)
