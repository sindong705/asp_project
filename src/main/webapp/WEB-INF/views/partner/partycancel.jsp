<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>partyinfo</title>
<link rel="stylesheet" href="/resources/css/partner/manage.css">
</head>
<body>
	<jsp:include page="../layout/partner_header.jsp"/>
	
	<div id="content-container">
		<div id="service-container">
		
			<h3 id="party-tab-title">취소내역</h3>
		
			<div id="party-search">
				<form>
					<select id="detailSearch" class="form-select" aria-label="Default select example">
					  <option value="p_idx" selected>파티번호</option>
					  <option value="name">구매자</option>
					  <option value="id">ID</option>
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
							<th width="200">판매일</th>
							<th>파티번호</th>
							<th width="200">서비스명</th>
							<th>구매자</th>
							<th>상태</th>
							<th>남은기간</th>
							<th>서비스금액</th>
							<th>수수료</th>
							<th>총 판매금액</th>
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
	<script type="text/javascript" src="/resources/js/partner/partycancel.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
</body>
</html>