import express from "express";
import auth from "../../middleware/auth";

// Model 
import Post from "../../models/post";
import Category from "../../models/category";
import User from "../../models/user"
import Comment from "../../models/comment"

const router = express.Router();

// AWS S3
import multer from "multer"
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk"
import dotenv from "dotenv";
import { isNullOrUndefined } from "util";

dotenv.config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY
})

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "dir-blog/upload",
    region: "ap-northeast-2",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext)
      cb(null, basename + new Date().valueOf() + ext)
    }
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
})

// @route        POST  api/post/image
// @desc         Create a Post
// @access       Private
router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
  try {
    console.log(req.files.map((v) => v.location))
    res.json({ uploaded: true, url: req.files.map((v) => v.location) })
  } catch (e) {
    console.log(e)
    res.json({ uploaded: false, url: null })
  }
})


// @route      api/post
router.get("/", async (req, res) => {
  const postFindResult = await Post.find()
  console.log(postFindResult, "✅ All Post Get");
  res.json(postFindResult);
})

// @route      POST  api/post
// @desc       Create a Post
// @access     Private
router.post("/", auth, uploadS3.none(), async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, contents, fildUrl, creator, category } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fildUrl,
      creator: req.user.id,
      date: moment().format("YYYY-MM-DD hh:mm:ss")
    });

    const findResult = await Category.findOne({
      categoryName: category
    })
    console.log(findResult, "FindResult!")

    if (isNullOrUndefined(findResult)) {
      const newCategory = await Category.create.apply({
        categoryName: category
      })
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { category: newCategory._id }
      })
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { posts: newPost._id }
      })
      await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: newPost._id }
      })

    } else {
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id }
      })
      await Post.findByIdAndUpdate(newPost._id, {
        category: findResult._id
      })
      await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: newPost._id }
      })
    }
    return res.redirect(`/api/post/${newPost._id}`)
  } catch (e) {
    console.log(e);
  }
});

// @route      POST  api/post/:id
// @desc       DetailPost
// @access     Public
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("creator", "name")
      .populate({ path: "category", select: "categoryName" })
  } catch (e) {
    console.log(e)
    next(e)
  }
})


// [Comments Route]

// @route    GET  api/post/comments
// @desc     GET  All Comments
// @access   public
router.get("/:id/comments", async (req, res) => {
  try {
    const comment = await Post.findById(req.params.id)
      .populate({
        path: "comment"
      })
    const result = comment.comments
    console.log(result, "Comment load")
    res.json(result)
  } catch (e) {
    console.log(e)
  }
});

router.post("/:id/comments", async (req, res) => {
  const newComment = await Comment.create({
    contents: req.body.comments,
    creator: req.body.userId,
    creatorName: req.body.userName,
    post: req.body.id,
    date: moment().format("YYYY-MM-DD hh:mm:ss")
  })
  console.log(newComment, "newComment")
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id
      }
    })
    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id
        }
      }
    })
    res.json(newComment)
  } catch (e) {
    console.log(e)
    next(e)
  }
})



export default router;