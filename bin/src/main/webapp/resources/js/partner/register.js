//form
let f = document.querySelector("#registerform");

//시작 날짜 오늘 날짜로 고정
f.start_date.value = new Date().toISOString().slice(0, 10);

//종료 날짜 선택시 오늘 날짜 이전 날짜 선택 불가
document.querySelector("input[name='end_date']").setAttribute("min", f.start_date.value);

//종료 날짜 키보드 입력 막기
f.end_date.onkeydown = function(e){e.preventDefault();}

//서비스 select 관련 이벤트(1차 카테고리 선택에 따라 2차 카테고리 변경)
let c_primary = document.querySelector("select[name='codeone']");
let c_secondary = document.querySelector("select[name='codetwo']");

c_primary.addEventListener('change', () => {
	let msg = '<option value="0" selected>서비스 선택</option>';
	if(f.codeone.value != 0){
		
		fetch('/partner/category', {
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


//파티 등록
document.querySelector("#myPartyRegister").addEventListener('click', () => {
	if(principal == 'anonymousUser'){
		alert('로그인 후 이용가능한 서비스입니다.');
		location.href = '/member/login';
		return;
	}
	
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
	
	f.action = '/partner/register';
	f.submit();
})


//파티 관리 목록으로 돌아가기
document.querySelector("#myPartyList").addEventListener('click', ()=>{
	let pageData = getStorageData();
	
	location.href = '/partner/' + pageData.menu;
})