"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _propertyBox = _interopRequireDefault(require("./property-box"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Gluons = function Gluons(props) {
  var targetProperties = props.targetProperties,
      hasSecondLevel = props.hasSecondLevel;
  var propertyList = targetProperties.map(function (propertyResource, key) {
    return _react.default.createElement(_propertyBox.default, {
      key: key,
      propertyResource: propertyResource,
      hasSecondLevel: hasSecondLevel
    });
  });
  return _react.default.createElement("div", {
    className: "baryon-properties baryon-grid"
  }, propertyList);
};

Gluons.propTypes = {
  targetProperties: _propTypes.default.array.isRequired,
  hasSecondLevel: _propTypes.default.bool.isRequired
};
Gluons.defaultProps = {
  hasSecondLevel: false
};
var _default = Gluons;
exports.default = _default;

//# sourceMappingURL=gluons.js.map