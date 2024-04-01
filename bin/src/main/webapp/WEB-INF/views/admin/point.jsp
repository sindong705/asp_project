<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>포인트 관리(관리자)</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/admin/point.css">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">포인트 관리</h1>
        </div>
		
		<div>			
			<select id="category" class="form-select" aria-label="Default select example">
			  <option value="all" selected>전체</option>
			  <option value="join">회원가입</option>
			  <option value="payment">결제</option>
			  <option value="paymentCancel">결제취소</option>
			  <option value="refund">환불</option>
			  <option value="etc">기타</option>
			</select>		
				
			<select id="detailSearch" class="form-select" aria-label="Default select example">
			  <option value="all" selected>전체</option>
			  <option value="id">아이디</option>
			  <option value="name">이름</option>
			</select>
						
			<input class="form-control" type="text" id="searchword" aria-label="default input example">			
			<input type="button" id="search" value="검색">
			<input type="button" id="reset" value="초기화">
			<input type="button" id="registerOpen" value="포인트 관리" style="display: inline-block;">
			<div id="registerContainer" class="hidden">
		        <div id="registerContent" class="modal-window">
					<div class="close-area">Ⅹ</div>
		        	<input type="hidden" id="modalMidx" value="">
		            <div class="title">
		                <h5><span>포인트</span> 관리</h5>
		            </div>
		            <div class="content">
		                <table>
		                	<tr>
		                		<td class="center">회원아이디 : <span class="subject" id="id"></span></td>
		                	</tr>
		                	<tr>
		                		<td class="center">이름 : <span class="subject" id="name"></span></td>
		                	</tr>
		                	<tr>
		                		<td class="center">보유 포인트 : <span class="subject" id="after_point"></span></td>
		                	</tr>
		                	<tr>
		                		<td class="center">내용 : <select class="form-category" id="categoryPop" name="categoryPop" aria-label="Default select example"  onchange="category()">
								  <option value="join">회원가입</option>
								  <option value="payment">결제</option>
								  <option value="refund">환불</option>
								  <option value="etc">기타</option></select>
								  <input type="text" id="contentDetail" class="etc" style="display: none;"/>
		                	</tr>	
		                	<tr>
		                		<td class="center">수정 포인트 : <input type="tel" id="update_point" /></td>
		                	</tr>	                	
							<tr>
								<td class="center">
									<button id="registerSubmit">수정</button><button id="registerClose">취소</button>
								</td>
							</tr>
		                </table>
		            </div>
		        </div>
		    </div>			
		</div>
		
		<div id="pointlist">
			<table>
				<thead>
					<tr>
						<th>관리</th>
						<th>아이디</th>
						<th>이름</th>
						<th>내용</th>
						<th>포인트</th>
						<th>기존 포인트</th>
						<th>최종 포인트</th>
						<th>등록일</th>
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
	</div>
	
	
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/admin/point.js"></script>
</html>