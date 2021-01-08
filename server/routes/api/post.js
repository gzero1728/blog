import express from "express";
import auth from "../../middleware/auth";

// Model 
import Post from "../../models/post";

const router = express.Router();

// api/post
router.get("/", async (req, res) => {
    const postFindResult = await Post.find()
    console.log(postFindResult, "👉 All Post Get");
    res.json(postFindResult);
})

router.post("/", auth, async (req, res, next) => {
    try {
        console.log(req, "req");
        const { title, contents, fildUrl, creator } = req.body;
        const newPost = await Post.create({
            title, contents, fildUrl, creator
        });
        res.json(newPost);
    } catch (e) {
        console.log(e);
    }
});

export default router;