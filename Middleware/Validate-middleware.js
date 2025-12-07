const { ZodError } = require("zod");

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {

    if (err instanceof ZodError) {
      const extraDetails = err.issues?.[0]?.message || "Validation failed";
      return res.status(422).json({
        status: 422,
        message: "Fill the input properly",
        extraDetails: extraDetails,
      });
    }

    // return res.status(500).json({ msg: "Internal server error" });
    next({
      status: 500,
      message: "Internal server error",
      extraDetails: err.message,
    });
  }
};

module.exports = validate;
