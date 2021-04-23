// http://127.0.0.1:2020/test/test2/test3

module.exports = async (req, res, next, ops) => {
    res.render('test/test2/test3.ejs', {
        req: req, res: res, next: next, ops: ops
    })
}