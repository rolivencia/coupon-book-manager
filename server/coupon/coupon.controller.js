const express = require("express");
const router = express.Router();
const couponService = require("./coupon.service");

router.delete("/remove/:id", remove);
router.put("/update", update);
router.post("/create", create);
router.post("/redeem", redeem);
router.get("/redeemable/:idCustomer", getRedeemable);
router.get("/get/:id", get);
router.get("/getRedeemed/:idCustomer/:limit/:offset", getRedeemed);
router.get("/getRedeemedByDate/:dateFrom/:dateTo", getRedeemedByDate);
router.get("/current", getCurrent);
router.get("/status/:idCoupon/:idCustomer", status);
router.get("/all/:expired/:deleted", getAll);

module.exports = router;

async function getRedeemable(req, res, next) {
  couponService
    .getRedeemable(req.params.idCustomer)
    .then(response => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not get redeemable coupons from customer with id: " +
            req.params.idCustomer
        });
      }
    })
    .catch(err => next(res.status(400).json({ message: err })));
}

async function getRedeemed(req, res, next) {
  couponService
    .getRedeemed(req.params.idCustomer, req.params.limit, req.params.offset)
    .then(response => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not get retrieved coupons from customer with id: " +
            req.params.idCustomer
        });
      }
    })
    .catch(err => next(res.status(400).json({ message: err })));
}

async function getRedeemedByDate(req, res, next) {
  couponService
    .getRedeemedByDate(req.params.dateFrom, req.params.dateTo)
    .then(response => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not get retrieved coupons for the given date"
        });
      }
    })
    .catch(err => next(res.status(400).json({ message: err })));
}

async function status(req, res, next) {
  couponService
    .status(req.params.idCoupon, req.params.idCustomer)
    .then(response => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not get coupon status data for coupon with id: " +
            req.param("idCoupon") +
            " in relation to user with id: " +
            req.param("idCustomer")
        });
      }
    })
    .catch(err => next(res.status(400).json({ message: err })));
}

async function remove(req, res, next) {
  couponService
    .remove(req.param("id"))
    .then(response => {
      if (response) {
        res.json([...response, req.param("id")]);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not delete coupon with id: " + req.param("id")
        });
      }
    })
    .catch(err => next(res.status(400).json({ message: err })));
}

async function update(req, res, next) {
  couponService
    .update(req.body)
    .then(response => {
      if (response) {
        res.json([...response, req.body.id]);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not update coupon with id: " + req.body.id
        });
      }
    })
    .catch(err => next(res.status(400).json({ message: err })));
}

async function create(req, res, next) {
  couponService
    .create(req.body)
    .then(coupon => {
      if (coupon) {
        res.json(coupon);
      } else {
        res.status(400).json({
          message: "Bad request. Could not add coupon to the database."
        });
      }
    })
    .catch(err => next(res.status(400).json({ message: err })));
}

async function get(req, res, next) {
  couponService
    .get(req.params.id)
    .then(coupons => {
      res.json(coupons);
    })
    .catch(err => next(res.status(400).json({ message: err })));
}

async function getAll(req, res, next) {
  couponService
    .getAll(req.params.expired, req.params.deleted)
    .then(coupons => res.json(coupons))
    .catch(err => next(res.status(400).json({ message: err })));
}

async function getCurrent(req, res, next) {
  couponService
    .getCurrent()

    .then(coupons => res.json(coupons))

    .catch(err => next(res.status(400).json({ message: err })));
}

async function redeem(req, res, next) {
  couponService
    .redeem(req.body)
    .then(response => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).json({
          message: "Bad request. Could not add coupon to the database."
        });
      }
    })
    .catch(err => next(res.status(400).json({ message: err })));
}
