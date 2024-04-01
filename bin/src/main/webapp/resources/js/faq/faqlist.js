//객체 생성 후 반환하는 함수
function makeObject(pageNum, amount, status){
	let obj = {
		pageNum : pageNum,
		amount : amount,
		status : status
	};
	
	return obj;
}

//list 가져오기
window.onload = function() {
	radioEvent();
	
	let pageData = getStorageData();
	let obj;
	
	if(pageData == null){
		setStorageData('faq', 1, 10, '');
		obj = makeObject(1, 10, '');
	}else{
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

//list
function getList(obj){
	let msg = "";
	let page = "";
	
	fetch('/admin/faq/faqlist', {
		method : 'post',
		body : JSON.stringify(obj),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let list = json.list;
		
		list.forEach(vo => {
			let type = '';
			
			if (vo.faq_type == 'A') {
				type = '이용안내';
			}else if (vo.faq_type == 'B') {
				type = '파티문의';
			}else if (vo.faq_type == 'C') {
				type = '회원가입 및 정보';
			}else if (vo.faq_type == 'D') {
				type = '입출금 및 환불';
			}
			
			msg += '<tr>';
			msg += '<td>' + type + '</td>';
			msg += '<td>' + vo.writer + '</td>';
			msg += '<td>' + vo.title + '</td>';
			msg += '<td>' + myTime(vo.reg_date) + '</td>';
			msg += '<td>';
			msg += '<input type="button" id="partymodify" value="수정" onclick="modifyBtnEvent(' + vo.f_idx + ')">';
			msg += '&nbsp;<input type="button" id="partydelete" value="삭제"onclick="deleteBtnEvent(' + vo.f_idx + ')"></td>';
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
			let menu = 'faq';
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

//라디오버튼
function radioEvent(){
	document.querySelectorAll(".radio div").forEach(rb => {
		rb.addEventListener('click', ()=>{
			let pageData = getStorageData();
			setStorageData('faq', 1, 10, rb.querySelector('input[type="radio"]').value);
			let obj = makeObject(1, 10, rb.querySelector('input[type="radio"]').value);
			getList(obj);
		})
	})
}

//수정 마감 삭제 버튼 클릭 이벤트
function modifyBtnEvent(f_idx){
	location.href = '/admin/faq/modify?fn=' + f_idx;
}

function deleteBtnEvent(f_idx){
	if (confirm("삭제 하시겠습니까?") == true) {
		location.href = '/admin/faq/remove?fn=' + f_idx;
	}else {
		return;
	}
}


//unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}