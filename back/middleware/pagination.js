// dependency to escape all unwanted characters from the search input
const escapeStringRegexp = require("escape-string-regexp");

// pagination and sorting middleware for all models
function paginate(model) {
  return async (request, response, next) => {
    // pagination
    const page = parseInt(request.query.page);
    const limit = parseInt(request.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const returnObject = {};

    // search
    const active = request.query.active;
    const land = request.params.land;
    const name = request.params.name;
    let activeCond = {};
    let landCond = {};
    let nameCond = {};
    let condition = {};

    // sorting and ordering
    const sort = request.query.sort;
    const order = request.query.order;
    const today = new Date();
    let sortObject = {};

    // set active or inactive anzeige conditions
    if (active === "true") {
      activeCond = { endDate: { $gte: today } };
      condition = activeCond;
    } else if (active === "false") {
      activeCond = { endDate: { $lte: today } };
      condition = activeCond;
    }

    // set conditions for bundesland search
    if (land) {
      if (land.includes("Ã¶")) {
        land = land.replace("Ã¶", "ö");
      }
      if (land.includes("Ã¤")) {
        land = land.replace("Ã¤", "ä");
      }
      landCond = { bundesland: land };
      condition = { ...activeCond, ...landCond };
    }

    // conditions for search input by name or address
    if (name) {
      const escapedTerm = escapeStringRegexp(name);
      nameCond = {
        $or: [
          { firma: new RegExp(escapedTerm, "ig") },
          { address: new RegExp(escapedTerm, "ig") },
        ],
      };
      condition = { ...activeCond, ...nameCond };
    }

    // set sorting and ordering conditions
    if (sort === "name") {
      sortObject = { firma: order };
    } else if (sort === "date") {
      sortObject = { endDate: order };
    } else {
      sortObject = { _id: order };
    }

    // set pagination for next page
    if (endIndex < (await model.countDocuments(condition).exec())) {
      returnObject.next = {
        page: page + 1,
        limit: limit,
      };
    }

    // set pagination for previous page
    if (startIndex > 0) {
      returnObject.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // perform search and forward paginated and sorted results
    try {
      returnObject.results = await model
        .find(condition)
        .limit(limit)
        .skip(startIndex)
        .sort(sortObject)
        .exec();
      response.paginatedResults = returnObject;
      next();
    } catch (e) {
      response.status(500).send({ message: e.message });
    }
  };
}

// export our pagination middleware
module.exports = { paginate };
