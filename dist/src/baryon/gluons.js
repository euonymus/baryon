"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _property_box = _interopRequireDefault(require("./property_box"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Gluons = function Gluons(props) {
  var targetProperties = props.targetProperties,
      graphPath = props.graphPath;
  var propertyList = targetProperties.map(function (propertyResource, key) {
    return _react.default.createElement(_property_box.default, {
      key: key,
      propertyResource: propertyResource,
      graphPath: graphPath
    });
  });
  return _react.default.createElement("div", {
    className: "baryon-properties baryon-grid"
  }, propertyList);
};

Gluons.propTypes = {
  targetProperties: _propTypes.default.array.isRequired,
  graphPath: _propTypes.default.string
};
Gluons.defaultProps = {
  graphPath: ''
};
var _default = Gluons;
exports.default = _default;

//# sourceMappingURL=gluons.js.map