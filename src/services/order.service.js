const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Cart, Medicine, User } = require("../models/index");
class CartService {
  static getAllOrders = async ({ page, limit, userId, status }) => {
    const options = {
      order: [["created_at", "desc"]],
      include: [
        {
          model: User,
          attributes: ["name", "email", "status"],
          as: "user",
        },
      ],
    };
    if (userId) {
      options.where.user_id = userId;
    }
    if (!+page || page < 0) {
      page = 1;
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      const offset = (page - 1) * limit;
      options.offset = offset;
    }

    if (status) {
      options.where.status = status;
    }

    const { rows: carts, count } = await Cart.findAndCountAll(options);
    return {
      carts,
      count,
    };
  };

  static createOrder = async (payload) => {
    const {
      user_id,
      product_id,
      quantity,
      old_price,
      new_price,
      status,
      name,
      description,
      image,
    } = payload;
    const findCart = await Cart.findOne({
      where: {
        user_id,
        product_id,
        status: "pending",
      },
    });
    let cart;
    if (findCart) {
      cart = await findCart.update({ quantity: +findCart.quantity + quantity });
    } else {
      cart = await Cart.create(payload);
    }
    return cart;
  };

  static updateOrder = async ({ idOrder, payload }) => {
    const order = await Cart.findByPk(idOrder);
    if (!order) {
      throw new NotFoundError("Order not found!");
    }
    await Cart.update(payload, {
      where: {
        id: idOrder,
      },
    });
  };

  static deleteOrder = async ({ id }) => {
    const order = await Cart.findByPk(id);
    if (!order) {
      throw new NotFoundError("Order not found!");
    }
    const deleted = await Cart.destroy({
      where: {
        id,
      },
    });
    return deleted;
  };

  static deleteAllOrder = async ({ ids }) => {
    const carts = await Cart.destroy({
      where: {
        id: ids,
      },
    });
    return carts;
  };

  static updateAllOrder = async ({ data }) => {
    const carts = Cart.bulkCreate(data, {
      updateOnDuplicate: ["status"],
    });
    return carts;
  };
}

module.exports = CartService;
