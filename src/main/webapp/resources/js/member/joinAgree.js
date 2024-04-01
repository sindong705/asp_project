function agree(f){
	if(f.agree1.checked == false){
		alert("회원가입약관의 내용에 동의하셔야 회원가입 하실 수 있습니다.");
		return false;
	}
	if(f.agree2.checked == false){
		alert("개인정보처리방침안내의 내용에 동의하셔야 회원가입 하실 수 있습니다.");
		return false;
	}
	
	f.action = '/member/join';
	f.submit();
}

//동의 모두선택 / 해제
const agreeChkAll = document.querySelector('input[name=agreeAll]');
    agreeChkAll.addEventListener('change', (e) => {
    let agreeChk = document.querySelectorAll('input[type=checkbox]');
    for(let i = 0; i < agreeChk.length; i++){
      agreeChk[i].checked = e.target.checked;
    }
});
