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
		setStorageData('member', 1, 10, 'all', 'all', 'm_idx', '');
		obj = makeObject(1, 10, 'all', 'all', 'm_idx', '');
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
	
	setStorageData('member', 1, 10, pageData.status, category, searchcolumn, searchword);
	let obj = makeObject(1, 10, pageData.status, category, searchcolumn, searchword);
	getList(obj);
})

//검색 조건 리셋
document.querySelector("#reset").addEventListener('click', ()=>{
	localStorage.clear();
	location.href = '/admin/member';
})

//list
function getList(obj){
	let msg = "";
	let page = "";
	
	fetch('/admin/member', {
		method : 'post',
		body : JSON.stringify(obj),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let list = json.list;
		
		list.forEach(vo => {
			msg += '<tr>';
			msg += '<td>' + vo.m_idx + '</td>';
			msg += '<td>' + vo.level + '</td>';
			msg += '<td>' + vo.name + '</td>';
			msg += '<td>' + vo.id + '</td>';
			msg += '<td>' + vo.nickname + '</td>';
			msg += '<td>' + myTime(vo.reg_date) + '</td>';
			msg += '<td>' + vo.status + '</td>';
			msg += '<td><input type="button" id="memberdetail" value="상세" onclick="memberDetailBtn(' + vo.m_idx + ')">';
			if(vo.status == 'N'){
				msg += '&nbsp;<input type="button" id="memberdelete" value="비활성화" onclick="deleteBtnEvent(\'' + vo.m_idx + '\', \'' + vo.status + '\')">';
			}else{
				msg += '&nbsp;<input type="button" id="memberactive" value="활성화" onclick="deleteBtnEvent(\'' + vo.m_idx + '\', \'' + vo.status + '\')">';
			}
			msg += '</td>';
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
			let menu = 'member';
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

//레벨 라디오버튼
function radioEvent(){
	document.querySelectorAll(".radio div").forEach(rb => {
		rb.addEventListener('click', ()=>{
			let pageData = getStorageData();
	
			setStorageData('member', 1, 10, rb.querySelector('input[type="radio"]').value, pageData.category, pageData.searchcolumn, pageData.searchword);
			let obj = makeObject(1, 10, rb.querySelector('input[type="radio"]').value, pageData.category, pageData.searchcolumn, pageData.searchword);
			getList(obj);
		})
	})
}

//회원 상세 / 수정
function memberDetailBtn(m_idx){
	location.href = '/admin/membermodify?mn=' + m_idx;
}

//회원 이용 정지
function deleteBtnEvent(m_idx, status){
let pageData = getStorageData();
	
	if(status == 'N'){
		if(confirm('해당 계정을 정지하시겠습니까?')){
			fetch('/admin/lockaccount',{
				method : 'post',
				body : JSON.stringify({
					m_idx : m_idx,
					status : status
				}),
				headers : {'Content-type' : 'application/json; charset=utf-8'}
			})
			.then(response => response.text())
			.then(data => {
				if(data == 'success'){
					alert('해당 계정이 비활성화 되었습니다.');
				}
				
				location.href = '/admin/member';
			})
			.catch(err => console.log(err));
		}else{
			location.href = '/admin/member';
		}
	}else{
		if(confirm('해당 계정을 활성화 하시겠습니까?')){
			fetch('/admin/lockaccount',{
				method : 'post',
				body : JSON.stringify({
					m_idx : m_idx,
					status : status
				}),
				headers : {'Content-type' : 'application/json; charset=utf-8'}
			})
			.then(response => response.text())
			.then(data => {
				if(data == 'success'){
					alert('해당 계정이 활성화 되었습니다.');
				}
				
				location.href = '/admin/member';
			})
			.catch(err => console.log(err));
		}else{
			location.href = '/admin/member';
		}
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
