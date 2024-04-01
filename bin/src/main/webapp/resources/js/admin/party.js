//카테고리 가져오기
getAllCategory();
function getAllCategory(){
	let msg = "";
	
	fetch('/admin/allcategory')
	.then(response => response.json())
	.then(json => {
		msg += '<option value="10">영상</option>';
		json.forEach(vo => {
			if(vo.codeone == 10){
				if(vo.codetwo != 1)
					msg += '<option value="' + vo.codeone.toString() + vo.codetwo.toString() + '">&nbsp;&nbsp;#' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="101">&nbsp;&nbsp;#기타(영상)</option>';
			
		msg += '<option value="20" codetwo="">도서/음악</option>';
		json.forEach(vo => {
			if(vo.codeone == 20){
				if(vo.codetwo != 1)
					msg += '<option value="' + vo.codeone.toString() + vo.codetwo.toString() + '">&nbsp;&nbsp;#' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="201">&nbsp;&nbsp;#기타(도서/음악)</option>';
		
		msg += '<option value="30" codetwo="">게임</option>';
		json.forEach(vo => {
			if(vo.codeone == 30){
				if(vo.codetwo != 1)
					msg += '<option value="' + vo.codeone.toString() + vo.codetwo.toString() + '">&nbsp;&nbsp;#' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="301">&nbsp;&nbsp;#기타(게임)</option>';
		
		msg += '<option value="40" codetwo="">기타</option>';
		json.forEach(vo => {
			if(vo.codeone == 40){
				if(vo.codetwo != 1)
					msg += '<option value="' + vo.codeone.toString() + vo.codetwo.toString() + '">&nbsp;&nbsp;#' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="401">&nbsp;&nbsp;#기타</option>';
		
		document.querySelector("#category").innerHTML += msg;
	})
	.catch(err => console.log(err));
}

//객체 생성 후 반환하는 함수
function makeObject(pageNum, amount, status, category, searchcolumn, searchword){
	let obj = {
		pageNum : pageNum,
		amount : amount,
		status : status,
		category : category,
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
		setStorageData('party', 1, 10, 'all', 'all', 'p_idx', '');
		obj = makeObject(1, 10, 'all', 'all', 'p_idx', '');
	}else{
		selectOptions();
		
		obj = makeObject(pageData.pageNum, pageData.amount, pageData.status, pageData.category, pageData.searchcolumn, pageData.searchword);
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
	
    document.querySelectorAll("#category option").forEach(c => {
        if(c.value == pageData.category) {
            c.selected = 'selected';
        }
    });
    
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
	
	let category = document.querySelector("#category").value;
	let searchcolumn = document.querySelector("#detailSearch").value;
	let searchword = document.querySelector("#searchword").value;
	
	setStorageData('party', 1, 10, pageData.status, category, searchcolumn, searchword);
	let obj = makeObject(1, 10, pageData.status, category, searchcolumn, searchword);
	getList(obj);
})

//검색 조건 리셋
document.querySelector("#reset").addEventListener('click', ()=>{
	localStorage.clear();
	location.href = '/admin/party';
})

//list
function getList(obj){
	let msg = "";
	let page = "";
	
	fetch('/admin/party', {
		method : 'post',
		body : JSON.stringify(obj),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let list = json.list;
		
		list.forEach(vo => {
			msg += '<tr>';
			msg += '<td>' + vo.p_idx + '</td>';
			msg += '<td><a href="/shop/get?c1=' + vo.codeone + '&c2=' + vo.codetwo + '&pn=' + vo.p_idx + '">[' + vo.c_secondary + '] ' +  vo.title + '</a></td>';
			msg += '<td>' + vo.nickname + '(' + vo.id + ')</td>';
			msg += '<td>' + vo.price + '원</td>';
			msg += '<td>' + vo.curr_party + ' / ' + vo.party_num + '</td>';
			
			if(vo.status == 'N'){
				if(vo.datediff<0){
					msg += '<td>기간 종료 마감</td>';
				}else{
					msg += '<td>관리자 마감</td>';
				}
			}else{
				msg += '<td>' + vo.datediff + '일</td>';
			}
			
			msg += '<td>' + myTime(vo.end_date) + '</td>';
			msg += '<td>' + myTime(vo.reg_date) + '</td>';
			msg += '<td>';
			
			if(vo.datediff >= 0){
				msg += '<input type="button" id="partymodify" value="수정" onclick="modifyBtnEvent(' + vo.p_idx + ')">';
				if(vo.status == 'N'){
					msg += '&nbsp;<input type="button" id="partyopen" value="취소" onclick="openBtnEvent(' + vo.p_idx + ')">';
				}else{
					msg += '&nbsp;<input type="button" id="partyclose" value="마감" onclick="closeBtnEvent(' + vo.p_idx + ')">';
				}
			}
		
			msg += '&nbsp;<input type="button" id="partydelete" value="삭제"onclick="deleteBtnEvent(' + vo.p_idx + '\,' + vo.curr_party + '\, \'' + vo.status + '\')"></td>';
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
			let menu = 'party';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			let status;
			document.querySelectorAll(".radio input").forEach(r => {
				if(r.checked == true){
					status = r.value;
				}
			})
			
			setStorageData(menu, pageNum, amount, status, pageData.category, pageData.searchcolumn, pageData.searchword);
			
			let obj = makeObject(pageNum, amount, status, pageData.category, pageData.searchcolumn, pageData.searchword);
			getList(obj);
		});
	});
}

//상태 라디오버튼
function radioEvent(){
	document.querySelectorAll(".radio div").forEach(rb => {
		rb.addEventListener('click', ()=>{
			let pageData = getStorageData();
	
			setStorageData('party', 1, 10, rb.querySelector('input[type="radio"]').value, pageData.category, pageData.searchcolumn, pageData.searchword);
			let obj = makeObject(1, 10, rb.querySelector('input[type="radio"]').value, pageData.category, pageData.searchcolumn, pageData.searchword);
			getList(obj);
		})
	})
}

//수정 마감 삭제 버튼 클릭 이벤트
function modifyBtnEvent(p_idx){
	location.href = '/admin/partymodify?pn=' + p_idx;
}

function closeBtnEvent(p_idx){
	let pageData = getStorageData();
	
	if(confirm('파티 모집을 마감하시겠습니까?')){
		
		fetch('/admin/partyclose?pn=' + p_idx)
		.then(response => response.text())
		.then(data => {
			if(data == 'success'){
				alert('해당 파티가 마감 처리 되었습니다. \n모집을 재개하려면 취소 버튼을 눌러주세요.');
			}else{
				alert('해당 파티가 마감 처리를 실패하였습니다.');
			}
		})
		.then(()=>{
			obj = makeObject(pageData.pageNum, pageData.amount, pageData.status, pageData.category, pageData.searchcolumn, pageData.searchword);
			getList(obj);
		})
		.catch(err => console.log(err));
	}
}

function openBtnEvent(p_idx){
	let pageData = getStorageData();
	
	if(confirm('파티 모집을 재개하시겠습니까?')){
		
		fetch('/admin/partyopen?pn=' + p_idx)
		.then(response => response.text())
		.then(data => {
			if(data == 'success'){
				alert('해당 파티 모집이 재개 되었습니다.');
			}else{
				alert('해당 파티 모집 재개 처리에 실패하였습니다.');
			}
		})
		.then(()=>{
			obj = makeObject(pageData.pageNum, pageData.amount, pageData.status, pageData.category, pageData.searchcolumn, pageData.searchword);
			getList(obj);
		})
		.catch(err => console.log(err));
	}
}

function deleteBtnEvent(p_idx, curr_party, status){
	if(curr_party > 0 && status == 'Y'){
		alert('파티원이 있을 경우 파티를 삭제할 수 없습니다.');
		return;
	}
	
	if(confirm('해당 파티를 삭제하시겠습니까?')){
		localStorage.clear();
		location.href = '/admin/removeparty?pn=' + p_idx;
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