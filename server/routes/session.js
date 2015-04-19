var total = 0;
module.exports.read = function(req, res) {
  res.json({
    total: total++
  });
};
