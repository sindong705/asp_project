<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>알림</title>
<link rel="stylesheet" href="/resources/css/shop/alarm.css">
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<div class="title-div">
		<div class="title">알림</div>
	</div>
	
	<div>
		<table>
			<thead>
				<tr>
					<td style="padding-left: 30px; font-size: 14px;"><input type="checkbox" id="selectAll"></td>
					<td colspan="2" style="text-align: right">
						<button id="allCheck">읽음</button>
						<button id="checkdelete" onclick="deleteNotifications()">삭제</button>
					</td>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
	
	<button id="load-more-btn">더 보기</button>

	<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/shop/alarmlist.js"></script>
</html>