const regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");	// 정규식
const MAX_SIZE = 5242880;								// 내파일 올릴때 사이즈의 제한 ( 5MB.. 1024로 나누면 된다. )

// 업로드 파일 리스트 관련 요소
const uploadDiv = document.querySelector(".uploadDiv");		
let cloneObj = uploadDiv.firstElementChild.cloneNode(true); 

// --------------------- modify.jsp 부분에서 적용된다. -------------------

function checkExtenstion(fileName, fileSize) {
	if(fileSize >= MAX_SIZE) {
		alert("파일 크기가 초과 되었습니다.");
		return false;
	}
	
	if(regex.test(fileName)) {
		alert("해당 종류의 파일은 업로드 할 수 없습니다.");
		return false;
	}
	return true;
}


document.querySelector("input[type='file']").addEventListener('change', () =>{
	const formData = new FormData();
	const inputFile = document.querySelector('input[type="file"]');
	const files = inputFile.files;
	
	for(let i=0; i<files.length; i++) {
		
		if(!checkExtenstion(files[i].name, files[i].size)) {
			return false;			// 이름이나, 데이터가 없을때 리턴
		}
		formData.append("uploadFile", files[i]);
	}
	
	fetch('/uploadAsyncAction', 
			{
				method : 'post',
				body : formData
			}
		)
		.then( response => response.json() )
		.then( json => {
			
			showUploadedFile(json);
		})
		.catch( err => {
			console.log('err : ' + err );
		});
});

const uploadResult = document.querySelector(".uploadResult ul");
function showUploadedFile(uploadResultArr) {
	
	if(!uploadResultArr || uploadResultArr.length==0){return;}
	
	let msg = '';
	
	uploadResultArr.forEach( file => {
		
		let fileCallPath =
			encodeURIComponent(file.uploadPath + "/" + file.uuid + "_" + file.fileName);
		
		msg += '<li path="'+file.uploadPath+'" uuid="'+ file.uuid +'" fileName="' + file.fileName+'">';		// 동적으로 바인딩
		msg += 		'<a>' + file.fileName  + '</a>';
		msg += 		'<span data-file="' + fileCallPath + '" style="cursor: pointer;"> X </span>';
		msg += '</li>';
		
	});
	uploadResult.innerHTML = msg;
	
}
/*
uploadResult.addEventListener('click', function(e) {
	
	if(e.target.tagName === 'SPAN') {
		
		let targetFile = e.target.getAttribute("data-file");
		console.log(targetFile);
		
		fetch('/deleteFile',
			{
				method : 'post',
				body : targetFile,
				headers : {'content-type' : 'text/plain'}
			}
		)
		.then( response => response.text()) 
		.then( data => {
			console.log(data);
			
			let targetLi = e.target.closest('li');
			targetLi.parentNode.removeChild(targetLi);
			
		})
		.catch( err => {
			console.log('err : ' + err);
		});
		
	}
}); */

/*
uploadResult.addEventListener('click', function(e) {
	
	if(e.target.tagName === 'SPAN') {
		
		let targetFile = e.target.getAttribute("data-file");
		console.log(targetFile);
		
		fetch('/deleteFile',
			{
				method : 'post',
				body : targetFile,
				headers : {'content-type' : 'text/plain'}
			}
		)
		.then( response => response.text()) 
		.then( data => {
			console.log(data);
			
			let targetLi = e.target.closest('li');
			targetLi.parentNode.removeChild(targetLi);
			
		})
		.catch( err => {
			console.log('err : ' + err);
		});
		
	}
}); */












