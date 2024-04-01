//form
let f = document.querySelector("#registerform");

//기존 등록된 2차 카테고리 selected
window.onload = function(){
	let msg = '<option value="0" selected>서비스 선택</option>';
	
	fetch('/admin/category', {
		method : 'post',
		body : f.codeone.value,
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		json.forEach(category => {
			msg += '<option value="' + category.codetwo + '"'
			if(codetwo == category.codetwo){
				msg += 'selected';
			}
			msg += '>' + category.c_secondary + '</option>';
		})
		
		f.codetwo.innerHTML = msg;
	})
	.catch(err => console.log(err));
	
	ruleCheck();
}

//서비스 select 관련 이벤트(1차 카테고리 선택에 따라 2차 카테고리 변경)
let c_primary = document.querySelector("select[name='codeone']");
let c_secondary = document.querySelector("select[name='codetwo']");

c_primary.addEventListener('change', () => {
	let msg = '<option value="0" selected>서비스 선택</option>';
	if(f.codeone.value != 0){
		
		fetch('/admin/category', {
			method : 'post',
			body : f.codeone.value,
			headers : {'Content-type' : 'application/json; charset=utf-8'}
		})
		.then(response => response.json())
		.then(json => {
			json.forEach(category => {
				msg += '<option value="' + category.codetwo + '">' + category.c_secondary + '</option>';
			})
			
			f.codetwo.innerHTML = msg;
		})
		.catch(err => console.log(err));
		
	}else{
		f.codetwo.innerHTML = msg;
	}
});

//기존에 선택했던 룰 체크
function ruleCheck(){
	let checkRule = document.querySelector("#checkRule").getAttribute("checkRule");
	let checkRuleArr = checkRule.split(',');
	
	let ruleList = document.querySelectorAll('input[name="rule"]');
	
	for(let i=0; i<ruleList.length; i++){
		checkRuleArr.forEach(checkRule => {
			if(ruleList[i].value == checkRule){
				ruleList[i].setAttribute("checked", "checked");
			}
		})
	}
}

//기간 확인 버튼
document.querySelector("#periodCheck").addEventListener('click', ()=>{
	if(f.end_date.value == ''){
		alert('종료 날짜를 선택하세요.');
		f.end_date.focus();
		return;
	}
	
	let sArr = f.start_date.value.split('-');
	let eArr = f.end_date.value.split('-');
	let sDate = new Date(sArr[0], sArr[1], sArr[2]);
	let eDate = new Date(eArr[0], eArr[1], eArr[2]);

	
	let diffDate = Math.abs((sDate - eDate) / (1000*60*60*24));
	
	document.querySelector("#periodCheckResult").innerHTML = '총 ' + diffDate + '일';
})

//수령 금액 확인 버튼
document.querySelector("#priceCheck").addEventListener('click', ()=>{
	if(isNaN(Number(f.price.value))){
		alert('참여금액은 숫자만 입력 가능 합니다.');
		f.price.value = '';
		f.price.focus();
		return;
	}
	
	if(f.party_num.selectedIndex == 0){
		alert('모집인원을 선택하세요.');
		f.party_num.focus();
		return;
	}
	
	if(f.end_date.value == ''){
		alert('종료 날짜를 선택하세요.');
		f.end_date.focus();
		return;
	}
	
	if(f.price.value == ''){
		alert('참여 금액을 입력하세요.');
		f.price.focus();
		return;
	}
	
	let sArr = f.start_date.value.split('-');
	let eArr = f.end_date.value.split('-');
	let sDate = new Date(sArr[0], sArr[1], sArr[2]);
	let eDate = new Date(eArr[0], eArr[1], eArr[2]);

	
	let diffDate = Math.abs((sDate - eDate) / (1000*60*60*24));
	
	document.querySelector("#totalpriceResult").innerHTML = f.party_num.value + '인 / 총 ' + f.price.value * diffDate * f.party_num.value + '원';
})

//파티 수정 버튼
document.querySelector("#myPartyModify").addEventListener('click', ()=>{
	if(f.codeone.value == 0 || f.codetwo.value == 0){
		alert('서비스를 선택하세요.');
		f.codeone.focus();
		return;
	}
	
	if(f.title.value == ''){
		alert('제목을 입력하세요.');
		f.title.focus();
		return;
	}
	
	if(f.party_num.selectedIndex == 0){
		alert('모집인원을 선택하세요.');
		f.party_num.focus();
		return;
	}
	
	if(f.share_id.value == '' || f.share_pw.value == ''){
		alert('공유 계정 정보를 입력하세요.');
		f.share_id.focus();
		return;
	}
	
	if(f.phone.value == ''){
		alert('연락처를 입력하세요.');
		f.phone.focus();
		return;
	}
	
	if(f.end_date.value == ''){
		alert('종료 날짜를 선택하세요.');
		f.end_date.focus();
		return;
	}
	
	if(f.price.value == ''){
		alert('참여 금액을 입력하세요.');
		f.price.focus();
		return;
	}
	
	f.action = '/admin/partymodify';
	f.submit();
})

//목록으로 이동
document.querySelector("#myPartyList").addEventListener('click', ()=>{
	location.href = '/admin/party';
})