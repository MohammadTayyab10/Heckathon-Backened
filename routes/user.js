const app = require("express");
const router = app.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModal = require("../Model/user");
require('dotenv').config()
// console.log('env==>', process.env);

// Get All Users
router.get("/", async (req, res) => {
  console.log("normal api")
  const users = await UserModal.find();
  res.status(200).send({
    status: 200,
    users,
  });
});

// router.get("/find/email", async (req, res) => {
//   console.log("Email Query:", req.query);
//   // console.log("adklfdsjlkfdskj")

//   // return res.send({ msg: true })

//   const userByEmail = await UserModal.find({ email: req.query.email });
//   console.log(userByEmail);

//   if (userByEmail.length === 0) {
//     res.status(404).send({ status: 404, error: true, msg: "User not found" });
//   } else {
//     res.status(200).send({ status: 200, userByEmail });
//   }
// });


// Get Single User
router.get("/:id", async (req, res) => {
  console.log("single user")
  try {

    const user = await UserModal.find({_id:req.params.id});
    if (!user) {
      res.status(500).send({ status: 500, error: true, msg: "user not found" });
    }
    if (user) {
      res.status(200).send({ status: 200, user });
    }
  } catch (error) {
    console.log(error.message)
  }
});

// router.get("/?findByEmail", async (req, res) => {
//   const userByEmail = await UserModal.find({ email: req.query.email });
//   console.log(userByEmail);
//   if (!userByEmail) {
//     res.status(500).send({ status: 500, error: true, msg: "user not found" });
//   }
//   if (userByEmail) {
//     res.status(200).send({ status: 200, userByEmail });
//   }
// });


router.post("/", async (req, res) => {
  console.log(req.body);


  try {
    // Bcrypt Code
    const saltRounds = 10
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(req.body.password, salt);

    req.body.password = hash

    const user = await UserModal.create({ ...req.body });
    user.password = undefined
    res.status(200).send({ status: 200, user });
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
  // users.push({ name: req.body.name, id: users.length + 1 })
});


// Loging In through it

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const myUser = await UserModal.findOne({ email: email });
    console.log('user-->', myUser);
    if (myUser) {
      const isPasswordValid = bcrypt.compareSync(password, myUser.password)
      if (isPasswordValid) {
        console.log("user logined")
        myUser.password = undefined

        // generate token
        const token = jwt.sign({
          data: myUser,
        }, process.env.JWT_SECRET)
        console.log(token)

        res.status(200).send({
          status: 200,
          token,
          error: false, msg: "User is login", myUser
        });
      } else {
        res
          .status(401)
          .send({ status: 401, error: true, msg: "Password is not valid" });
      }
    } else {
      return res
        .status(401)
        .send({ status: 401, error: true, msg: "This email doesn't Exist" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
});



// router.post('/login', async (req, res) => {
//  console.log('Is this working')
//   try {

//     const user = UserModal.findOne({ email: req.body.email });
//     console.log(user);
//     if (!user) {
//       res.status(400).send("User not Login")
//       console.log("user not logined")     
//     }
//     else {
//         res.status(200).send("User Login Secceddfully")
//        console.log("user logined Secceccfully")
//        }
//     }
//     catch(err) {
//       res.status(400).send("User not Login")
//       console.log("user not logined")
//       console.log(err)
//   }

// })

router.delete("/:id", async (req, res) => {
  try {
    await UserModal.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: 200, msg: "User deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
  // users.splice(req.params.id - 1, 1)
  // res.status(200).send({ status: 200, users })
});

router.put("/:id", async (req, res) => {
  try {
    const user = await UserModal.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!user) {
      res.status(401).send({ status: 401, msg: "User Not Found" });
    } else {
      res.status(200).send({ status: 200, user, msg: "User Updated" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
});

module.exports = router;