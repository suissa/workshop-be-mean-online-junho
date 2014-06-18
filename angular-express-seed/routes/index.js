
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.expose = function(req, res) {
  // pego o diretório da view
  var dir = req.params.dir;
  // pego o nome da view
  var name = req.params.name;
  // crio o nome completo da view
  var view = dir + '/' + name;

  // renderizo a view
  res.render(view);
}