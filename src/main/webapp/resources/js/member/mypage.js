function modify(f){
	f.action = '/member/mypageLogin';
	f.submit();	
}

function deletes(f, m_idx){
	
	fetch('/member/deleteMemberCheck', {
		method : 'post',
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.text())
	.then(text => {
		if(text == "A"){ // 파티 존재
			if (confirm("참여중인 파티가 존재합니다. \n회원 탈퇴를 하면 서비스를 더 이상 이용하실 수 없습니다. \n회원 탈퇴를 진행하시겠습니까?") == true) {
				var input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "deletechk");
				input.setAttribute("value", "Y");
				f.appendChild(input);
				modify(f);
			}
		}else if(text == "B"){ //파티 미존재
			if (confirm("회원 탈퇴를 하면 서비스를 더 이상 이용하실 수 없습니다. \n회원 탈퇴를 진행하시겠습니까?") == true) {
				var input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "deletechk");
				input.setAttribute("value", "Y");
				f.appendChild(input);
				modify(f);
			}
		}else if(text == "C"){ // 파티장 파티 존재
			alert("진행중인 파티가 존재합니다. \n파티종료 후 회원탈퇴 진행해주세요!");
		}
		
	}).catch(err => console.log(err));
	
}
function deletesCall(m_idx){
	fetch('/admin/lockaccount',{
		method : 'post',
		body : JSON.stringify({
			m_idx : m_idx,
			status : "N"
		}),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.text())
	.then(data => {
		if(data == 'success'){
			alert('회원탈퇴 처리가 완료 되었습니다.');
		}
		
		location.href = '/member/logout';
	})
	.catch(err => console.log(err));
}