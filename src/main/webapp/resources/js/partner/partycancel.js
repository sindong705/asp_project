//파티 생성
document.querySelector("#makeparty").addEventListener('click', ()=>{
	location.href = '/partner/register';
})

//list 가져오기
window.onload = function() {
	getPrincipal().then(() => {
		let pageData = getStorageData();
		let obj;
		if(pageData == null){
			document.querySelector("#listbyperiod").classList.remove("activeFont");
			document.querySelector("#listbylatest").classList.add("activeFont");
			
			setStorageData('partyinfo', 1, 10, 'latest', '', 'p_idx', '');
			obj = makeObject(principal.member.m_idx, 1, 10, 'latest', '', 'p_idx', '');
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
			obj = makeObject(principal.member.m_idx, pageData.pageNum, pageData.amount, pageData.sort, '', pageData.searchcolumn, pageData.searchword);
		}
		
		getList(obj);
	})
}

function getList(obj){
	let msg = "";
	let page = "";
	
	fetch('/partner/partycancel', {
		method : 'post',
		body : JSON.stringify(obj),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let list = json.list;
		
		if(list.length == 0){
			msg += '<tr>';
			msg += '<td colspan="9">참여자가 없습니다.</td>';
			msg += '</tr>';
    	}
		
 		list.forEach(vo => {
			//남은기간
			//시작날짜
			let sDate = new Date();
			//종료날짜
			let eArr = myTime(vo.end_date).split('-');
			let eDate = new Date(eArr);
			let diffDate = Math.abs(Math.round((sDate - eDate) / (1000*60*60*24)));
			
			//상태값
			let status = '';
			if (vo.pay_status == 'D') {
				status = '결제취소';
			}else {
				status = '환불완료';
			}
			
			msg += '<tr>';
			msg += '<td>' + myTime(vo.approved_at) + '</td>';
			msg += '<td>' + vo.p_idx + '</td>';
			msg += '<td>' + vo.title + '</td>';
			msg += '<td>' + vo.name + '</td>';
			msg += '<td>' + status + '</td>';
			if(diffDate <= 0){
				msg += '<td>마감</td>';
			}else{
				msg += '<td>' + diffDate + '일</td>';
			}
			msg += '<td>' + vo.service_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += '<td>' + vo.commission.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += '<td>' + (vo.service_amount+vo.commission).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
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

function selectOptions() {
	let pageData = getStorageData();
	
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
	
	getPrincipal().then(() => {
		setStorageData('partyinfo', 1, 10, pageData.sort, '', searchcolumn, searchword);
		let obj = makeObject(principal.member.m_idx, 1, 10, pageData.sort, '', searchcolumn, searchword);
		getList(obj);
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

//페이지 버튼 클릭 이벤트
function pagingEvent(){
	document.querySelectorAll(".page-nation li a").forEach(aEle => {
		aEle.addEventListener('click', function(e){
			e.preventDefault(); //href 경로 이동 방지
			
			let pageData = getStorageData();
			
			//태그 속성 불러오기
			let menu = 'partyinfo';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			let sort = document.querySelector("#listbylatest").classList.contains('activeFont') ? 'latest' : 'period';
			
			setStorageData(menu, pageNum, amount, sort, '', pageData.searchcolumn, pageData.searchword);
			
			getPrincipal().then(() => {
				let obj = makeObject(principal.member.m_idx, pageNum, amount, sort, '', pageData.searchcolumn, pageData.searchword);
				getList(obj);
			})
			
		});
	});
}

//unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0") + ' ' 
		+ String(myDate.getHours()).padStart(2, "0") + ':' 
		+ String(myDate.getMinutes()).padStart(2, "0") + ':' 
		+ String(myDate.getSeconds()).padStart(2, "0");
	
	return date;
}

//최신순, 남은기간순 정렬
//최신순
document.querySelector("#listbylatest").addEventListener('click', ()=>{
	let pageData = getStorageData();
	
	//css
	document.querySelector("#listbyperiod").classList.remove("activeFont");
	document.querySelector("#listbylatest").classList.add("activeFont");
	
	let obj = makeObject(principal.member.m_idx, 1, 10, 'latest', '', pageData.searchcolumn, pageData.searchword);
	getList(obj);
	setStorageData('partyinfo', 1, 10, 'latest', '', pageData.searchcolumn, pageData.searchword);
})

//남은기간순
document.querySelector("#listbyperiod").addEventListener('click', ()=>{
	let pageData = getStorageData();
	
	//css
	document.querySelector("#listbylatest").classList.remove("activeFont");
	document.querySelector("#listbyperiod").classList.add("activeFont");
	
	let obj = makeObject(principal.member.m_idx, 1, 10, 'period', '', pageData.searchcolumn, pageData.searchword);
	getList(obj);
	setStorageData('partyinfo', 1, 10, 'period', '', pageData.searchcolumn, pageData.searchword);
})

