'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();
var port = process.env.PORT || 3000;

app.use(_bodyParser2.default.urlencoded({ extended: true }));

router.route('/').get(function (req, res) {
  res.json({ message: 'Welcome to Restaurant API!' });
});

app.listen(port);
console.log('Running on port', port);
//# sourceMappingURL=app.js.map