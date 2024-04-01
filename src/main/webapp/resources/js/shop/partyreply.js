const replyService = (function(){
	function add(reply, callback){
		fetch('/partyreply/new', {
			method : 'post',
			body : JSON.stringify(reply),
			headers : {'Content-type' : 'application/json; charset=utf-8'}
		})
		.then(response => response.text())
		.then(data => {
			callback(data);
		})
		.catch(err => console.log(err));
	}
	
	function getList(p_idx, callback){
		fetch('/partyreply/pages/' + p_idx)
		.then(response => response.json())
		.then(json => {
			callback(json);
		})
		.catch(err => console.log(err));
	}
	
	function remove(c_idx, callback){
		fetch('/partyreply/' + c_idx, {
			method : 'delete',
		})
		.then(response => response.text())
		.then(data => {
			callback(data);
		})
		.catch(err => console.log(err));
	}
	
	return {
		add : add,
		getList : getList,
		remove : remove
	}
})();