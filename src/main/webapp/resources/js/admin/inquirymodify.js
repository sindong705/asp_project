//----- css 파일 추가
//1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/admin/inquirymodify.css';
//2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.type = 'text/css';
linkEle.href = CSS_FILE_PATH;
//3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

// form 객체를 가지고 오자
let f = document.querySelector("#registerform");

// 각 버튼 클릭 이벤트(수정 / 목록으로)
document.querySelectorAll('.panel-body-btns button').forEach( btn => {
	btn.addEventListener('click', () => {
		
		let type = btn.id;
		
		if(type === 'modifyBtn') {
			modify()
		}else if(type === 'indexBtn') {
			let pageData = getStorageData();
			let sendData = "pageNum=" + pageData.pageNum + "&amount=" + pageData.amount;
			location.href = '/admin/admin_inquiry_board?' + sendData;
		}
	});
});

// --------------- 여기서 부터 게시글 수정

//게시글 수정
function modify() {
	let i_idx = f.i_idx.value;
	if(!f.title.value) {
		alert("제목을 입력해 주세요.");
		return;
	}
	if(!f.content.value) {
		alert("내용을 입력해주세요.");
		return;
	}
	
	let str = '';
	document.querySelectorAll('.uploadResult li').forEach((li, index) => {
		let path = li.getAttribute('path');
		let uuid = li.getAttribute('uuid');
		let fileName = li.getAttribute('fileName');
		let inquiry_board = li.getAttribute('inquiry_board');
		
		str += '<input type ="hidden", name="attachList['+index+'].uploadPath" value="'+path+'"/>';
		str += '<input type ="hidden", name="attachList['+index+'].uuid" value="'+uuid+'"/>';
		str += '<input type ="hidden", name="attachList['+index+'].fileName" value="'+fileName+'"/>';
		str += '<input type ="hidden", name="attachList['+index+'].boradname" value="'+inquiry_board+'" />';	
		
	});
	f.insertAdjacentHTML('beforeend', str);
	f.action = '/admin/admininquirymodify';
	f.submit();
}

//  -------------- 업로드 관련 내용 --------------

showCommList();
function showCommList() {
	let msg = '';
	let i_idx = f.i_idx.value;
	
	fetch('/inquiry_board/getAttachList/' + i_idx )
		.then( response => response.json() )
		.then( json => {
			console.log(json);
			
			json.forEach( file => {
				let fileCallPath = encodeURIComponent(file.uploadPath + "/" + file.uuid + "_" + file.fileName + "_" + file.inquiry_board);

				msg += '<li path="'+file.uploadPath+'" uuid="'+ file.uuid +'" fileName="' + file.fileName+'" inquiry_board="' + file.inquiry_board+'">';
				msg += 		'<a href="/download?fileName='+ fileCallPath  +'">' + file.fileName  + '</a>';
				msg += 		'<span data-file="' + fileCallPath + '"> X </span>';
				msg += '</li>';
				
			});
			if(msg == '') {
				msg += '<li colspan="2"> 등록된 파일이 없습니다. </li>';
			}			
			document.querySelector(".uploadResult ul").innerHTML = msg;
		})
		.catch( err => console.log("err : " + err) );
}

uploadResult.addEventListener('click', function(e){
	if(e.target.tagName == 'SPAN'){
		if(confirm('첨부파일을 삭제하시겠습니까?')){
			let li = e.target.closest("li");
			li.remove();
		}
	}
}); 
