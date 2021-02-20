//引用模块
const express = require("express");
//调用express方法
let app = express();
//跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
//连接数据库
let mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/Homework", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("连接数据库成功");
  })
  .catch((err) => {
    console.log(err);
  });
/* 登录注册业务 */
//设置登录注册规则
let userShema = new mongoose.Schema({
  username: String,
  password: String,
});
//创建集合
let user = mongoose.model("userCenter", userShema);
/* 注册 */
app.get("/register", (req, res) => {
  user.find({username: req.query.username}).then((data) => {
    if (data.length == 0) {
      user.create(req.query).then((result) => {
        result ? res.send("注册成功") : res.send("注册失败");
      });
    } else {
      res.send({
        status: false,
        msg: "手机号已经注册过了，请您去登陆",
      });
    }
  });
});
/* 登录 */
app.get("/login", (req, res) => {
  user
    .find({username: req.query.username, password: req.query.password})
    .then((data) => {
      data ? res.send("登录成功") : res.send("登录失败");
    });
});
/* 用户信息增删改查业务 */
//设置用户信息规则
let studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  sex: String,
  age: String,
  natives: String,
  identity: String,
  mailbox: String,
  phone: String,
});
//创建集合
let student = mongoose.model("userinfo", studentSchema);
/* 添加用户信息 */
app.get("/add", (req, res) => {
  student.create(req.query).then((data) => {
    data
      ? res.send({status: 1, msg: "添加成功"})
      : res.send({status: 0, msg: "添加失败"});
  });
});
/* show函数 */
app.get("/show", (req, res) => {
  student.find().then((data) => {
    res.send(data);
  });
});
/* 删除 */
app.get("/del", (req, res) => {
  student.findOneAndDelete({_id: req.query.id}).then((data) => {
    data
      ? res.send({status: 1, msg: "删除成功"})
      : res.send({status: 0, msg: "删除失败"});
  });
});
/* 修改反显 */
app.get("/xiu", (req, res) => {
  student.find({_id: req.query.id}).then((data) => {
    res.send(data);
  });
});
/* 确认修改 */
app.get("/gai", (req, res) => {
  student
    .updateOne(
      {
        _id: req.query.id,
      },
      {
        age: req.query.age,
        natives: req.query.natives,
        phone: req.query.phone,
        mailbox: req.query.mailbox,
      }
    )
    .then((data) => {
      data
        ? res.send({status: 1, msg: "修改成功"})
        : res.send({status: 0, msg: "修改失败"});
    });
});
//设置监听
app.listen("6060", () => {
  console.log("6060 在运行");
});
