"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _quark = _interopRequireDefault(require("./quark"));

var _gluon = _interopRequireDefault(require("./gluon"));

var _langtypes = require("../constants/langtypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Interaction =
/*#__PURE__*/
function () {
  function Interaction(interactionRaw) {
    var langType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Interaction);

    _defineProperty(this, "langType", _langtypes.LANGTYPE_ENG_LIKE);

    this.gluonKey = interactionRaw._fieldLookup.gluon;
    this.gluon = new _gluon.default(interactionRaw.get(this.gluonKey), langType);
    this.subjectKey = interactionRaw._fieldLookup.subject;
    this.subject = new _quark.default(interactionRaw.get(this.subjectKey), langType);
    this.objectKey = interactionRaw._fieldLookup.object;
    this.object = new _quark.default(interactionRaw.get(this.objectKey), langType);

    if (langType) {
      this.langType = langType;
    } // These are needed in gluon component


    this.objectName = this.object.getName();
    this.objectImagePath = this.object.properties.image_path;
    this.relationText = this.relationText(this.langType);
    this.relationPeriod = this.gluon.period_str;
  }

  _createClass(Interaction, [{
    key: "relationText",
    value: function relationText(langType) {
      var glue_sentence_before_link = '';
      var glue_sentence_after_link = ' ';

      if (this.subject.identity.toString() === this.gluon.start.toString()) {
        glue_sentence_before_link = this.subject.getName();

        if (langType === _langtypes.LANGTYPE_ENG_LIKE) {
          glue_sentence_before_link += ' ' + this.gluon.getRelation();
        } else {
          glue_sentence_before_link += 'は';
          glue_sentence_after_link += this.gluon.getRelation();
        }

        glue_sentence_before_link += ' ';

        if (this.gluon.properties.suffix) {
          glue_sentence_after_link += this.gluon.properties.suffix;
        }
      } else if (this.subject.identity.toString() === this.gluon.end.toString()) {
        glue_sentence_before_link = '';

        if (langType === _langtypes.LANGTYPE_ENG_LIKE) {
          glue_sentence_after_link += this.gluon.getRelation() + ' ' + this.subject.getName() + ' ';
        } else {
          glue_sentence_after_link += 'は' + this.subject.getName() + this.gluon.getRelation();
        }

        glue_sentence_before_link += ' ';

        if (this.gluon.properties.suffix) {
          glue_sentence_after_link += this.gluon.properties.suffix;
        }
      } else {
        return '';
      }

      return _react.default.createElement("p", {
        className: "baryon-strong-interaction"
      }, glue_sentence_before_link, this.object.getLinkPath(), glue_sentence_after_link);
    }
  }]);

  return Interaction;
}();

var _default = Interaction;
exports.default = _default;

//# sourceMappingURL=interaction.js.map