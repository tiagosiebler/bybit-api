
module.exports = {
  silly: function() {console.log(arguments)},
  debug: function() {console.log(arguments)},
  notice: function() {console.log(arguments)},
  info: function() {console.info(arguments)},
  warning: function() {console.warn(arguments)},
  error: function() {console.error(arguments)},
}
