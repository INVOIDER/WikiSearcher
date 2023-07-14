import {makeAutoObservable} from "mobx";

class SearchStore{
    constructor() {
        this._search =''
        this._searchInfo=''
        this._results = []
        makeAutoObservable(this)
    }
    setSearch(search){
        this._search = search
    }
    setSearchInfo(searchInfo){
        this._searchInfo = searchInfo
    }
    setResults(results){
        this._results =results
    }
    get searchInfo(){
        return this._searchInfo
    }
    get search(){
        return this._search
    }
    get results(){
        return this._results
    }
}
export default new SearchStore