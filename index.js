/**
 * Returns whether the current browser supports CSS transitions
 * @return {Boolean}
 */
exports.hasTransitions = function() {
  return Modernizr.csstransitions;
};

/**
 * Returns the event name for transition end for the current browser
 * @return {String}
 */
exports.transitionEnd = function() {
  var transEndEventNames = {
    'WebkitTransition' : 'webkitTransitionEnd',
    'MozTransition'    : 'transitionend',
    'OTransition'      : 'oTransitionEnd',
    'msTransition'     : 'MSTransitionEnd',
    'transition'       : 'transitionend'
  };
  return transEndEventNames[ Modernizr.prefixed('transition') ];
};

exports.afterTransition = function(el, callback) {
  var e = exports.transitionEnd();
  var deferred = new $.Deferred();
  deferred.done(callback);

  if( exports.hasTransitions() ) {
    el.one(e, function(){
      deferred.resolve();
    });
  }
  else {
    deferred.resolve();
  }
  
  return deferred;
};

// Borrowed from underscore.string
// https://github.com/epeli/underscore.string
exports.numberFormat = function(number, dec, dsep, tsep) {
  if (isNaN(number) || number === null) return '';

  number = number.toFixed(~~dec);
  tsep = typeof tsep == 'string' ? tsep : ',';

  var parts = number.split('.'), fnums = parts[0],
  decimals = parts[1] ? (dsep || '.') + parts[1] : '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
};

// Takes a number and formats it as a price
exports.numberToPrice = function(val) {
  return '$' + exports.numberFormat(val, 2) + '*';
};

exports.arraysEqual = function() {
  var args = _.toArray(arguments);
  _(args).invoke('sort');
  var zipped = _.zip.apply(null, args);
  return _.every(zipped, function(arr){
    return _.every(arr, function(val){
      return arr[0] === val;
    });
  });
};