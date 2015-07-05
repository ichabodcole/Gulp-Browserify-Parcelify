var React = require('react');
var Widget = require('./widget');

var App = React.createClass({
    render: ()=> {
        return(
            /* jshint ignore:start */
            <div className="app">
            <h1>Gulp <span className="plus">+</span> Browserify <span className="plus">+</span> Parceliy</h1>
                <Widget />
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = App;
