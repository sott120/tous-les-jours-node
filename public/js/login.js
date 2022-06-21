const logid = document.querySelector('#loginId');
const logpw = document.querySelector('#loginPw');
let error = document.querySelectorAll('.no');


logid.addEventListener('input', logId);
logpw.addEventListener('input', logPw);

// const turnRed = function (inputName) {
//     inputName.classList.remove('yes');
//     inputName.classList.add('no');
// };

// const turnGreen = function (inputName) {
//     inputName.classList.remove('no');
//     inputName.classList.add('yes');
// };

const checked = {
    idCheck : false,
    pwCheck : false
}

function logId() {
// const logidPattern = /^[a-zA-Z0-9_-]{5,20}$/g;
    if (logid.value === '') {
        error[0].innerHTML = '아이디를 입력하세요.';
        error[0].style.display = 'block';
        // turnRed(logid);
        checked.idCheck = false;
    }
    // else if (!logidPattern.test(logid.value)) {
    //     error[0].innerHTML = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
    //     error[0].style.display = 'block';
    //     // turnRed(id);
    //     checked.idCheck = false;
    // } 
    else {
        error[0].style.display = 'none';
        // turnGreen(logid);
        checked.idCheck = true;
    }
}
    
function logPw() {
// const logpwPattern = /^[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}$/g;
    if (logpw.value === '') {
        error[1].innerHTML = '비밀번호를 입력하세요.';
        error[1].style.display = 'block';
        // turnRed(logpw);
        checked.pwCheck = false;
    // } else if (!logpwPattern.test(logpw.value)) {
    //     error[1].innerHTML = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
    //     error[1].style.display = 'block';
    //     turnRed(logpw);
    //     checked.pwCheck = false;
    } else {
        error[1].style.display = 'none';
        // turnGreen(logpw);
        checked.pwCheck = true;
    }
}

function login(){
    const form = document.getElementById('login')
    if ( checked.idCheck === true && checked.pwCheck === true ){
        form.submit();
    } else if (logid.value === '') {
        error[0].innerHTML = '아이디를 입력하세요.';
        error[0].style.display = 'block';
        // turnRed(logid);
        checked.idCheck = false;
        alert("다시 확인해주세요");
    } else if (logpw.value === '') {
        error[1].innerHTML = '비밀번호를 입력하세요.';
        error[1].style.display = 'block';
        // turnRed(logpw);
        checked.pwCheck = false;
        alert("다시 확인해주세요");
    } //else{
    // alert("다시 확인해주세요");
        // error[0].innerHTML = '아이디를 입력하세요';
        // error[0].style.display = 'block';
        // error[1].innerHTML = '비밀번호를 입력하세요.';
        // error[1].style.display = 'block';
    // }
}