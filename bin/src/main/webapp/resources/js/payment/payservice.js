const payService = (function() {
	function order(payInfo, callback) {
		fetch('/payment/order', {
    		method : 'post',
    		body : JSON.stringify(payInfo),
    		headers : {'Content-type' : 'application/json; charset=utf-8'}
   		})
	    .then(response => response.text())
	    .then( data => {
	    	callback(data);
	    })
	    .catch(err => console.log(err));
	}
	
	function zeroOrder(payInfo, callback) {
		fetch('/payment/zeroOrder', {
    		method : 'post',
    		body : JSON.stringify(payInfo),
    		headers : {'Content-type' : 'application/json; charset=utf-8'}
   		})
	    .then(response => response.text())
	    .then( data => {
	    	callback(data);
	    })
	    .catch(err => console.log(err));
	}
	
	function pay(payDate, callback) {
		fetch('/payment/pay?' + payDate)
   		.then(response => response.text())
	    .then( data => {
	    	callback(data);
	    })
	    .catch(err => console.log(err));
	}
	
	function cancel(order_no, callback) {
		fetch('/payment/cancel', {
    		method : 'post',
    		body : order_no
   		})
	    .then(response => response.text())
	    .then( data => {
	    	callback(data);
	    })
	    .catch(err => console.log(err));
	}
	
	function zeroCancel(order_no, callback) {
		fetch('/payment/zeroCancel', {
    		method : 'post',
    		body : order_no
   		})
	    .then(response => response.text())
	    .then( data => {
	    	callback(data);
	    })
	    .catch(err => console.log(err));
	}
	
	return {
		order:order,
		zeroOrder:zeroOrder,
		pay:pay,
		cancel:cancel,
		zeroCancel:zeroCancel
	}
})();