window.onload = function(){
	//sns 연동 해제
	if(document.querySelector("#naverDelete")){
		document.querySelector("#naverDelete").addEventListener('click', ()=>{
			let m_idx = document.querySelector("#naverDelete").getAttribute('m_idx');
			if(confirm('해당 회원의 네이버 계정 연동을 해제 하시겠습니까?')){
				fetch('/admin/naverdelete', {
					method : 'post',
					body : m_idx,
					headers : {'Content-type' : 'application/json; charset=utf-8'}
				})
				.then(response => response.text())
				.then(data => {
					if(data == 'success'){
						document.querySelector("#naver").style.display = 'none';
					}
				})
				.catch(err => console.log(err));
			}
		})
	}
	
	if(document.querySelector("#kakaoDelete")){
		document.querySelector("#kakaoDelete").addEventListener('click', ()=>{
			let m_idx = document.querySelector("#kakaoDelete").getAttribute('m_idx');
			if(confirm('해당 회원의 카카오 계정 연동을 해제 하시겠습니까?')){
				fetch('/admin/kakaodelete', {
					method : 'post',
					body : m_idx,
					headers : {'Content-type' : 'application/json; charset=utf-8'}
				})
				.then(response => response.text())
				.then(data => {
					if(data == 'success'){
						document.querySelector("#kakao").style.display = 'none';
					}
				})
				.catch(err => console.log(err));
			}
		})
	}
}

let f = document.forms[1];

//회원 정보 수정 버튼
document.querySelector("#memberModify").addEventListener('click', ()=>{
	if(confirm('회원 정보를 수정하시겠습니까?')){
		if(f.email.value == ''){
			alert('이메일을 입력하세요.');
			f.email.focus();
			return;
		}
		
		switch (f.level.value) {
		  case 'A':
			f.auth.value = 'ROLE_ADMIN';
		    break;
		  case 'B':
			f.auth.value = 'ROLE_PARTNER';
			if(f.bank.selectedIndex == 0 || f.bank_number.value == ''){
				alert('파트너(B)등급은 계좌 정보 등록 필수 입니다.');
				return;
			}
		    break;
		  case 'C':
			f.auth.value = 'ROLE_USER';
		    break;
		  default:
		    alert('회원 등급은 A/B/C로 입력해주세요.');
		    f.level.focus();
		    return;
		}
		
		if(Number.isNaN(Number(f.bank_number.value))) {
			alert('계좌번호는 하이픈(-)을 제외한 숫자만 입력가능합니다.');
			f.bank_number.focus();
			return;
		}
		
		if(f.bank.selectedIndex != 0){
			if(f.bank_number.value == ''){
				alert('계좌번호를 입력해주세요.');
				f.bank_number.focus();
				return;
			}
		}
		
		if(f.bank_number.value != ''){
			if(f.bank.selectedIndex == 0){
				alert('은행을 선택해주세요.');
				f.bank.focus();
				return;
			}
		}
		
		if(Number.isNaN(Number(f.with_amount.value))) {
			alert('출금 가능 금액은 숫자만 입력가능합니다.');
			f.with_amount.focus();
			return;
		}
		
		if(Number.isNaN(Number(f.point.value))) {
			alert('포인트는 숫자만 입력가능합니다.');
			f.point.focus();
			return;
		}
		
		f.action = '/admin/membermodify';
		f.submit();
	}
})

//목록으로 이동
document.querySelector("#memberList").addEventListener('click', ()=>{
	location.href = '/admin/member';
})