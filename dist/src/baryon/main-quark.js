"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/styles");

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardActionArea = _interopRequireDefault(require("@material-ui/core/CardActionArea"));

var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Link = _interopRequireDefault(require("@material-ui/icons/Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Material UI
var useStyles = (0, _styles.makeStyles)({
  media: {
    height: 300,
    backgroundPosition: '50% 0%'
  }
});

var MainQuark = function MainQuark(props) {
  var subject = props.subject;
  var classes = useStyles();
  return _react.default.createElement("div", {
    className: "baryon-subject baryon-grid"
  }, _react.default.createElement(_Card.default, {
    className: classes.card
  }, _react.default.createElement(_CardActionArea.default, null, subject.image_path && _react.default.createElement(_CardMedia.default, {
    className: classes.media,
    image: subject.image_path,
    title: subject.name
  }), _react.default.createElement(_CardContent.default, null, _react.default.createElement(_Typography.default, {
    gutterBottom: true,
    variant: "h5",
    component: "h2"
  }, subject.name), _react.default.createElement(_Typography.default, {
    variant: "body2",
    color: "textSecondary",
    component: "p"
  }, subject.period_str, _react.default.createElement("br", null), subject.description))), _react.default.createElement(_CardActions.default, null, subject.url && _react.default.createElement(_Button.default, {
    size: "small",
    color: "primary"
  }, _react.default.createElement("a", {
    href: subject.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _react.default.createElement(_Link.default, null))), subject.affiliate && _react.default.createElement(_Button.default, {
    size: "small",
    color: "primary"
  }, _react.default.createElement("a", {
    href: subject.affiliate,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Buy Now")))));
};

MainQuark.propTypes = {
  subject: _propTypes.default.object.isRequired
};
var _default = MainQuark;
exports.default = _default;

//# sourceMappingURL=main-quark.js.map