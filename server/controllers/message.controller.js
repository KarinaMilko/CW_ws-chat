const { Message } = require("./../models");

module.exports.getMessages = async (req, res, next) => {
  const { limit = 20 } = req.query;

  try {
    const foundMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit));
    res.status(200).send({ data: foundMessages });
  } catch (err) {
    console.log("err :>> ", err);
    next(err);
  }
};

// module.exports.createMessage = async (req, res, next) => {
//   const { body } = req;

// try {
//   const createdMessage = await Message.create(body);

//     res.status(201).send({ data: createdMessage });
//   } catch (err) {
//     next(err);
//   }
// };
