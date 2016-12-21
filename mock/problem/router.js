var Router = require("express").Router;

var router = new Router();

router.get("/problem/load", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"name": "风之伤", //用户姓名
				"problemList": [
					{
						"id": 1, //问题id
						"problem": "问题描述" //问题描述
					},
					{
						"id": 2, //问题id
						"problem": "问题描述" //问题描述
					}
				]
			}
		}), Math.random() * 1500)
});

router.post("/problem/select", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": "ok"
		}), Math.random() * 1500)
});

router.get("/problem/load/mine", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"problemList": [
					{
						"problemId": 1, //问题id
						"problem": "问题描述", //问题描述
						"status": 0 //0-待解决，1-解决中，2-已解决
					},
					{
						"problemId": 2, //问题id
						"problem": "问题描述", //问题描述
						"status": 0 //0-待解决，1-解决中，2-已解决
					}
				]
			}
		}), Math.random() * 1500)
});

module.exports = router;
