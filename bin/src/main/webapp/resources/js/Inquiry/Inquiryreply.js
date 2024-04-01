console.log("reply module...");

const replyService = (function() {
	
	// 1. 댓글 추가 함수
	function add(reply, callback) {
		
		fetch('/reply/new',
				{
					method : 'post',
					body : 	JSON.stringify(reply),	
					headers : {'Content-type' : 'application/json; charset=utf-8'}
				}
			)
			.then( response => response.text() )
			.then( data => {
			//console.log(data);
			callback(data);
		})
		.catch( err => console.log(err) );
	}
	
	// 2. 댓글 목록 함수
	function getList(i_idx, callback) {
		
		fetch('/reply/pages/' + i_idx)
			.then( response => response.json() )
			.then( json => {
				console.log(json);
				callback(json);
			})
			.catch( err => console.log(err) );
	}
	
	// 3. 댓글 삭제
	function remove(c_idx, callback) {  // writer,
		
		fetch('/reply/' + c_idx, 
			{
				method : 'delete',
				body : JSON.stringify(c_idx), // writer),
				headers : {'Content-type' : 'application/json; charset=utf-8'}
			}
		)
		.then( response => response.text() )
		.then( data => {
			console.log(data);
			callback(data);
		})
		.catch( err => console.log(err) );
	}
	
	// 4. 댓글 수정
	function update(reply, callback) {
		
		fetch('/reply/' + reply.c_idx,
			{
				method : 'put',
				body : JSON.stringify(reply),
				headers : {'Content-type' : 'application/json; charset=utf-8'}
			}	
		)
		.then( response => response.text() )
		.then( data => {
			console.log(data);
			callback(data);
		})
		.catch( err => console.log(err) );
	}
	
	// 5. 조회
	function get(c_idx, callback) {
		
		fetch('/reply' + c_idx + '.json')
		.then( response => response.json() )
		.then( json => {
			console.log(json);
			callback(json);
		})
		.catch( err => console.log(json));
	}
	
	return {
		add : add,
		getList : getList,
		remove : remove,
		update : update,
		get : get
	}
	
}) ();
