"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mainQuark = _interopRequireDefault(require("./main-quark"));

var _gluons = _interopRequireDefault(require("./gluons"));

var _quark = _interopRequireDefault(require("./utils/quark"));

var _properties = _interopRequireDefault(require("./utils/properties"));

var _langSubdomain = require("./constants/lang-subdomain");

var _langtypes = require("./constants/langtypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Baryon =
/*#__PURE__*/
function (_Component) {
  _inherits(Baryon, _Component);

  function Baryon() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Baryon);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Baryon)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      langType: _langtypes.LANGTYPE_ENG_LIKE,
      isNoData: false,
      // NOTE: Default has to be false, so user will see Loading..., when loading.
      quark_name: null,
      subject: null,
      targetProperties: []
    });

    return _this;
  }

  _createClass(Baryon, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          quark_name = _this$props.quark_name,
          connection = _this$props.connection;
      var domainString = document.domain;
      var domainFirstPart = domainString.split('.')[0];
      var langType = this.state.langType;

      if (domainFirstPart === _langSubdomain.LANG_SUBDOMAIN_JP_LIKE) {
        langType = _langtypes.LANGTYPE_JP_LIKE;
        this.setState({
          langType: langType
        });
      }

      var neo4j = require('neo4j-driver').v1;

      this.driver = neo4j.driver(connection.uri, neo4j.auth.basic(connection.user, connection.password));
      this.readGraph(quark_name, langType);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // on application exit:
      if (this.driver) {
        this.driver.close();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.quark_name !== this.props.quark_name) {
        this.readGraph(this.props.quark_name, this.state.langType);
      }
    }
  }, {
    key: "readGraph",
    value: function readGraph(name, langType) {
      var _this2 = this;

      var name_field = 'en_name';

      if (langType === _langtypes.LANGTYPE_JP_LIKE) {
        name_field = 'name';
      }

      var session = this.driver.session();
      var resultPromise = session.run("MATCH (subject {".concat(name_field, ": $name})-[gluon]-(object) RETURN subject, gluon, object ORDER BY (CASE gluon.start WHEN null THEN {} ELSE gluon.start END) DESC, (CASE object.start WHEN null THEN {} ELSE object.start END) DESC"), {
        name: name
      });
      resultPromise.then(function (result) {
        session.close();
        var gluons = result.records;
        var singleRecord = gluons[0];
        var subjectRaw = null;
        var isNoData = true;

        if (singleRecord) {
          subjectRaw = singleRecord.get(0);
          isNoData = false;
        } else {
          gluons = [];
        }

        var subject = new _quark.default(subjectRaw, langType);
        var targetProperties = new _properties.default(gluons, langType);

        _this2.setState({
          subject: subject,
          targetProperties: targetProperties,
          isNoData: isNoData
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          subject = _this$state.subject,
          targetProperties = _this$state.targetProperties,
          isNoData = _this$state.isNoData;
      var _this$props2 = this.props,
          quark_name = _this$props2.quark_name,
          graphPath = _this$props2.graphPath;

      if (!subject || targetProperties.length === 0) {
        var message = 'Loading...';

        if (isNoData) {
          message = 'Not Found';
        }

        return _react.default.createElement("div", null, _react.default.createElement("h1", null, quark_name), _react.default.createElement("p", null, message));
      }

      return _react.default.createElement("div", {
        className: "baryon-body"
      }, _react.default.createElement(_mainQuark.default, {
        subject: subject
      }), _react.default.createElement(_gluons.default, {
        targetProperties: targetProperties.data,
        graphPath: graphPath
      }));
    }
  }]);

  return Baryon;
}(_react.Component);

Baryon.propTypes = {
  quark_name: _propTypes.default.string.isRequired,
  connection: _propTypes.default.shape({
    uri: _propTypes.default.string.isRequired,
    user: _propTypes.default.string.isRequired,
    password: _propTypes.default.string.isRequired
  }),
  graphPath: _propTypes.default.string
};
Baryon.defaultProps = {
  graphPath: ''
};
var _default = Baryon;
exports.default = _default;

//# sourceMappingURL=index.js.map