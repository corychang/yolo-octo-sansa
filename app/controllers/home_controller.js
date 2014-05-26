
exports.index = function(req, res) {
  console.log('req user is ' + req.user);
  return res.render('home/index', {'user': req.user});
}
