var React = require('react');

var Header = React.createClass({
    render: ()=> {
        return(
            /* jshint ignore:start */
            <h1 className="gbp-header">
                Gulp <span className="plus">+</span> Browserify <span className="plus">+</span> Parcelify
            </h1>
            /* jshint ignore:end */
        );
    }
});

module.exports = Header;
