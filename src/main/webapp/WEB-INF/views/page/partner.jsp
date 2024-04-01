<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>파트너 신청</title>
<link rel="stylesheet" href="/resources/css/page/page.css">
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<div class="page-wrap">
		<div class="page-content" style="padding-top: 105px;">
			<form method="POST">
				<div class="application" style="border-top: 2px solid #43a051">
					<sec:authentication property="principal" var="principal"/>
					<div class="app-title"><span class="title-point">파트너</span> 신청</div>
					
					<div class="app-body" style="padding-top: 30px; border-top: 1px solid #333">
						<ul class="app-form">
							<li><label>* 파티모집시 수수료 10%부과 됩니다.</label></li>
							<li>
								<span class="subject">ㆍ 이름</span>
								<input type="text" name="name" id="name" placeholder="이름" style="width: 100%; max-width: 200px" readonly="readonly" value="${principal.member.name }" >
							</li>
							<li>
								<span class="subject">ㆍ 연락처</span>
								<input type="text" name="phone" id="phone" placeholder="연락처를 입력해 주세요." style="width: 100%; max-width: 200px" readonly="readonly" value="${principal.member.phone }" >
							</li>
										
							<li>
								<span class="subject">ㆍ 출금계좌</span>
								<select name="bank" style="width: 100%; max-width: 200px; margin-bottom: 2px;">
									<option value="">은행을 선택해 주세요.</option>
										<option value="국민은행" >국민은행</option>
										<option value="기업은행" >기업은행</option>
										<option value="농협은행" >농협은행</option>
										<option value="신한은행" >신한은행</option>
										<option value="산업은행" >산업은행</option>
										<option value="우리은행" >우리은행</option>
										<option value="한국씨티은행" >한국씨티은행</option>
										<option value="하나은행" >하나은행</option>
										<option value="SC제일은행" >SC제일은행</option>
										<option value="경남은행" >경남은행</option>
										<option value="광주은행" >광주은행</option>
										<option value="대구은행" >대구은행</option>
										<option value="부산은행" >부산은행</option>
										<option value="저축은행" >저축은행</option>
										<option value="수협은행" >수협은행</option>
										<option value="우체국" >우체국</option>
										<option value="전북은행" >전북은행</option>
										<option value="제주은행" >제주은행</option>
										<option value="카카오뱅크" >카카오뱅크</option>
										<option value="케이뱅크" >케이뱅크</option>		
										<option value="토스뱅크" >토스뱅크</option>				
								</select>
								<input type="text" name="bank_number" id="bank_number" style="width: 100%; max-width: 200px;" placeholder="계좌번호를 입력해 주세요.">
							</li>
						</ul>
						<div class="caution">
							<ul>
								<li>파티(상품)관리 권한 및 관리 책임은 판매자에게 있습니다.</li>
								<br>
								<li>판매자 귀책사유로 분쟁이 발생된 경우 해결해야 할 책임이 있으며,<br>분쟁이 지속 되는 경우 정책에 따라 진행됩니다.</li>
								<br>
								<li>판매자는 파티모집 후 약속된 기간동안 파티를 유지 및 관리를 진행할 의무가 있으며,<br />해당 의무를 다하지 못함으로서써 발생된 이슈 및 분쟁에 대해서 해결 해야할 책임이 있습니다.</li>
								<br>
								<li>파티장은 파티원 모집 시 10%의 판매 수수료가 발생되며, 출금시 차감되어 출금됩니다.<br>(수수료 10%에 대해서는 세금계산서가 발행 됩니다.)<br></li>
								<br>
								<li>출금 신청 시 입력 된 계좌로 출금되며, 인증 된 실명과 다를 경우 출금이 안됩니다.</li>
								<br>
								<li>해당 사이트는 통신판매 중개자이며, 통신판매 당사자가 아닙니다.</li>
							</ul>
						</div>
						<div class="input-check" style="margin-top: 10px">
							<input type="checkbox" name="agree" value="1" id="agree">
							<label for="agree">서비스 제공자의 가입약관과 상기 정보제공에 동의합니다.</label>
						</div>
					</div>
					<div class="app-button">
						<button type="button" onclick="appPartner(this.form)">파트너 신청</button>
					</div>
				</div>
			</form>
		</div>
	</div>

	<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/member/partner.js"></script>
</html>