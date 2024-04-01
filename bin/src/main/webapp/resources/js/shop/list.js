window.onload = function(){
	//게시글 클릭이벤트
	getDetailInfo();
}

//파티 리스트
let page = 1;

function fetchList() {
	let msg;
	let sendData;
	let c1 = document.querySelector("#category").getAttribute("c1");
	let c2 = document.querySelector("#category").getAttribute("c2");
	
	if(c2 == ''){
		c2 = 0;
	}
	
	sendData = 'c1=' + c1 + '&c2=' + c2 + '&page=' + page;
	
    fetch('/shop/items?' + sendData)
        .then(response => response.json())
        .then(data => {
        	if(data.length < 12){
        		document.querySelector("#load-more-btn").style.display = 'none';
        	}
        	
            data.forEach(item => {
            	msg += '<div id="partyinfo" codeone="' + item.codeone + '" codetwo="' + item.codetwo + '" p_idx="' + item.p_idx + '" datediff="' + item.datediff + '" status="' + item.status + '">';
				msg += '<div id="service">' + item.c_secondary + '</div>';
				msg += '<div id="title" class="ellipsis">' + item.title + '</div>';
				
				
				msg += '<div id="curr-party">';
				if(item.curr_party > 0){
					if(item.curr_party == item.party_num){
						for(let i = 0; i<item.party_num; i++){
							msg += '<img src="/resources/images/sun.png" class="participation">';
						}
					}else{
						for(let i = 0; i<item.curr_party; i++){
							msg += '<img src="/resources/images/sun.png" class="participation">';
						}
						for(let i = 0; i<(item.party_num - item.curr_party); i++){
							msg += '<img src="/resources/images/sun.png" class="non-participation">';
						}
					}
				}
				
				if(item.curr_party == 0){
					for(let i = 0; i<item.party_num; i++){
						msg += '<img src="/resources/images/sun.png" class="non-participation">';
					}
				}
				msg += '</div>';
				
				if(item.status == 'Y'){
					msg += '<div id="enddate">~ ' + myTime(item.end_date) + ' <span id="period">(' + item.datediff + '일)</span></div>';
					msg += '<div id="price">' + item.totalprice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</div>';
				}else{
					msg += '<div id="enddate">~ ' + myTime(item.end_date) + ' <span id="period"></span></div>';
					msg += '<div id="price">마감</div>';
				}
					
				msg += '</div>';
            })
            document.querySelector("#partyinfo-container").innerHTML += msg;
            page++; // 페이지 번호 증가
        })
        .then(()=>{
        	getDetailInfo();
        })
        .catch(error => console.error('Error:', error));
}

fetchList();

// 더보기 버튼 클릭 이벤트 
document.getElementById('load-more-btn').addEventListener('click', () => {
	fetchList(); // 더보기 버튼 클릭 시 추가 아이템들을 가져옴
});

//파티 만들기
document.querySelector("#makeparty").addEventListener('click', ()=>{
	if(principal == 'anonymousUser'){
		alert('로그인 후 이용가능한 서비스입니다.');
		location.href = '/member/login';
		return;
	}
	
	if(principal.member.level == 'C'){
		alert('파티장 신청 후 이용가능한 서비스입니다.');
		return;
	}
	
	location.href = '/partner/register';
})


//게시글 상세
var pathname = window.location.pathname;
function getDetailInfo(){
let partyinfo = document.querySelectorAll("#partyinfo");
	partyinfo.forEach(party => {
		party.addEventListener('click', () => {
			let codeone = party.getAttribute('codeone');
			let codetwo = party.getAttribute('codetwo');
			let p_idx = party.getAttribute('p_idx');
			let status = party.getAttribute('status');
			
			if(status == 'N'){
				alert('이미 마감된 파티입니다.');
			}else{
				if(pathname.length == 13)
					location.href = '/shop/get?c1=' + codeone + '&pn=' + p_idx;
				else
					location.href = '/shop/get?c1=' + codeone + '&c2=' + codetwo + '&pn=' + p_idx;
			}
		})
	})
}



function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}