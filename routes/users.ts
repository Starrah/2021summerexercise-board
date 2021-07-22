import { users, secret } from "../components/users"
import { Request, Response, Router } from "express"
import { sign } from "jsonwebtoken"

const router = Router();
export default router;

router.post('/logon', function (req: Request, res: Response) {
  let { name, password } = req.body
  if (!name || !password) {
    res.status(400)
    res.json({ status: "fail", err: "invalid name or password!" })
    return
  }
  if (users[name]) {
    res.status(400)
    res.json({ status: "fail", err: "user exists!" })
    return
  }
  users[name] = {
    name, password, permission: "normal"
  }
  res.json({ status: "success" })
});

router.post('/login', function (req: Request, res: Response) {
  let { name, password } = req.body
  if (!users[name]) {
    res.status(400)
    res.json({ status: "fail", err: "user does not exist!" })
    return
  }
  if (users[name].password !== password) {
    res.status(400)
    res.json({ status: "fail", err: "password error!" })
    return
  }
  res.json({ status: "success", "authorization": "Bearer " + sign({ name }, secret) })
});
