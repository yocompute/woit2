export class Item{
	constructor(
		public title:string,
		public code:string,
		public description:string,
		public price:number
	){
		this.title = title;
		this.code = code;
		this.description = description;
		this.price = price;
	}
}