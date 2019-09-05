import moment from 'moment'
class Util {
  period2str(quark) {
	  if (!quark.start && !quark.end) return '';

	  let start_str = this.date2str(quark.start, quark.start_accuracy);
	  let end_str = this.date2str(quark.end, quark.end_accuracy);

	  let ret = '';
	  if (quark.is_momentary) {
	    ret = '(' + start_str + ')';
	  } else {
	    ret = '(' + start_str;
	    ret = ret + ' ~ ';
	    ret = ret + end_str + ')';
	  }
	  return ret;
  }
  date2str(date, accuracy) {
	  if (!date) return '';
	  let format = '';
	  if (accuracy === 'year') {
	    format = 'YYYY';
	  } else if (accuracy === 'month') {
	    format = 'YYYY-MM';
	  } else if (accuracy === 'day') {
	    format = 'YYYY-MM-DD';
	  } else {
	    format = 'YYYY-MM-DD';
	  }
	  return moment(date).format(format);
  }
  fCamelToSnake(p) {
    //大文字を_+小文字にする(例:A を _a)
    return p.replace(/([A-Z])/g,
                     function(s) {
                       return '_' + s.charAt(0).toLowerCase();
                     }
    );
  }
  fPascalToSnake(p) {
	  return this.fCamelToSnake(p).replace(/^_/, '');
  }

  sanitizeFormData(form) {
	  let ret = {};
	  Object.keys(form).map((value, index) => {
	    if ( (form[value] === null) || (typeof form[value] === 'undefined')) {
		    return null;
	    }

	    if (typeof form[value] === 'boolean') {
		    ret[value] = form[value] ? 1 : 0;
	    } else {
		    ret[value] = form[value];
	    }
	    return null
	  });
	  return ret;
  }
}
export default Util;

// DateInString format: yyyy-mm-dd
export function strDateToJSTDate(dateInString) {
  return new Date(`${dateInString}T00:00:00+0900`)
}

// date is Date type
export function toDateString(date) {
  if (!date || isNaN(date)) {
    return ''
  }
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  (day.length === 1) && (day = '0' + day);
  (month.length === 1) && (month = '0' + month);
  
  return `${date.getFullYear()}-${month}-${day}`
}
