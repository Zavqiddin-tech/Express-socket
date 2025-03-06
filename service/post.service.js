const postModel = require("../model/post.model");

class PostService {
  async getAll(req, res) {
    console.log('test');
    const limit = parseInt(req.query.limit)
    console.log(limit);

    const allPosts = await postModel.find().sort({createdAt: -1}).limit(limit);
    return allPosts;
  }

  async create(req, res) {
    console.log(req.user);
    const newPost = await postModel.create({
      ...req.body,
      user: req.user.id
    });
    return newPost;
  }
}

module.exports = new PostService();
