<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/admin/partymodify.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">파티 수정</h1>
        </div>
        
        <div id="form-container">
			<form id="registerform" method="post">
				<table id="registertable">
					<tr>
						<th>서비스</th>
						<td>
							<select id="primary-category" name="codeone" class="form-select" aria-label="Default select example">
								<option value="0" selected>기본 분류 선택</option>
							    <option value="10" ${vo.codeone == '10' ? 'selected' : ''}>영상</option>
							    <option value="20" ${vo.codeone == '20' ? 'selected' : ''}>도서/음악</option>
							    <option value="30" ${vo.codeone == '30' ? 'selected' : ''}>게임</option>
							    <option value="40" ${vo.codeone == '40' ? 'selected' : ''}>기타</option>
							</select>
							<select id="secondary-category" name="codetwo" class="form-select" aria-label="Default select example">
							</select>
						</td>
					</tr>
					<tr>
						<th>제목</th>
						<td><input class="form-control" type="text" name="title" placeholder="제목을 입력해주세요." value="${vo.title }" aria-label="default input example"></td>
					</tr>
					<tr>
						<th>모집인원</th>
						<td>
							<select id="secondary-category" name="party_num" class="form-select" aria-label="Default select example">
							  <option selected>본인제외</option>
							  <option value="0" ${vo.party_num == '0' ? 'selected' : ''}>0</option>
							  <option value="1" ${vo.party_num == '1' ? 'selected' : ''}>1</option>
							  <option value="2" ${vo.party_num == '2' ? 'selected' : ''}>2</option>
							  <option value="3" ${vo.party_num == '3' ? 'selected' : ''}>3</option>
							  <option value="4" ${vo.party_num == '4' ? 'selected' : ''}>4</option>
							  <option value="5" ${vo.party_num == '5' ? 'selected' : ''}>5</option>
							  <option value="6" ${vo.party_num == '6' ? 'selected' : ''}>6</option>
							  <option value="7" ${vo.party_num == '7' ? 'selected' : ''}>7</option>
							  <option value="8" ${vo.party_num == '8' ? 'selected' : ''}>8</option>
							</select>
							명
						</td>
					</tr>
					<tr>
						<th>공유계정</th>
						<td>
							<input class="form-control" type="text" name="share_id" placeholder="계정 아이디(이메일)" value="${vo.share_id}" aria-label="default input example">
							<input class="form-control" type="text" name="share_pw" placeholder="계정 비밀번호" value="${vo.share_pw}" aria-label="default input example">
						</td>
					</tr>
					<tr>
						<th>연락처(문의처)</th>
						<td>
							<input class="form-control" type="text" name="phone" placeholder="전화번호" value="${vo.phone }" aria-label="default input example">
						</td>
					</tr>
					<tr>
						<th>진행기간</th>
						<td>
							<input class="form-control" type="text" name="start_date" value="${vo.start_date }" aria-label="default input example" disabled="disabled"> ~ 
							<input class="form-control" type="date" name="end_date" value="${vo.end_date }" aria-label="default input example">
							<input type="button" id="periodCheck" value="기간 확인">
							<span id="periodCheckResult"></span>
						</td>
					</tr>
					<tr>
						<th>참여금액</th>
						<td>
							1인 당 1일 <input class="form-control" type="text" name="price" value="${vo.price }" maxlength='4' aria-label="default input example"> 원 
							<input type="button" id="priceCheck" value="예상 수령 금액 확인">
							<span id="totalpriceResult"></span>
						</td>
					</tr>
					<tr>
						<th id="checkRule" checkRule="${vo.rule }">기본규칙</th>
						<td style="padding-left: 23px;">
							<input class="form-check-input" type="checkbox" name="rule" value="19세 이상" id="rulecheck0">
							<label class="form-check-label" for="rulecheck0"> 19세 이상</label>
							
							<input class="form-check-input" type="checkbox" name="rule" value="1인 1회선" id="rulecheck1">
							<label class="form-check-label" for="rulecheck1"> 1인 1회선</label>
							
							<input class="form-check-input" type="checkbox" name="rule" value="공유 금지" id="rulecheck2">
							<label class="form-check-label" for="rulecheck2"> 공유 금지</label>
							
							<input class="form-check-input" type="checkbox" name="rule" value="설정 임의변경 불가" id="rulecheck3">
							<label class="form-check-label" for="rulecheck3"> 설정 임의변경 불가</label>
							
							<input class="form-check-input" type="checkbox" name="rule" value="프로필 매너 준수" id="rulecheck4">
							<label class="form-check-label" for="rulecheck4"> 프로필 매너 준수</label>
							
							<input class="form-check-input" type="checkbox" name="rule" value="계정양도 불가" id="rulecheck5">
							<label class="form-check-label" for="rulecheck5"> 계정양도 불가</label>
							
							<input class="form-check-input" type="checkbox" name="rule" value="개인사정 환불 불가" id="rulecheck6">
							<label class="form-check-label" for="rulecheck6"> 개인사정 환불 불가</label>
							
							<input class="form-check-input" type="checkbox" name="rule" value="위반 시 강제 조치" id="rulecheck7">
							<label class="form-check-label" for="rulecheck7"> 위반 시 강제 조치</label>
						</td>
					</tr>
					<tr>
						<th>공지사항 입력</th>
						<td>
						  <textarea class="form-control" name="comment">${vo.comment }</textarea>
						</td>
					</tr>
					<tr>
						<td id="registerBtn" colspan="2">
							<input type="hidden" name="p_idx" value="${vo.p_idx }">	
							<input type="hidden" name="m_idx" value="${vo.m_idx }">	
							<input type="hidden" name="name" value="${vo.name }">	
							<input type="hidden" name="nickname" value="${vo.nickname }">	
							<input type="hidden" name="id" value="${vo.id }">
							
							<input type="button" id="myPartyModify" value="수정">
							<input type="button" id="myPartyList" value="목록">
						</td>
					</tr>
				</table>
			</form>
		</div>
	
	</div>
	
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/admin/partymodify.js"></script>
<script type="text/javascript">
	var codetwo = "${vo.codetwo}";
</script>
</html>