//알림 (소켓)
//전역변수 설정
let socket = null;
document.addEventListener("DOMContentLoaded", function() {
    // 웹소켓 연결
	socket = new SockJS('http://localhost:8081/echo-ws');
    // 데이터를 전달 받았을 때 
	socket.onmessage = onMessage;
});

//toast생성 및 추가
function onMessage(evt) {
    var data = evt.data;
    // toast
    var toast = '<div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">';
    toast += "<div class='toast-header'>";
    toast += "<strong class='me-auto'>알림</strong>";
    toast += "<small class='toast-time' class='text-muted'>now</small>";
    toast += "<button type='button' class='btn-close' data-bs-dismiss='toast' aria-label='Close'>";
    toast += '</div>';
    toast += "<div class='toast-body'>" + data + "</div>";
    toast += '</div>';

    var msgStack = document.getElementById("msgStack");
    msgStack.insertAdjacentHTML('beforeend', toast);

    var toastElement = msgStack.lastElementChild;
    var toastInstance = new bootstrap.Toast(toastElement);
    toastInstance.show();
    toastInstance._config.autohide = false;
    
    // 10초 후에 토스트 숨기기
    setTimeout(function() {
        toastInstance.hide();
    }, 10000);
};
