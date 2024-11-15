const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Branch, Sequelize } = require("../models/index");

class BranchService {
  static getAllBranches = async ({ page, limit }) => {
    const options = {
      order: [["created_at", "desc"]],
    };
    if (!+page || page < 0) {
      page = 1;
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      const offset = (page - 1) * limit;
      options.offset = offset;
    }

    const { rows: branches, count } = await Branch.findAndCountAll(options);
    return {
      branches,
      count,
    };
  };

  static createBranch = async (payload) => {
    const { address, latitude, longitude } = payload;
    payload.geom = Sequelize.fn(
      'ST_SetSRID',
      Sequelize.fn('ST_GeomFromText', `POINT(${+longitude} ${+latitude})`),
      4326 // SRID cho hệ tọa độ WGS84
    );
    const foundBranch = await Branch.findOne({
      where: { address },
    });
    if (foundBranch) {
      throw new BadRequestError("Branch exist!");
    }
    const branch = await Branch.create(payload);
    if (!branch) throw new BadRequestError("Create Branch error");
    return branch;
  };

  static updateBranch = async ({ id }, payload) => {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      throw new NotFoundError("Branch not found!");
    }
    await branch.update(payload, {
      where: {
        id,
      },
    });
  };

  static deleteBranch = async ({ id }) => {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      throw new NotFoundError("Branch not found!");
    }
    const deleted = await Branch.destroy({
      where: {
        id,
      },
    });
    return deleted;
  };
}

module.exports = BranchService;
