var nameFunctions = require('keystone-storage-namefunctions');

exports.swotAnalysisFilenameGenerator = function (file, index, callback) {
  nameFunctions.randomFilename(file, index, function(f, filename) {
    const originalFilename = file.originalname.replace(/[^0-9a-z]/gi, ''); //remove non alphanumeric characters and then remove file extension
    callback(null,  `${originalFilename}_${filename}`);
  });  
}
