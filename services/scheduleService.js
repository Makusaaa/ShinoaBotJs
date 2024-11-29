const schedule = require('node-schedule');
const { LoadMangaList } = require('./mangaService')

module.exports = {
    GenerateJobs: () => {
        GetMangaListJob();
    },
}

const GetMangaListJob = () => {
    // Every 12 AM pull mangalist data
    const job = schedule.scheduleJob('0 0 * * *', async () => {
        await LoadMangaList();
        console.log('Getting Manga List Job Done')
    });
}