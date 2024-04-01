//form
let f = document.querySelector("#registerform");

//faq 등록
document.querySelector("#faqModify").addEventListener('click', () => {
	if(f.faq_type.value == ''){
		alert('질문 유형을 선택하세요.');
		f.faq_type.focus();
		return;
	}
	
	if(f.title.value == ''){
		alert('제목을 입력하세요.');
		f.title.focus();
		return;
	}
	
	if(f.content.value == ''){
		alert('내용을 입력하세요.');
		f.content.focus();
		return;
	}
	
	f.action = '/admin/faq/modify';
	f.submit();
})


//faq 목록
document.querySelector("#faqList").addEventListener('click', ()=>{
	location.href = '/admin/faq/faqlist';
})