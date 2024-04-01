let regPw = /^[0-9a-zA-Z]{8,16}$/;
let li_AuthenticationNumber = document.getElementById('li_AuthenticationNumber');
let li_newPassword = document.getElementById('li_newPassword');
let li_newPasswordCk = document.getElementById('li_newPasswordCk');
let div_button = document.getElementById('div_button');
let flag = false;

function validate(f){
	if (f.num.value != f.AuthenticationNumber.value) {
		alert("인증번호를 다시 확인해주세요!");
		li_AuthenticationNumber.style.display = 'block';
	}else {
		alert("인증번호가 확인되었습니다. 비밀번호를 변경해주세요!");
		li_newPassword.style.display = 'block';
		li_newPasswordCk.style.display = 'block';
		li_AuthenticationNumber.style.display = 'none';
		div_button.style.display = 'block';
		flag = true;
		
	}
}

function findSubmit(f) {
	if(!flag){
		alert("인증번호를 입력해주세요.");
	}else{
		if(!f.newPassword.value){
			alert("비밀번호를 입력해주세요.");
			return;
		}
		if(f.newPassword.value != f.newPasswordCk.value){
			alert("비밀번호를 확인해주세요.");
			return;
		}	
		alert("비밀번호가 변경 되었습니다. 다시 로그인 해주세요!");
		f.action = '/member/updatePw';
		f.submit();
		
	}
}

// 비밀번호 정규식 검사
let password = document.getElementById('newPassword');
password.addEventListener('keyup', (e) => {
	var ckpw1 = document.querySelector("#pw");
	if(password.value == ""){
		ckpw1.style.display = 'none';
	}else{
		if( !regPw.exec(password.value)  ){
			ckpw1.classList.remove("input_blue");
			ckpw1.innerHTML = "비밀번호 : 8~16자, 소문자 or 숫자 or 대문자";
			ckpw1.style.display = 'inline-block';
		}else{
			ckpw1.classList.add("input_blue");
			document.querySelector("#pw").innerHTML = "사용 가능한 비밀번호 입니다.";
		}
	}
});

// 비밀번호 중복 검사
document.getElementById('newPasswordCk').addEventListener('keyup', (e) => {
	var password = document.getElementById("newPassword");
	if(document.getElementById('newPasswordCk').value == ""){
		document.querySelector(".pw_input_1").style.display = 'none';
		document.querySelector(".pw_input_2").style.display = 'none';	
	}else{
		if (password.value.length >= 8){
			checkpw();
		}
	}
});

function checkpw() {
	
	var pw = document.getElementById("newPassword").value;
	var ckpw = document.getElementById("newPasswordCk").value;
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