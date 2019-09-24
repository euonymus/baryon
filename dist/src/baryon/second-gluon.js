"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./assets/styles/baryon.css");

var _GridListTile = _interopRequireDefault(require("@material-ui/core/GridListTile"));

var _GridListTileBar = _interopRequireDefault(require("@material-ui/core/GridListTileBar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _OpenInBrowser = _interopRequireDefault(require("@material-ui/icons/OpenInBrowser"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Material UI
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    title: {
      // color: theme.palette.primary.light,
      color: 'white'
    },
    titleBar: {
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    },
    imgFullHeight: {
      height: '100px',
      width: '150px',
      objectFit: 'cover'
    }
  };
});

var SecondGluon = function SecondGluon(props) {
  var classes = useStyles();
  var gluon = props.gluon;

  var actionIcon = _react.default.createElement(_IconButton.default, {
    "aria-label": "star ".concat(gluon.objectName)
  }, _react.default.createElement(_OpenInBrowser.default, {
    className: classes.title
  }));

  return _react.default.createElement(_GridListTile.default, {
    classes: {
      imgFullHeight: classes.imgFullHeight
    }
  }, _react.default.createElement("img", {
    src: gluon.objectImagePath,
    alt: gluon.objectName
  }), _react.default.createElement(_GridListTileBar.default, {
    title: gluon.objectName,
    classes: {
      root: classes.titleBar,
      title: classes.title
    },
    actionIcon: gluon.object.getLinkPath(actionIcon)
  }));
};

SecondGluon.propTypes = {
  gluon: _propTypes.default.object.isRequired
};
var _default = SecondGluon;
exports.default = _default;

//# sourceMappingURL=second-gluon.js.map