"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _common = _interopRequireDefault(require("./common"));

var _langtypes = require("../constants/langtypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var QuarkUtil = function QuarkUtil(quarkRaw) {
  var _this = this;

  var langType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _langtypes.LANGTYPE_ENG_LIKE;

  _classCallCheck(this, QuarkUtil);

  _defineProperty(this, "getByLang", function (field) {
    if (_this.langType === _langtypes.LANGTYPE_JP_LIKE) {
      return _this.properties[field] ? _this.properties[field] : _this.properties["en_".concat(field)];
    } else {
      return _this.properties["en_".concat(field)] && _this.properties["en_".concat(field)] !== "NULL" ? _this.properties["en_".concat(field)] : _this.properties[field];
    }
  });

  _defineProperty(this, "getName", function () {
    return _this.getByLang('name');
  });

  _defineProperty(this, "getDescription", function () {
    return _this.getByLang('description');
  });

  _defineProperty(this, "getLinkPath", function () {
    var url = window.location.href;
    var arr = url.split("/");
    var scheme = arr[0];
    var domainString = arr[2];
    var prefix = '';

    if (_this.langType === _langtypes.LANGTYPE_JP_LIKE && (!_this.properties.name || _this.properties.name === 'NULL')) {
      prefix = "".concat(scheme, "//").concat(domainString.split('.')[1]);
    } else if (_this.langType === _langtypes.LANGTYPE_ENG_LIKE && (!_this.properties.en_name || _this.properties.en_name === 'NULL')) {
      prefix = "".concat(scheme, "//ja.").concat(domainString);
    } else {
      return _react.default.createElement(_reactRouterDom.Link, {
        to: "/".concat(_this.getName())
      }, _this.getName());
    }

    return _react.default.createElement("a", {
      href: "".concat(prefix, "/").concat(_this.getName())
    }, _this.getName());
  });

  this.langType = langType;
  this.identity = quarkRaw.identity;
  this.labels = quarkRaw.labels;
  this.properties = quarkRaw.properties;
  var util = new _common.default(); // These are needed in main-quark component

  this.name = this.getName();
  this.description = this.getDescription();
  this.image_path = this.properties.image_path;
  this.period_str = util.period2str(quarkRaw.properties);
  this.url = this.properties.url;
  this.affiliate = this.properties.affiliate;
};

var _default = QuarkUtil;
exports.default = _default;

//# sourceMappingURL=quark.js.map