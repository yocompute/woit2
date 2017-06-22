import { User } from './user';

export class Item{
	constructor(
		public title:string = '',
		public description:string = '',
		public code:string = '',
		public dimension:string = '',
		public author:string = '',
		public year:string = '',
		public type:string = '',		// photo, picutre
		public source:string = '',		// original, market
		public style:string = '',		// contemporary, morden
		public price:number = null,
		public currency:string = '',	// usd, cad, cny
		public n_copies: number = null,
		public fpath:string = null,
		public created:string = '',
		public updated:string = '',
		public owner:User = null,
		public id:string=''
	){
		this.title = title;
		this.description = description;
		this.code = code;
		this.dimension = dimension;
		this.author = author;
		this.year = year;
		this.type = type;
		this.source = source;
		this.style = style;
		this.price = this.price;
		this.currency = this.currency;
		this.n_copies = n_copies;
		this.fpath = fpath;
		this.price = price;
		this.owner = owner;
		this.id = id;
	}
}