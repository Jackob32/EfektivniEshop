
var diacritics = require(process.cwd() + '/lib/filters/diacritics');


module.exports = function(str) {
    var url = str || '';
    url = url.trim();
    url = url.replace(/\s+/g, '-');
    url = diacritics(url);
    url = url.toLowerCase();
    url = url.replace(/[^a-z0-9-]+/g, '');
    return url;
};
