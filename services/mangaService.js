const fs = require('fs').promises;
const axios = require('axios');

const baseURL = 'https://www.manga4life.com'

module.exports = { 
    LoadMangaList: async () => {
        const filePath = "./data/mangaList.json";
        const mangaWebURL = baseURL+"/_search.php";
        let dataReturn;

        await fs.readFile(filePath)
        .then((data)=>{
            dataReturn = JSON.parse(data);
        })
        .catch(async ()=>{
            dataReturn = (await axios.get(mangaWebURL)).data;
            await fs.writeFile(filePath,JSON.stringify(dataReturn));
        });
        return dataReturn.map(manga => ({
            name: manga.s,
            value: manga.i
        }));
    },
    LoadMangaChapters: async (mangaId) => {
        const mangaURL = `${baseURL}/manga/${mangaId}`;
        const chapters = GetChapters((await axios.get(mangaURL)).data)
        return chapters.map(chapter => ({
            name: chapter.Type+' '+ChapterNumber(chapter.Chapter),
            value: chapter.Chapter
        }))
    },
    ChapterNumber: (chapter) => {
        const num = parseInt(chapter.slice(1,-1))
        let coma = ""
        if(chapter[chapter.length-1] != "0")
            coma = "."+chapter[chapter.length-1]
        return num + coma
    }
}

const GetChapters = (html) => {
    const keyword = "vm.Chapters = ";
    const start = html.slice(html.indexOf(keyword) + keyword.length)
    const data = start.slice(0,start.indexOf("];")+1)
    return JSON.parse(data)
}

const ChapterNumber = (chapter) => {
    const num = parseInt(chapter.slice(1,-1))
    let coma = ""
    if(chapter[chapter.length-1] != "0")
        coma = "."+chapter[chapter.length-1]
    return num + coma
}