"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strDateToJSTDate = strDateToJSTDate;
exports.toDateString = toDateString;
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Util =
/*#__PURE__*/
function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, [{
    key: "period2str",
    value: function period2str(data) {
      if (!data.start && !data.end) return '';
      var start_str = this.date2str(data.start, data.start_accuracy);
      var end_str = this.date2str(data.end, data.end_accuracy);
      var ret = '';

      if (data.is_momentary) {
        ret = '(' + start_str + ')';
      } else {
        ret = '(' + start_str;
        ret = ret + ' ~ ';
        ret = ret + end_str + ')';
      }

      return ret;
    }
  }, {
    key: "date2str",
    value: function date2str(date, accuracy) {
      if (!date) return '';
      var format = '';

      if (accuracy === 'year') {
        format = 'YYYY';
      } else if (accuracy === 'month') {
        format = 'YYYY-MM';
      } else if (accuracy === 'day') {
        format = 'YYYY-MM-DD';
      } else {
        format = 'YYYY-MM-DD';
      }

      return (0, _moment.default)(date.toString()).format(format);
    }
  }, {
    key: "fCamelToSnake",
    value: function fCamelToSnake(p) {
      //大文字を_+小文字にする(例:A を _a)
      return p.replace(/([A-Z])/g, function (s) {
        return '_' + s.charAt(0).toLowerCase();
      });
    }
  }, {
    key: "fPascalToSnake",
    value: function fPascalToSnake(p) {
      return this.fCamelToSnake(p).replace(/^_/, '');
    }
  }, {
    key: "sanitizeFormData",
    value: function sanitizeFormData(form) {
      var ret = {};
      Object.keys(form).map(function (value, index) {
        if (form[value] === null || typeof form[value] === 'undefined') {
          return null;
        }

        if (typeof form[value] === 'boolean') {
          ret[value] = form[value] ? 1 : 0;
        } else {
          ret[value] = form[value];
        }

        return null;
      });
      return ret;
    }
  }]);

  return Util;
}();

var _default = Util; // DateInString format: yyyy-mm-dd

exports.default = _default;

function strDateToJSTDate(dateInString) {
  return new Date("".concat(dateInString, "T00:00:00+0900"));
} // date is Date type


function toDateString(date) {
  if (!date || isNaN(date)) {
    return '';
  }

  var month = (date.getMonth() + 1).toString();
  var day = date.getDate().toString();
  day.length === 1 && (day = '0' + day);
  month.length === 1 && (month = '0' + month);
  return "".concat(date.getFullYear(), "-").concat(month, "-").concat(day);
}

//# sourceMappingURL=common.js.map