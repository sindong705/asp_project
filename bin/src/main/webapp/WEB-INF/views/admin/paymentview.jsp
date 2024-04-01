<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>결제관리</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/admin/paymentview.css">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">결제 상세 내역</h1>
        </div>
        
        <!-- 결제 정보 -->
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
						<div class="subject">결제번호</div>
						<div class="right">${vo.order_no }</div>
					</li>
					<li>
						<div class="subject">결제일시</div>
						<div class="right">${vo.approved_at }</div>
					</li>
					<li>
						<div class="subject">결제방식</div>
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
						<div class="subject">이름</div>
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
						<div class="subject">판매가</div>
						<div class="right" id="payprice"></div>
					</li>
					<li>
						<div class="subject">수수료(10%)</div>
						<div class="right" id="paycommission"></div>
					</li>
					<li>
						<div class="subject">사용 포인트</div>
						<div class="right"><fmt:formatNumber value="${vo.point }"/>P</div>
					</li>
					<li>
						<div class="subject">총 합계</div>
						<div class="right" id="paysum"></div>
					</li>
					<li>
						<div class="subject">환불금액</div>
						<div class="right">${vo.refund_amount }원</div>
					</li>
					<li class="total">
						<div class="subject" style="font-weight: 600; color: #006d77;">총 결제금액</div>
						<div class="right">
							<span class="total-price" id="paytotal"></span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- 목록버튼 -->
		<div class="pay-btn">
			<a href="/admin/paymentdetail" class="pay-btn-submit" style="display: inline-block;">확인</a>
		</div>
	</div>
	
	
	<jsp:include page="../layout/admin_footer.jsp"/>
	<script type="text/javascript" src="/resources/js/admin/paymentview.js"></script>
</body>
</html>