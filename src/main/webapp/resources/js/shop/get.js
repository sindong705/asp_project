window.onload = function(){
	//공지사항 규칙
	getrule();
	
	if(document.querySelector("#participate") == null){
		partyWriter();
		
		//파티장 멘션리스트
		partnerMentionList();
	}else{
		notPartyWriter();
		
		//파티원/일반회원 멘션리스트
		defaultMemtionList().then(() => {
			selectEvent();
		}) 
	}
	
	//버튼 활성화 되어 있을 때만 모달 관련 이벤트 적용(스크립트 에러방지)
	if(document.querySelector("#partnerInfo") != null){
		modal();
	}
}


//공지사항 규칙
function getrule(){
	let rulesEle = document.querySelector("#rules");
	let ruleArr = rulesEle.getAttribute("rule").split(',');
	
	ruleArr.forEach(rule => {
		if(rule){
			rulesEle.innerHTML += '<span class="rule">' + rule + '</span>';
		}
	})
}

//파티 만들기
document.querySelector("#makeparty").addEventListener('click', ()=>{
	if(principal == 'anonymousUser'){
		alert('로그인 후 이용가능한 서비스입니다.');
		location.href = '/member/login';
		return;
	}
	
	if(principal.member.level == 'C'){
		alert('파티장 신청 후 이용가능한 서비스입니다.');
		return;
	}
	
	location.href = '/partner/register';
});

//이전 목록으로 가기 위해 현재 url 가져오기
const urlParams = new URL(location.href).searchParams;
//게시글 체크 폼
const f = document.querySelector("#participateForm");
//댓글 폼
const replyf = document.querySelector("#replyform");


//내가 생성한 파티가 아닐 경우
function notPartyWriter(){
	let c1 = urlParams.get('c1');
	let c2 = urlParams.get('c2');
	let partyMembers = document.querySelectorAll("#mnickname");
	let partycheck = false;
	
	//참여 버튼
	document.querySelector("#participate").addEventListener('click', function() {
		if(f.status.value == 'N'){
			alert('마감된 파티입니다.');
    		return;
		}
		
    	if(principal == 'anonymousUser'){
    		alert('로그인 후 이용가능한 서비스입니다.');
    		return;
    	}
    	
    	if(!document.querySelector("#agree").checked){
    		alert('안내 및 규칙을 읽고 체크박스에 체크해 주세요.');
    		return;
    	}
    	
    	if(f.party_num.value == f.curr_party.value){
    		alert('파티 모집 정원 초과입니다. \n다른 파티에 참여해주세요.');
    		return;
    	}
    	
    	for(let i = 0; i<partyMembers.length; i++){
    		if(partyMembers[i].getAttribute('mnickname') == principal.member.nickname){
    			alert("이미 참여 중인 파티입니다.");
    			partycheck = true;
    			document.querySelector("#checkform #agree").checked = false;
    			break;
    		}
    	}
    	
    	if(partycheck == false){
    		f.action = '/payment/orderform?c1=' + c1;
    		if(c2 != null){
    			f.action = '/payment/orderform?c1=' + c1 + '&c2=' + c2;
			}else{
				f.action = '/payment/orderform?c1=' + c1;
			}
	    	f.submit();
    	}
	});
	
	//목록 버튼
	document.querySelector("#getpartylist").addEventListener('click', ()=>{
		let pageData = getStorageData();
		
		if(pageData != null){
			if(pageData.status != ''){
				location.href = '/admin/' + pageData.menu;
			}else{
				location.href = '/partner/' + pageData.menu;
			}
		}else{
			let c1 = urlParams.get('c1');
			let c2 = urlParams.get('c2');
			let participating = urlParams.get('participating');
			if(participating == null){
				if(c2 != null){
					location.href = '/shop/list/' + c1 + '/' + c2;
				}else{
					location.href = '/shop/list/' + c1;
				}
			}else{
				history.back(-1);
			}
		}
	});
}


//내가 생성한 파티일 경우
function partyWriter(){
	//관리 버튼
	document.querySelector("#myPartyManage").addEventListener('click', ()=>{
		location.href = "/partner/manage";
	});
	
	//목록 버튼
	document.querySelector("#getpartylist").addEventListener('click', ()=>{
		let pageData = getStorageData();
		
		if(pageData != null){
			if(pageData.status){
				location.href = '/admin/' + pageData.menu;
			}else{
				location.href = '/partner/' + pageData.menu;
			}
		}else{
			let c1 = urlParams.get('c1');
			let c2 = urlParams.get('c2');
			if(c2 != null){
				location.href = '/shop/list/' + c1 + '/' + c2;
			}else{
				location.href = '/shop/list/' + c1;
			}
		}
	});
}


//댓글관련
const rs = replyService;

//파티장 멘션리스트
function partnerMentionList(){
	let msg = '';
	
	fetch('/shop/paymemberlist',{
		method: 'post',
		body: replyf.p_idx.value,
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		if(json != ''){
			msg += '<option value="모든파티원" selected>파티원들에게</option>';
			json.forEach(partymember => {
				msg += '<option value="' + partymember.nickname + '" pid="' + partymember.id + '">@' + partymember.nickname + '</option>';
			})
			msg += '<option value="일반">일반</option>';
		}else{
			msg += '<option value="모든파티원" selected>파티원들에게</option>';
			msg += '<option value="일반">일반</option>';
		}
		
		document.querySelector("#comment-to").innerHTML = msg;
	})
	.then(() => {
		selectEvent();
	}) 
	.catch(err => console.log(err));
}

//파티원/일반회원 멘션리스트
function defaultMemtionList(){
	return new Promise((resolve, reject) => {
        let msg = '';
        let partnerNick = document.querySelector("#nick").getAttribute("nick");
        let partnerId = document.querySelector("#nick").getAttribute("pid");

        msg += '<option value="' + partnerNick + '" pid="' + partnerId + '" selected>파티장에게</option>';
        msg += '<option value="일반">일반</option>';

        document.querySelector("#comment-to").innerHTML = msg;
        
        // Promise를 이용하여 비동기 작업 완료 후 resolve 호출
        resolve();
    });
}

//select 이벤트
function selectEvent(){
	document.querySelector("#comment-to").addEventListener('change', ()=>{
		if(document.querySelector("#comment-to").value == '일반'){
			document.querySelector("#checkprivate").style.display = 'none';
		}else{
			document.querySelector("#checkprivate").style.display = 'block';
			document.querySelector("#checkprivate input").checked = false;
		}
	})
}

//댓글 목록 가져오기
showList(); 
function showList(){
	rs.getList(
		replyf.p_idx.value,
		function(result){
			let msg = '';
			result.forEach(reply => {
	             
				if(principal != 'anonymousUser'){
					if(principal.member.nickname == reply.writer){//내가 쓴 댓글인 경우
						msg += '<div class="chat re">';
			            msg += '<div id="chatcontentarea">';
			            //msg += '<div id="replynick">' + reply.writer + '</div>';
			            msg += '<div id="myreplycontent">';
			            
			            if(reply.comment_to != '일반'){
			            	msg += '<span id="commentto" class="right">@' + reply.comment_to;
			            	
			            	if(reply.comment_to == document.querySelector("#nick").getAttribute("nick")){
				            	msg += '<img src="/resources/images/crown.png"></span><br>';
				            }else{
				            	msg += '</span><br>';
				            }
			            }else{
			            	msg += '<span id="commentto" class="right"></span>';
			            }
			            
			            if(reply.private_chk == 'Y'){
			            	msg += '<span id="replycomment"><img src="/resources/images/mylock.png">' + reply.comment + '</span>';
			            }else{
			            	msg += '<span id="replycomment">' + reply.comment + '</span>';
			            }
			            
			           //삭제 버튼 - 로그인된 닉네임과 댓글 작성자 동일해야 삭제 버튼 활성화
			            msg += '<div id="replybtnarea" class="btn-group dropend" role="group">';
			            msg += '<button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">';
			            msg += '<img id="replymenubtn" src="/resources/images/replymenu.png"></button>';
			            msg += '<ul id="replybtns" class="dropdown-menu">';
			            msg += '<li><a class="dropdown-item" href="javascript:replyDelete(' + reply.c_idx + ');">삭제</a></li>';
			            msg += '</ul>';
			            msg += '</div>';
			            
			            msg += '</div>';
			            msg += '<br><span id="replyregdate">' + reply.reg_date + '</span>';
			            msg += '</div>';
			            msg += '<div id="replynick" class="right">' + reply.writer + '</div>';
			            msg += '</div>';
			            
					}else{//내가 쓴 댓글 아닌 경우
						msg += '<div class="chat">';
			            msg += '<div id="chatcontentarea">';
			            msg += '<div id="replynick">' + reply.writer + '</div>';
			            msg += '<div id="replycontent">';
			            
			            if(reply.comment_to != '일반'){
			            	msg += '<span id="commentto">@' + reply.comment_to;
			            	
			            	if(reply.comment_to == document.querySelector("#nick").getAttribute("nick")){
				            	msg += '<img src="/resources/images/crown.png"></span><br>';
				            }else{
				            	msg += '</span><br>';
				            }
			            }else{
			            	msg += '<span id="commentto"></span>';
			            }
			         
			            if(reply.private_chk == 'Y'){
			            	if(principal.member.nickname == reply.comment_to)
			            		msg += '<span id="replycomment"><img src="/resources/images/lock.png">' + reply.comment + '</span>';
			            	else{
			            		msg += '<span id="replycomment"><img src="/resources/images/lock.png">비밀댓글입니다.</span>';
			            	}
			            	
			            }else{
			            	msg += '<span id="replycomment">' + reply.comment + '</span>';
			            }
			            
			            msg += '</div>';
			            msg += '<br><span id="replyregdate">' + reply.reg_date + '</span>';
			            msg += '</div>';
			            msg += '</div>';

					}
				}else{ //로그인 안한 경우
					msg += '<div class="chat">';
		            msg += '<div id="chatcontentarea">';
		            msg += '<div id="replynick">' + reply.writer + '</div>';
		            msg += '<div id="replycontent">';
		            
		            if(reply.comment_to != '일반'){
		            	msg += '<span id="commentto">@' + reply.comment_to;
		            	
		            	if(reply.comment_to == document.querySelector("#nick").getAttribute("nick")){
			            	msg += '<img src="/resources/images/crown.png"></span><br>';
			            }else{
			            	msg += '</span><br>';
			            }
		            }else{
		            	msg += '<span id="commentto"></span>';
		            }
		            
		            if(reply.private_chk == 'Y'){
		            	msg += '<span id="replycomment"><img src="/resources/images/lock.png">비밀 댓글 입니다.</span>';
		            }else{
		            	msg += '<span id="replycomment">' + reply.comment + '</span>';
		            }
		            
		            msg += '</div>';
		            msg += '<br><span id="replyregdate">' + reply.reg_date + '</span>';
		            msg += '</div>';
		            msg += '</div>';
		            
				}
	             
			});
			
			document.querySelector("#chatarea").innerHTML = msg;
		}
	);
}

//댓글 등록 버튼
document.querySelector("#replyregister").addEventListener('click', ()=>{
	var selectedOption = document.getElementById("comment-to");
	var pidValue = selectedOption.options[selectedOption.selectedIndex].getAttribute("pid");
	
	if(principal == 'anonymousUser'){
		alert('로그인 후 이용가능한 서비스입니다.');
		replyf.comment.value = '';
		return;
	}
	
	if(document.querySelector("#private").checked){
		replyf.private_chk.value = 'Y';
	}else{
		replyf.private_chk.value = 'N';
	}
	
	if(replyf.comment.value == ''){
		alert('댓글을 입력해주세요.');
		return;
	}
	
	rs.add(
		{
			p_idx: replyf.p_idx.value,
			writer: principal.member.nickname,
			comment_to: replyf.comment_to.value,
			comment: replyf.comment.value,
			private_chk: replyf.private_chk.value
		},
		function(result){
		    replyf.comment.value = '';
		    showList();
		    
		    if (replyf.comment_to.value == '모든파티원') {
		        paymentUsers()
		            .then(users => {
		                for (let i = 0; i < users.length; i++) {
		                    sendNotification(users[i]);
		                }
		            })
		            .catch(err => console.log(err));
		    } else {
		        sendNotification(pidValue);
		    }
		}
	);
})

//참여중인 회원 아이디
function paymentUsers() {
    return new Promise((resolve, reject) => {
        let usersArr = [];
        fetch('/shop/paymentusers', {
                method: 'post',
                body: replyf.p_idx.value,
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                }
            })
            .then(response => response.json())
            .then(json => {
                json.forEach(user => {
                    usersArr.push(user.id);
                });
                resolve(usersArr); 
            })
            .catch(err => reject(err)); 
    });
}

//알림
function sendNotification(to_id) {
    fetch('/alarm/savenotify', {
            method: 'post',
            body: JSON.stringify({
                to_id: to_id,
                from_id: principal.member.nickname,
                content: '님이 댓글을 남겼습니다.',
                url: window.location.href
            }),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        })
        .then(response => response.text())
        .then(data => {
            if (data == 'success') {
                socket.send(to_id + "," + principal.member.nickname + "," + '님이 댓글을 남겼습니다.' + "," + window.location.href);
            }
        })
        .catch(err => console.log(err));
}

//댓글 삭제
function replyDelete(c_idx){
	if(confirm('댓글을 삭제하시겠습니까?')){
		rs.remove(
			c_idx,
			function(result){
				showList();
			}
		);
	}
}


//아이디 / 패스워드 보기 버튼 + 모달
//모달창 open
function modal(){
	document.querySelector("#partnerInfo").addEventListener('click', ()=>{
		document.getElementById("modal").style.display = 'flex';
		document.body.style.overflow = 'hidden';
		
		
	})

	//모달창 close
	document.querySelector(".close-area").addEventListener('click', ()=>{
		document.getElementById("modal").style.display = 'none';
		document.body.style.overflow = '';
	})

	//모달창 바깥영역 클릭시 close
	document.getElementById("modal").addEventListener("click", e => {
	    const evTarget = e.target;
	    if(evTarget.classList.contains("modal-overlay")) {
	    	document.getElementById("modal").style.display = "none"
	    	document.body.style.overflow = '';
	    }
	})
}

