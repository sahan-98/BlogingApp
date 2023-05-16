const Post = require('../schemas/post_schema');


    //Create Article
    const createPost = async (req, res) => {
        const { title, content, picture } = req.body;

        if (!title || !content) {
            res.status(422).json({ error: "Please fill the all fields!" })
        }

        //not pass password to article 
        req.user.password = undefined;

        const post = new Post({
            title: title,
            content: content,
            postImg: picture,
            postedBy: req.user
        });

        post.save().then(result => {
            res.json({ post: result })
        }).catch(err => {
            console.log(err)
        });
    }

    //get article
    const getPost = async (req, res) => {
        Post.find()
            .populate('postedBy', '_id name email username')
            .sort('-createdAt')
            .then(posts => {
                res.json({ posts: posts })
            }).catch(err => {
                console.log(err)
            })
    }

    // //get user own article
    // MyArticles: async (req, res) => {
    //     Post.find({ postedBy: req.user._id })
    //         .populate("postedBy", '_id name email')
    //         .sort('-createdAt')
    //         .then(myPost => {
    //             res.json({ myPost })
    //         }).catch(err => {
    //             console.log(err);
    //         })
    // }

    // //get relavant article by ID
    // const getPostDetailsbyID = async (req, res) => {
    //     let id = req.params.id;
    //     Post.findById(id, function (err, post) {
    //         res.json(post);
    //     });
    // }

    //Search function
    const searchBlogPosts = async (req, res, next) => {
      const searchText = req.params.key;
      try {
        const posts = await Post.find({
          $or: [
            { title: { $regex: new RegExp(searchText, 'i') } },
          ]
        }).populate('postedBy', '_id name email username');
        res.status(200).json({ posts: posts });
      } catch (error) {
        error.statusCode = 500;
        next(error);
      }
    };
    
    
    //get single post details
    const getPostDetailsbyID = async (req, res) => {
        try {
          let id = req.params.id;
          const post = await Post.findById(id)
          .populate('postedBy', '_id name email username')
            .sort('-createdAt');
          res.json(post);
        } catch (err) {
          // Handle any errors that occur during the process
          console.error(err);
          res.status(500).json({ error: 'An internal server error occurred' });
        }
      };

    //update Article by ID
    const updatePost = async (req, res) => {
      try {
          const { topic, body, picture } = req.body;
          await Post.findOneAndUpdate({ _id: req.params.id }, { topic, body, picture })
          res.json({ msg: "Update Article Successfull" })
      } catch (err) {
          return res.status(500).json({ msg: err.message })
      }
  }

    //delete relavant article by ID
    const deletePost = async (req, res) => {
      try {
        const post = await Post.findOne({ _id: req.params.id }).populate('postedBy', '_id');
        if (!post) {
          return res.status(422).json({ error: "Post not found" });
        }
    
        await Post.deleteOne({ _id: req.params.id });
        res.json({ message: "Post deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    


    exports.createPost =  createPost;
    exports.getPost = getPost;
    exports.getPostDetailsbyID = getPostDetailsbyID;
    exports.searchBlogPosts = searchBlogPosts;
    exports.updatePost = updatePost;
    exports.deletePost = deletePost;
    