let regId = /^[A-Za-z0-9]{4,20}$/
let regPw = /^[0-9a-zA-Z]{8,16}$/;
let regNick = /^[가-힣a-zA-Z0-9]{2,10}$/;
let regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

var IMP = window.IMP;
IMP.init("imp45030755");  /* imp~ : 가맹점 식별코드*/

//본인확인 버튼 클릭 이벤트
document.querySelector('#certification').addEventListener('click', ()=>{
	//본인인증 모듈 호출
	// IMP.certification(param, callback) 호출
	IMP.certification({ 
		pg:'inicis_unified.{CPID}',//본인인증 설정이 2개이상 되어 있는 경우 필수 
		merchant_uid: createOrderNum(), // 주문 번호
	}, function (rsp) { // callback
		if (rsp.success) {
			fetch('/member/doCertify', {
				method : 'post',
				body : rsp.imp_uid,
				headers : {'Content-type' : 'application/json; charset=utf-8'}
			})
			.then(response => response.json())
			.then(json => {
				if (json.result == "1"){
					alert('이미 가입된 회원입니다. 다시 확인해주세요!');
					location.href="/member/login";
				}else{		
					alert('인증이 완료되었습니다.');
					document.querySelector("#name").value = json.name;
					document.querySelector("#phone").value = json.phone;
				}
			})
			.catch(err => console.log(err));
			
			
		} else {
			alert("인증에 실패하였습니다. \n에러 내용: " +  rsp.error_msg);
		}
	});
})

//주문번호 생성 함수
function createOrderNum() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
 
    let orderNum = year + month + day;
    for (let i = 0; i < 5; i++) {
        orderNum += Math.floor(Math.random() * 8);
    }
    return parseInt(orderNum);
}


// 동의 모두선택 / 해제
const agreeChkAll = document.querySelector('input[name=agreeAll]');
    agreeChkAll.addEventListener('change', (e) => {
    let agreeChk = document.querySelectorAll('input[type=checkbox]');
    for(let i = 0; i < agreeChk.length; i++){
      agreeChk[i].checked = e.target.checked;
    }
});
    
function validate(f){
	let joinAgree = document.querySelector(".joinAgree");
	
	if (joinAgree.style.display == 'inline-block'){
		if(f.agree1.checked == false){
			alert("회원가입약관의 내용에 동의하셔야 회원가입 하실 수 있습니다.");
			return false;
		}
		if(f.agree2.checked == false){
			alert("개인정보처리방침안내의 내용에 동의하셔야 회원가입 하실 수 있습니다.");
			return false;
		}
	}
	if(!f.id.value){
		alert("아이디를 입력해주세요.");
		return;
	}
	if(!f.password.value){
		alert("비밀번호를 입력해주세요.");
		return;
	}
	if(f.password.value != f.passwordCk.value){
		alert("비밀번호를 확인해주세요.");
		return;
	}	
	if(!f.name.value){
		alert("휴대폰 본인확인을 진행해주세요.");
		return;
	}
	if(!f.nickname.value){
		alert("닉네임을 입력해주세요.");
		return;
	}	
	if(!f.email.value){
		alert("이메일을 입력해주세요.");
		return;
	}	
	if(!f.phone.value){
		alert("휴대폰 본인확인을 진행해주세요.");
		return;
	}
	if( !regId.exec(f.id.value)  ){
		alert("아이디 : 영문자 또는 숫자로 최소 4글자 이상 입력 가능");
		f.id.value = '';
		f.id.focus();
		return;
	}
	if( !regPw.exec(f.password.value)  ){
		alert("비밀번호 : 소문자 or 숫자 or 대문자로 8~16자까지 입력 가능");
		f.password.value = '';
		f.password.focus();
		return;
	}
	if( !regEmail.exec(f.email.value)  ){
		alert("이메일 : '@' 포함하여 입력");
		f.email.value = '';
		f.email.focus();
		return;
	}
	if( !regNick.exec(f.nickname.value)  ){
		alert("닉네임 : 한글 또는 영문자로 2~10자까지 입력 가능");
		f.nickname.value = '';
		f.nickname.focus();
		return;
	}

		f.action = '/member/join';
		f.submit();		
}

// 아이디 정규식 및 중복 검사
let id = document.getElementById('id')
id.addEventListener('keyup', (e) => {
	var ckid1 = document.querySelector("#warn");
	if(id.value == ""){
		ckid1.style.display = 'none';
	}else{
		if( !regId.exec(id.value)  ){
			ckid1.classList.remove("input_red", "input_blue");
			ckid1.innerHTML = "아이디 : 영문자 또는 숫자로 최소 4글자 이상 입력 가능";
			ckid1.style.display = 'inline-block';
		}else{
			checkid2(id.value);
		}
	}
});


function checkid2(id) {
	let sendData = '?id=' + id;
	
	fetch('/member/memberIdChk' + sendData)
	.then( response => response.text() )
    .then( data => {
    	console.log(data);
    	var ckid1 = document.querySelector("#warn");
    	ckid1.classList.remove("input_red", "input_blue");
		if(data == 1){
			ckid1.innerHTML = "아이디가 이미 존재합니다.";
			ckid1.classList.add("input_red");
		}else{
			ckid1.innerHTML = "사용 가능한 아이디입니다.";
			ckid1.classList.add("input_blue");
		}
		ckid1.style.display = 'inline-block';

   })
   .catch( err => console.log(err) );
	
}

//비밀번호 정규식 검사
let password = document.getElementById('password');
password.addEventListener('keyup', (e) => {
	var ckpw1 = document.querySelector("#pw");
	if(password.value == ""){
		ckpw1.style.display = 'none';
	}else{
		if( !regPw.exec(password.value)  ){
			ckpw1.classList.remove("input_blue");
			ckpw1.innerHTML = "비밀번호 : 소문자 or 숫자 or 대문자로 8~16자까지 입력 가능";
			ckpw1.style.display = 'inline-block';
		}else{
			ckpw1.classList.add("input_blue");
			document.querySelector("#pw").innerHTML = "사용 가능한 비밀번호 입니다.";
		}
	}
});

//비밀번호 중복 검사
document.getElementById('passwordCk').addEventListener('keyup', (e) => {
	var password = document.getElementById("password");
	if(document.getElementById('passwordCk').value == ""){
		document.querySelector(".pw_input_1").style.display = 'none';
		document.querySelector(".pw_input_2").style.display = 'none';	
	}else{
		if (password.value.length >= 8){
			checkpw();
		}
	}
});


function checkpw() {
	
	var pw = document.getElementById("password").value;
	var ckpw = document.getElementById("passwordCk").value;
	var ckpw1 = document.querySelector(".pw_input_1");
	var ckpw2 = document.querySelector(".pw_input_2");
	
	
	if(pw == ckpw){
		ckpw1.style.display = 'inline-block';
		ckpw2.style.display = 'none';	
	}else{
		ckpw2.style.display = 'inline-block';
		ckpw1.style.display = 'none';
	}
}

//닉네임 정규식 및 중복 검사
let nickname = document.getElementById('nickname')
nickname.addEventListener('keyup', (e) => {
	var cknick1 = document.querySelector("#nick");
	if(nickname.value == ""){
		cknick1.style.display = 'none';
	}else{
		if( !regNick.exec(nickname.value)  ){
			cknick1.classList.remove("input_red", "input_blue");
			cknick1.innerHTML = "닉네임 : 한글 또는 영문자로 2~10자까지 입력 가능";
			cknick1.style.display = 'inline-block';
		}else{
			cknick2(nickname.value);
		}
	}
});

function cknick2(nickname) {
	let sendData = '?nickname=' + nickname;
	
	fetch('/member/memberNickChk' + sendData)
	.then( response => response.text() )
    .then( data => {
    	console.log(data);
    	var cknick1 = document.querySelector("#nick");
    	cknick1.classList.remove("input_red", "input_blue");
		if(data == 1){
			cknick1.innerHTML = "닉네임이 이미 존재합니다.";
			cknick1.classList.add("input_red");
		}else{
			cknick1.innerHTML = "사용 가능한 닉네임 입니다.";
			cknick1.classList.add("input_blue");
		}
		cknick1.style.display = 'inline-block';

   })
   .catch( err => console.log(err) );
	
}


//이메일 정규식 및 중복 검사
let email = document.getElementById('email')
email.addEventListener('keyup', (e) => {
	var emailck1 = document.querySelector("#emailText");
	if(email.value == ""){
		emailck1.style.display = 'none';
	}else{
		if( !regEmail.exec(email.value)  ){
			emailck1.classList.remove("input_red", "input_blue");
			emailck1.innerHTML = "'@' 포함하여 입력";
			emailck1.style.display = 'inline-block';
		}else{
			emailck2(email.value);
		}
	}
});

function emailck2(email) {
	let sendData = '?email=' + email;
	
	fetch('/member/memberEmailChk' + sendData)
	.then( response => response.text() )
    .then( data => {
    	console.log(data);
    	var emailck1 = document.querySelector("#emailText");
    	emailck1.classList.remove("input_red", "input_blue");
		if(data == 1){
			emailck1.innerHTML = "이메일이 이미 존재합니다.";
			emailck1.classList.add("input_red");
		}else{
			emailck1.innerHTML = "사용 가능한 이메일 입니다.";
			emailck1.classList.add("input_blue");
		}
		emailck1.style.display = 'inline-block';

   })
   .catch( err => console.log(err) );
	
}

// SNS 회원가입시에만 동의서 + 회원가입 폼 (일반회원 가입시 폼만!)
let query = window.location.search;
let joinAgree = document.querySelector(".joinAgree");

if( query == '?sns'){
	joinAgree.style.display = 'inline-block';
}


