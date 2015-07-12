var React = require('react');

var Widget = React.createClass({
    render: ()=> {
        return(
            /* jshint ignore:start */
            <div className="gbp-widget">
                <div>My Widget</div>
                <div className="gbp-widget__arrow">--&gt;</div>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = Widget;
