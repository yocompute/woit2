import { User } from './user';

export class Item{
	constructor(
		public title:string = '',
		public description:string = '',
		public dimension:string = '',
		public author:string = '',
		public year:string = '',
		public type:string = '',		// photo, picutre
		public source:string = '',		// original, market
		public style:string = '',		// contemporary, morden
		public n_copies: number = null,
		public fpath:string = null,
		public created:string = '',
		public updated:string = '',
		public user:User = null,
		public id:string=''
	){
		this.title = title;
		this.description = description;
		this.dimension = dimension;
		this.author = author;
		this.year = year;
		this.type = type;
		this.source = source;
		this.style = style;
		this.n_copies = n_copies;
		this.fpath = fpath;
		this.user = user;
		this.id = id;
	}
}