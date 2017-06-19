export class User{
	constructor(
		public username:string,
		public email:string,
		public password:string = "",
		public id:string = ""
	){
		this.username = username;
		this.email = email;
		this.password = password;
		this.id = id;
	}

	// public toPostJsonStr(csrftoken:string){
	// 	return JSON.stringify({
	// 		'csrf_token': csrftoken,
	// 		'username': this.username, 
	// 		'password': this.password, 
	// 		'email':this.email});
	// }
}