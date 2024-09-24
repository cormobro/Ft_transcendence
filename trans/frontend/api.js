var csrftoken = '{{ csrf_token }}'

document.getElementById('getRequest').onclick = () => {
	const requestObj = new XMLHttpRequest()
	requestObj.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200){
			console.log(this.responseText)
		}
	}
	requestObj.open("GET", "/get/")
	requestObj.send()
}

document.getElementById('postRequest').onclick = () => {
	const requestObj = new XMLHttpRequest()
	requestObj.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200){
			console.log(this.responseText)
		}
	}
	requestObj.open("POST", "/post/")
	// requestObj.setRequestHeader("X-CSRFToken", csrftoken)

	const formdata = new FormData()
	formdata.append('name', 'Gege')
	formdata.append('age', '26')
	requestObj.send(formdata)
}
