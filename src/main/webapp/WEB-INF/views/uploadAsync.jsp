<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>uploadAsync</title>
</head>
<body>
	<div class="uploadDiv">
		<input type="file" name="uploadFile" multiple="multiple">
	</div>
	
	<button id="uploadBtn">Upload</button>
	
	<!-- 리스트 목록을 바인딩 되도록 한다. -->
	<div class="uploadResult">
		<ul></ul>
	</div>
</body>
<script type="text/javascript" src="/resources/js/upload.js"></script>
</html>