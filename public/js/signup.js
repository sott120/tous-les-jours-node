//유효성검사
const id = document.querySelector('#userId');
const pw = document.querySelector('#userPw');
const pwChk = document.querySelector('#userPwChk');
const userNm = document.querySelector('#userNm');
const gender = document.querySelector('#userGender');
const bthYear = document.querySelector('#birthYear');
const bthMnth = document.querySelector('#birthMnth');
const bthDay = document.querySelector('#birthDay');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const error = document.querySelectorAll('.input_warn_txt');

id.addEventListener('input', chkId);
pw.addEventListener('input', chkPw);
pwChk.addEventListener('input', comparePw);
userNm.addEventListener('input', chkName);
phone.addEventListener('input', checkPhoneNum);
email.addEventListener('input', isEmailCorrect);

const turnRed = function (inputName) {
    inputName.classList.remove('input_pass');
    inputName.classList.add('input_warn');
};

const turnGreen = function (inputName) {
    inputName.classList.remove('input_warn');
    inputName.classList.add('input_pass');
};

const checked = {
    idCheck : false,
    pwCheck : false,
    pwCompareCheck : false,
    nameCheck : false,
    emailCheck : false
}

function chkId() {
const idPattern = /^[a-zA-Z0-9_-]{5,20}$/g;
    if (id.value === '') {
        error[0].innerHTML = '필수 정보입니다.';
        error[0].style.display = 'block';
        turnRed(id);
        checked.idCheck = false;
    }
    else if (!idPattern.test(id.value)) {
        error[0].innerHTML = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
        error[0].style.display = 'block';
        turnRed(id);
        checked.idCheck = false;
    } 
    else {
        error[0].style.display = 'none';
        id.classList.remove('input_warn');
        turnGreen(id);
        checked.idCheck = true;
    }
}

function chkPw() {
    const pwPattern = /^[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}$/g;
    if (pw.value === '') {
        error[1].innerHTML = '필수 정보입니다.';
        error[1].style.display = 'block';
        turnRed(pw);
        checked.pwCheck = false;
    } else if (!pwPattern.test(pw.value)) {
        error[1].innerHTML = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
        error[1].style.display = 'block';
        turnRed(pw);
        checked.pwCheck = false;
    } else {
        error[1].style.display = 'none';
        turnGreen(pw);
        checked.pwCheck = true;
    }
}

function comparePw() {
    if (pw.value === pwChk.value && pwChk.value != '') {
        error[2].style.display = 'none';
        turnGreen(pwChk);
        checked.pwCompareCheck = true;
    } else if (pw.value !== pwChk.value) {
        error[2].innerHTML = '비밀번호가 일치하지 않습니다.';
        error[2].style.display = 'block';
        turnRed(pwChk);
        checked.pwCompareCheck = false;
    }
}

function chkName() {
    const namePattern = /^[a-zA-Z가-힣]{1,20}$/g;
    if (userNm.value === '') {
        error[3].innerHTML = '필수 정보입니다.';
        error[3].style.display = 'block';
        turnRed(userNm);
        checked.nameCheck = false;
    } else if (!namePattern.test(userNm.value) || userNm.value.indexOf(' ') > -1) {
        error[3].innerHTML = '한글과 영문 대 소문자를 사용하세요.';
        error[3].style.display = 'block';
        turnRed(userNm);
        checked.nameCheck = false;
    } else {
        error[3].style.display = 'none';
        turnGreen(userNm);
        checked.nameCheck = true;
    }
}


function checkPhoneNum() {
    phone.value = phone.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

function isEmailCorrect() {
    const emailPattern = /^[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/g;

    if (email.value === '') {
        error[5].style.innerHTML = '필수 정보입니다.'
        error[5].style.display = 'block';
        turnRed(email);
        checked.emailCheck = false;
    } else if (!emailPattern.test(email.value)) {
        error[5].innerHTML = '올바른 형식이 아닙니다.';
        error[5].style.display = 'block';
        turnRed(email);
        checked.emailCheck = false;
    } else {
        error[5].style.display = 'none';
        turnGreen(email);
        checked.emailCheck = true;
    }
}

function signup(){
    const form = document.getElementById('signup')
    if ( checked.idCheck === true && checked.pwCheck === true && checked.pwCompareCheck === true && checked.nameCheck === true && checked.emailCheck === true){
        form.submit();
    }
    else{
        alert("다시 확인해주세요")
    }
}
