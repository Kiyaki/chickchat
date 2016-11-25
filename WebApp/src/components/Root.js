/**
 * @module components/Root
 */
import React, {PropTypes} from "react"
import {Router} from "react-router"
import {Provider} from "react-redux"
import routes from "../routes"

export default class Root extends React.Component {
    render() {
        const {store, history} = this.props
        return (
            <Provider store={store}>
                <Router history={history} routes={routes()}/>
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object,
    history: PropTypes.object
};
