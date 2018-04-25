var Product = require('../model/products');
var Catalog = require('../model/catalog');
var multer = require('multer');


exports.getImages = function(callback, limit) {
 
 Image.find(callback).limit(limit);
}
 
 
exports.getImageById = function(id, callback) {
  
 Image.findById(id, callback);
 
}
 
exports.addImage = function(image, callback) {
 Image.create(image, callback);
}
//  //we are passing two objects in the addImage method.. which is defined above..
//  exports.addImage(imagepath, function(err) {
 
//  });
 exports.fileFilter = function(req, file, callback) {
	var ext = path.extname(file.originalname)
	if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
		return callback(res.end('Only images are allowed'), null)
	}
	callback(null, true)
}


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.error(err, statusCode);
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}



function productsInCategory(catalog) {
  var catalog_ids = [catalog._id].concat(catalog.children);
  return Product
    .find({'categories': { $in: catalog_ids } })
    .populate('categories')
    .exec();
}

// Gets a list of Products
exports.index = function(req, res) {
  Product.find()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Product from the DB
exports.show = function(req, res) {
  Product.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Product in the DB
exports.create = function(req, res) {
  Product.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Product in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Product.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Product from the DB
exports.destroy = function(req, res) {
  Product.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

// Uploads a new Product's image in the DB
exports.upload = function(req, res) {
  var file = req.files.file;
  if(!file){
    return handleError(res)('File not provided');
  }

  Product.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveFile(res, file))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.catalog = function(req, res) {
  Catalog
    .findOne({ slug: req.params.slug })
    .execAsync()
    .then(productsInCategory)
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.search = function(req, res) {
  Product
    .find({ $text: { $search: req.params.term }})
    .populate('categories')
    .then(responseWithResult(res))
    .catch(handleError(res));
};