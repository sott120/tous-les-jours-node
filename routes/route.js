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
        res.redirect('/notice/1');
    });
});

router.get("/notice/:page", (req, res, next) => {
    let page = req.params.page;
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

router.get("/menu2", (req, res) => {
    res.render("menu2");
})

router.get("/menu3", (req, res) => {
    res.render("menu3");
})

router.get("/menu_sub", (req, res) => {
    res.render("menu_sub");
})

router.get("/menu_sub2", (req, res) => {
    res.render("menu_sub2");
})

router.get("/menu_sub3", (req, res) => {
    res.render("menu_sub3");
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

//검색기능
router.get("/search", (req, res, next) => {
    let keyword = req.query.search_txt;
    db.countAll((count) => {
        db.searchMemo(keyword, (rows) => {
            res.render('notice_list_search', {rows:rows, count:count, keyword:keyword});
            console.log(rows);
        });
    });
})

//회원가입 데이터 받기
router.post('/signup', (req, res, next)=> {
    let errs = validationResult(req);
    console.log(errs); //콘솔 에러 출력하기
    if (errs['errors'].length > 0) {
        //화면에 에러 출력하기
        res.render('signup', {
            errs: errs['errors']
        });
    } else {
        let param = JSON.parse(JSON.stringify(req.body));
        let user_id = param['user_id'];
        let user_pw = param['user_pw'];
        let user_nm = param['user_nm'];
        let user_gender = param['user_gender'];
        let birth_year = param['birth_year'];
        let birth_month = param['birth_month'];
        let birth_day = param['birth_day'];
        let phone = param['phone'];
        let email = param['email'];
        db.insertCustom(user_id, user_pw, user_nm, user_gender, birth_year, birth_month, birth_day, phone, email, () => {
            res.redirect('/');
        });
    }
}
); 

module.exports = router;