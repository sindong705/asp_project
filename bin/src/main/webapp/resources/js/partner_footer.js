// 파트너 페이징
function setStorageData(menu, pageNum, amount, sortBy, category, searchcolumn, searchword){
	const pageData = {
		menu : menu,
		pageNum : pageNum,
		amount : amount,
		sort : sortBy,
		category : category,
		searchcolumn : searchcolumn, 
		searchword : searchword
	};
	localStorage.setItem('page_data', JSON.stringify(pageData));
}

function getStorageData(){
	return JSON.parse( localStorage.getItem('page_data') );	
}

const tabList = document.querySelectorAll(".list-group li");
function storageClear(){
	//다른 탭 클릭 시 로컬스토리지 클리어
	tabList.forEach(tab => {
		tab.addEventListener('click', ()=>{
			localStorage.clear();
		})
	})
}
storageClear();


function partnerLogout() {
	if (confirm("로그아웃 하시겠습니까?") == true) {
		location.href = '/member/logout';
	}else {
		return;
	}
}
