const CSS_FILE_PATH = ['/resources/css/partner/withdraw.css', '/resources/css/partner/modal.css'];
//2. link 태그 생성
cssBinding(CSS_FILE_PATH);
function cssBinding(cssFiles) {
	cssFiles.forEach(css => {		
		let linkEle = document.createElement('link');
		linkEle.rel = 'stylesheet';
		linkEle.type = 'text/css';
		linkEle.href = css;
//3. head 태그에 link 엘리먼트 추가
		document.head.appendChild(linkEle);
	});
}
//form 객체 가져오기
const f = document.forms[0]; 

// ----------------- 비동기 방식 리스트업 + 출금 신청 ----------------------------

//list 가져오기
getPrincipal().then(() => {
	getList(principal.member.m_idx);
})
function getList(m_idx){
	//1.출금관리 listUp
	console.log("m_idx... : " + m_idx)
	let msg = '';
	
	fetch('/partner/withList/'+ m_idx)
	.then( response => response.json() )
	.then( json => {
		console.log(json)
		json.forEach(withdraw => {
			
			msg += '<tr>';
			msg +=		'<div>';			
			msg += 		'<td>'
				msg += 		'<c:choose>';
			if(withdraw.with_status == "A") {
				msg += 	'<strong class="word-color1">' + "신청" + '</strong>';
			} else if(withdraw.with_status == "B") {
				msg += 	'<strong class="word-color2">' + "승인" + '</strong>';
			} else {
				msg += 	'<strong class="word-color2">' + "반려" + '</strong>';
			}
			msg +=		'</c:choose>';		
			msg +=      '</td>';
			msg +=		'</div>';
			msg += 		'<td>' + withdraw.with_method +'</td>';
			msg += 		'<td>' + withdraw.name +'</td>';
			msg += 		'<td>' + withdraw.commission.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +'원</td>';
			msg += 		'<td>' + (withdraw.with_amount - withdraw.commission).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += 		'<td>' + myTime(withdraw.reg_date) +'</td>';	
			msg += '</tr>';	
		})
			document.querySelector("tbody").innerHTML = msg;
	})
	.catch( err => console.log(err) );

} 	

//unixTimeStamp 변환
function myTime(unixTimeStamp) {
	
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0") + ' ' 
		+ String(myDate.getHours()).padStart(2, "0") + ':' 
		+ String(myDate.getMinutes()).padStart(2, "0") + ':' 
		+ String(myDate.getSeconds()).padStart(2, "0");
	
	return date;
}



/*// 1-1. 출금 등록시 버튼을 누르면 등록하는 3개의 란에 작성을하면
// 1-2. 기록된 데이터는 테이블에 저장된다. (이때, 나머지 내용 들은 히든으로 넣어야 한다.(원래 회원의 경우 나머지 정보가 있기 때문이다.)
// 2-1. 리스트를 나오게 할때,
// 2-2. 등록된 결과를 불러온다. 위에 히든으로 넣었기 때문에 그 정보만 불러오면된다.!!*/
const sumamount = document.querySelector('#sumamount');
const unsaleslist = document.querySelector('#unsaleslist');
const withamount = document.querySelector('input[name="with_amount3"]');
const midx = document.querySelector('input[name="m_idx]');
const inputName = document.querySelector('input[name="name"]');
const inputWithAmount = document.querySelector('input[name="with_amount"]');
const inputWithMethod = document.querySelector('input[name="with_method"]');
const commission = document.querySelector('input[name="commission"]');
const withDrawal = document.querySelector('#withDrawal');			// 댓글 등록 시작버튼

// 여기서 할 내용
// 1) 통장입금 금액 기입시 판매 총액을 넘지 못하게 해야 한다.
// 2) 리스트 실 지급액에서 출금신청시 -1000원을 해야 한다. (완료) 104번줄


// 2. 출금 신청
withDrawal.addEventListener('click', () => {
	
	if(unsaleslist.value > principal.member.with_amount) {
		alert('출금 가능 금액보다 낮은 액수를 작성해 주세요.') 
		return;
	} 
	if(inputWithAmount.value < 1999) {
		alert('수수료를 제외한 금액은 출금이 제한됩니다.')
		return;
	} 
	
	if(0 >= principal.member.with_amount - withamount.value) {
		alert('안됩니다')
		return;
	} 
	
	if(inputWithAmount.value > principal.member.with_amount - withamount.value) {
		alert('전혀 안됩니다.')
		return;
	}
	
	if(inputWithAmount.value == '') {
		alert('출금 금액을 입력해 주세요.');
		return;
	}
	
	fetch('/partner/withNew', {
		method : 'post',
		headers : {'Content-type' : 'application/json; charset=utf-8'},
		body : JSON.stringify({
			m_idx : principal.member.m_idx,
			id : principal.member.id,
			phone : f.phone.value,
			with_status : f.with_status.value,
			name : principal.member.name,
			with_amount : inputWithAmount.value,
			with_method : inputWithMethod.value,
			note : f.note.value
		})
	})
	.then( response => response.text() )
	.then( data => {
		console.log(data);
		location.reload();					// 이걸 사용하면 값이 아무 것도 없을때... 오류가 발생한 예외처리 필요
		getList(principal.member.m_idx);	
	});
}); 
