"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _properties = require("../constants/properties");

var _qtype_properties = require("../constants/qtype_properties");

var _property_gtypes = require("../constants/property_gtypes");

var _langtypes = require("../constants/langtypes");

var _interaction = _interopRequireDefault(require("./interaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Properties =
/*#__PURE__*/
function () {
  function Properties(gluons) {
    var _this = this;

    var langType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _langtypes.LANGTYPE_ENG_LIKE;

    _classCallCheck(this, Properties);

    this.langType = langType;
    this.subject = new _interaction.default(gluons[0], langType).subject;
    var targetProperties = _qtype_properties.qtype_properties[this.subject.labels[0]];
    var data = [];

    _lodash.default.forEach(targetProperties, function (qtype_property, i) {
      var property_id = qtype_property.property_id;

      var gluonsRelated = _this.getGluonTypesRelated(property_id, gluons);

      if (gluonsRelated.length === 0) {
        return true; // as to continue
      }

      var property = _properties.properties[property_id].caption;

      if (langType === _langtypes.LANGTYPE_JP_LIKE) {
        property = _properties.properties[property_id].caption_ja;
      }

      data.push({
        property: property,
        gluonsRelated: gluonsRelated
      });
    });

    var property = 'others';

    if (langType === _langtypes.LANGTYPE_JP_LIKE) {
      property = 'その他';
    }

    gluons.forEach(function (interactionRaw) {
      var currentInteraction = new _interaction.default(interactionRaw, langType);
      var notInArray = true;
      data.forEach(function (listedProperty) {
        if (listedProperty.gluonsRelated.length === 0) {
          return true; // as to continue
        }

        listedProperty.gluonsRelated.forEach(function (gluonRelated) {
          if (gluonRelated.gluon.properties.id === currentInteraction.gluon.properties.id) {
            notInArray = false; // break
          }
        }); // if (!notInArray) break
      });

      if (notInArray) {
        // Add others record when the first other-interection hits
        if (data.length === 0 || data.slice(-1)[0].property !== property) {
          data.push({
            property: property,
            gluonsRelated: []
          });
        }

        data.slice(-1)[0].gluonsRelated.push(currentInteraction);
      }
    });
    this.data = data;
  }

  _createClass(Properties, [{
    key: "getGluonTypesRelated",
    value: function getGluonTypesRelated(property_id, gluons) {
      var _this2 = this;

      var targetPropertyGtypes = _property_gtypes.property_gtypes[property_id];

      if (!targetPropertyGtypes) {
        return [];
      }

      var ret = [];
      gluons.forEach(function (interactionRaw) {
        var currentInteraction = new _interaction.default(interactionRaw, _this2.langType);

        if (currentInteraction.gluon.type === 'HAS_RELATION_TO') {
          return true; // as to continue
        }

        targetPropertyGtypes.forEach(function (targetPropertyGtype) {
          if (currentInteraction.gluon.type === targetPropertyGtype.gluon_type) {
            if (targetPropertyGtype.direction === 0) {
              ret.push(currentInteraction);
            } else if (targetPropertyGtype.direction === 1 && _this2.subject.identity.toString() === currentInteraction.gluon.start.toString()) {
              ret.push(currentInteraction);
            } else if (targetPropertyGtype.direction === 2 && _this2.subject.identity.toString() === currentInteraction.gluon.end.toString()) {
              ret.push(currentInteraction);
            }
          }
        });
      });
      return ret;
    }
  }]);

  return Properties;
}();

var _default = Properties;
exports.default = _default;

//# sourceMappingURL=properties.js.map