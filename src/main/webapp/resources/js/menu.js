//새로고침 시 알림 배지 업데이트
getPrincipal()
.then(()=>{
	if(principal != 'anonymousUser'){
		fetch('/alarm/alarmnumber',{
			method: 'post',
			body: principal.member.id,
			headers : {'Content-type' : 'application/json; charset=utf-8'}
		})
		.then(response => response.json())
		.then(data => {
			if(data == 0){
				document.querySelector("#badge").style.display = 'none';
			}else{
				document.querySelector('#badge').innerHTML = data;
			}
		})
		.catch(err => console.log(err));
	}
})

// 헤더 스크롤 시 fixed 클래스 추가
window.addEventListener('scroll', function() {
	var header = document.querySelector('.header-menu');
	var scrollPosition = window.pageYOffset;

	// 스크롤 위치가 130px 이상이면 헤더에 fixed 클래스 추가, 그렇지 않으면 제거
	if (scrollPosition > 130) {
	  header.classList.add('fixed');
	} else {
	  header.classList.remove('fixed');
	}
});

// 헤더 메뉴 클릭 시 .menu ul li a 태그에 hover 클래스 추가
var li = document.querySelectorAll('.menu ul li a');
var pathname = window.location.pathname;
var search = window.location.search;
if (pathname.includes('/shop/list/10') || search.includes('?c1=10')) {
	li[0].className += ' hover';
} else if(pathname.includes('/shop/list/20') || search.includes('?c1=20')) {
	li[1].className += ' hover';
} else if(pathname.includes('/shop/list/30') || search.includes('?c1=30')) {
	li[2].className += ' hover';
} else if(pathname.includes('/shop/list/40') || search.includes('?c1=40')) {
	li[3].className += ' hover';
}

// 헤더 2차 메뉴에 카테고리 값 불러오기 
showCategory(); 
function showCategory(){
	var code10 = document.querySelector('#codeone-10');
	var code20 = document.querySelector('#codeone-20');
	var code30 = document.querySelector('#codeone-30');
	var code40 = document.querySelector('#codeone-40');
	
	fetch('/page/submenu')
    .then(response => response.json())
    .then( data => {
    	let msg10 = '';
    	let msg20 = '';
    	let msg30 = '';
    	let msg40 = '';
    	
    	data.forEach(code => {
            if (code.codeone == 10) {
            	if(code.codetwo != 1){
            		msg10 += '<li>';
    				msg10 += '<a href="/shop/list/' + code.codeone + '/' + code.codetwo + '">#';
    				msg10 += code.c_secondary;
    				msg10 += '</a>';
    				msg10 += '</li>';
            	}
			} else if (code.codeone == 20) {
				if(code.codetwo != 1){
					msg20 += '<li>';
					msg20 += '<a href="/shop/list/' + code.codeone + '/' + code.codetwo + '">#';
					msg20 += code.c_secondary;
					msg20 += '</a>';
					msg20 += '</li>';
				}
			} else if (code.codeone == 30) {
				if(code.codetwo != 1){
					msg30 += '<li>';
					msg30 += '<a href="/shop/list/' + code.codeone + '/' + code.codetwo + '">#';
					msg30 += code.c_secondary;
					msg30 += '</a>';
					msg30 += '</li>';
				}
			} else if (code.codeone == 40) {
				if(code.codetwo != 1){
					msg40 += '<li>';
					msg40 += '<a href="/shop/list/' + code.codeone + '/' + code.codetwo + '">#';
					msg40 += code.c_secondary;
					msg40 += '</a>';
					msg40 += '</li>';
				}	
			}
		});
    	
    	data.forEach(code => {
            if (code.codetwo == 1) {
            	if(code.codeone == 10)
            		msg10 += '<li><a href="/shop/list/' + code.codeone + '/' + code.codetwo + '">#' + code.c_secondary + '</a></li>';
            	else if(code.codeone == 20)
            		msg20 += '<li><a href="/shop/list/' + code.codeone + '/' + code.codetwo + '">#' + code.c_secondary + '</a></li>';
            	else if(code.codeone == 30)
            		msg30 += '<li><a href="/shop/list/' + code.codeone + '/' + code.codetwo + '">#' + code.c_secondary + '</a></li>';
            	else if(code.codeone == 40)
            		msg40 += '<li><a href="/shop/list/' + code.codeone + '/' + code.codetwo + '">#' + code.c_secondary + '</a></li>';
            }
		});
    	
		code10.innerHTML = msg10;
		code20.innerHTML = msg20;
		code30.innerHTML = msg30;
		code40.innerHTML = msg40;
    })
    .catch(err => console.log(err));
}

//포인트 불러오기
getPrincipal().then(() => {
	if(document.getElementById("memberPoint")){
		let point = principal.member.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		document.getElementById("memberPoint").innerHTML = point + 'P';
	}
});

// 1:1문의 헤더에서 적용되는 부분 ( 제이슨 형태로 저장 ) // 처음 2page에서 목록에 갔다가 다시 돌아올때 2page로 떠야 하는 것 ****
function setStorageData(pageNum, amount){		// setStorageData 값을 객체로 만들고 값을
	const pageData = {
		pageNum : pageNum,
		amount : amount
	};
	
	localStorage.setItem('page_data', JSON.stringify(pageData));		// 실제 localStorage 저장 (내장함수), key/value
}

function getStorageData(){
	return JSON.parse( localStorage.getItem('page_data') );	
}

//로컬스토리지 클리어(주소에 get, partner 없을 경우, 파티관리 클릭 시)
const url = window.location.href;

function containsString(str) {
    return url.indexOf(str) !== -1;
}

function moveManage(){
	localStorage.clear();
	location.href='/partner/manage';
}

function storageClear(){
	let containsGet = containsString('get');
	let containsPartner = containsString('partner');
	let containsAdmin = containsString('admin');
	
	if(!containsGet && !containsPartner && !containsAdmin){
		localStorage.clear();
	}
}
storageClear();

//로그아웃 처리
function mainLogout() {
	if (confirm("로그아웃 하시겠습니까?") == true) {
		location.href = '/member/logout';
	}else {
		return;
	}
}

//1:1 문의 로그인 체크
function inquiryChk() {
	if(principal == 'anonymousUser'){
		alert('로그인 후 이용가능한 서비스입니다.');
		location.href = '/member/login';
		return;
	}
	
	location.href = '/inquiry_board/Inquiryregister';
}