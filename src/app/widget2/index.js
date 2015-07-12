var React = require('react');

var Widget2 = React.createClass({
    render: ()=> {
        return(
            /* jshint ignore:start */
            <div className="gbp-widget2">
                <div>My Other Widget</div>
                <div className="gbp-widget2__arrow">--&gt;</div>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = Widget2;
