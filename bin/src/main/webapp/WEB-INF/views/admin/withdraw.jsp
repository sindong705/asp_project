<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>관리자 출금 관리</title>
</head>
<body>

	<jsp:include page="../layout/admin_header.jsp"/>
	
	<sec:authentication property="principal" var="principal"/>
	
	<div id="content-container">
		<div id="service-container">
			<div>
				<h3 id="withdraw-tab-title">관리자 출금 관리</h3>
			</div>
			<div id="withdraw-search">
				<form method="post" id="withdrawform">
			        <div class="radio">
						<div class="form-check form-check-inline">
						  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="all" checked>
						  <label class="form-check-label" for="inlineRadio1">전체</label>
						</div>
						<div class="form-check form-check-inline">
						  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="approval">
						  <label class="form-check-label" for="inlineRadio2">신청</label>
						</div>
						<div class="form-check form-check-inline">
						  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="application">
						  <label class="form-check-label" for="inlineRadio3">승인</label>
						</div>
						<div class="form-check form-check-inline">
						  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="Companion">
						  <label class="form-check-label" for="inlineRadio4">반려</label>
						</div>
					</div>

					<input type="hidden" name="id" value="${principal.member.id}">
					<input type="hidden" name="with_status" value="${vo.with_status }">
					<input type="hidden" name="m_idx" value="${vo.m_idx }">
				</form>		
			</div>
			
			<div id="withdrawlist">		
				<table>
					<thead>
						<tr>
							<th>출금상태</th>
							<th>접수번호(NO.)</th>
							<th>신청일</th>
							<th>출금방법</th>
							<th>실지급액(출금액)</th>
							<th>비고(계좌번호)</th>
							<th>승인여부</th>					
						</tr>
					</thead>
					<tbody class="aa">
						
					</tbody>
				</table>
			</div>
			
			<!-- page -->
			<div class="page-wrap">
				<ul class="page-nation">
				
				</ul>
			</div>
			
		</div>
	</div>
	
	
	
	
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/admin/withdraw.js"></script>
</html>