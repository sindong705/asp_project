let f = document.forms[0];

//자동 실행 함수
window.onload = function(){
	totalpriceResult();
	totalperiod();
	ruleCheck();
}

//수령 예상 금액
function totalpriceResult(){
	let sArr = f.start_date.value.split('-');
	let eArr = f.end_date.value.split('-');
	let sDate = new Date(sArr[0], sArr[1], sArr[2]);
	let eDate = new Date(eArr[0], eArr[1], eArr[2]);


	let diffDate = Math.abs((sDate - eDate) / (1000*60*60*24));

	document.querySelector("#totalpriceResult").innerHTML = f.party_num.value + '인 / 총 ' + f.price.value * diffDate * f.party_num.value + '원';
}

//기간
function totalperiod(){
	let sArr = f.start_date.value.split('-');
	let eArr = f.end_date.value.split('-');
	let sDate = new Date(sArr[0], sArr[1], sArr[2]);
	let eDate = new Date(eArr[0], eArr[1], eArr[2]);

	
	let diffDate = Math.abs((sDate - eDate) / (1000*60*60*24));
	
	document.querySelector("#periodCheckResult").innerHTML = '총 ' + diffDate + '일';
}

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


//목록으로 이동
document.querySelector("#myPartyList").addEventListener('click', ()=>{
	location.href = '/partner/manage';
})

//파티 수정 버튼
document.querySelector("#myPartyModify").addEventListener('click', ()=>{
	if(f.title.value == ''){
		alert('제목을 입력하세요.');
		f.title.focus();
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
	
	f.action = '/partner/modify';
	f.submit();
})
