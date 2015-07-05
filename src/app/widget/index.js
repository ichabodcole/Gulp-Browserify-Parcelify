var React = require('react');

var Widget = React.createClass({
    render: ()=> {
        return(
            /* jshint ignore:start */
            <div className="widget">
                <div>My Widget</div>
                <div className="widget__arrow">--&gt;</div>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = Widget;
