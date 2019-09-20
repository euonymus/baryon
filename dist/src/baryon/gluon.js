"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./assets/styles/baryon.css");

var _styles = require("@material-ui/styles");

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _ListItemAvatar = _interopRequireDefault(require("@material-ui/core/ListItemAvatar"));

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Material UI
var useStyles = (0, _styles.makeStyles)({
  card: {
    margin: '20px',
    display: 'block'
  },
  avatarListItem: {
    width: 150
  },
  avatar: {
    width: 130,
    height: 130
  }
});

var Gluon = function Gluon(props) {
  var interaction = props.interaction;
  var objectName = interaction.objectName,
      objectImagePath = interaction.objectImagePath,
      relationText = interaction.relationText,
      relationPeriod = interaction.relationPeriod;
  var classes = useStyles();

  var avatar = _react.default.createElement(_ListItemAvatar.default, {
    className: classes.avatarListItem
  }, _react.default.createElement(_Avatar.default, {
    className: classes.avatar
  }, _react.default.createElement("img", {
    className: "baryon-gluon-image",
    src: objectImagePath,
    alt: objectName
  })));

  return _react.default.createElement("div", {
    className: "baryon-gluon-body"
  }, _react.default.createElement(_Card.default, {
    className: classes.card
  }, _react.default.createElement(_ListItem.default, null, interaction.object.getLinkPath(avatar), _react.default.createElement(_ListItemText.default, {
    primary: relationText,
    secondary: relationPeriod
  }))));
};

Gluon.propTypes = {
  interaction: _propTypes.default.shape({
    objectName: _propTypes.default.string.isRequired,
    objectImagePath: _propTypes.default.string.isRequired,
    relationText: _propTypes.default.object.isRequired,
    relationPeriod: _propTypes.default.string.isRequired
  })
};
var _default = Gluon;
exports.default = _default;

//# sourceMappingURL=gluon.js.map