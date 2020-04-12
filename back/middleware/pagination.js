// middleware for pagination
// contains the mongoose search for all, active and expired ads
// also contains search methods for search by bundesland or search by name
function paginate(model, condition) {
  return async (request, response, next) => {
    const page = parseInt(request.query.page);
    const limit = parseInt(request.query.limit);
    const active = request.query.active;
    const today = new Date();

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const finalReturnObject = {};

    // set the next page for get all ads
    if (condition === "all") {
      if (endIndex < (await model.countDocuments().exec())) {
        finalReturnObject.next = {
          page: page + 1,
          limit: limit,
        };
      }
    }
    // set next page for active or expired ads
    else if (condition === "type") {
      if (active === "true") {
        if (
          endIndex <
          (await model.countDocuments({ endDate: { $gte: today } }).exec())
        ) {
          finalReturnObject.next = {
            page: page + 1,
            limit: limit,
          };
        }
      } else {
        if (
          endIndex <
          (await model.countDocuments({ endDate: { $lte: today } }).exec())
        ) {
          finalReturnObject.next = {
            page: page + 1,
            limit: limit,
          };
        }
      }
    }
    //set next page for bundesland search
    else if (condition === "bundesland") {
      let land = request.params.land;
      if (land.includes("Ã¶")) {
        land = land.replace("Ã¶", "ö");
      }
      if (land.includes("Ã¤")) {
        land = land.replace("Ã¤", "ä");
      }
      if (active === "true") {
        if (
          endIndex <
          (await model
            .countDocuments({ endDate: { $gte: today }, bundesland: land })
            .exec())
        ) {
          finalReturnObject.next = {
            page: page + 1,
            limit: limit,
          };
        }
      } else {
        if (
          endIndex <
          (await model
            .countDocuments({ endDate: { $lte: today }, bundesland: land })
            .exec())
        ) {
          finalReturnObject.next = {
            page: page + 1,
            limit: limit,
          };
        }
      }
    }
    //set next page for bundesland search
    else if (condition === "name") {
      const name = request.params.name;
      if (active === "true") {
        if (
          endIndex <
          (await model
            .countDocuments({
              endDate: { $gte: today },
              firma: new RegExp(name, "i"),
            })
            .exec())
        ) {
          finalReturnObject.next = {
            page: page + 1,
            limit: limit,
          };
        }
      } else {
        if (
          endIndex <
          (await model
            .countDocuments({ endDate: { $lte: today }, bundesland: land })
            .exec())
        ) {
          finalReturnObject.next = {
            page: page + 1,
            limit: limit,
          };
        }
      }
    }

    // set pagination for previous page
    if (startIndex > 0) {
      finalReturnObject.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    /* *** below starts the implementation of the pagination functions *** */

    // get all anzeigen paginated
    if (condition === "all") {
      try {
        finalReturnObject.results = await model
          .find()
          .limit(limit)
          .skip(startIndex)
          .exec();
        response.paginatedResults = finalReturnObject;
        next();
      } catch (e) {
        response.status(500).json({ message: e.message });
      }
    }

    // paginate get method for active or expired Ads
    if (condition === "type") {
      if (active === "true") {
        try {
          finalReturnObject.results = await model
            .find({ endDate: { $gte: today } })
            .limit(limit)
            .skip(startIndex)
            .exec();
          response.paginatedResults = finalReturnObject;
          next();
        } catch (e) {
          response.status(500).json({ message: e.message });
        }
      } else {
        try {
          finalReturnObject.results = await model
            .find({ endDate: { $lte: today } })
            .limit(limit)
            .skip(startIndex)
            .exec();
          response.paginatedResults = finalReturnObject;
          next();
        } catch (e) {
          response.status(500).json({ message: e.message });
        }
      }
    }

    // paginate search by bundesland for active or expired
    if (condition === "bundesland") {
      let land = request.params.land;

      if (land.includes("Ã¶")) {
        land = land.replace("Ã¶", "ö");
      }
      if (land.includes("Ã¤")) {
        land = land.replace("Ã¤", "ä");
      }

      if (active === "true") {
        try {
          finalReturnObject.results = await model
            .find({ endDate: { $gte: today }, bundesland: land })
            .limit(limit)
            .skip(startIndex)
            .exec();
          response.paginatedResults = finalReturnObject;
          next();
        } catch (e) {
          response.status(500).json({ message: e.message });
        }
      } else {
        try {
          finalReturnObject.results = await model
            .find({ endDate: { $lte: today }, bundesland: land })
            .limit(limit)
            .skip(startIndex)
            .exec();
          response.paginatedResults = finalReturnObject;
          next();
        } catch (e) {
          response.status(500).json({ message: e.message });
        }
      }
    }

    // paginate search by name for active or expired ads
    if (condition === "name") {
      const name = request.params.name;
      if (active === "true") {
        try {
          finalReturnObject.results = await model
            .find({ endDate: { $gte: today }, firma: new RegExp(name, "i") })
            .limit(limit)
            .skip(startIndex)
            .exec();
          response.paginatedResults = finalReturnObject;
          next();
        } catch (e) {
          response.status(500).json({ message: e.message });
        }
      } else {
        try {
          finalReturnObject.results = await model
            .find({ endDate: { $lte: today }, firma: new RegExp(name, "i") })
            .limit(limit)
            .skip(startIndex)
            .exec();
          response.paginatedResults = finalReturnObject;
          next();
        } catch (e) {
          response.status(500).json({ message: e.message });
        }
      }
    }
  };
}

// export our pagination function
module.exports = {
  paginate,
};
