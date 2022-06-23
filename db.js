const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: '3306',
    database: 'team_project',
    dateStrings: 'date'
}); //보안상 다른 파일로 빼야됨

//리스트 전체 불러오는 함수
function getAllMemos(callback) {
    connection.query('SELECT * FROM (SELECT *, @rownum:=@rownum+1 AS RNUM FROM notice, (SELECT @rownum :=0 as R)NUM)SUB ORDER BY id DESC;', (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    });
}

//!!!!page test!!!!
//!!!!page test!!!!

//리스트 갯수를 카운트하는 함수
function countAll(callback){
    connection.query('SELECT COUNT(*) FROM notice',(err, result) => {
        let count = Object.values(result[0])[0];
        if (err) throw err;
        callback(count);
    });
}

//리스트에 새로운 내용을 추가하는 함수
function insertMemo(type, title, content, pw, callback) {
    connection.query(`INSERT INTO notice(noti_type, date, title, content, pw) VALUES ('${type}', NOW(),'${title}','${content}', '${pw}' )`, (err, result) => {
        if (err) throw err;
        callback();
    });
}

//리스트 중 id값이 일치하는 row만 불러오는 함수
function getMemoById(id, callback) {
    connection.query(`SELECT * FROM notice Where ID = ${id}`, (err, row, fields) => {
        if (err) throw err;
        callback(row);
    });
}

//리스트를 수정하고 싶을 때 id값이 일치하는 부분을 수정하는 함수
function updateMemoById(id, type, title, content, pw, callback) {
    connection.query(`UPDATE notice set noti_type = '${type}', title = '${title}', content = '${content}' , pw = '${pw}' WHERE id = ${id} `, (err, result) => {
        if (err) throw err;
        callback();
    });
}

//리스트 중 id값이 일치하는 부분을 삭제하는 함수
function deleteMemoById(id, callback) {
    connection.query(`DELETE FROM notice Where ID = ${id}`, (err, result) => {
        if (err) throw err;
        callback();
    });
}


module.exports = {
    getAllMemos,
    countAll,
    insertMemo,
    getMemoById,
    updateMemoById,
    deleteMemoById,
};
