//객체 생성 후 반환하는 함수
function makeObject(pageNum, amount, category, searchcolumn, searchword){
	let obj = {
		pageNum : pageNum,
		amount : amount,
		category : category,
		searchcolumn : searchcolumn,
		searchword : searchword
	};
	
	return obj;
}

// list 가져오기
window.onload = function() {
	
	let pageData = getStorageData();
	let obj;
	
	if(pageData == null){
		setStorageData('point', 1, 10, '', 'all', 'all', '', '');
		obj = makeObject(1, 10, 'all', 'all', '');
	}else{
		//selectOptions();
		
		obj = makeObject(pageData.pageNum, pageData.amount, pageData.category, pageData.searchcolumn, pageData.searchword);
	}
	
	getPointList(obj);
};

// list
function getPointList(obj){
	let msg = "";
	let page = "";	
	
	fetch('/admin/pointList', {
		method : 'post',
		body : JSON.stringify(obj),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let list = json.list;
		if(list != null && list.length >0){
			
			list.forEach(vo => {
				msg += '<tr>';
				msg += '<td>' + '<input type="radio" name="pointup" data-id=' + vo.id + ' data-name=' + vo.name + ' data-after_point=' + vo.after_point + '></td>';
				msg += '<td>' + vo.id + '</td>';
				msg += '<td>' + vo.name + '</td>';
				msg += '<td>' + vo.content + '</td>';
				if(vo.update_point > 0){
					msg += '<td class="plusPoint">' + '+' + vo.update_point + 'P</td>';
				}else{
					msg += '<td class="minusPoint">' + vo.update_point + 'P</td>';
				}
				msg += '<td>' + vo.before_point + 'P</td>';
				msg += '<td>' + vo.after_point + 'P</td>';
				msg += '<td>' + myTime(vo.reg_date) + '</td>';
				msg += '</tr>';
			})
			document.querySelector("#registerOpen").style.display = 'inline-block';
		}else{
			document.querySelector("#registerOpen").style.display = 'none';
				msg += '<tr>';
				msg += '<td colspan="8">' + '내역이 없습니다.' + '</td>';
				msg += '</tr>';	
				
			}
		
		// 페이징
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
		
		
		document.querySelector("#pointlist tbody").innerHTML = msg;
		document.querySelector(".page-nation").innerHTML = page;
	})
		.then(()=>{
			pagingEvent();
		})
		.catch(err => console.log(err));
}

// 페이지 버튼 클릭 이벤트
function pagingEvent(){
	document.querySelectorAll(".page-nation li a").forEach(aEle => {
		aEle.addEventListener('click', function(e){
			e.preventDefault(); // href 경로 이동 방지
			
			let pageData = getStorageData();
			
			// 태그 속성 불러오기
			let menu = 'point';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			
			setStorageData(menu, pageNum, amount, status, pageData.category, pageData.searchcolumn, pageData.searchword);
			
			let obj = makeObject(pageNum, amount, pageData.category, pageData.searchcolumn, pageData.searchword);
			getPointList(obj);
		});
	});
}


//검색
document.querySelector("#search").addEventListener('click', ()=>{
	let pageData = getStorageData();
	let category = document.querySelector("#category").value;
	let searchcolumn = document.querySelector("#detailSearch").value;
	let searchword = document.querySelector("#searchword").value;
	
	setStorageData('point', 1, 10, '', category, searchcolumn, searchword);
	let obj = makeObject(1, 10, category, searchcolumn, searchword);
	getPointList(obj);
})

//검색 조건 리셋
document.querySelector("#reset").addEventListener('click', ()=>{
	localStorage.clear();
	location.href = '/admin/point';
})

//포인트 관리
document.querySelector("#registerOpen").addEventListener('click', ()=>{
	//모달창
	
	const registerOpen = document.getElementById('registerOpen');
	const registerClose = document.getElementById('registerClose');
	const modal = document.getElementById('registerContainer');
	const categoryPop = document.getElementById("categoryPop").value = "join";
	
	category()
	
	registerClose.addEventListener('click', () => {
		modal.classList.add('hidden');
	});
	
	
	let radioChecked = document.querySelector('input[type=radio][name=pointup]:checked');
	
	if(radioChecked ==null){
		alert("체크박스를 선택해주세요");
	}
	// 최종 포인트 조회
	fetch('/admin/pointSearch', {
		method : 'post',
		body : radioChecked.dataset.id,
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		document.querySelector("#id").innerHTML = json.id;
		document.querySelector("#name").innerHTML = json.name;
		document.querySelector("#after_point").innerHTML = json.after_point;
		document.querySelector("#modalMidx").value = json.m_idx;
		
		modal.classList.remove('hidden');
		
		
		
	})
	.catch(err => console.log(err));
	
	
});
document.querySelector("#registerSubmit").addEventListener('click', ()=>{
	const category = document.querySelector("#categoryPop").value;
	const modalMidx = document.querySelector("#modalMidx").value;
	const update_point = document.querySelector("#update_point").value;
	const etc = document.querySelector('#contentDetail').value;
	let radioChecked = document.querySelector('input[type=radio][name=pointup]:checked');
	
	if(update_point == ''){
		alert("포인트를 입력해주세요");
		return;
	}
	// 포인트 적립 (관리자)
	fetch('/admin/pointInsert', {
		method : 'post',
		body : JSON.stringify({content : category, m_idx : modalMidx, update_point : update_point, contentDetail : etc}),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		if( json == 1){
			localStorage.clear();
			location.href = '/admin/point';
		}else{
			alert("포인트 수정 실패");
		}		
	})
	.catch(err => console.log(err));	
});
//모달창 close
document.querySelector(".close-area").addEventListener('click', ()=>{
	document.getElementById("registerContainer").classList.add('hidden');
	document.body.style.overflow = '';
})

//모달창 바깥영역 클릭시 close
document.getElementById("registerContainer").addEventListener("click", e => {
    const evTarget = e.target;
    if(evTarget.id == "registerContainer") {
    	document.getElementById("registerContainer").classList.add('hidden');
    	document.body.style.overflow = '';
    }
})

// unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
	+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}

// 포인트 관리 기타 사유
function category(){

	const categoryPop = document.getElementById("categoryPop");
	const value = categoryPop.options[categoryPop.selectedIndex].value;
	
	if( value == "etc" ){
		document.querySelector(".etc").style.display = 'inline-block';
	}else{
		document.querySelector(".etc").style.display = 'none';
	}
}