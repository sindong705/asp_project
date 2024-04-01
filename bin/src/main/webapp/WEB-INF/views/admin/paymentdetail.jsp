<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>결제관리</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/admin/paymentdetail.css">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">결제 관리</h1>
        </div>
        
        <div class="radio">
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="pay_status" id="pay_status1" value="all" checked>
			  <label class="form-check-label" for="pay_status1">전체</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="pay_status" id="pay_status2" value="B">
			  <label class="form-check-label" for="pay_status2">결제완료</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="pay_status" id="pay_status3" value="C">
			  <label class="form-check-label" for="pay_status3">환불신청</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="pay_status" id="pay_status4" value="D">
			  <label class="form-check-label" for="pay_status4">결제취소</label>
			</div>
		</div>
		
		<div>
			<select id="category" class="form-select" aria-label="Default select example">
			  <option value="all" selected>카테고리</option>
			</select>
			
			<select id="detailSearch" class="form-select" aria-label="Default select example">
			  <option value="order_no" selected>주문 번호</option>
			  <option value="p_idx">파티 번호</option>
			  <option value="sub_title">제목</option>
			  <option value="id">아이디</option>
			</select>
			
			<input class="form-control" type="text" id="searchword" aria-label="default input example">
			
			<input type="button" id="search" value="검색">
			<input type="button" id="reset" value="초기화">
		</div>
		
		<div id="partylist">
			<table>
				<thead>
					<tr>
						<th>주문번호</th>
						<th>파티번호</th>
						<th width="400">서비스명</th>
						<th>아이디</th>
						<th>결제자</th>
						<th>결제금액</th>
						<th>입금액</th>
						<th>포인트</th>
						<th>결제일</th>
						<th>현재상태</th>
						<th>상태변경</th>
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
<script type="text/javascript" src="/resources/js/payment/payservice.js"></script>
<script type="text/javascript" src="/resources/js/admin/paymentdetail.js"></script>
</html>