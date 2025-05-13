const postModel = require("../model/post.model");

class PostService {
  async getAll(req, res) {
    const limit = parseInt(req.query.limit);

    const allPosts = await postModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit);
    return allPosts;
  }

  async create(req, res) {
    const newPost = await postModel.create({
      ...req.body,
      user: req.user.id,
    });
    return newPost;
  }
}

module.exports = new PostService();
