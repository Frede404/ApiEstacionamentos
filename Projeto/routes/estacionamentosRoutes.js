const express = require("express")
const router = express.Router()

/*router.get("/soma/:a&:b", (req, res) => {
    const c = parseInt(req.params.a) + parseInt(req.params.b);
    res.send(c.toString());
})

router.get("/sub/:a&:b", (req, res) => {
    const c = parseInt(req.params.a) - parseInt(req.params.b);
	console.log(req.params.a , req.params.b , c)
    res.send(c.toString());
})

router.get("/div/:a&:b", (req, res) => {
    const c = parseInt(req.params.a) / parseInt(req.params.b);
	console.log(req.params.a , req.params.b , c)
    res.send(c.toString());
})

router.get("/mul/:a&:b", (req, res) => {
    const c = parseInt(req.params.a) * parseInt(req.params.b);
	console.log(req.params.a , req.params.b , c)
    res.send(c.toString());
})*/

module.exports = router;