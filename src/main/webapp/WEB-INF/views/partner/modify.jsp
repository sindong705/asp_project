<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/partner/register.css">
</head>
<body>
	<jsp:include page="../layout/partner_header.jsp"/>
	
	<div id="content-container">
		<div id="service-container">
		
			<h3 id="party-tab-title">파티 수정</h3>
			
			<div id="form-container">
				<form id="registerform" method="post">
					<table id="registertable">
						<tr>
							<th>서비스</th>
							<td>
								<select id="primary-category" name="codeone" class="form-select" aria-label="Default select example" disabled="disabled">
									<option value="${vo.codeone }">${vo.c_primary }</option>
								</select>
								<select id="secondary-category" name="codetwo" class="form-select" aria-label="Default select example" disabled="disabled">
									<option value="${vo.codetwo }">${vo.c_secondary }</option>
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
								<select id="secondary-category" name="party_num" class="form-select" aria-label="Default select example" disabled="disabled">
									<option value="${vo.party_num }">${vo.party_num }</option>
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
								<input class="form-control" type="date" name="end_date" value="${vo.end_date }" aria-label="default input example" disabled="disabled">
								<span id="periodCheckResult"></span>
							</td>
						</tr>
						<tr>
							<th>참여금액</th>
							<td>
								1인 당 1일 <input class="form-control" type="text" name="price"  maxlength='4' value="${vo.price }" aria-label="default input example" disabled="disabled"> 원 
								<span id="totalpriceResult"></span>
							</td>
						</tr>
						<tr>
							<th id="checkRule" checkRule="${vo.rule }">기본규칙</th>
							<td>
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
							<th></th>
							<td>
								 ※ 서비스, 모집인원, 진행기간, 참여금액은 변경 불가합니다.<br>
								 ※ 해당 내용을 변경하시고 싶은 경우 파티 삭제 후 재생성 해주세요.(파티원 1명 이상일 시, 파티 삭제 불가)<br>
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
	</div>

</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/partner/modify.js"></script>
</html>