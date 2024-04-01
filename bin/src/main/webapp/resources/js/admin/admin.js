// 관리자 페이징
function setStorageData(menu, pageNum, amount, status, category, searchcolumn, searchword){
	const pageData = {
		menu : menu,
		pageNum : pageNum,
		amount : amount,
		status : status,
		category : category,
		searchcolumn : searchcolumn, 
		searchword : searchword
	};
	localStorage.setItem('page_data', JSON.stringify(pageData));
}

function getStorageData(){
	return JSON.parse( localStorage.getItem('page_data') );	
}

const tabList = document.querySelectorAll("#accordionSidebar li");
function storageClear(){
	//다른 탭 클릭 시 로컬스토리지 클리어
	tabList.forEach(tab => {
		tab.addEventListener('click', ()=>{
			localStorage.clear();
		})
	})
}
storageClear();

window.onload = function(){
	if(document.querySelector('title').innerHTML == '관리자 홈'){
		totalUsernum();
		totalEarning();
		newRefund();
		newWithdraw();
		newInquiry();
	}
}

//회원수
function totalUsernum(){
	fetch('/admin/totaluser')
	.then(response => response.json())
	.then(json => {
		document.querySelector("#usernum").innerHTML = json + '명';
	})
	.catch(err => console.log(err));
}

//연간 결제액
function totalEarning(){
	fetch('/admin/totalearning')
	.then(response => response.json())
	.then(json => {
		document.querySelector("#totalearning").innerHTML = json.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
	})
	.catch(err => console.log(err));
}

//환불신청
function newRefund(){
	fetch('/admin/newrefund')
	.then(response => response.json())
	.then(json => {
		document.querySelector("#refundreq").innerHTML = json + '건';
	})
	.catch(err => console.log(err));
}

//출금신청
function newWithdraw(){
	fetch('/admin/newwithdraw')
	.then(response => response.json())
	.then(json => {
		document.querySelector("#withdrawreq").innerHTML = json + '건';
	})
	.catch(err => console.log(err));
}

//새문의글
function newInquiry(){
	fetch('/admin/newinquiry')
	.then(response => response.json())
	.then(json => {
		document.querySelector("#inquirynum").innerHTML = json + '건';
	})
	.catch(err => console.log(err));
}



