document.querySelector("#login_button").addEventListener('click', ()=>{
	//alert("로그인 버튼 작동")
	if(document.getElementById("id").value ==''){
		alert("아이디를 입력해 주세요");
		document.getElementById("id").focus();
		return false;
	}
	if(document.getElementById("password").value ==''){
		alert("비밀번호를 입력해 주세요");
		document.getElementById("password").focus();
		return false;
	}
	document.getElementById("login_form").action = '/member/login';
	document.getElementById("login_form").submit();
});
