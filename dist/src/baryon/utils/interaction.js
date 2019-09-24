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
  function Interaction(interactionRaw, allNodes) {
    var _this = this;

    var langType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var graphPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var onLinkClick = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    _classCallCheck(this, Interaction);

    _defineProperty(this, "langType", _langtypes.LANGTYPE_ENG_LIKE);

    _defineProperty(this, "isArray", function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    });

    var interactionObject = interactionRaw.toObject();

    if (langType) {
      this.langType = langType;
    }

    this.subject = new _quark.default(interactionObject.subject, langType, graphPath, onLinkClick);
    this.object = new _quark.default(interactionObject.object, langType, graphPath, onLinkClick);
    var gluonRaw = interactionObject.gluon;

    if (this.isArray(gluonRaw)) {
      var interactionList = gluonRaw.map(function (interaction) {
        var gluon = new _gluon.default(interaction, langType);
        var subject = null;
        var object = null;

        if (_this.subject.identity.toString() === gluon.start.toString()) {
          subject = _this.subject;
          object = allNodes[gluon.end.toString()];
        } else if (_this.object.identity.toString() === gluon.start.toString()) {
          subject = allNodes[gluon.end.toString()];
          object = _this.object;
        } else if (_this.subject.identity.toString() === gluon.end.toString()) {
          subject = _this.subject;
          object = allNodes[gluon.start.toString()];
        } else if (_this.object.identity.toString() === gluon.end.toString()) {
          subject = allNodes[gluon.start.toString()];
          object = _this.object;
        }

        return {
          gluon: gluon,
          subject: subject,
          object: object
        };
      });
      this.gluon = interactionList[0].gluon;
      this.object = interactionList[0].object;

      if (interactionList.length >= 2) {
        var gluon2 = interactionList[1].gluon;
        var object2 = interactionList[1].object;
        var second = {
          gluon: gluon2,
          object: object2,
          objectName: object2.getName(),
          objectImagePath: object2.properties.image_path,
          relationPeriod: gluon2.period_str
        };
        this.seconds = [second];
        this.seconds[0].relationText = this.relationTextBuilder(2);
      } else {
        this.seconds = [];
      }
    } else {
      var gluon = gluonRaw;
      this.gluon = new _gluon.default(gluon, langType);
      this.object = new _quark.default(interactionObject.object, langType, graphPath, onLinkClick);
    } // These are needed in gluon component


    this.objectName = this.object.getName();
    this.objectImagePath = this.object.properties.image_path;
    this.relationText = this.relationTextBuilder();
    this.relationPeriod = this.gluon.period_str;
  }

  _createClass(Interaction, [{
    key: "relationTextBuilder",
    value: function relationTextBuilder() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var glue_sentence_before_link = '';
      var glue_sentence_after_link = ' ';
      var object = this.object;
      var gluon = this.gluon;

      if (level === 2) {
        object = this.seconds[0].object;
        gluon = this.seconds[0].gluon;
      }

      if (this.subject.identity.toString() === gluon.start.toString()) {
        glue_sentence_before_link = this.subject.getName();

        if (this.langType === _langtypes.LANGTYPE_ENG_LIKE) {
          glue_sentence_before_link += ' ' + gluon.getRelation();
        } else {
          glue_sentence_before_link += 'は';
          glue_sentence_after_link += gluon.getRelation();
        }

        glue_sentence_before_link += ' ';

        if (gluon.properties.suffix) {
          glue_sentence_after_link += gluon.properties.suffix;
        }
      } else if (this.subject.identity.toString() === gluon.end.toString()) {
        glue_sentence_before_link = '';

        if (this.langType === _langtypes.LANGTYPE_ENG_LIKE) {
          glue_sentence_after_link += gluon.getRelation() + ' ' + this.subject.getName() + ' ';
        } else {
          glue_sentence_after_link += 'は' + this.subject.getName() + gluon.getRelation();
        }

        glue_sentence_before_link += ' ';

        if (gluon.properties.suffix) {
          glue_sentence_after_link += gluon.properties.suffix;
        }
      } else {
        return '';
      }

      return _react.default.createElement("p", {
        className: "baryon-strong-interaction"
      }, glue_sentence_before_link, object.getLinkPath(object.name), glue_sentence_after_link);
    }
  }]);

  return Interaction;
}();

var _default = Interaction;
exports.default = _default;

//# sourceMappingURL=interaction.js.map