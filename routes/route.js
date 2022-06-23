const express = require("express");
var expressLayouts = require('express-ejs-layouts');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');

const db = require('./../db.js');

router.use(expressLayouts); //route 파일과 경로를 지정

router.get("/", (req, res) => {
    res.render("main"); //메인페이지 지정
});

router.post('/write', [check('content').isByteLength({
        min: 1,
        max: 5000
    })], //그냥 islength도 가능
    function (req, res, next) {
        let errs = validationResult(req);
        console.log(errs); //콘솔 에러 출력하기
        if (errs['errors'].length > 0) {
            //화면에 에러 출력하기
            res.render('write', {
                errs: errs['errors']
            });
        } else {
            let param = JSON.parse(JSON.stringify(req.body));
            let type = param['noti_type'];
            let title = param['title'];
            let content = param['content'];
            let pw = param['pw'];
            db.insertMemo(type, title, content, pw, () => {
                res.redirect('/notice/1');
            });
        }
    }
);

router.get('/notice_update', (req, res) => {
    let id = req.query.id;
    db.getMemoById(id, (row) => {
        if (typeof id === 'undefined' || row.length <= 0) {
            res.status(404).json({
                error: 'undefined memo'
            });
        } else {
            res.render('notice_update', {
                row: row[0]
            });
        }
    });
});

router.post('/update', [check('content').isByteLength({
    min: 1,
    max: 5000
})], (req, res) => {
    let errs = validationResult(req);
    let param = JSON.parse(JSON.stringify(req.body));
    let id = param['id'];
    let type = param['noti_type'];
    let title = param['title'];
    let content = param['content'];
    let pw = param['pw'];
    if (errs['errors'].length > 0) {
        db.getMemoById(id, (row) => {
            res.render('notice_update', {
                row: row[0],
                errs: errs['errors']
            });
        });
    } else {
        db.updateMemoById(id, type, title, content, pw, () => {
            res.redirect('/notice/1');
        });
    }
});

router.get('/notice_delete', (req, res) => {
    let id = req.query.id;
    db.deleteMemoById(id, () => {
        res.redirect('/notice');
    });
});

router.get("/notice/:page", (req, res, next) => {
    var page = req.params.page;
    db.countAll((count) => { //리스트 갯수 체크
        db.getAllMemos((rows) => {
            res.render('notice_list', {rows: rows, count: count, page :page, leng : Object.keys(rows).length-1, pageNum : 8, pass : true});
        });
    });
})

router.get("/notice_view", (req, res) => {
    let id = req.query.id;
    db.getMemoById(id, (row) => {
        if (typeof id === 'undefined' || row.length <= 0) {
            res.status(404).json({
                error: 'undefined memo'
            });
        } else {
            res.render('notice_view', {
                row: row[0]
            });
        }
    });
})

router.get("/notice_write", (req, res) => {
    res.render("notice_write");
})

router.get("/intro", (req, res) => {
    res.render("intro");
})

router.get("/menu", (req, res) => {
    res.render("menu");
})

router.get("/menu_sub", (req, res) => {
    res.render("menu_sub");
})

router.get("/event", (req, res) => {
    res.render("event");
})

router.get("/event_view", (req, res) => {
    res.render("event_view");
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/signup", (req, res) => {
    res.render("signup");
})

module.exports = router;