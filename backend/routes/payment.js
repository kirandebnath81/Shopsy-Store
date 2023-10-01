const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

//create orders
router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, function (err, order) {
      if (err) {
        return res.status(500).json({ message: "Some error occured" });
      }

      res.status(200).json(order);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

//payment verify
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSignature) {
      return res
        .status(200)
        .json({ message: "Your order has been placed successfully" });
    } else {
      return res.status(400).json({ message: "Invalid Signature Sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

module.exports = router;
