const { SlashCommandBuilder } = require('discord.js');
const { LoadMangaList } = require('../../services/mangaService')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('manga')
		.setDescription('Search for manga to read')
		.addStringOption(option => 
			option.setName('title')
				.setDescription('Search for manga')
				.setAutocomplete(true)
		),
	async autocomplete(interaction){
		const focusedValue = interaction.options.getFocused();
		const mangaList = await LoadMangaList();
		const limit = 10;
		const mangaFiltered = mangaList.filter(test => test.s.toLowerCase().includes(focusedValue.toLowerCase())).slice(0,limit);

		await interaction.respond(
			mangaFiltered.map(manga => ({ name: manga.s, value: manga.i })),
		);
	},
	async execute(interaction) {
		console.log("testing lagi command handling");
	},
};