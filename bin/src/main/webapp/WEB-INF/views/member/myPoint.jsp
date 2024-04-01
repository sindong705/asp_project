<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>나의 포인트 내역</title>
<link rel="stylesheet" href="/resources/css/member/myPoint.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<script type="text/javascript"	src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	<form method="post">
		<div class="title-div">
			<div class="title">나의 포인트 내역</div>
		</div>
		
		<div class="list-member mypoint-list">
			<table>
				<thead>
					<tr>
						<th>내용</th>
						<th>포인트</th>
						<th>기존포인트</th>
						<th>최종포인트</th>
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
	</form>
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/member/myPoint.js"></script>
</body>
</html>