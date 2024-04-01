// ----- css 파일 추가
// 1. 파일 경로 설정
const CSS_FILE_PATH = ['/resources/css/Inquiry/Inquirylist.css', '/resources/css/Inquiry/Inquirypage.css'];
//2. link 태그 생성
cssBinding(CSS_FILE_PATH);
function cssBinding(cssFiles) {
	cssFiles.forEach(css => {		
		let linkEle = document.createElement('link');
		linkEle.rel = 'stylesheet';
		linkEle.type = 'text/css';
		linkEle.href = css;
//3. head 태그에 link 엘리먼트 추가
		document.head.appendChild(linkEle);
	});
}

// 하단 페이지 이동하는 클릭 이벤트 (다음 페이지로 넘어 가는 것)
document.querySelectorAll(".page-nation li a").forEach( aEle => {
	aEle.addEventListener('click', function(e){ 
		e.preventDefault();
		
		let pageNum = this.getAttribute("href");
		let amount = 10;
		
		setStorageData(pageNum, amount);
		
		console.log(pageNum);
		
		let sendData = 'pageNum=' + pageNum + '&amount=' + amount;
		location.href = '/inquiry_board/Inquirylist?' + sendData;
	});
});

document.querySelector("#registerBtn").addEventListener('click', () => {
	location.href = '/inquiry_board/Inquiryregister';
});

document.querySelectorAll('tbody a').forEach( a => {
	a.addEventListener('click', function(e){ 
		e.preventDefault();
		
		let i_idx = a.getAttribute('href');
		
		location.href = '/inquiry_board/Inquiryget?i_idx=' + i_idx;
	});
});





