var IMP = window.IMP;
IMP.init("imp45030755");   /* imp~ : 가맹점 식별코드*/
	
const f = document.forms[0];
const payBtn = document.querySelector('#pay-btn');
const urlParams = new URL(location.href).searchParams;

//주문하기 버튼 클릭 시 
const ps = payService;
payBtn.addEventListener('click', () =>{
	let c1 = urlParams.get('c1');
	let c2 = urlParams.get('c2');
	
	const orderNumber = createOrderNum();
	let pg = '';
	
	if (f.pay_method.value === 'card') {
		pg = 'html5_inicis.INIpayTest';
	}else if (f.pay_method.value === 'kakaopay') {
		pg = 'kakaopay.TC0ONETIME';
	}
	
	if (f.pay_amount.value == 0) {
		
		alert('결제가 완료되었습니다.');
		
		ps.zeroOrder({
			imp_uid : '0',
			p_idx: f.p_idx.value,
			m_idx: principal.member.m_idx,
			order_no : orderNumber,
			id : f.id.value,
			name : f.name.value,
			phone : f.phone.value,
			service_amount : f.service_amount.value,
			pay_amount : f.pay_amount.value,
			point : f.point.value,
			commission : f.commission.value,
			pay_method : f.pay_method.value,
			pay_status : 'B',
			title : f.title.value,
			sub_title : f.sub_title.value,
			end_date : f.end_date.value,
			token : '0'
		}, function(result) {
			//결제 후 해당 게시글로 이동
			if(c2 != null){
				location.href = '/shop/get?c1=' + f.codeone.value + '&c2=' + f.codetwo.value + '&pn=' + f.p_idx.value;
			}else{
				location.href = '/shop/get?c1=' + f.codeone.value + '&pn=' + f.p_idx.value;
			}
		});
	}else {
		IMP.request_pay({
			pg: pg,
			pay_method: 'card',
			merchant_uid: orderNumber,
			name: f.title.value,
			amount: f.pay_amount.value,
			buyer_email: "",  /*필수 항목이라 "" 로 남겨둠*/
			buyer_name: f.name.value,
			buyer_tel : f.phone.value
		}, function(rsp) {
			console.log(rsp);
			
			 //결제 성공 시
			if (rsp.success) {
				var msg = '결제가 완료되었습니다.';
				console.log("결제성공 ");
				
				const amount = f.pay_amount.value;
				const imp_uid = rsp.imp_uid;
				const merchant_uid =  rsp.merchant_uid;
				const payDate = '&amount=' + amount + '&imp_uid=' + imp_uid + '&merchant_uid=' + merchant_uid;
				
				ps.pay(payDate, function() {
					alert(msg);
				})
				
				ps.order({
					imp_uid : rsp.imp_uid,
					p_idx: f.p_idx.value,
					m_idx: principal.member.m_idx,
					order_no : rsp.merchant_uid,
					id : f.id.value,
					name : f.name.value,
					phone : f.phone.value,
					service_amount : f.service_amount.value,
					pay_amount : f.pay_amount.value,
					point : f.point.value,
					commission : f.commission.value,
					pay_method : f.pay_method.value,
					pay_status : 'B',
					title : f.title.value,
					sub_title : f.sub_title.value,
					end_date : f.end_date.value
				}, function(result) {
					//결제 후 해당 게시글로 이동
					if(c2 != null){
						location.href = '/shop/get?c1=' + f.codeone.value + '&c2=' + f.codetwo.value + '&pn=' + f.p_idx.value;
					}else{
						location.href = '/shop/get?c1=' + f.codeone.value + '&pn=' + f.p_idx.value;
					}
				});
				
			} else {
				var msg = '결제에 실패하였습니다.';
				msg += '\n에러내용 : ' + rsp.error_msg;
				alert(msg);
			}
		});
	}
});

//주문번호 생성 함수
function createOrderNum() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
 
    let orderNum = year + month + day;
    for (let i = 0; i < 5; i++) {
        orderNum += Math.floor(Math.random() * 8);
    }
    return parseInt(orderNum);
}

//포인트 사용
function chkPoint(amt,pnt,min,unit) {
	//amt : 최초 결제 금액 / pnt : 사용가능,남은 포인트 / min : 사용 가능 최소 포인트 / unit : 사용단위
	var v_point = 0; //사용할 포인트 (input 입력값)

	if (pnt < min) {  //최소 사용 단위보다 작을 때 
		v_point = 0; 
	}else {
		v_point = pnt - pnt%unit; //사용할 포인트 = 전체 마일리지 중 최소단위 이하 마일리지를 뺀 포인트
	}

	if(pnt > amt ){ //결제금액보다 포인트가 더 클 때
		v_point = amt; //사용할 포인트는 결제금액과 동일하게 설정
	}
	
	document.getElementById("point").value = v_point; //input 값 설정
	
	if (document.getElementById("point").value != '') {
		changePoint(amt,pnt,min,unit);
	}
}

function changePoint(amt,pnt,min,unit){
	//amt : 최초 결제 금액 / pnt : 사용가능,남은 포인트 / min : 사용 가능 최소 포인트 / unit : 사용단위
	var v_point = parseInt(document.getElementById("point").value); //사용할 포인트 (input 입력값)
	if (v_point > pnt) { //입력값이 사용가능 포인트보다 클때
		v_point = pnt;
		document.getElementById("point").value = v_point;
	}

	if(v_point > amt ){ //결제금액보다 포인트가 더 클 때
		v_point = amt; //사용할 포인트는 결제금액과 동일하게 설정
		document.getElementById("point").value = v_point;
	}

	if (v_point < min || document.getElementById("point").value == '') {  //최소 사용 단위보다 작을 때
		v_point = 0; 
		document.getElementById("point").value = v_point;
	}else {
		v_point = v_point - v_point%unit; //사용할 포인트 = 사용할 마일리지 중 최소단위 이하 마일리지를 뺀 포인트
	}
	
	var v_left = document.getElementById("remnant_point"); //사용가능 마일리지, 남은 포인트 값 설정
	v_left.innerHTML = pnt - v_point + 'P'; //= 전체 포인트 중에 사용할 포인트빼고 남은 포인트
	
	document.getElementById("total-price").innerHTML = (amt - v_point).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById("pay_amount").value = amt - v_point;
}