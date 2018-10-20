let titleGrammar = {
	"first": "B P T T T N M M M B C D F G Ph J K L M N P Qu R S T V W X Y Z St Fl Bl Pr Kr Ll Chr Sk Br Sth Ch Dhr Dr Sl Sc Sh Thl Thr Pl Fr Phr Phl Wh".split(" "),
	"middle": "an ad in an on ion ill oop ack ist all ar art air aean eun eun euh esqu aphn arl ifn ast ign agn af av ant app ab er en eor eon ent enth iar ein irt ian ion iont ill il ipp in is it ik ob ov orb oon ion uk uf un ull urk".split(" "),
	"last": "e a i ie ei a ay oy y a ia ea u y en am is on an o ang ing io i el ios ius ae ie ee i".split(" "),
	"name": ["#first##middle##last#", "#first##middle##middle#", "#first##last##last#", "#middle##last#", "#middle##last#'#last#", "#first##last#'#last#"],

	"prefixWord": ["a", "every", "any", "this", "my", "our", "his", "her", "some", "the", "a", "last", "no"],
	"prefix": ["#prefixWord.capitalize# ", "#name.capitalize#'s ", ""],
	"place": ["room", "sea", "room", "forest", "pagoda", "temple", "sanctuary", "ocean", "wall", "dungeon", "cave", "sky", "house", "mountain", "sanctum", "palace", "river", "place", "desert", "island", "castle", "house", "inn", "tavern", "tower", "oasis", "tent"],
	"stuff": ["stone", "sorrow", "eyes", "flowers", "time", "music", "storms", "rhyme", "freedom", "rhythm", "wind", "life", "ice", "gold", "mysteries", "song", "waves", "dreams", "water", "steel", "iron", "memories", "thought", "seduction", "remembrance", "loss", "fear", "joy", "regret", "love", "friendship", "sleep", "slumber", "mirth"],
	"animal": "cobra okapi moose amoeba mongoose capybara yeti dragon unicorn sphinx kangaroo boa nematode sheep quail goat corgi agouti zebra giraffe rhino skunk dolphin whale bullfrog okapi sloth monkey orangutan grizzly moose elk dikdik ibis stork finch nightingale goose robin eagle hawk iguana tortoise panther lion tiger gnu reindeer raccoon opossum".split(" "),
	"mood": "vexed indignant impassioned wistful astute courteous benevolent convivial mirthful lighthearted affectionate mournful inquisitive quizzical studious disillusioned angry bemused oblivious sophisticated elated skeptical morose gleeful curious sleepy hopeful ashamed alert energetic exhausted giddy grateful groggy grumpy irate jealous jubilant lethargic sated lonely relaxed restless surprised tired thankful".split(" "),
	"color": "ivory silver ecru scarlet red burgundy ruby crimson carnelian pink rose grey pewter charcoal slate onyx black mahogany brown green emerald blue sapphire turquoise aquamarine teal gold yellow carnation orange lavender purple magenta lilac ebony amethyst jade garnet".split(" "),
	"material": "fire water cybernetic steampunk jazz steel bronze brass leather pearl cloud sky river great crystal rainbow iron gold silver titanium".split(" "),
	"adventure": "lament tale myth story epic tears wish desire dance mystery enigma drama path training sorrows joy tragedy comedy riddle puzzle regret victory loss song adventure question quest vow oath tale travels".split(" "),
	"adj": ["#color#", "#mood#"],
	"adv": ["#place#", "#adventure#"],
	"of": ["of", "for", "under", "in", "beyond"],
	"title": ["The #adj.capitalize# #adv.capitalize#", "#prefix##adj.capitalize# #place.capitalize#",
		"#prefix##adv.capitalize# #of# #prefix##stuff.capitalize#", "#animal.capitalize#'s #adventure.capitalize#",
		 "#name.capitalize#'s #adventure.capitalize#","#prefix##adv.capitalize# of #stuff.capitalize#"
	],
}
