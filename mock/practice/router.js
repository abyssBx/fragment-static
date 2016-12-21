var Router = require("express").Router;

var router = new Router();

router.get("/practice/warmup/start/*/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"practice": [
					{
						"id": 1, //题目id
						"question": "单选", //问题题干
						"analysis": "balbal", //问题分析
						"voice": "http://someurl", //语音分析链接
						"type": 1, //1-单选题，2-多选题
						"difficulty": 1, //1-简单，2-普通，3-困难
						"choiceList": [
							{
								"id": 1,
								"questionId": 1, //问题id
								"subject": "选项1", //选项题干
								"sequence": 1, //选项顺序
								"isRight": false  //是否是正确选项
							},
							{
								"id": 2,
								"questionId": 1,
								"subject": "选项2",
								"sequence": 2,
								"isRight": true
							}
						]
					},
					{
						"id": 2, //题目id
						"question": "多选", //问题题干
						"analysis": "balbal", //问题分析
						"voice": "http://someurl", //语音分析链接
						"type": 2, //1-单选题，2-多选题
						"difficulty": 1, //1-简单，2-普通，3-困难
						"choiceList": [
							{
								"id": 1,
								"questionId": 1, //问题id
								"subject": "选项1", //选项题干
								"sequence": 1, //选项顺序
								"isRight": false  //是否是正确选项
							},
							{
								"id": 2,
								"questionId": 1,
								"subject": "选项2",
								"sequence": 2,
								"isRight": true
							}
						]
					}
				]
			}
		}), Math.random() * 1500)
});

router.post("/practice/warmup/answer", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"rightNumber": 3, //正确题数
				"point": 2000 //积分
			}
		}), Math.random() * 1500)
});

module.exports = router;
