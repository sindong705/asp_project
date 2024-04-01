<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>환불관리</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/admin/member.css">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">환불 관리</h1>
        </div>
        
        <div class="radio">
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="all" checked>
			  <label class="form-check-label" for="inlineRadio1">전체</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="A">
			  <label class="form-check-label" for="inlineRadio2">신청</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="B">
			  <label class="form-check-label" for="inlineRadio3">승인</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="C">
			  <label class="form-check-label" for="inlineRadio4">반려</label>
			</div>
		</div>
		
		<div>
			<select id="detailSearch" class="form-select" aria-label="Default select example">
			  <option value="id">아이디</option>
			  <option value="name">이름</option>
			  <option value="order_no">주문번호</option>
			  <option value="p_idx">파티번호</option>
			</select>
			
			<input class="form-control" type="text" id="searchword" aria-label="default input example">
			
			<input type="button" id="search" value="검색">
			<input type="button" id="reset" value="초기화">
		</div>
		
		<div id="refundlist">
			<table>
				<thead>
					<tr>
						<th style="width:230px">신청일</th>
						<th style="width:230px">처리일</th>
						<th style="width:180px">이름(아이디)</th>
						<th style="width:200px">주문번호</th>
						<th style="width:200px">파티번호</th>
						<th style="width:150px">결제금액</th>
						<th style="width:150px">환불금액</th>
						<th style="width:120px">현재상태</th>
						<th style="width:120px">관리</th>
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
		
		<!-- 모달 창 -->
	<div id="modal" class="modal-overlay">
        <div class="modal-window">
        	<div class="close-area">Ⅹ</div>
            <div class="modaltitle">
                <h5>환불 신청 내용</h5>
            </div>
            <div class="content">
            	<form method="post">
	                <table>
	                	<tr>
	                		<td class="center">이름(아이디)</td>
	                		<td id="name"></td>
	                	</tr>
	                	<tr>
	                		<td class="center">환불금액</td>
	                		<td id="re_amount"></td>
	                	</tr>
	                	<tr>
	                		<td class="center">환불신청 사유</td>
	                		<td id="reason"></td>
	                	</tr>
	                	<tr>
	                		<td class="center">반려 사유</td>
	                		<td id="rejection"><textarea class="form-control" name="rejection" id="floatingTextarea2" style="height: 100px; font-size:13px; resize: none;"></textarea></td>
	                	</tr>
	                	<tr>
	                		<td class="center" colspan="2" style="text-align: right; font-size:13px; color:gray; padding-left: 15px;">
	                			<input type="hidden" name="r_idx" value="">
	                			<input type="hidden" name="order_no" value="">
	                			<input type="hidden" name="m_idx" value="">
	                			<input type="hidden" name="id" value="">
	                			<input type="hidden" name="name" value="">
	                			<input type="hidden" name="re_amount" value="">
	                			<input type="hidden" name="re_status" value="">
	                			<input type="hidden" name="p_idx" value="">
								<input type="button" id="approval" value="승인">
								<input type="button" id="return" value="반려">
							</td>
	                	</tr>
	                </table>
                </form>
            </div>
        </div>
	</div>
	
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/admin/refund.js"></script>
</html>