import moment from "moment"
import React, {PropTypes} from "react"
import {connect} from "react-redux"
import ReplyBox from "./ReplyBox"


export class Chat extends React.Component {
    render () {
        return (
            <div style={rootStyle}>
                <ul style={ulStyle}>
                    {this.props.messages.map(renderMessage)}
                </ul>

                {/* Exercise 2: Add a ReplyBox component */}
                <ReplyBox />

            </div>
        )
    }
}

function renderMessage (message) {
    return (
        <li key={message.messageId}>

            {/* Exercise 3: Add message author */}
            <img style ={imageStyle} src = {message.author.picture}/>
            {message.author.name + ": "}

            {getMessageBody(message)}
        </li>
    )
}

const ulStyle = {
    overflowY: "scroll",
    fontFamily: "DejaVu sans",

    /* Exercise 4: Add your own styles */

}

const imageStyle = {
    maxWidth: "25px",
    maxHeight: "25px",
    borderRadius: "25px",
    objectFit: "contain"
}

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%"
}

function getMessageDate (message) {
    return moment(message.timestampUtc).format("dddd, h:mm A")
}

function getMessageBody (message) {
    if (message.data) {
        return <img src={message.data} style={imageStyle} />
    } else {
        return message.text
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
