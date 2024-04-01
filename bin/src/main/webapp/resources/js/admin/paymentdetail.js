//카테고리 가져오기
getAllCategory();
function getAllCategory(){
	let msg = "";
	
	fetch('/admin/allcategory')
	.then(response => response.json())
	.then(json => {
		json.forEach(vo => {
			if(vo.codeone == 10){
				if(vo.codetwo != 1)
					msg += '<option value="' + vo.c_secondary + '">' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="기타(영상)">기타(영상)</option>';
			
		json.forEach(vo => {
			if(vo.codeone == 20){
				if(vo.codetwo != 1)
					msg += '<option value="' + vo.c_secondary + '">' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="기타(도서/음악)">기타(도서/음악)</option>';
		
		json.forEach(vo => {
			if(vo.codeone == 30){
				if(vo.codetwo != 1)
					msg += '<option value="' + vo.c_secondary + '">' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="기타(게임)">기타(게임)</option>';
		
		json.forEach(vo => {
			if(vo.codeone == 40){
				if(vo.codetwo != 1)
					msg += '<option value="' + vo.c_secondary + '">' + vo.c_secondary + '</option>';
			}
		})
		msg += '<option value="기타">기타</option>';
		
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
		setStorageData('payment', 1, 10, 'all', 'all', 'order_no', '');
		obj = makeObject(1, 10, 'all', 'all', 'order_no', '');
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
	
	setStorageData('payment', 1, 10, pageData.status, category, searchcolumn, searchword);
	let obj = makeObject(1, 10, pageData.status, category, searchcolumn, searchword);
	getList(obj);
})

//검색 조건 리셋
document.querySelector("#reset").addEventListener('click', ()=>{
	localStorage.clear();
	location.href = '/admin/paymentdetail';
})

//list
function getList(obj){
	let msg = "";
	let page = "";
	
	fetch('/admin/paymentdetail', {
		method : 'post',
		body : JSON.stringify(obj),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let list = json.list;
		console.log(list);
		console.log(json);
		list.forEach(vo => {
			let status = '';
			
			if (vo.pay_status == 'A') {
				status = '결제대기';
			}else if (vo.pay_status == 'B') {
				status = '결제완료';
			}else if (vo.pay_status == 'C') {
				status = '환불신청';
			}else if (vo.pay_status == 'D') {
				status = '결제취소';
			}else if (vo.pay_status == 'E'){
				status = '환불반려';
			}else{
				status = '환불완료';
			}
			
			msg += '<tr>';
			msg += '<td>' + vo.order_no + '</td>';
			msg += '<td>' + vo.p_idx + '</td>';
			msg += '<td><a href="javascript:detailBtn(' + vo.order_no + ');">' + vo.title + '<br><span class="sub-title">' + vo.sub_title + '</span></a></td>';
			msg += '<td>' + vo.id + '</td>';
			msg += '<td>' + vo.name + '</td>';
			msg += '<td>' + vo.pay_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			if (vo.pay_amount == 0) {
				msg += '<td>0원</td>';
			}else {
				msg += '<td>' + (vo.pay_amount - vo.point).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			}
			msg += '<td>' + vo.point.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + 'P</td>';
			msg += '<td>' + vo.approved_at + '</td>';
			msg += '<td>' + status + '</td>';
			if (vo.pay_status == 'B') {
				msg += '<td>' + '<button type="button" id="partydelete" onclick="cancelBtn(\'' + vo.order_no + '\', \'' + vo.pay_amount + '\')" style="width: 65px;">결제취소</button>' + '</td>';
			} else if(vo.pay_status == 'C') {
				msg += '<td>-</td>';
			} else {
				msg += '<td>-</td>';
			}
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
			let menu = 'payment';
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
	
			setStorageData('payment', 1, 10, rb.querySelector('input[type="radio"]').value, pageData.category, pageData.searchcolumn, pageData.searchword);
			let obj = makeObject(1, 10, rb.querySelector('input[type="radio"]').value, pageData.category, pageData.searchcolumn, pageData.searchword);
			getList(obj);
		})
	})
}

//상세내역 이동
function detailBtn(order_no) {
	location.href = '/admin/paymentview?order_no=' + order_no;
}

//결제취소 버튼
const ps = payService;
function cancelBtn(order_no, pay_amount) {
	if (confirm('결제 취소하시겠습니까?')) {
		if (pay_amount == 0) {
			ps.zeroCancel(order_no, function(result) {
				console.log(result);
				location.reload();
			})
		}else {
			ps.cancel(order_no, function(result) {
				console.log(result);
				location.reload();
			})
		}
	}else {
		alert('결제 취소를 실패하였습니다.');
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