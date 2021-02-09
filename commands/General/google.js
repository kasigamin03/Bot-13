const Discord = require('discord.js'),
	ms = require('ms'),
	fetch = require("node-fetch")

let numbers = [
    '1️⃣', '2️⃣', '3️⃣',
    '4️⃣', '5️⃣', '6️⃣',
    '7️⃣', '8️⃣', '9️⃣',
    '🔟'
]

module.exports = {
	name: 'google',
	description: "Google a query with valid search results",
	usage: 'google <query> ',
	aliases: [],
	required: [],
	user: [],
	category: __dirname.split("commands/")[1],
	args: false,
	premium: false,
	guildOnly: false,
	async execute(message, args, client) {
		let query = args.join("+")
		if (!query) return await client.missingArgs(message, "Please provide a query")


		const request = await fetch(`https://www.googleapis.com/customsearch/v1?key=${client.config.google_api_key}&cx=017576662512468239146:omuauf_lfve&q=${query}`)
		const res = await request.json()


		let embed = new Discord.MessageEmbed()
			.setTitle(`Google search, query: ` + args.join(" "))
			.setColor(['4285F4', 'DB4437', 'F4B400', '0F9D58'].random())
			.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png")
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setFooter(client.user.username, client.user.displayAvatarURL())

		if (parseInt(res.searchInformation.totalResults) <= 0) {
			embed.setDescription(`About ${res.searchInformation.formattedTotalResults} (${res.searchInformation.formattedSearchTime} seconds)
			Your search - ${args.join(" ")} - did not match any documents.

Suggestions:

 • Make sure all words are spelled correctly.
 • Try different keywords.
 • Try more general keywords.
 • Try fewer keywords.`)
		} else {
			if (res.items.length > 5) res.items.splice(-4)

			embed.setDescription(`About ${res.searchInformation.formattedTotalResults} (${res.searchInformation.formattedSearchTime} seconds)
			${res.items.map((e, r) => `${numbers[r]} **[${e.title}](${e.link} '${e.displayLink}')**\n${e.snippet}`).join("\n\n")}
			`)
		}

		 return await message.channel.send(embed)
	}
}