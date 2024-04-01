// ----- css 파일 추가
// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/admin/withdraw.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.type = 'text/css';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

// form 객체를 가지고 오자
const f = document.forms[1];

//----------------- 비동기 방식 리스트업 + 출금 신청 및 최종 확인 ----------------------------
//객체 생성 후 반환하는 함수
function makeObject(pageNum, amount, status){
	let obj = {
		pageNum : pageNum,
		amount : amount,
		status : status,
	};
	
	return obj;
}

//list 가져오기
window.onload = function() {
	radioEvent();
	
	let pageData = getStorageData();
	let obj;
	
	if(pageData == null) {
		setStorageData("withdraw", 1, 10, 'all', null, null, null);
		obj = makeObject(1, 10, 'all');
	} else {
		selectOptions();
		obj = makeObject(pageData.pageNum, pageData.amount, pageData.status);
	}

	getList(obj);
};

function selectOptions() {
	let pageData = getStorageData();
	
	document.querySelectorAll(".radio div input").forEach(r => {
		if(r.value == pageData.status) {
            r.checked = 'checked';
        }
	})

}

function getList(obj){
	//1.출금관리 listUp
	let msg = "";
	let page = "";
	
	fetch('/admin/withdrawList/', { 
		method : 'post',
		body : JSON.stringify(obj),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then( response => response.json() )
	.then( json => {
		let list = json.list
		list.forEach(vo => {
			
			msg += '<tr>';
			msg +=		'<div>';			
			msg += 		'<td>'

			if(vo.with_status == "A") {
				msg += 	'<strong class="word-color1">' + "신청" + '</strong>';
			} else if(vo.with_status == "B") {
				msg += 	'<strong class="word-color2">' + "승인" + '</strong>';
			} else {
				msg += 	'<strong class="word-color3">' + "반려" + '</strong>';
			}

			msg +=      '</td>';
			msg +=		'</div>';
			msg += 		'<td>' + vo.with_method +'</td>';
			msg += 		'<td>' + vo.id +'</td>';
			msg += 		'<td>' + vo.name +'</td>';
			msg += 		'<td>' + (vo.with_amount - vo.commission).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += 		'<td>' + vo.note +'</td>';
			msg += 		'<td>' + myTime(vo.reg_date) +'</td>';	
			msg += 		'<td>'
			msg +=		'<input type="button" class="button-change" name="approval" id="approval" onclick="approvalEvent('+ vo.w_idx + ', \'' + vo.id + '\')" value="승인"/>'
			msg +=		'&nbsp;&nbsp;<input type="button" class="button-change" name="companion" id="companion" onclick="companionEvent('+ vo.w_idx + ', \'' + vo.id + '\')" value="반려"/>'
			msg +=		'</td>';
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
	.catch( err => console.log(err) );

} 	

//페이지 버튼 클릭 이벤트
function pagingEvent(){
	document.querySelectorAll(".page-nation li a").forEach(aEle => {
		aEle.addEventListener('click', function(e){
			e.preventDefault(); //href 경로 이동 방지
			
			let pageData = getStorageData();
			
			//태그 속성 불러오기
			let menu = 'withdraw';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			let status;
			document.querySelectorAll(".radio input").forEach(r => {
				if(r.checked == true){
					status = r.value;
				}
			})
			
			setStorageData(menu, pageNum, amount, status);
			
			let obj = makeObject(pageNum, amount, status);
			getList(obj);
		});
	});
}

//상태 라디오버튼
function radioEvent(){
	document.querySelectorAll(".radio div").forEach(rb => {
		rb.addEventListener('click', ()=>{
			let pageData = getStorageData();
	
			setStorageData('party', 1, 10, rb.querySelector('input[type="radio"]').value);
			let obj = makeObject(1, 10, rb.querySelector('input[type="radio"]').value);
			getList(obj);
		})
	})
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

// 나중에 버튼을 누르면 승인 -> 승인완료 로 변경
// 버튼 클릭시 버튼 이름 변경
function approvalEvent() {
	const btnElement = document.getElementById('approval');
	btnElement.value = "완료";
}


function approvalEvent(w_idx, id){
	if(confirm('승인하시겠습니까?')){
		fetch("/admin/modifyWithdraw", {
			method : 'post',
			headers : {'Content-type' : 'application/json; charset=utf-8'},
			body : w_idx
		})
		.then( response => response.text() )
		.then( data => {
			if(data == 'success'){
				//알림
				sendNotification(id, '출금 신청이 승인되었습니다.');
				
				const btnElement = document.getElementById('approval');
				btnElement.value = "완료";
				getList();
				location.href = '/admin/withdraw';
			}
			else{
				alert('승인에 실패하였습니다.');
				location.href = '/admin/withdraw';
			}
		});
	}
}

function companionEvent(w_idx, id){
	if(confirm('반려하시겠습니까?')){
		fetch("/admin/modifyWithdraw2", {
			method : 'post',
			headers : {'Content-type' : 'application/json; charset=utf-8'},
			body : w_idx
		})
		.then( response => response.text() )
		.then( data => {
			if(data == 'success'){
				//알림
				sendNotification(id, '출금 신청이 반려되었습니다.');
				
				getList();
			}
			else{
				alert('승인에 실패하였습니다.');
			}
			location.href = '/admin/withdraw';
		});
	}
}

//알림
function sendNotification(to_id, content) {
    fetch('/alarm/savenotify', {
            method: 'post',
            body: JSON.stringify({
                to_id: to_id,
                from_id: principal.member.nickname,
                content: content,
                url: '/partner/withdraw'
            }),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        })
        .then(response => response.text())
        .then(data => {
            if (data == 'success') {
                socket.send(to_id + "," + principal.member.nickname + "," + content + "," + '/partner/withdraw');
            }
        })
        .catch(err => console.log(err));
}





