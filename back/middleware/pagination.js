// middleware for pagination
// contains the mongoose search for all, active and expired ads
function paginate(model, condition) {
  return async (request, response, next) => {
    const page = parseInt(request.query.page);
    const limit = parseInt(request.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedObject = {};

    if (endIndex < (await model.countDocuments().exec())) {
      paginatedObject.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      paginatedObject.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // paginate all ads
    if (condition === "all") {
      try {
        paginatedObject.results = await model
          .find()
          .limit(limit)
          .skip(startIndex)
          .exec();
        response.paginatedResults = paginatedObject;
        next();
      } catch (e) {
        response.status(500).json({ message: e.message });
      }
    }

    // paginate active ads
    if (condition === "active") {
      try {
        let today = new Date();
        paginatedObject.results = await model
          .find({ endDate: { $gte: today } })
          .limit(limit)
          .skip(startIndex)
          .exec();
        response.paginatedResults = paginatedObject;
        next();
      } catch (e) {
        response.status(500).json({ message: e.message });
      }
    }

    // paginate inactive (expired) ads
    if (condition === "expired") {
      try {
        let today = new Date();
        paginatedObject.results = await model
          .find({ endDate: { $lte: today } })
          .limit(limit)
          .skip(startIndex)
          .exec();
        response.paginatedResults = paginatedObject;
        next();
      } catch (e) {
        response.status(500).json({ message: e.message });
      }
    }
  };
}

// export our pagination function
module.exports = {
  paginate,
};
