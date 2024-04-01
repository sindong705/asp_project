//파티 생성
document.querySelector("#makeparty").addEventListener('click', ()=>{
	location.href = '/partner/register';
})

//카테고리 가져오기
getAllCategory();
function getAllCategory(){
	let msg = "";
	fetch('/partner/allcategory')
	.then(response => response.json())
	.then(json => {
		msg += '<option value="10">영상</option>';
		json.forEach(vo => {
			if(vo.codeone == 10){
				msg += '<option value="' + vo.codeone.toString() + vo.codetwo.toString() + '">&nbsp;&nbsp;#' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="20" codetwo="">도서/음악</option>';
		json.forEach(vo => {
			if(vo.codeone == 20){
				msg += '<option value="' + vo.codeone.toString() + vo.codetwo.toString() + '">&nbsp;&nbsp;#' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="30" codetwo="">게임</option>';
		json.forEach(vo => {
			if(vo.codeone == 30){
				msg += '<option value="' + vo.codeone.toString() + vo.codetwo.toString() + '">&nbsp;&nbsp;#' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="40" codetwo="">기타</option>';
		json.forEach(vo => {
			if(vo.codeone == 40){
				msg += '<option value="' + vo.codeone.toString() + vo.codetwo.toString() + '">&nbsp;&nbsp;#' + vo.c_secondary + '</option>';
			}
		})
		
		document.querySelector("#category").innerHTML += msg;
	})
	.catch(err => console.log(err));
}

//list 가져오기
window.onload = function() {
	getPrincipal().then(() => {
		let pageData = getStorageData();
		let obj;
		
		if(pageData == null){
			document.querySelector("#listbyperiod").classList.remove("activeFont");
			document.querySelector("#listbylatest").classList.add("activeFont");
			setStorageData('manage', 1, 10, 'latest', 'all', 'p_idx', '');
			obj = makeObject(principal.member.m_idx, 1, 10, 'latest', 'all', 'p_idx', '');
		}else{
			if(pageData.sort == 'latest'){
				document.querySelector("#listbyperiod").classList.remove("activeFont");
				document.querySelector("#listbylatest").classList.add("activeFont");
			}
			else{
				document.querySelector("#listbylatest").classList.remove("activeFont");
				document.querySelector("#listbyperiod").classList.add("activeFont");
			}
			
			selectOptions();
			
			obj = makeObject(principal.member.m_idx, pageData.pageNum, pageData.amount, pageData.sort, pageData.category, pageData.searchcolumn, pageData.searchword);
		}
		
		multiSearchList(obj);
	})
};

function selectOptions() {
	let pageData = getStorageData();
	
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
	
	getPrincipal().then(() => {
		setStorageData('manage', 1, 10, pageData.sort, category, searchcolumn, searchword);
		let obj = makeObject(principal.member.m_idx, 1, 10, pageData.sort, category, searchcolumn, searchword);
		multiSearchList(obj);
	})
})

//객체 생성 후 반환하는 함수
function makeObject(m_idx, pageNum, amount, sort, category, searchcolumn, searchword){
	let obj = {
		m_idx : m_idx,
		pageNum : pageNum,
		amount : amount,
		sort : sort,
		category : category,
		searchcolumn : searchcolumn,
		searchword : searchword
	};
	
	return obj;
}

//list
function multiSearchList(obj){
	let msg = "";
	let page = "";
	
	fetch('/partner/managesearch', {
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
			msg += '<td><input type="button" id="partymodify" value="수정" onclick="modifyBtnEvent(' + vo.p_idx + ')">';
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
			let menu = 'manage';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			let sort = document.querySelector("#listbylatest").classList.contains('activeFont') ? 'latest' : 'period';
			
			setStorageData(menu, pageNum, amount, sort, pageData.category, pageData.searchcolumn, pageData.searchword);
			
			getPrincipal().then(() => {
				let obj = makeObject(principal.member.m_idx, pageNum, amount, sort, pageData.category, pageData.searchcolumn, pageData.searchword);
				multiSearchList(obj);
			})
		});
	});
}

//최신순, 남은기간순 정렬
//최신순
document.querySelector("#listbylatest").addEventListener('click', ()=>{
	let pageData = getStorageData();
	
	//css
	document.querySelector("#listbyperiod").classList.remove("activeFont");
	document.querySelector("#listbylatest").classList.add("activeFont");
	
	let obj = makeObject(principal.member.m_idx, 1, 10, 'latest', pageData.category, pageData.searchcolumn, pageData.searchword);
	multiSearchList(obj);
	setStorageData('manage', 1, 10, 'latest', pageData.category, pageData.searchcolumn, pageData.searchword);
})

//남은기간순
document.querySelector("#listbyperiod").addEventListener('click', ()=>{
	let pageData = getStorageData();
	
	//css
	document.querySelector("#listbylatest").classList.remove("activeFont");
	document.querySelector("#listbyperiod").classList.add("activeFont");
	
	let obj = makeObject(principal.member.m_idx, 1, 10, 'period', pageData.category, pageData.searchcolumn, pageData.searchword);
	multiSearchList(obj);
	setStorageData('manage', 1, 10, 'period', pageData.category, pageData.searchcolumn, pageData.searchword);
})

//수정 삭제 버튼 클릭 이벤트
function modifyBtnEvent(p_idx){
	location.href = '/partner/modify?pn=' + p_idx;
}

function deleteBtnEvent(p_idx, curr_party, status){
	if(curr_party > 0 && status == 'Y'){
		alert('파티원이 있을 경우 파티를 삭제할 수 없습니다.');
		return;
	}
	
	if(confirm('해당 파티를 삭제하시겠습니까?')){
		localStorage.clear();
		location.href = '/partner/removeparty?pn=' + p_idx;
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
