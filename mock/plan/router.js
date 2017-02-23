var Router = require("express").Router;

var router = new Router();

router.post("/rise/plan/choose/problem/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": 12 //planId
		}), Math.random() * 1500)
});

router.get("/rise/plan/play/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"length": 14, //持续天数
				"endDate": "12月18日", //结束日期
				"pic": "http://www.iquanwai.com/images/cintro1.png" //问题头图
			}
		}), Math.random() * 1500)
});

router.get("/rise/plan/load", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"msg": {
				"id": 2,
				"openid": null,
				"problemId": 2,
				"startDate": "2016-12-24",
				"endDate": "2016-12-31",
				"closeDate": "2017-01-07",
				"currentSeries": 2, //当前题组
				"series": 7, //当前题组
				"totalSeries": 7,  //总题组
				"warmupComplete": 3, //结束的热身训练
				"applicationComplete": 2, //结束的应用训练
				"total": 14, //总共的训练
				"point": 0,
				"complete": 0,
				"keycnt": 2,
				"status": 1,
				"summary": true, //是否显示总结弹窗
				"problem": {
					"id": 2,
					"problem": "跟老板",
					"pic": "http://www.iquanwai.com/images/fragment/problem1.png",
					"length": 5,
					"warmupCount": 10,
					"applicationCount": 5,
					"challengeCount": 1,
					"description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握提出明确的诉求、讲好故事、以及有效使用证据的方法。结合运用理性和感性，更好说服他人。"
				},
				"practice": [{
					"knowledge": {
						"id": 6,
						"knowledge": "概括主题",
						"type": 1,
						"analysis": "当别人在听你讲话时，一般是逐句理解你的意思的。当大量信息扑向受众时，他们会自动从中寻找共同点，将你所表达的思想归类组合进行解读。但受众的知识背景和理解力千差万别，他们很难对你的表达做出和你完全一样的解读。这时你传达的信息既增加了读者的理解难度，又容易造成误解。因此，如果你先提出总结性的思想，再表述具体内容，可以让你的讲话条理清晰，更容易理解。",
						"pic": null,
						"voice": null,
						"appear": true
					},
					"type": 1,
					"status": 1,
					"unlocked": true,
					"practiceIdList": [49, 45, 47],
					"series": 1,
					"sequence": 1,
					"practicePlanId": 1
				}, {
					"knowledge": {
						"id": 7,
						"knowledge": "SCQA",
						"type": 1,
						"analysis": "SCQA通过讲故事的方式撰写主题、使主题更加鲜明和吸引人。通过SCQA概述你所要解决的问题背景、复杂性、关键问题和解决方案，以故事的形式激发读者兴趣，让他们专注于你的话题和你将要表达的思想。",
						"pic": null,
						"voice": null,
						"appear": true
					},
					"type": 1,
					"status": 0,
					"unlocked": true,
					"practiceIdList": [52, 56, 52],
					"series": 1,
					"sequence": 2,
					"practicePlanId": 1
				}, {
					"knowledge": {
						"id": 6,
						"knowledge": "概括主题",
						"type": 1,
						"analysis": "当别人在听你讲话时，一般是逐句理解你的意思的。当大量信息扑向受众时，他们会自动从中寻找共同点，将你所表达的思想归类组合进行解读。但受众的知识背景和理解力千差万别，他们很难对你的表达做出和你完全一样的解读。这时你传达的信息既增加了读者的理解难度，又容易造成误解。因此，如果你先提出总结性的思想，再表述具体内容，可以让你的讲话条理清晰，更容易理解。",
						"pic": null,
						"voice": null,
						"appear": true
					},
					"type": 11,
					"status": 0,
					"unlocked": true,
					"practiceIdList": [27],
					"series": 1,
					"sequence": 3,
					"practicePlanId": 1
				}, {
					"knowledge": null,
					"type": 21,
					"status": 3,
					"unlocked": true,
					"practiceIdList": [2],
					"series": 0,
					"sequence": 4
				}],
				"length": 7,
				"deadline": 11,
        "openRise":false
			}, "code": 200
		}), Math.random() * 1500)
});

router.get("/rise/plan/history/load/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"msg": {
				"id": 2,
				"openid": null,
				"problemId": 2,
				"startDate": "2016-12-24",
				"endDate": "2016-12-31",
				"closeDate": "2017-01-07",
				"series": 7, //当前题组
				"currentSeries": 2, //当前题组
				"totalSeries": 7,  //总题组
				"warmupComplete": 3, //结束的热身训练
				"applicationComplete": 2, //结束的应用训练
				"total": 14, //总共的训练
				"point": 0,
				"complete": 0,
				"keycnt": 2,
				"status": 1,
				"summary": true, //是否显示总结弹窗
				"problem": {
					"id": 2,
					"problem": "跟老板",
					"pic": "http://www.iquanwai.com/images/fragment/problem1.png",
					"length": 5,
					"warmupCount": 10,
					"applicationCount": 5,
					"challengeCount": 1,
					"description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握提出明确的诉求、讲好故事、以及有效使用证据的方法。结合运用理性和感性，更好说服他人。"
				},
				"practice": [{
					"knowledge": {
						"id": 6,
						"knowledge": "概括主题",
						"type": 1,
						"analysis": "当别人在听你讲话时，一般是逐句理解你的意思的。当大量信息扑向受众时，他们会自动从中寻找共同点，将你所表达的思想归类组合进行解读。但受众的知识背景和理解力千差万别，他们很难对你的表达做出和你完全一样的解读。这时你传达的信息既增加了读者的理解难度，又容易造成误解。因此，如果你先提出总结性的思想，再表述具体内容，可以让你的讲话条理清晰，更容易理解。",
						"pic": null,
						"voice": null,
						"appear": true
					},
					"type": 1,
					"status": 1,
					"unlocked": true,
					"practiceIdList": [49, 45, 47],
					"series": 1,
					"sequence": 1,
					"practicePlanId": 1
				}, {
					"knowledge": {
						"id": 7,
						"knowledge": "SCQA",
						"type": 1,
						"analysis": "SCQA通过讲故事的方式撰写主题、使主题更加鲜明和吸引人。通过SCQA概述你所要解决的问题背景、复杂性、关键问题和解决方案，以故事的形式激发读者兴趣，让他们专注于你的话题和你将要表达的思想。",
						"pic": null,
						"voice": null,
						"appear": true
					},
					"type": 1,
					"status": 0,
					"unlocked": true,
					"practiceIdList": [52, 56, 52],
					"series": 1,
					"sequence": 2,
					"practicePlanId": 1
				}, {
					"knowledge": {
						"id": 6,
						"knowledge": "概括主题",
						"type": 1,
						"analysis": "当别人在听你讲话时，一般是逐句理解你的意思的。当大量信息扑向受众时，他们会自动从中寻找共同点，将你所表达的思想归类组合进行解读。但受众的知识背景和理解力千差万别，他们很难对你的表达做出和你完全一样的解读。这时你传达的信息既增加了读者的理解难度，又容易造成误解。因此，如果你先提出总结性的思想，再表述具体内容，可以让你的讲话条理清晰，更容易理解。",
						"pic": null,
						"voice": null,
						"appear": true
					},
					"type": 11,
					"status": 0,
					"unlocked": true,
					"practiceIdList": [27],
					"series": 1,
					"sequence": 3,
					"practicePlanId": 1
				}, {
					"knowledge": null,
					"type": 21,
					"status": 2,
					"unlocked": true,
					"practiceIdList": [2],
					"series": 0,
					"sequence": 4
				}],
				"length": 7,
				"deadline": 11
			}, "code": 200
		}), Math.random() * 1500)
});

router.get("/rise/plan/knowledge/load/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"id": 1,
				"knowledge": "知识点描述", //知识点
				"voice": "http://someurl", //语音链接
				"pic": "http://someurl", //图片链接
				"analysis": "balbalbal", //作用
				"means": "方法", //方法
				"keynote": "要点" //要点
			}
		}), Math.random() * 1500)
});

router.post("/rise/plan/knowledge/learn/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": "ok"
		}), Math.random() * 1500)
});

router.post("/rise/plan/complete", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": true
		}), Math.random() * 1500)
});

router.post("/rise/plan/close", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": "ok"
		}), Math.random() * 1500)
});

router.post('/rise/plan/openrise',(req,res)=>{
  setTimeout(()=>
    res.status(200).json({
      "code":200,
      "msg":"ok"
    }),Math.random() * 1500)
});

module.exports = router;
