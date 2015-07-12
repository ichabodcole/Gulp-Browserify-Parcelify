var React = require('react');
var Widget = require('./widget');
var Widget2 = require('./widget2');
var Header = require('./header');

var App = React.createClass({
    render: ()=> {
        return(
            /* jshint ignore:start */
            <div className="gbp-app">
                <Header />
                <div className="gbp-app__widgets">
                    <Widget />
                    <Widget2 />
                </div>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = App;
