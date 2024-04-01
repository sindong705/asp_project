// 1. 2가지 이상 CSS 적용시 
const CSS_FILE_PATH = ['/resources/css/Inquiry/Inquiryget.css', '/resources/css/Inquiry/Inquirymodal.css'];
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

const f = document.forms[0]; 

document.querySelectorAll('.panel-body-btns button').forEach( btn => {
	btn.addEventListener('click', () => {
	
		let type = btn.id;
		
		if(type === 'modifyBtn') {
			modify();
		} else if(type === 'indexBtn') {
			location.href = '/inquiry_board/Inquirylist';
		} else if(type === 'removeBtn') {
			remove()
		} 
	});
});

// 수정되는 jsp로 이동
function modify() {
	let i_idx = f.i_idx.value;
	location.href = '/inquiry_board/Inquirymodify?i_idx=' + i_idx;
}

//게시글 삭제
function remove() {
	if(confirm("정말 삭제 하시겠습니까?")) {
		
		let i_idxValue = f.i_idx.value;
		
		let i_idxEle = document.createElement('input');		
		i_idxEle.setAttribute('type', 'hidden');
        i_idxEle.setAttribute('name', 'i_idx');
        i_idxEle.setAttribute('value', i_idxValue);
		
		f.action = '/inquiry_board/Inquiryremove';
		f.method = 'POST';
		f.submit();
	}
}


//---------------------------------- 업로드 다운로드 view 기능 ------------------
showCommList();
function showCommList() {
	let msg = '';
	let i_idx = f.i_idx.value;
	
	fetch('/inquiry_board/getAttachList/' + i_idx)
		.then( response => response.json() )
		.then( json => {
			console.log(json);
			
			json.forEach( file => {
				let fileCallPath = encodeURIComponent(file.uploadPath + "/" + file.uuid + "_" + file.fileName);
				
				msg += '<li path="'+file.uploadPath+'" uuid="'+ file.uuid +'" fileName="' + file.fileName+'">';
				msg += '<a href="/download?fileName='+ fileCallPath  +'">' + file.fileName  + '</a>';
				msg += '</li>';
				
			})
			if(msg == '') {
				msg += '<li colspan="2"> 등록된 파일이 없습니다. </li>';
			}			
			document.querySelector(".uploadResult ul").innerHTML = msg;
		})
		.catch( err => console.log("err : " + err) );
}



//---------------------------------- 댓글 관련 부분 ---------------------------
const rs = replyService;		// reply.js 에서 연결!

// 댓글 수정 폼
let updateForm = '';
let commentArea = document.getElementsByClassName("contentTd");

//댓글 수정 폼
function getUpdateComment(c_idx, content){
	console.log(c_idx);
	console.log(content);
	
	for(let i = 0; i<commentArea.length; i++){				// 댓글폼을 반복적으로 각각 구분해서 나누기 위함.
		if(commentArea[i].getAttribute('c_idx') == c_idx){		// c_idx의 속성을 c_idx로
			updateForm += '<form><input type="text" id="updateComment" name="content" class="form-control" value="'+ content + '">';
			updateForm += '<input type="hidden" name="c_idx" value="'+ c_idx + '">';
			updateForm += '<input type="button" class="commentbtn" onclick="update_comment(this.form)" value="등록" style="margin-top:10px; margin-left: 620px">';
			updateForm += '<input type="hidden" class="btn-b" onclick="notUpdate_comment(' + c_idx + ')" value="취소" style="margin-top:10px; margin-left: 5px;">';
			updateForm += '</form>';		// 98번줄 - 취소 버튼을 사용하지 않는 걸로 생각하게 되었다.
			commentArea[i].innerHTML = updateForm;
		}
		else{
			commentArea[i].innerHTML = commentArea[i].getAttribute('content') + '<hr>';
		}
		updateForm = '';
	}
}

showList();
function showList() {						// 나중에 여기가 더 보기가 될것같다.... 일단...
	
	let i_idx = f.i_idx.value;
	let replyUL = document.querySelector('.chat');
	
	rs.getList( f.i_idx.value, jsonArr => {
		
		let msg = '';	
		
		jsonArr.forEach(reply => {
			
			msg += '<li data-c_idx="'+ reply.c_idx +'">';
			msg += 		'<div>';
			msg +=			'<div>';
			msg +=				'<strong class="primary-font">작성자 : ' + reply.writer + '</strong>';

							if(principal.member.nickname == reply.writer) {
			msg += 				'<div style="float: right;"><input type="button" class="commentbtn" value="수정" onclick="getUpdateComment(' + reply.c_idx + ', \'' + reply.content + '\')">';
			msg += 				'&nbsp;<input type="button" class="btn-b" value="삭제" onclick="removeComm(' + reply.c_idx + ')" id="removeReplyBtn"></div>';
							}

			msg +=				'<small class="pull-right" style="float: right; margin: 5px 10px;">' + myTime(reply.reg_date) + '</small>';
			msg += 			'</div>';
			msg +=			'<div style="margin-top: 10px;">';
			msg += 				'<div class="contentTd" c_idx=\"' + reply.c_idx + '\" content=\"' + reply.content + '\" style="word-break: break-word;">';
			msg += 					reply.content;	
			msg += 				'</div>';		
			msg += 			'</div>';
			msg += '</li>';

			console.log(reply);
		});		// end forEach
		if(msg == '') {
			msg += '<li colspan="2"> 현재 관리자가 확인중입니다. </li>';
		}	
		replyUL.innerHTML = msg;
		
	});	// end getList
}

function myTime(unixTimeStamp) {
	let myDate = new Date(unixTimeStamp);
	
	let y = myDate.getFullYear();
	let m = String(myDate.getMonth() + 1).padStart(2, '0');
	let d = String(myDate.getDate()).padStart(2, '0');
	
	let date = y + "-" + m + "-" + d;
	
	return date;
}

//------------------------ 하단부 비동기식 방식으로 댓글 처리 -------------------------------------
const inputStatus = document.querySelector('.status-st');
const inputReply = document.querySelector('.btn-b');
const inputReplyer = document.querySelector('input[name="id"]');
const inputReplydate = document.querySelector('input[name="reg_date"]');
const idx = document.querySelector('input[name="i_idx"]');
const addReplyBtn = document.querySelector('#addReplyBtn');				

/*
// 댓글 등록
addReplyBtn.addEventListener('click', () => {
	
									// 추후 처리 필요
	if(inputReply.value == '' || inputReplyer.value == '' || inputStatus.value == '' ) {		
		alert("모든 내용을 입력하세요.")
		return;
	}
	rs.add(
		{
			i_idx : f.i_idx.value,
			content : inputReply.value,
			writer : inputReplyer.value,
			status : inputStatus.value
		},
		function(result) {
			//console.log("result : " + result);
			showList();
			clearChat();
		}
	);
}); */

// 댓글 수정
function update_comment(f) {
	// console.log(f);
	if( !confirm("내용을 수정 하시겠습니까?") ){
		return false;
	}
	
	rs.update(
			{
				c_idx : f.c_idx.value,
				content : f.content.value
			}, function(result) {
				console.log('result : ' + result );
				showList();
			}
	);
}

// 댓글 삭제
function removeComm(c_idx) {
	
	if( !confirm("내용을 삭제 하시겠습니까?") ){
		return false;
	}
	
	rs.remove(c_idx,
			function(result) {
				console.log('result : ' + result);
				showList();
			}
	);
}





