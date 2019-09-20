"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _gluon = _interopRequireDefault(require("./gluon"));

require("./assets/styles/baryon.css");

var _styles = require("@material-ui/styles");

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Material UI
var useStyles = (0, _styles.makeStyles)({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: '#e6e6f5'
    backgroundColor: '#666666'
  }
});

var PropertyBox = function PropertyBox(props) {
  var propertyResource = props.propertyResource;
  var classes = useStyles();
  var gluonsList = propertyResource.gluonsRelated.map(function (interaction, key) {
    return _react.default.createElement(_gluon.default, {
      key: key,
      interaction: interaction
    });
  });
  return _react.default.createElement("div", null, _react.default.createElement("h2", null, propertyResource.property), _react.default.createElement(_Card.default, {
    className: classes.card
  }, _react.default.createElement(_List.default, {
    className: classes.root
  }, gluonsList)));
};

PropertyBox.propTypes = {
  propertyResource: _propTypes.default.shape({
    property: _propTypes.default.string.isRequired,
    gluonsRelated: _propTypes.default.array.isRequired
  })
};
var _default = PropertyBox;
exports.default = _default;

//# sourceMappingURL=property_box.js.map