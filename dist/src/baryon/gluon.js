"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./assets/styles/baryon.css");

var _secondGluons = _interopRequireDefault(require("./second-gluons"));

var _styles = require("@material-ui/styles");

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _ListItemAvatar = _interopRequireDefault(require("@material-ui/core/ListItemAvatar"));

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Material UI
var useStyles = (0, _styles.makeStyles)({
  card: {
    margin: '20px',
    display: 'block'
  },
  avatarListItem: {
    width: 150
  } // NOTE: This used to work, but suddenly stopped working.
  //       The reason is that makeStyles style is imported before MuiAvatar is impoted.
  //       It's hard to change the order because this is treated by transpiler, so I decided to put style inline.
  // avatar: {
  //   width: 130,
  //   height: 130,
  // },

});

var Gluon = function Gluon(props) {
  var interaction = props.interaction,
      hasSecondLevel = props.hasSecondLevel;
  var objectName = interaction.objectName,
      objectImagePath = interaction.objectImagePath,
      relationText = interaction.relationText,
      relationPeriod = interaction.relationPeriod,
      seconds = interaction.seconds;
  var classes = useStyles();

  var avatar = _react.default.createElement(_ListItemAvatar.default, {
    className: classes.avatarListItem
  }, _react.default.createElement(_Avatar.default, {
    className: classes.avatar,
    style: {
      width: 130,
      height: 130
    }
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
  })), hasSecondLevel && seconds.length !== 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ListItem.default, null, _react.default.createElement("h3", null, "Secondary Relationships")), _react.default.createElement(_ListItem.default, null, _react.default.createElement(_secondGluons.default, {
    gluons: seconds
  })))));
};

Gluon.propTypes = {
  interaction: _propTypes.default.shape({
    objectName: _propTypes.default.string.isRequired,
    objectImagePath: _propTypes.default.string.isRequired,
    relationText: _propTypes.default.object.isRequired,
    relationPeriod: _propTypes.default.string.isRequired
  }),
  hasSecondLevel: _propTypes.default.bool.isRequired
};
Gluon.defaultProps = {
  hasSecondLevel: false
};
var _default = Gluon;
exports.default = _default;

//# sourceMappingURL=gluon.js.map