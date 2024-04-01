//객체 생성 후 반환하는 함수
function makeObject(pageNum, amount){
	let obj = {
		pageNum : pageNum,
		amount : amount,
	};
	
	return obj;
}

// list 가져오기
window.onload = function() {
	
	let pageData = getStorageData();
	let obj;
	
	if(pageData == null){
		setStorageData('myPoing', 1, 10);
		obj = makeObject(1, 10);
	}else{		
		obj = makeObject(pageData.pageNum, pageData.amount);
	}
	
	getPointList(obj);
};

// list
function getPointList(obj){
	let msg = "";
	let page = "";	
	
	fetch('/member/myPointList', {
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
		}else{
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
			
			//태그 속성 불러오기
			let menu = 'listpage';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			
			setStorageData(menu, pageNum, amount);
			
			getPointList(makeObject(pageNum,amount));
		});
	});
}

// unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
	+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}
//포인트 불러오기
getPrincipal().then(() => {
	if(document.getElementById("myPoint")){
		let point = principal.member.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		document.getElementById("myPoint").innerHTML = point + 'P';
	}
});