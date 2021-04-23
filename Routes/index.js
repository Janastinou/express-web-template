// http://127.0.0.1:2020

module.exports = async (req, res, next, ops) => {
    res.render('index.ejs', {
        req: req, res: res, next: next, ops: ops
    })
}