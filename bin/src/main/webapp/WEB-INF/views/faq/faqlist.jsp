<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>FAQ</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/faq/faqlist.css">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">FAQ</h1>
        </div>
        
        <div class="radio">
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="faq_type" id="faq_type1" value="" checked>
			  <label class="form-check-label" for="faq_type1">전체</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="faq_type" id="faq_type2" value="A">
			  <label class="form-check-label" for="faq_type2">이용안내</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="faq_type" id="faq_type3" value="B">
			  <label class="form-check-label" for="faq_type3">파티문의</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="faq_type" id="faq_type4" value="C">
			  <label class="form-check-label" for="faq_type4">회원가입 및 정보</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="faq_type" id="faq_type5" value="D">
			  <label class="form-check-label" for="faq_type5">입출금 및 환불</label>
			</div>
			<div style="float: right;">
				<a href="/admin/faq/register" class="faqRegister">등록</a>
			</div>
		</div>
		
		<div id="faqlist">
			<table>
				<thead>
					<tr>
						<th>질문유형</th>
						<th>작성자</th>
						<th>제목</th>
						<th>등록일</th>
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
	
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/faq/faqlist.js"></script>
</html>