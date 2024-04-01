<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문페이지</title>
<link rel="stylesheet" href="/resources/css/payment/orderform.css">
<script type="text/javascript"	src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<sec:authentication property="principal" var="principal"/>
	
	<form method="post">
		<div class="title-div">
			<div class="title">진행/결제</div>
		</div>
		
		<!-- 진행 정보 -->
		<div class="sub-title">진행 정보</div>
		
		<div class="list-payment">
			<table>
				<thead>
					<tr>
						<th>서비스명</th>
						<th>참여일</th>
						<th>판매가</th>
						<th>수수료(10%)</th>
						<th>합계</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>${vo.c_secondary }<br><span class="sub-title">${vo.title }</span></td>
						<td id="period" enddate="${vo.end_date }">${vo.datediff }일 (1일 ${vo.price }원)</td>
						<td id="price"><fmt:formatNumber value="${vo.totalprice }" pattern="#,###" />원</td>
						<td id="commission"><fmt:formatNumber value="${vo.totalprice*0.1 }" pattern="#,###" />원</td>
						<td><strong id="sum"><fmt:formatNumber value="${vo.totalprice + vo.totalprice*0.1 }" pattern="#,###" />원</strong></td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<!-- 결제 정보 -->
		<div class="form-half left">
			<div class="sub-title">결제자 정보</div>
			
			<div class="form-list">
				<ul>
					<li>
						<div class="subject">ㆍ 아이디</div>
						<div class="right">${principal.member.id }</div>
						<input type="hidden" name="id" value="${principal.member.id }">
					</li>
					<li>
						<div class="subject">ㆍ 이름</div>
						<div class="right fill">
							<input type="text" name="name" value="${principal.member.name }" maxlength="20" style="text-align: right;">
						</div>
						<input type="hidden" name="phone" value="${principal.member.phone }">
						<input type="hidden" name="m_idx" value="${principal.member.m_idx }">
						<input type="hidden" name="title" value="${vo.c_secondary }">
						<input type="hidden" name="sub_title" value="${vo.title }">
						<input type="hidden" name="p_idx" value="${vo.p_idx }">
						<input type="hidden" name="codeone" value="${vo.codeone }">
						<input type="hidden" name="codetwo" value="${vo.codetwo }">
						<input type="hidden" name="end_date" value="${vo.end_date }">
					</li>
				</ul>
			</div>
		</div>
		
		<div class="form-half">
			<div class="sub-title">결제 정보</div>
			
			<div class="form-list">
				<ul>
					<li>
						<div class="subject">ㆍ 서비스 금액</div>
						<div class="right" id="payprice"><fmt:formatNumber value="${vo.totalprice }" pattern="#,###" />원</div>
						<input type="hidden" name="service_amount" value="<fmt:parseNumber value="${vo.totalprice }" integerOnly="true"/>">
					</li>
					<li>
						<div class="subject">ㆍ 수수료(10%)</div>
						<div class="right" id="paycommission"><fmt:formatNumber value="${vo.totalprice*0.1 }" pattern="#,###" />원</div>
						<input type="hidden" name="commission" value="<fmt:parseNumber value="${vo.totalprice*0.1}" integerOnly="true"/>">
					</li>
					<li>
						<div class="subject">ㆍ 합계</div>
						<div class="right" id="paysum"><fmt:formatNumber value="${vo.totalprice + vo.totalprice*0.1 }" pattern="#,###" />원</div>
					</li>
					<li>
						<div class="subject">ㆍ 사용 포인트</div>
						<div class="right fill">
							사용가능 포인트 <span class="text-point" id="remnant_point">${principal.member.point }P</span>
							<input type="number" name="point" id="point" value="" class="point" onchange="changePoint(${vo.totalprice + vo.totalprice*0.1},${principal.member.point },0,1)" style="text-align: right;">
							<input type="button" value="전액사용" onclick="chkPoint(${vo.totalprice + vo.totalprice*0.1},${principal.member.point },0,1)" class="point-btn">
						</div>
					</li>
					<li>
						<div class="subject">ㆍ 결제방법</div>
						<div class="right">
							<input type="radio" name="pay_method" value="card" id="card" checked="checked">
							<label for="card">신용카드</label>
							<input type="radio" name="pay_method" value="kakaopay" id="kakaopay">
							<label for="kakaopay">카카오페이</label>
							<input type="hidden" name="pay_amount" id="pay_amount" value="<fmt:parseNumber value="${vo.totalprice + vo.totalprice*0.1}" integerOnly="true"/>">
						</div>
					</li>
					<li class="total">
						<div class="subject" style="color: #43a051;">총 결제금액</div>
						<div class="right">
							<span class="total-price" id="total-price"><fmt:formatNumber value="${vo.totalprice + vo.totalprice*0.1 }" pattern="#,###" /></span>
							<span>원</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- 유의사항 -->
		<div class="caution">
			<strong>유의사항</strong>
			
			<ul>
				<li>사용자간의 컨텐츠 비용을 나눔을 할 수 있도록 지원해 드리고 있으며, 참여하신 서비스의 주체가 아닙니다.</li>
				<li>개별 공급자가 등록한 나눔 내용 및 거래에 대한 책임은 공급자가 부담하며, 이에 따라서 공급자가 진행하는 서비스에 대해서 어떠한 책임과 의무를 지지 않습니다.</li>
				<li>파티장 연락두절 및 이용불가능한 상태 방치 등에 의한 환불인 경우 벗츠에서 남은 기간에 대한 환불을 보장하며, 포인트로 환불 진행됩니다. (단 참여 후 3일이 경과되지 않았을 경우 지불했던 수단으로 100% 환불)</li>
			</ul>
			<p>※ 서비스 참여 중에 판매자의 실수를 비롯 하여 네트워크, 서비스 제공업체, 다른 파티원 등의 문제로 의도치 않는 문제가 발생 할 수 있습니다. 문제 발생 시 상호간 매너있는 대화 부탁드리며, 부적절한 언어 선택 시 이용제한 등의 조치가 진행 될 수 있습니다.</p>
		</div>
		
		<!-- 주문버튼 -->
		<div class="pay-btn">
			<input type="button" value="주문하기" id="pay-btn" class="pay-btn-submit">
			<input type="button" value="취소" onclick="history.back(-1);" class="pay-btn-back">
		</div>
	</form>
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/payment/payservice.js"></script>
	<script type="text/javascript" src="/resources/js/payment/orderform.js"></script>
</body>
</html>
