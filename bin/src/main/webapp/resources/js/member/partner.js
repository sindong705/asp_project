function appPartner(f){
	if (!f.bank.value) {
		alert("은행을 선택해 주세요.");
		f.bank.focus();
		return;
	}
	
	if (!f.bank_number.value) {
		alert("계좌번호를 입력해주세요.");
		f.bank_number.focus();
		return;
	}
	
	if(f.agree.checked == false){
		alert("정보제공에 동의하셔야 신청이 가능합니다.");
		return false;
	}
	
	alert('신청이 완료되었습니다.\n파트너 페이지로 이동하겠습니다.');
	
	f.action = '/member/partnerApp';
	f.submit();	
}

function modifyPartner(f){
	if (!f.bank.value) {
		alert("은행을 선택해 주세요.");
		f.bank.focus();
		return;
	}
	
	if (!f.bank_number.value) {
		alert("계좌번호를 입력해주세요.");
		f.bank_number.focus();
		return;
	}
	
	if(f.agree.checked == false){
		alert("정보제공에 동의하셔야 수정이 가능합니다.");
		return;
	}
	alert('수정이 완료되었습니다.');

	f.action = '/member/partnerModify';
	f.submit();	
}