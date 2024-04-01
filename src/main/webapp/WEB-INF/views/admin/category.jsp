<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/admin/category.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">카테고리 관리</h1>
        </div>
        
        <div class="radio">
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="10" checked>
			  <label class="form-check-label" for="inlineRadio1">영상</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="20">
			  <label class="form-check-label" for="inlineRadio2">도서/음악</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="30">
			  <label class="form-check-label" for="inlineRadio3">게임</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="40">
			  <label class="form-check-label" for="inlineRadio4">기타</label>
			</div>
		</div>
		
		<div id="categorylist">
			<table>
				<thead>
					<tr>
						<th style="width: 130px">1차 카테고리</th>
						<th style="width: 70px">CODE</th>
						<th style="width: 130px">2차 카테고리</th>
						<th style="width: 70px">CODE</th>
						<th style="width: 100px;">상태 변경</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
		
		<div id="addCategory">
			<span style="font-size: 18px; font-weight: 600;">카테고리 추가</span>
			<form method="post">
				<table>
				<tr>
					<td>1차 카테고리 선택</td>
					<td>
						<select id="primary-category" name="c_primary" class="form-select" aria-label="Default select example">
							<option value="0" selected>1차 카테고리 선택</option>
						    <option value="영상">영상</option>
						    <option value="도서/음악">도서/음악</option>
						    <option value="게임">게임</option>
						    <option value="기타">기타</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>2차 카테고리 명</td>
					<td>
						<input class="form-control" type="text" id="c_secondary" name="c_secondary" placeholder="추가할 플랫폼 명을 입력하세요." aria-label="default input example">
					</td>
				</tr>
				<tr>
					<td colspan="2" style="text-align: right">
						<input type="hidden" name="codeone" value="">
						<input type="button" id="addBtn" value="추가">
					</td>
				</tr>
				</table>
			</form>
			
		</div>
		
	</div>
	
	<jsp:include page="../layout/admin_footer.jsp"/>
	
</body>
<script type="text/javascript" src="/resources/js/admin/category.js"></script>
</html>