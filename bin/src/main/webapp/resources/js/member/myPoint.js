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
				msg += '<td>' + vo.update_point + '</td>';
				msg += '<td>' + vo.before_point + '</td>';
				msg += '<td>' + vo.after_point + '</td>';
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
			let pageNum = this.getAttribute("href");
			let amount = 10;
			
			setStorageData(pageNum, amount);
			
			let obj = makeObject(pageNum, amount);
			getPointList(obj);
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