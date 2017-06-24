import { Injectable } from '@angular/core';

@Injectable()
export class MainService {

    constructor() { }

    //------------------------------------------------------------------------------------------
    //     Convert the query object to string. jqLite does not have param() function, we need it
    //    Arguments: 
    //        query     --- Query object. eg. { item_id: itemId }
    //    Return:
    //        string of the query if success, eg. ?rv=a&re=b; otherwise return ''
    toQueryStr(query:any){
        let list:string[] = [];
        if( query ){
            var keys = Object.keys(query);
            if(keys.length == 0){
                return "";
            }else{
                for(var key in query){
                    if(query.hasOwnProperty(key)){
                        list.push(key + '=' + query[key]);
                    }
                }
                return '?' + list.join('&');
            }
        }else{
            return '';
        }
    }
}
