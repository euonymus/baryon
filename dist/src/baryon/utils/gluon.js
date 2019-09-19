"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = _interopRequireDefault(require("./common"));

var _gluon_types = require("../constants/gluon_types");

var _langtypes = require("../constants/langtypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GluonUtil = function GluonUtil(gluonRaw) {
  var _this = this;

  var langType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _langtypes.LANGTYPE_ENG_LIKE;

  _classCallCheck(this, GluonUtil);

  _defineProperty(this, "getRelation", function () {
    var relation = 'has relation to';

    if (_gluon_types.gluon_types[_this.type]) {
      relation = _gluon_types.gluon_types[_this.type].caption;
    }

    if (_this.langType === _langtypes.LANGTYPE_JP_LIKE) {
      return _this.properties.relation ? _this.properties.relation : relation;
    } else {
      // return this.type ? this.type.replace(/_/g, ' ').toLowerCase(): this.properties.relation
      return _this.type ? relation : _this.properties.relation;
    }
  });

  this.langType = langType;
  this.identity = gluonRaw.identity;
  this.type = gluonRaw.type;
  this.start = gluonRaw.start;
  this.end = gluonRaw.end;
  this.properties = gluonRaw.properties;
  var util = new _common.default();
  this.period_str = util.period2str(gluonRaw.properties);
};

var _default = GluonUtil;
exports.default = _default;

//# sourceMappingURL=gluon.js.map