console.log('Widget');
var React = require('react');

var Widget = React.createClass({
    render: ()=> {
        return(
            /* jshint ignore:start */
            <div className="widget">My Widget</div>
            /* jshint ignore:end */
        );
    }
});

module.exports = Widget;
