<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/partner/manage.css">
<link rel="stylesheet" href="/resources/css/partner/replymanage.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
	<jsp:include page="../layout/partner_header.jsp"/>
	
	<div id="content-container">
		<div id="service-container">
	
			<h3 id="party-tab-title">댓글 보기</h3>
			
			<div id="partylist">
				<table>
					<thead>
						<tr>
							<th class="colwidth">문의자</th>
							<th class="datecolwidth">작성일</th>
							<th class="titlecolwidth">제목</th>
							<th>댓글</th>
							<th class="colwidth">답변</th>
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
	
	
	<!-- 모달 창 -->
	<div id="modal" class="modal-overlay">
        <div class="modal-window">
        	<div class="close-area">Ⅹ</div>
            <div class="title">
                <h5><span class="writer"></span> 님의 댓글</h5>
            </div>
            <div class="content">
                <table>
                	<tr>
                		<td class="center">파티 제목</td>
                		<td id="title"></td>
                	</tr>
                	<tr>
                		<td class="center">댓글</td>
                		<td id="comment"></td>
                	</tr>
                </table>
            </div>
            
            <div class="title">
                <h5><span>답변</span> 작성</h5>
            </div>
            <div class="content">
            	<form method="post">
	            	<table>
	                	<tr>
	                		<td><textarea class="form-control" name="comment"></textarea></td>
	                	</tr>
	                </table>
            		<div id="checkbtn">
						<input class="form-check-input" type="checkbox" name="private_chk" value="Y" id="private">
						<label class="form-check-label" for="private"> 비밀글</label>
	            		<input type="button" id="answerRegister" value="등록">
            		</div>
            		<input type="hidden" name="p_idx" value="">
            		<input type="hidden" name="comment_to" value="">
            	</form>
            </div>
        </div>
    </div>
    
    <jsp:include page="../layout/partner_footer.jsp"/>
    
</body>
<script type="text/javascript" src="/resources/js/shop/partyreply.js"></script>
<script type="text/javascript" src="/resources/js/partner/replymanage.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
</html>