"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./assets/styles/baryon.css");

var _secondGluon = _interopRequireDefault(require("./second-gluon"));

var _styles = require("@material-ui/core/styles");

var _GridList = _interopRequireDefault(require("@material-ui/core/GridList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Material UI
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)'
    }
  };
});

var SecondGluons = function SecondGluons(props) {
  var classes = useStyles();
  var gluons = props.gluons;
  var tileData = gluons.map(function (gluon) {
    return _react.default.createElement(_secondGluon.default, {
      key: gluon.gluon.identity.toString(),
      gluon: gluon
    });
  });
  return _react.default.createElement("div", {
    className: classes.root
  }, _react.default.createElement(_GridList.default, {
    className: classes.gridList,
    cols: 2.5
  }, tileData));
};

SecondGluons.propTypes = {
  gluons: _propTypes.default.array.isRequired
};
var _default = SecondGluons;
exports.default = _default;

//# sourceMappingURL=second-gluons.js.map