<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>결제/환불 내역</title>
<link rel="stylesheet" href="/resources/css/payment/orderform.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
<link href="/resources/css/admin/all.min.css" rel="stylesheet" type="text/css">
<script type="text/javascript"	src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<form method="post">
		<div class="title-div">
			<div class="title">결제/환불 내역<span style="font-size: 13px; color: gray;">&nbsp;&nbsp;&nbsp;※ 결제취소는 결제 후 24시간 이내, 환불신청은 파티 종료 기간이 7일 이상 남았을 때에만 가능합니다.</span></div>
		</div>
		
		<div class="list-payment inquiry-list">
			<table>
				<thead>
					<tr>
						<th>진행날짜</th>
						<th>서비스명</th>
						<th>결제금액</th>
						<th>입금액</th>
						<th>포인트</th>
						<th>환불금액</th>
						<th>상태변경</th>
						<th>현재상태</th>
					</tr>
				</thead>
				<tbody>
				
				</tbody>
			</table>
		</div>
		
		<!-- page -->
		<div class="page-wrap">
			<ul class="page-nation">
			
			</ul>
		</div>
		
		
	</form>
	
	<!-- 모달 창 -->
	<div id="modal" class="modal-overlay">
        <div class="modal-window">
        	<div class="close-area">Ⅹ</div>
            <div class="modaltitle">
                <h5>환불 신청</h5>
            </div>
            <div class="content">
            	<form method="post">
	                <table>
	                	<tr>
	                		<td class="center">주문 번호</td>
	                		<td id="order_no"></td>
	                	</tr>
	                	<tr>
	                		<td class="center">결제 금액</td>
	                		<td id="amount"></td>
	                	</tr>
	                	<tr>
	                		<td class="center">환불 예상 금액</td>
	                		<td id="re_amount"></td>
	                	</tr>
	                	<tr>
	                		<td class="center">환불 신청 사유</td>
	                		<td id="reason">
	                			<div class="radio">
									<div class="form-check form-check">
									  <input class="form-check-input" type="radio" name="reason" id="inlineRadio1" value="서비스 이용 불가" checked>
									  <label class="form-check-label" for="inlineRadio1">서비스 이용 불가</label>
									</div>
									<div class="form-check form-check">
									  <input class="form-check-input" type="radio" name="reason" id="inlineRadio2" value="제한된 서비스">
									  <label class="form-check-label" for="inlineRadio2">제한된 서비스</label>
									</div>
									<div class="form-check form-check">
									  <input class="form-check-input" type="radio" name="reason" id="inlineRadio3" value="파티관리 미흡 및 방치">
									  <label class="form-check-label" for="inlineRadio3">파티관리 미흡 및 방치</label>
									</div>
									<div class="form-check form-check">
									  <input class="form-check-input" type="radio" name="reason" id="inlineRadio4" value="기타">
									  <label class="form-check-label" for="inlineRadio4">기타</label>
									  <textarea class="form-control" name="otherreason" id="floatingTextarea2" style="height: 100px; resize: none;"></textarea>
									</div>
								</div>
	                		</td>
	                	</tr>
	                	<tr>
	                		<td class="center" colspan="2" style="text-align: right; font-size:13px; color:gray; padding-left: 15px;">
	                			<input type="hidden" name="order_no" value="">
	                			<input type="hidden" name="p_idx" value="">
	                			<input type="hidden" name="amount" value="">
	                			<input type="hidden" name="re_amount" value="">
								<input type="button" id="refundreq" value="신청">
							</td>
	                	</tr>
	                	<tr>
	                		<td class="center" colspan="2" style="text-align: left; font-size:13px; color:gray; padding-left: 15px;">
								※ 단순 변심에 의한 환불은 불가합니다.<br>
								※ 환불금액은 요청한 날짜를 기준으로 소급 적용되며, 수수료를 제외한 후에 남은 기간에 따라 책정됩니다.
							</td>
	                	</tr>
	                </table>
                </form>
            </div>
        </div>
    </div>
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/payment/payservice.js"></script>
	<script type="text/javascript" src="/resources/js/payment/orderinquiry.js"></script>
	
	<!-- Bootstrap core JavaScript-->
	<script src="/resources/js/admin/jquery.min.js"></script>
	<script src="/resources/js/admin/bootstrap.bundle.min.js"></script>
</body>
</html>