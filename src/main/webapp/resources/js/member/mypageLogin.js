document.querySelector("#mypageLogin_button").addEventListener('click', ()=>{
	document.getElementById("mypageLogin_form").action = '/member/modifyForm';
	document.getElementById("mypageLogin_form").submit();
});