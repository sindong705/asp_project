<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문상세내역</title>
<link rel="stylesheet" href="/resources/css/payment/orderform.css">
<script type="text/javascript"	src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<sec:authentication property="principal" var="principal"/>
	
	<form method="post">
		<div class="title-div">
			<div class="title">결제내역</div>
		</div>
		
		<!-- 진행 정보 -->
		<div class="sub-title">진행 정보</div>
		
		<div class="list-payment">
			<table>
				<thead>
					<tr>
						<th>파티명</th>
						<th>사용기간</th>
						<th>판매가</th>
						<th>수수료(10%)</th>
						<th>합계</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="title-td">${vo.title }<br><span class="sub-title">${vo.sub_title }</span></td>
						<td id="period" startdate="${vo.approved_at }" enddate="${vo.end_date }">${vo.end_date }</td>
						<td id="price" price="${vo.service_amount }"></td>
						<td id="commission" commission="${vo.commission }"></td>
						<td><strong id="sum" sum="${vo.pay_amount }"></strong></td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<!-- 결제 정보 -->
		<div class="form-half left">
			<div class="sub-title">결제 정보</div>
			
			<div class="form-list">
				<ul>
					<li>
						<div class="subject">ㆍ 결제번호</div>
						<div class="right">${vo.order_no }</div>
					</li>
					<li>
						<div class="subject">ㆍ 결제일시</div>
						<div class="right">${vo.approved_at }</div>
					</li>
					<li>
						<div class="subject">ㆍ 결제방식</div>
						<div class="right">
							<c:if test="${vo.pay_method eq 'card' }">
								신용카드
							</c:if>
							<c:if test="${vo.pay_method eq 'kakaopay' }">
								카카오페이
							</c:if>
						</div>
					</li>
					<li>
						<div class="subject">ㆍ 이름</div>
						<div class="right">${vo.name }</div>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="form-half">
			<div class="sub-title">결제 합계</div>
			
			<div class="form-list">
				<ul>
					<li>
						<div class="subject">ㆍ 판매가</div>
						<div class="right" id="payprice"></div>
					</li>
					<li>
						<div class="subject">ㆍ 수수료(10%)</div>
						<div class="right" id="paycommission"></div>
					</li>
					<li>
						<div class="subject">ㆍ 사용 포인트</div>
						<div class="right"><fmt:formatNumber value="${vo.point }"/>P</div>
					</li>
					<li>
						<div class="subject">ㆍ 총 합계</div>
						<div class="right" id="paysum"></div>
					</li>
					<li>
						<div class="subject">ㆍ 환불금액</div>
						<div class="right">${vo.refund_amount }원</div>
					</li>
					<li class="total">
						<div class="subject" style="color: #43a051;">총 결제금액</div>
						<div class="right">
							<span class="total-price" id="paytotal"></span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- 목록버튼 -->
		<div class="pay-btn">
			<a href="/payment/orderinquiry" class="pay-btn-submit" style="display: inline-block;">확인</a>
		</div>
	</form>
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/payment/orderdetail.js"></script>
</body>
</html>