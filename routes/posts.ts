import { Router } from "express"
import * as jwt from "express-jwt"
import * as moment from "moment";
import { posts, getAndIncreaseCount, Post } from "../components/posts"
import { secret, users } from "../components/users"


const router = Router();
export default router;


router.post('/', jwt({secret, algorithms: ['HS256']}), function (req: any, res, next) {
  let post = {
    id: getAndIncreaseCount(),
    username: req.user.name,
    timestamp: Date.now(),
    content: req.body.content
  }
  posts[post.id] = post
  res.json({ status: "success", id: post.id })
});

router.put('/:id', jwt({secret, algorithms: ['HS256']}), function (req: any, res, next) {
  let id = req.params.id
  if (!posts[id] || (users[req.user.name].permission !== "admin" && posts[id].username !== req.user.name)) {
    res.status(403)
    res.json({ status: "fail", err: "forbidden" })
    return
  }
  posts[id] = {
    id,
    username: posts[id].username,
    timestamp: Date.now(),
    content: req.body.content
  }
  res.send({ status: "success" })
});

router.delete('/:id', jwt({secret, algorithms: ['HS256']}), function (req: any, res, next) {
  let id = req.params.id
  if (!posts[id] || users[req.user.name].permission !== "admin") {
    res.status(403)
    res.json({ status: "fail", err: "forbidden" })
    return
  }
  delete posts[id]
  res.send({ status: "success" })
});

function parsePost(post: Post) {
  return {
    username: post.username,
    time: moment(post.timestamp).format(),
    content: post.content
  }
}

router.get('/:id', function (req: any, res, next) {
  let id = req.params.id
  let post = posts[id]
  if (!post) {
    res.status(404)
    res.json({ status: "fail", err: "not found" })
    return
  }
  let result = parsePost(post)
  res.send({ status: "success", post })
});

router.get('/', function (req: any, res, next) {
  let id = req.params.id
  let result = Object.values(posts).map(parsePost)
  res.send({ status: "success", posts: result })
});

