// ----- css 파일 추가
// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/Inquiry/Inquiryregister.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.type = 'text/css';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

// 1. register.jsp form을 가지고 온다.
const f = document.forms[0];

// 2. 버튼의 클릭 이벤트
document.querySelectorAll('.panel-body-btns button').forEach( btn => {
	btn.addEventListener('click', () => {
	
		let type = btn.id;
		
		if(type === 'registerBtn'){
			register();
		} 
		
	});
});

function register() {
	if(f.title.value == ''){
		alert("제목을 입력해주세요.");
		return;
	}
	if(f.writer.value == '') {
		alert("작성자를 입력하세요.");
		return;
	}
	if(f.phone.value == '') {
		alert("연락받을 연락처를 입력해주세요.");
		return;
	}
	if(f.content.value == '') {
		alert("내용을 입력하세요.");
		return;
	}
	if(f.agree.checked == false){
		alert("개인정보 처리방침 내용에 동의해주시기 바랍니다.");
		return false;
	}
	let str = '';
	document.querySelectorAll('.uploadResult li').forEach( (li, index) => {
		
		console.log(li + "/" + index);
		
		let path = li.getAttribute('path');
		let uuid = li.getAttribute('uuid');
		let fileName = li.getAttribute('fileName');
		let boradname = li.getAttribute('boradname');
		// VO에 들어간다.
		str += '<input type="hidden" name="attachList['+index+'].uploadPath" value="'+path+'" />';
		str += '<input type="hidden" name="attachList['+index+'].uuid" value="'+uuid+'" />';
		str += '<input type="hidden" name="attachList['+index+'].fileName" value="'+fileName+'" />';
		str += '<input type="hidden" name="attachList['+index+'].boradname" value="inquiry_board" />';		
		console.log(str);
		
	});
	//f.innerHTML += str;		// 이렇게 쓰면 value가 나라가는 경우가 있다.
	f.insertAdjacentHTML('beforeend', str);	// insertAdjacentHTML 이 함수를 이용하면 방지가 된다... beforeend - 어디에 넣을 거야  str - 여기다!!
	
	console.log(f);
	f.action='/inquiry_board/Inquiryregister';
	f.submit();
	
}