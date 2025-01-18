const postModel = require("../model/post.model");

class PostServeice {
  async getAll(req, res) {
    const allPosts = await postModel.find();
    return allPosts;
  }

  async create(req, res) {
    const newPost = await postModel.create({
      ...req.body
    });
    return newPost;
  }
}

module.exports = new PostServeice();
