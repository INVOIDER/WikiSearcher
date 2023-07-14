import React, {useState} from 'react';
import classes from "./WikiSearcher.module.css";
import SearchStore from "../../store/SearchStore"
import {observer} from "mobx-react-lite";
import axios from "axios";
const WikiSearcher = observer(() => {
    const [search,setSearch] = useState(SearchStore.search)
    const handleSearch = async e =>{
        e.preventDefault()
        if (search ==='') return;
        await SearchStore.setSearch(search)

        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`; //Api

        const resp = await fetch(url)

        const data = await resp.json();


        SearchStore.setResults(data.query.search)
        SearchStore.setSearchInfo(data.query.searchinfo.totalhits)
    }
    return (
        <div className={classes.WikiContainer}>
            <form  className={classes.searchForm} onSubmit={handleSearch}>
                <input className={classes.SearchBox}
                       type="search"
                       placeholder="Я ищу..."
                       value={search}
                       onChange={e =>setSearch(e.target.value)}
                />
                <input className={classes.SearchBtn} type="submit" value="Поиск"/>
            </form>
            <div className={classes.Blocks}>
                <p className={classes.SearchInfo}>{SearchStore.SearchInfo !== '' || typeof(SearchStore.SearchInfo)=="undefined" ||  SearchStore.SearchInfo !== null ? "По вашему запросу было найдено " + SearchStore.searchInfo + " результата(ов) " : ''}</p>
                {SearchStore.results.map((result,i)=>{
                    const resUrl = `https://en.wikipedia.org/?curid=${result.pageid}`
                    return (
                            <a href={resUrl} target="_blank" rel="nofollow">
                            <section className={classes.BlockContent} key={i}>
                                <p className={classes.BlockTitle}>{result.title}</p>
                                <p className={classes.BlockText} dangerouslySetInnerHTML={{__html: result.snippet + " ..."}}></p>
                            </section>
                                </a>
                        )
                })}

            </div>
        </div>
    );
});

export default WikiSearcher;