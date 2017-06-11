export class Product{
	constructor(
		public name:string,
		public description:string,
		public price:number,
		public weight:number,
		public weightUnit:string
	){
		this.name = name;
		this.description = description;
		this.price = price;
		this.weight = weight;
		this.weightUnit = weightUnit;
	}
}