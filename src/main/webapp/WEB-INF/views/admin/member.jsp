<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원관리</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/admin/member.css">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">회원 관리</h1>
        </div>
        
        <div class="radio">
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="all" checked>
			  <label class="form-check-label" for="inlineRadio1">전체</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="N">
			  <label class="form-check-label" for="inlineRadio2">활성</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Y">
			  <label class="form-check-label" for="inlineRadio3">비활성</label>
			</div>
		</div>
		
		<div>
			<select id="category" class="form-select" aria-label="Default select example">
			  <option value="all" selected>회원 등급</option>
			  <option value="A">관리자(A)</option>
			  <option value="B">파트너(B)</option>
			  <option value="C">일반(C)</option>
			</select>
			
			<select id="detailSearch" class="form-select" aria-label="Default select example">
			  <option value="m_idx" selected>회원번호</option>
			  <option value="id">아이디</option>
			  <option value="name">이름</option>
			  <option value="nickname">닉네임</option>
			</select>
			
			<input class="form-control" type="text" id="searchword" aria-label="default input example">
			
			<input type="button" id="search" value="검색">
			<input type="button" id="reset" value="초기화">
		</div>
		
		<div id="memberlist">
			<table>
				<thead>
					<tr>
						<th style="width:150px">회원번호</th>
						<th style="width:90px">등급</th>
						<th style="width:150px">이름</th>
						<th style="width:200px">아이디</th>
						<th style="width:200px">닉네임</th>
						<th style="width:200px">가입일</th>
						<th style="width:90px">비활성 여부</th>
						<th style="width:150px">관리</th>
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
<script type="text/javascript" src="/resources/js/admin/member.js"></script>
</html>