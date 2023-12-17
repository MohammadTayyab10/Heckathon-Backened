const app = require("express");
const router = app.Router();
const AttendenceModal = require("../Model/attendence");
// const authenticateJWT = require('../helpers/authenticateJWT')

// Get All Blogs
router.get("/",async (req, res) => {
  const attendence = await AttendenceModal.find().populate('user').exec();
  res.status(200).send({
    status: 200,
    attendence,
  });
});

// Get Single Blog
// router.get("/:id", async (req, res) => {
//   const blog = await BlogModal.findById(req.params.id).populate('user').exec();
//   if (!blog) {
//     res.status(500).send({ status: 500, error: true, msg: "blog not found" });
//   }
//   if (blog) {
//     res.status(200).send({ status: 200, blog });
//   }
// });

router.get("/:findByUser", async (req, res) => {
  const attendence = await AttendenceModal.find({ userId: req.params.userId }).populate('user').exec();
  if (!attendence) {
    res.status(500).send({ status: 500, error: true, msg: "user not found" });
  }
  if (attendence) {
    res.status(200).send({ status: 200, attendence });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {

    const path = req.files[0].path

    cloudinary.uploader.upload(
        path,async(error, data)=>{
            if(error){
                return res.json({message:"could not upload image to cloud, try again"})
            }
        }
    )

    const attendence = await AttendenceModal.create({
        img:data.url,
    });
    res.status(200).send({ status: 200, attendence });
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
  // users.push({ name: req.body.name, id: users.length + 1 })
});

// router.delete("/:id", async (req, res) => {
//   try {
//     await BlogModal.findByIdAndDelete(req.params.id);
//     res.status(200).send({ status: 200, msg: "User deleted" });
//   } catch (err) {
//     res
//       .status(500)
//       .send({ status: 500, error: err, msg: "internal sever error" });
//   }
//   // users.splice(req.params.id - 1, 1)
//   // res.status(200).send({ status: 200, users })
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const blog = await BlogModal.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...req.body,
//       },
//       { new: true }
//     );
//     if (!blog) {
//       res.status(401).send({ status: 401, msg: "blog Not Found" });
//     } else {
//       res.status(200).send({ status: 200, blog, msg: "blog Updated" });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .send({ status: 500, error: err, msg: "internal sever error" });
//   }
// });

module.exports = router;