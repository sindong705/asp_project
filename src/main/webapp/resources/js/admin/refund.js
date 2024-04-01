//객체 생성 후 반환하는 함수
function makeObject(pageNum, amount, status, searchcolumn, searchword){
	let obj = {
		pageNum : pageNum,
		amount : amount,
		status : status,
		searchcolumn : searchcolumn,
		searchword : searchword
	};
	
	return obj;
}

//list 가져오기
window.onload = function() {
	radioEvent();
	
	let pageData = getStorageData();
	let obj;
	
	if(pageData == null){
		setStorageData('refund', 1, 10, 'all', null, 'id', '');
		obj = makeObject(1, 10, 'all', 'id', '');
	}else{
		selectOptions();
		
		obj = makeObject(pageData.pageNum, pageData.amount, pageData.status, pageData.searchcolumn, pageData.searchword);
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
	
    document.querySelectorAll("#detailSearch option").forEach(d => {
        if(d.value == pageData.searchcolumn) {
            d.selected = 'selected';
        }
    });
    
    document.querySelector("#searchword").value = pageData.searchword;
}

//검색
document.querySelector("#search").addEventListener('click', ()=>{
	let pageData = getStorageData();
	
	let searchcolumn = document.querySelector("#detailSearch").value;
	let searchword = document.querySelector("#searchword").value;
	
	setStorageData('refund', 1, 10, pageData.status, null, searchcolumn, searchword);
	let obj = makeObject(1, 10, pageData.status, searchcolumn, searchword);
	getList(obj);
})

//검색 조건 리셋
document.querySelector("#reset").addEventListener('click', ()=>{
	localStorage.clear();
	location.href = '/admin/refund';
})

//list
function getList(obj){
	let msg = "";
	let page = "";
	
	fetch('/admin/refund', {
		method : 'post',
		body : JSON.stringify(obj),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let list = json.list;
		
		list.forEach(vo => {
			msg += '<tr>';
			msg += '<td>' + vo.reg_date + '</td>';
			
			if(vo.refund_date == null){
				msg += '<td>-</td>';
			}else{
				msg += '<td>' + vo.refund_date + '</td>';
			}
			
			msg += '<td>' + vo.name + ' (' + vo.id + ')</td>';
			msg += '<td>' + vo.order_no + '</td>';
			msg += '<td>' + vo.p_idx + '</td>';
			msg += '<td>' + vo.amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += '<td>' + vo.re_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			
			if(vo.re_status == 'A'){
				msg += '<td>신청</td>';
			}else if(vo.re_status == 'B'){
				msg += '<td>승인</td>';
			}else{
				msg += '<td>반려</td>';
			}
			
			msg += '<td><input type="button" id="refundmanage" value="상세" onclick="refundManageBtn(\'' + vo.r_idx + '\', \'' + vo.name 
				+ '\', \'' + vo.id + '\', \'' + vo.re_amount + '\', \'' + vo.reason + '\', \'' + vo.order_no + '\', \'' + vo.m_idx 
				+ '\', \'' + vo.re_status + '\', \'' + vo.p_idx +  '\')"></td>';
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

//페이지 버튼 클릭 이벤트
function pagingEvent(){
	document.querySelectorAll(".page-nation li a").forEach(aEle => {
		aEle.addEventListener('click', function(e){
			e.preventDefault(); //href 경로 이동 방지
			
			let pageData = getStorageData();
			
			//태그 속성 불러오기
			let menu = 'refund';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			let status;
			document.querySelectorAll(".radio input").forEach(r => {
				if(r.checked == true){
					status = r.value;
				}
			})
			
			setStorageData(menu, pageNum, amount, status, null, pageData.searchcolumn, pageData.searchword);
			
			let obj = makeObject(pageNum, amount, status, pageData.searchcolumn, pageData.searchword);
			getList(obj);
		});
	});
}

//레벨 라디오버튼
function radioEvent(){
	document.querySelectorAll(".radio div").forEach(rb => {
		rb.addEventListener('click', ()=>{
			let pageData = getStorageData();
	
			setStorageData('refund', 1, 10, rb.querySelector('input[type="radio"]').value, null, pageData.searchcolumn, pageData.searchword);
			let obj = makeObject(1, 10, rb.querySelector('input[type="radio"]').value, pageData.searchcolumn, pageData.searchword);
			getList(obj);
		})
	})
}

let ref = document.forms[1];

//회원 상세 / 수정
function refundManageBtn(r_idx, name, id, re_amount, reason, order_no, m_idx, re_status, p_idx){
	document.querySelector("textarea[name='rejection']").value = '';
	
	document.getElementById("modal").style.display = 'flex';
	document.body.style.overflow = 'hidden';
	
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
	
	document.querySelector("#name").innerHTML = name + '(' + id + ')';
	document.querySelector("#re_amount").innerHTML = re_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
	document.querySelector("#reason").innerHTML = reason;
	ref.r_idx.value = r_idx;
	ref.re_amount.value = re_amount;
	ref.re_status.value = re_status;
	ref.order_no.value = order_no;
	ref.m_idx.value = m_idx;
	ref.id.value = id;
	ref.name.value = name;
	ref.p_idx.value = p_idx;
}

document.querySelector("#approval").addEventListener('click', ()=>{
	if(ref.re_status.value != 'A'){
		alert('이미 처리된 환불 건입니다.');
		return;
	}
	let robj = {
			r_idx : ref.r_idx.value,
			re_amount : ref.re_amount.value,
			order_no : ref.order_no.value,
			m_idx : ref.m_idx.value,
			id : ref.id.value,
			name : ref.name.value,
			p_idx : ref.p_idx.value
		};
	if(confirm('해당 환불 요청 건을 승인하시겠습니까?')){
		fetch('/admin/refundapproval', {
			method : 'post',
			body : JSON.stringify(robj),
			headers : {'Content-type' : 'application/json; charset=utf-8'}
		})
		.then(response => response.text())
		.then(data => {
			if(data == 'success'){
				alert('승인되었습니다.');
				sendNotification(ref.id.value, '환불 신청이 승인되었습니다.');
				location.href = '/admin/refund';
			}else{
				alert('승인에 실패하였습니다.');
				location.href = '/admin/refund';
			}
		})
		.catch(err => console.log(err));
	}
})

document.querySelector("#return").addEventListener('click', ()=>{
	if(ref.re_status.value != 'A'){
		alert('이미 처리된 환불 건입니다.');
		return;
	}
	let robj = {
			r_idx : ref.r_idx.value,
			re_amount : ref.re_amount.value,
			order_no : ref.order_no.value,
			m_idx : ref.m_idx.value,
			id : ref.id.value,
			name : ref.name.value,
			rejection : ref.rejection.value
		};
	
	if(ref.rejection.value == ''){
		alert('반려사유를 입력해주세요.');
		return;
	}
	
	if(confirm('해당 환불 요청 건을 반려하시겠습니까?')){
		fetch('/admin/refundreturn', {
			method : 'post',
			body : JSON.stringify(robj),
			headers : {'Content-type' : 'application/json; charset=utf-8'}
		})
		.then(response => response.text())
		.then(data => {
			if(data == 'success'){
				alert('반려되었습니다.');
				sendNotification(ref.id.value, '환불 신청이 반려되었습니다.');
				location.href = '/admin/refund';
			}else{
				alert('반려 처리에 실패하였습니다.');
				location.href = '/admin/refund';
			}
		})
		.catch(err => console.log(err));
	}
})

//알림
function sendNotification(to_id, content) {
    fetch('/alarm/savenotify', {
            method: 'post',
            body: JSON.stringify({
                to_id: to_id,
                from_id: principal.member.nickname,
                content: content,
                url: '/payment/orderinquiry'
            }),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        })
        .then(response => response.text())
        .then(data => {
            if (data == 'success') {
                socket.send(to_id + "," + principal.member.nickname + "," + content + "," + '/payment/orderinquiry');
            }
        })
        .catch(err => console.log(err));
}

//unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}