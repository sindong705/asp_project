//영상 저장하기
function videoSave(f) {
	if (!f.channel.value) {
		alert('채널을 선택해주세요.');
		return;
	}
	
	var channelId = '';
	
	if (f.channel.value == '넷플릭스') {
		channelId = 'UCiEEF51uRAeZeCo8CJFhGWw';
	}else if (f.channel.value == '웨이브') {
		channelId = 'UCym5538xAEEppbridXozfgw';
	}else if (f.channel.value == '유튜브') {
		channelId = 'UCOH52Yqq4-rdLvpt2Unsqsw';
	}else if (f.channel.value == '디즈니') {
		channelId = 'UCtdz9LWNNQKUg4Xpma_40Ug';
	}else if (f.channel.value == '왓챠') {
		channelId = 'UCgmmc51A3qyAR3MvVX-rzCQ';
	}else if (f.channel.value == '라프텔') {
		channelId = 'UCI7lPoS1I3zOOePX9ph4iAA';
	}else if (f.channel.value == '쿠팡플레이') {
		channelId = 'UCjn-VbcIkAeXQKCmLJV8YwQ';
	}else if (f.channel.value == '프라임비디오') {
		channelId = 'UCQJWtTnAHhEG5w4uN0udnUQ';
	}
	
	var value = channelId + '/' + f.channel.value;
	
	fetch('/admin/videoSave/' + value)
		.then(response => response.json())
		.then(json => {
			alert(json + '건이 등록되었습니다.');
			location.reload();
		})
		.catch(err => console.log(err));
}

//영상 삭제하기
function videoDelete(f) {
	if (!f.channel2.value) {
		alert('채널을 선택해주세요.');
		return;
	}
	
	fetch('/admin/videoDelete/' + f.channel2.value)
		.then(response => response.json())
		.then(json => {
			alert(json + '건이 삭제되었습니다.');
			location.reload();
		})
		.catch(err => console.log(err));
}

//영상 불러오기
let page = 1;

function videoList() {
	let msg = '';
	sendData = '?page=' + page;
	
    fetch('/admin/videoListload' + sendData)
        .then(response => response.json())
        .then(data => {
        	if(data.length < 8){
        		document.querySelector("#load-more-btn").style.display = 'none';
        	}
        	
            data.forEach(video => {
				msg += '<div class="video-box"><a href="#" class="thumb" data-toggle="modal" data-target="#moaModal' + video.idx + '">';
				msg += '<img src="https://img.youtube.com/vi/' + video.videoid + '/mqdefault.jpg">';
				msg += '</a></div>';
				
				msg += '<div class="modal fade" id="moaModal' + video.idx + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
				msg += '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">';
				msg += '<div class="modal-content">';
				msg += '<div class="modal-header"><button class="btn video-close" type="button" data-dismiss="modal"><i class="fas fa-fw fa-xmark"></i></button></div>';
				msg += '<div class="modal-body">';
				msg += '<iframe src="https://www.youtube.com/embed/' + video.videoid + '" frameborder="0" allowfullscreen></iframe>';
				msg += '</div>';
				msg += '</div></div></div></div>';
            })
            
            document.querySelector("#video-container").innerHTML += msg;
            page++; // 페이지 번호 증가
        })
        .catch(error => console.error('Error:', error));
}

videoList();

//더보기 버튼 클릭 이벤트 
document.getElementById('load-more-btn').addEventListener('click', () => {
	videoList(); // 더보기 버튼 클릭 시 추가 아이템들을 가져옴
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})