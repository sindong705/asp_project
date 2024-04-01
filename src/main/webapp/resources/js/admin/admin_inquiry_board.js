// ----- css 파일 추가
// 1. 파일 경로 설정
const CSS_FILE_PATH = ['/resources/css/admin/admin_inquiry_board.css', '/resources/css/admin/modal.css'];
// 2. link 태그 생성
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

// form 객체를 가지고 오자
const f = document.forms[0];

//----------------- 비동기 방식 ----------------------------

// 객체 생성 후 반환하는 함수
function makeObject(pageNum, amount, status, category) {
	let obj = {
		pageNum : pageNum,
		amount : amount,
		status : status,
		category : category	
	};	
	return obj;
}

// list 가져오기
window.onload = function() {
	
	let pageData = getStorageData();
	let obj;
	
	if(pageData == null) {
		setStorageData("admin_inquiry_board", 1, 10, 'status', 'all', null, null);
		obj = makeObject(1, 10, 'status', 'all');
	} else {
		selectOption();
		obj = makeObject(pageData.pageNum, pageData.amount, pageData.status, pageData.category);
	}

	getList(obj);
};

// 검색 부분
function selectOption() {
	let pageData = getStorageData();
	
	document.querySelectorAll("#category option").forEach(c => {
		if(c.value == pageData.category) {
			c.selected = 'selected';
		}
	});
	
    document.querySelectorAll("#detailSearch option").forEach(d => {
        if(d.value == pageData.status) {
            d.selected = 'selected';
        }
    });
    
}

// 검색
document.querySelector("#search").addEventListener('click', ()=> {
	let pageData = getStorageData();
	
	let category = document.querySelector("#category").value;
	let status = document.querySelector("#detailSearch").value;
	
	setStorageData("admin_inquiry_board", 1, 10, status, category);
	let obj = makeObject(1, 10, status, category);
	getList(obj);
});

// 검색 초기화
document.querySelector("#reset").addEventListener('click', ()=>{
	localStorage.clear();
	location.href = '/admin/admin_inquiry_board';
})

// 리스트 업 
function getList(obj) {
	let msg = "";
	let page = "";
	
	fetch('/admin/inquiryboardList', {
		method : 'post',
		body : JSON.stringify(obj),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let list = json.list;
		
		list.forEach(vo => {
			msg += '<tr>';
			msg += 		'<div>';
			msg += 		'<td>'

				if(vo.inquiry_type == "A") {
					msg += 	'<strong class="word-color1">' + '이용문의' + '</strong>';
				} else if(vo.inquiry_type == "B") {
					msg += 	'<strong class="word-color2">' + '파티문의' + '</strong>';
				} else if(vo.inquiry_type == "C") {
					msg += 	'<strong class="word-color3">' + '회원문의' + '</strong>';
				} else if(vo.inquiry_type == "D") {
					msg += 	'<strong class="word-color1">' + '입출금문의' + '</strong>';
				} else {
					msg += 	'<strong class="word-color2">' + '기타' + '</strong>';
				}				
						
			msg += 		'</td>';
			msg += 		'</div>';
			msg += 		'<div>'
			msg += 		'<td>'
			
				if(vo.status == "A") {
					msg += 	'<strong class="word-color1">' + "대기" + '</strong>';
				} else if(vo.status == "B") {
					msg += 	'<strong class="word-color2">' + "완료" + '</strong>';
				} else {
					msg += 	'<strong class="word-color3">' + "확인중" + '</strong>';
				}
				
			msg += 		'</td>';
			msg += 		'</div>';
			msg += 		'<td><a href="/inquiry_board/Inquiryget?i_idx=' + vo.i_idx +'">' + vo.title + '</a></td>';
			msg += 		'<td>' + vo.writer + '</td>';
			msg += 		'<td>' + myTime(vo.reg_date) + '</td>';
			msg +=		'<td>'				
			msg += '<input type="button" id="replyanswer" value="답변" onclick="doReplyAnswer(' + vo.i_idx + ')">';
			msg += '&nbsp;&nbsp;<input type="button" id="deleteBtn" value="삭제" onclick="deleteBtn(' + vo.i_idx + ')">'; 
			msg += '&nbsp;&nbsp;<input type="button" id="updateReply" value="수정" onclick="updateReply(' + vo.i_idx + ')">';	
			msg +=		'</td>'
			msg += '</tr>';
				
			
		})
		
		//페이징
		if(json.prev){
			page += '<li class="previous">';
			page += '<a href="' + (json.startPage-1) + '">&lt;</a>';
			page += '</li>';
		}
		
		for(let i = json.startPage; i <= json.endPage; i++){
			page += '<li>';
			page += '<a href="' + i + '" class="' + (json.cri.pageNum == i ? 'active' : '') + '">' + i + '</a>';
			page += '</li>';
		}
		
		if(json.next){
			page += '<li class="previous">';
			page += '<a href="' + (json.endPage+1) + '">&gt;</a>';
			page += '</li>';
		}
		
		document.querySelector("tbody").innerHTML = msg;
		document.querySelector(".page-nation").innerHTML = page;
		
	})
	.then(()=>{
		pagingEvent();
	})
	.catch(err => console.log(err));
} 

// 페이지 버튼 클릭 이벤트
function pagingEvent() {
	document.querySelectorAll(".page-nation li a").forEach(aEle => {
		aEle.addEventListener('click', function(e) {
			e.preventDefault();
			
			let pageData = getStorageData();
			
			// 태그 속성 불러오기
			let menu = 'admin_inquiry_board';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			
			setStorageData(menu, pageNum, amount, pageData.status, pageData.category);
			
			let obj = makeObject(pageNum, amount, pageData.status, pageData.category);
			getList(obj);
		});
	});
}


//unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}


// 모달창(댓글을 모달창으로 가지고 온다.)
function doReplyAnswer(i_idx) {
	// 모달창 오픈
	document.getElementById("modal").style.display = 'flex';
	document.querySelector("textarea[name='content']").value='';
	document.body.style.overflow = 'hidden';
	
	fetch('/admin/page/' + i_idx)
	.then(response => response.json())
	.then(json => {
		document.querySelector(".writer").innerHTML = json.writer;
		document.querySelector("#title").innerHTML = '<a href="/inquiry_board/Inquiryget?i_idx=' + json.i_idx +'">' + json.title;
		document.querySelector("#contents").innerHTML = json.content;
		
		document.querySelector("input[name='i_idx']").value = json.i_idx;
	})
	.catch(err => console.log(err));
}

// 모달창 close
document.querySelector(".close-area").addEventListener('click', ()=>{
	document.getElementById("modal").style.display = 'none';
	document.body.style.overflow = 'auto';
})

// 모달창 바깥영역 클릭시 close
document.getElementById("modal").addEventListener("click", e => {
  const evTarget = e.target;
  if(evTarget.classList.contains("modal-overlay")) {
  	document.getElementById("modal").style.display = "none"
  	document.body.style.overflow = '';
  }
})


// 모달창을 통해서 댓글을 등록한다.
const rs = replyService;		// inquiry_board 의 JS 내에서 가지고 온다. 
// const answer = document.forms[2];
const answer = document.getElementById("replyfrom");
const inputReplyer = document.querySelector('input[name="writer"]');
const idx = document.querySelector('input[name="i_idx"]');
document.querySelector("#answerRegister").addEventListener('click', ()=>{
	if(answer.content.value == ''){
		alert('내용을 입력해주세요.');
		return;
	}
	
	rs.add(
		{
			i_idx: idx.value,
			content: answer.content.value,
			status: answer.status.value,
			writer: inputReplyer.value
		},
		function(result) {
			//알림
			inquiryUserId(document.querySelector(".writer").innerHTML)
            .then(to_id => {
            	sendNotification(to_id, idx.value);
            	location.href = '/admin/admin_inquiry_board';
            })
            .catch(err => console.log(err));
			
		}
	);
	
});

//문의 회원 아이디
function inquiryUserId(nickname) {
    return new Promise((resolve, reject) => {
        fetch('/admin/inquiryuserid', {
                method: 'post',
                body: nickname,
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                }
            })
            .then(response => response.text())
            .then(data => {
                resolve(data); 
            })
            .catch(err => reject(err)); 
    });
}

//알림
function sendNotification(to_id, i_idx) {
	let url = '/inquiry_board/Inquiryget?i_idx=' + i_idx;
    fetch('/alarm/savenotify', {
            method: 'post',
            body: JSON.stringify({
                to_id: to_id,
                from_id: principal.member.nickname,
                content: '문의하신 내용에 대한 답변이 완료되었습니다.',
                url: url
            }),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        })
        .then(response => response.text())
        .then(data => {
            if (data == 'success') {
                socket.send(to_id + "," + principal.member.nickname + "," + '문의하신 내용에 대한 답변이 완료되었습니다.' + "," + url);
            }
        })
        .catch(err => console.log(err));
}


const h = document.forms[2];

// 버튼을 누르게 되면 게시글이 삭제 된다.
function deleteBtn(i_idx){
	
    if(confirm("정말 삭제 하시겠습니까?")) {
    	
    	fetch('/admin/Inquiryremove', {
    		method: 'post',
    		body : JSON.stringify(i_idx),
    		headers : {'Content-type' : 'application/json; charset=utf-8'}
    	})
    	.then(response => response.text())
    	.then(data => {
    		if(data == 'success'){
    			location.href = '/admin/admin_inquiry_board';
    		}else{
    			alert('게시글 삭제 실패하였습니다.');
    			location.href = '/admin/admin_inquiry_board';
    		}
    	})
    	.catch(err => console.log(err));
    }
} 

// 관리자가 게시글 수정을 위해 페이지를 이동 후 내용을 수정 할 수 있다. 
function updateReply(i_idx) {
	location.href = '/admin/inquirymodify?pn=' + i_idx;
}
