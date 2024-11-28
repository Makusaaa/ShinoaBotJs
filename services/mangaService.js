const fs = require('fs').promises;
const axios = require('axios');

module.exports = { 
    LoadMangaList: async () => {
        const filePath = "./data/mangaList.json";
        const mangaURL = "https://manga4life.com/_search.php";
        let dataReturn;

        await fs.readFile(filePath)
        .then((data)=>{
            dataReturn = JSON.parse(data);
        })
        .catch(async ()=>{
            dataReturn = (await axios.get(mangaURL)).data;
            await fs.writeFile(filePath,JSON.stringify(dataReturn))
        });
        return dataReturn;
    },
}