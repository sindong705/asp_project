<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>파티/판매 목록</title>
<link rel="stylesheet" href="/resources/css/partner/manage.css">
</head>
<body>
	<jsp:include page="../layout/partner_header.jsp"/>
	
	<div id="content-container">
		<div id="service-container">
	
			<h3 id="party-tab-title">파티/판매 목록</h3>
		
			<div id="party-search">
				<form>
					<select id="category" class="form-select" aria-label="Default select example">
					  <option value="all" selected>카테고리</option>
					</select>
					
					<select id="detailSearch" class="form-select" aria-label="Default select example">
					  <option value="p_idx" selected>파티번호</option>
					  <option value="title">파티제목</option>
					</select>
					
					<input class="form-control" type="text" id="searchword" placeholder="검색어를 입력하세요." aria-label="default input example">
					
					<input type="button" id="search" value="검색">
					<input type="button" id="makeparty" value="파티생성">
				</form>
			</div>
			
			<span id="sorttap">
				<a href="#" id="listbylatest" class="activeFont">최신순</a>
				<a href="#" id="listbyperiod" class="">남은기간순</a>
			</span>
			
			<div id="partylist">
				<table>
					<thead>
						<tr>
							<th>파티번호</th>
							<th>제목</th>
							<th>일 금액</th>
							<th>참여인원</th>
							<th>남은기간</th>
							<th>종료일</th>
							<th>파티생성일</th>
							<th>관리</th>
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
	</div>
	
	<jsp:include page="../layout/partner_footer.jsp"/>
	
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/partner/manage.js"></script>
</html>