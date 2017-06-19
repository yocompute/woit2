import { User } from './user';

export class Item{
	constructor(
		public title:string = '',
		public description:string = '',
		public code:string = '',
		public dimension:string = '',
		public author:string = '',
		public type:string = '',		// Photo, Picutre
		public source:string = '',	// Original, From Market
		public price:number = null,
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
		this.type = type;
		this.source = source;
		this.n_copies = n_copies;
		this.fpath = fpath;
		this.price = price;
		this.owner = owner;
		this.id = id;
	}
}