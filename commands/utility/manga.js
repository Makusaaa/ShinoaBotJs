const { SlashCommandBuilder } = require('discord.js');
const { LoadMangaList, LoadMangaChapters, ChapterNumber, GetMangaReaderLink } = require('../../services/mangaService')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('manga')
		.setDescription('Search for manga to read')
		.addStringOption(option => 
			option.setName('title')
				.setDescription('Search for manga')
				.setAutocomplete(true)
				.setRequired(true)
		).addStringOption(option => 
			option.setName('chapter')
				.setDescription('Search chapter')
				.setAutocomplete(true)
				.setRequired(true)
		),
	async autocomplete(interaction){
		const focusedValue = interaction.options.getFocused();
		const focusedOption = interaction.options.getFocused(true);

		if(focusedOption.name === 'title')
		{
			const limit = 10;
			const mangaList = await LoadMangaList();
			const mangaFiltered = mangaList.filter(manga => manga.name.toLowerCase().includes(focusedValue.toLowerCase())).slice(0,limit);
			await interaction.respond(mangaFiltered);
		}
		if(focusedOption.name === 'chapter')
		{
			const mangaId = interaction.options.get('title').value;
			const limit = 5;
			const chapterList = await LoadMangaChapters(mangaId);
			const chapterFiltered = chapterList.filter(chapter => {
				if(!focusedValue || focusedValue == '' || focusedValue.length == 0) return chapter
				if(ChapterNumber(chapter.value) == focusedValue)
					return chapter;
			}).slice(0,limit)
			await interaction.respond(chapterFiltered);
		}
	},
	async execute(interaction) {
		const mangaId = interaction.options.get('title').value;
		const chapter = interaction.options.get('chapter').value;
		const link = `https://makumanga.vercel.app/${mangaId}/${chapter}`;
		await interaction.reply({content: `<${link}>`, ephemeral: true });
	},
};