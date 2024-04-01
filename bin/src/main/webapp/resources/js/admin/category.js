window.onload = function(){
	let pageData = getStorageData();
	
	radioEvent();
	
	if(pageData == null){
		setStorageData('category', null, null, null, 10, null, null);
		getList(10);
	}else{
		document.querySelectorAll(".radio div input[type='radio']").forEach(rb => {
			if(rb.value == pageData.category)
				rb.checked = true;
		})
		
		getList(pageData.category);
	}
}

//1차 카테고리 라디오버튼
function radioEvent(){
	document.querySelectorAll(".radio div").forEach(rb => {
		rb.addEventListener('click', ()=>{
			if(rb.querySelector('input[type="radio"]').value == 10)
				setStorageData('category', null, null, null, 10, null, null);
			else if(rb.querySelector('input[type="radio"]').value == 20)
				setStorageData('category', null, null, null, 20, null, null);
			else if(rb.querySelector('input[type="radio"]').value == 30)
				setStorageData('category', null, null, null, 30, null, null);
			else
				setStorageData('category', null, null, null, 40, null, null);
			getList(rb.querySelector('input[type="radio"]').value);
		})
	})
}

//list
function getList(codeone){
	let msg = "";
	
	fetch('/admin/allsecondcategory', {
		method : 'post',
		body : codeone,
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		json.forEach(vo => {
			msg += '<tr>';
			msg += '<td>' + vo.c_primary + '</td>';
			msg += '<td>' + vo.codeone + '</td>';
			msg += '<td>' + vo.c_secondary + '</td>';
			msg += '<td>' + vo.codetwo + '</td>';
			msg += '<td>';
			msg += '<div class="form-check form-switch" style="padding-left: 40px;">';
			if(vo.status == 'Y')
				msg += '<input class="form-check-input" type="checkbox" role="switch" id="activateSwitch" onclick="switchEvent(\'' + vo.codeone + '\', \'' + vo.codetwo + '\', \'' + vo.status + '\')" checked>';
			else
				msg += '<input class="form-check-input" type="checkbox" role="switch" id="activateSwitch" onclick="switchEvent(\'' + vo.codeone + '\', \'' + vo.codetwo + '\', \'' + vo.status + '\')">';
			msg += '</div></td>';
			msg += '</tr>';
		})
		
		document.querySelector("tbody").innerHTML = msg;
	})
	.catch(err => console.log(err));
}

//카테고리 추가
let f = document.forms[1];

f.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

document.querySelector("#addBtn").addEventListener('click', ()=>{
	let pageData = getStorageData();
	
	if(f.c_primary.value == 0){
		alert('1차 카테고리를 선택해주세요.');
		return;
	}
	
	if(f.c_secondary.value==''){
		alert('추가할 플랫폼 명을 입력해주세요.');
		return;
	}
	
	fetch('/admin/checkcategory',{
		method : 'post',
		body : JSON.stringify({
			c_primary : f.c_primary.value,
			c_secondary : f.c_secondary.value
		}),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		if(json > 0){
			alert('이미 존재하는 플랫폼입니다.');
			f.c_secondary.value = '';
		}else{
			addCategory();
			location.href = '/admin/category';
		}
	})
	.catch(err => console.log(err));
})

function addCategory(){
	if(f.c_primary.value == '영상'){
		f.codeone.value=10;
	}else if(f.c_primary.value == '도서/음악'){
		f.codeone.value=20;
	}else if(f.c_primary.value == '게임'){
		f.codeone.value=30;
	}else{
		f.codeone.value=40;
	}
	
	fetch('/admin/addcategory',{
		method : 'post',
		body : JSON.stringify({
			codeone : f.codeone.value,
			c_primary : f.c_primary.value,
			c_secondary : f.c_secondary.value
		}),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		if(json > 0){
			alert('카테고리 추가 완료되었습니다.');
		}
	})
	.catch(err => console.log(err));
}

function switchEvent(codeone, codetwo, status){
	let pageData = getStorageData();
	
	if(status == 'Y'){
		if(confirm('카테고리를 비활성화 하시겠습니까?')){
			fetch('/admin/categorystatus',{
				method : 'post',
				body : JSON.stringify({
					codeone : codeone,
					codetwo : codetwo,
					status : status
				}),
				headers : {'Content-type' : 'application/json; charset=utf-8'}
			})
			.then(response => response.text())
			.then(data => {
				if(data == 'success'){
					alert('해당 카테고리가 비활성화 되었습니다.');
				}
				
				getList(pageData.category);
			})
			.catch(err => console.log(err));
		}else{
			getList(pageData.category);
		}
	}else{
		if(confirm('카테고리를 활성화 하시겠습니까?')){
			fetch('/admin/categorystatus',{
				method : 'post',
				body : JSON.stringify({
					codeone : codeone,
					codetwo : codetwo,
					status : status
				}),
				headers : {'Content-type' : 'application/json; charset=utf-8'}
			})
			.then(response => response.text())
			.then(data => {
				if(data == 'success'){
					alert('해당 카테고리가 활성화 되었습니다.');
				}
				
				getList(pageData.category);
			})
			.catch(err => console.log(err));
		}else{
			getList(pageData.category);
		}
	}
}