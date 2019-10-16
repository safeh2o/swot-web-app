var nameFunctions = require('keystone-storage-namefunctions');

exports.swotAnalysisFilenameGenerator = function (file, index, callback) {
  nameFunctions.randomFilename(file, index, function(f, filename) {
    const extension = file.originalname.indexOf(".") != -1 ? file.originalname.substr(file.originalname.lastIndexOf(".")) : ".xlsx";
    const originalFilename = file.originalname.replace(/[^0-9a-z]/gi, ''); //remove non alphanumeric characters
    callback(null,  `${originalFilename}_${filename}${extension}`);
  });  
}
