var Router = require("express").Router;

var router = new Router();

router.post("/plan/choose/problem/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": 12 //planId
		}), Math.random() * 1500)
});

router.get("/plan/play/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"length": 14, //持续天数
				"endDate": "12月18日" //结束日期
			}
		}), Math.random() * 1500)
});

router.get("/plan/load", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"complete": 3, //结束的训练
				"total": 14, //总共的训练
				"score": 3000, //积分
				"problem": {
					"problem": "问题描述", //问题
					"pic": "头图" //问题头图
				},
				"deadline": 11, // 截止时间
				"length": 14, //持续天数
				"endDate": "2016-12-18", //结束日期
				"practice": [
					{
						"knowledge": {
							"id": 1,
							"knowledge": "知识点描述", //知识点描述
							"appear": 0, //是否出现过,0-未出现，1-出现过
						},
						"type": 1, // 1-热身训练，2-应用训练，3-挑战训练
						"status": 1, // 0-未完成，1-已完成
						"unlock": true, //是否解锁
						"practiceIdList": [1, 2, 3], //训练id
						"series": 1, //组号
						"sequence": 1 //组内顺序
					},
					{
						"knowledge": {
							"id": 1,
							"knowledge": "知识点描述", //知识点描述
							"appear": 1, //是否出现过,0-未出现，1-出现过
						},
						"type": 2, // 1-热身训练，2-应用训练，3-挑战训练
						"status": 1, // 0-未完成，1-已完成
						"unlock": true, //是否解锁
						"practiceIdList": [1], //训练id
						"series": 1, //组号
						"sequence": 2 //组内顺序
					}
				]
			}
		}), Math.random() * 1500)
});

router.get("/plan/knowledge/load/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"id": 1,
				"knowledge": "知识点描述", //知识点
				"voice": "http://someurl", //语音链接
				"pic": "http://someurl", //图片链接
				"analysis": "balbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbal" //文字解析
			}
		}), Math.random() * 1500)
});

module.exports = router;
