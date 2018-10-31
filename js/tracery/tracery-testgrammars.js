/**
 * @author Kate Compton
 */
var testGrammars = {
    basic: {
    //     color: ["magenta", "silver", "ecru", "red", "turquoise", "purple", "green", "grey", "blue", "beige", "crimson", "periwinkle", "orange"],
    //     animal: ["cat", "dog", "lemur", "alpaca", "corgi", "zebra", "leopard", "cougar", "cobra", "unicorn", "dragon", "llama", "hamster", "elephant"],
    //     place: ["Burningman", "the beach", "Santa Cruz", "lower Manhattan", "the moon", "the library"],
    //     origin: ["the #color# #animal# went to #place#"]
        color: ["magenta", "blue"],
        animal: ["cat", "dog", "lemur", "alpaca", "corgi", "zebra", "leopard", "cougar", "cobra", "unicorn", "dragon", "llama", "hamster", "elephant"],
        place: ["Burningman", "the beach", "Santa Cruz", "lower Manhattan", "the moon", "the library"],
        origin: ["the #color# #animal# went to #place#"]
    },

    chef: {
        "femmeFrenchAdj": ["d'or", "maudite", "tacite", "ombre", "d'argent", "amusé", "verte", "rouge", "française", "bonne", "géniale", "blanche", "oublié", "belles", "nouveaux", "fraîche", "trompe", "joyeuse", "bonne", "noire", "chère", "inclinée", "malheur"],
        "mascFrenchAdj": ["amusé", "maudit", "tacite", "regrettable", "ombre", "d'argent", "vert", "rouge", "français", "génial bel", "oublié", "négligé", "frais", "faux", "grand", "bon", "blanc", "joyeux", "trompe"],
        "frenchAdj": ["#femmeFrenchAdj#", "#mascFrenchAdj#"],
        "mascFrenchNoun": ["toit", "chêne", "regret", "pinson", "cygne taureau", "truite", "fromage", "pain", "canard"],
        "femmeFrenchNoun": ["forêt mer", "auberge", "chaise", "chanson", "porte", "baleine", "table", "maison", "chalet"],
        "frenchNoun": ["#femmeFrenchNoun#", "#mascFrenchNoun#"],
        "frenchPlaceName": ["Le #mascFrenchNoun.capitalize# #mascFrenchAdj.capitalize#", "La #femmeFrenchNoun.capitalize# #femmeFrenchAdj.capitalize#", "#frenchAdj.capitalize#", "#frenchNoun.capitalize#", "#frenchAdj.capitalize#"],

        "personobject": ["old blanket", "glowing orb", "threadbare shawl", "silver picture frame", "stack of old papers", "bundle of old letters", "tattered map", "vintage record player", "telescope", "human skull", "heavy iron box", "mud-covered shovel", "baseball bat", "hula hoop", "battered guitar", "cello case", "riding whip"],
        "color": ["green", "red", "violet", "tafetta", "blue", "silver", "gold", "ivory", "platinum", "black", "lavender", "velvet", "satin", "pink", "magenta", "white", "grey", "tan"],
        "personDesc": ["feminine", "muddy", "sweaty", "pregnant", "grinning", "soft-voiced", "drowsy", "lanky", "macho", "silent", "weeping", "ashen-faced", "red-eyed", "#color#-eyed", "sullen", "scowling", "laughing", "distracted", "nervous", "bespectacled", "slouching", "crying", "giggling", "loud-voice", "hoarse", "gracious", "mysterious", "tall", "tanned", "studious", "tattooed", "grim", "laid-back", "smiling", "hungover", "genial", "one-armed", "gorgeous", "quiet", "thoughtful", "argumentative", "long-braided", "relaxed", "pleasant", "noisy", "short", "long-haired", "short-haired", "free-spirited", "oddly dressed", "well-dressed", "formally dressed", "curly-haired", "blond", "sunburned", "disheveled", "polished", "clean-shaven", "outgoing", "introverted", "cheerful", "mournful", "chatty", "gossipy", "silver-haired", "#color#-haired", "graceful", "distracted", "mustachioed", "bearded"],
        "personSuit": ["sundress", "unitard", "bathrobe", "wearing a lab coat", "carrying #personobject.a#", "in paint-smeared overalls", "caftan", "headscarf", "tuxedo", "ballgown", "suit", "vest", "jacket", "bathing suit", "wedding dress"],
        "personPostDesc": ["in #color.a# #personSuit#", "covered in mud", "with mud-covered shoes", "with a blank expression", "with a dazed expression", "carrying a stuffed rabbit", "clutching a brown paper bag", "carrying a suitcase", "with a sword", "carrying a stack of thick books", "wearing an overstuffed backpack", "with an accordion", "with a Southern drawl", "with a British accent", "in #personSuit.a#", "with a strangely-shaped scar", "with an eyepatch", "with an old guitar", "carrying a ukulele", "carrying a briefcase", "carrying a boombox", "talking on their cellphone", "holding a heavy wooden crate", "wearing sunglasses", "in a wheelchair", "on crutches", "wearing a blindfold", "with haunted eyes", "wearing short-shorts", "with long dreads", "trying to hide their face", "with an enormous beard", "with long dangling earrings", "with a parrot on their shoulder", "carrying a small dog", "wearing an enormous hat", "wearing a #color# ballgown", "dressed entirely in #color#", "wearing a long #color# robe", "with tall #color# boots", "in a #color# #personSuit#"],
        "personType": ["supermodel", "witch", "soldier", "child", "wizard", "rock star", "country singer", "sailor", "young woman", "hiker", "biker", "truck driver", "gentleman", "pirate", "detective", "movie star", "young man", "violinist", "duchess", "farmer", "soldier", "civil servant", "acrobat", "fireman", "judge", "retiree", "catgirl", "stranger", "hooded figure", "scientist", "writer", "frat brother", "nurse", "tourist", "doctor", "clown", "nun", "clown", "nun", "clown", "nun", "queen", "politician", "lumberjack", "bodybuilder", "rugby player", "ballerina", "professor", "grad student", "student", "high-schooler", "football player", "skater", "geek", "nerd", "goth", "cowboy", "priest", "nun", "monk", "granny", "girl", "hipster", "punk", "banker", "businesswoman", "businessman", "surfer", "old lady", "old man", "kid", "teen", "20-something", "woman", "man", "person", "being"],

        "patronSingle": ["#personDesc.a# #personType#", "#personDesc.a# #personType# #personPostDesc#", "#personDesc.a# #personType#", "#personDesc.a# #personType# #personPostDesc#", "#personType.a#"],

        "patronPair": ["#patronSingle# and #patronSingle#", "a pair of #personDesc# #personType.s#"],
        "personGroup": ["a group of", "dozens of", "several", "a crowd of", "a flock of", "a few"],
        "patronMulti": ["#personGroup# #personDesc# #personType.s#"],


        "hpnStart": ["Brax", "Brash", "Stump", "Tangle", "Star", "Stage", "Black", "Red", "Chamb", "Whit", "Gren", "Brook", "Bright", "North", "Hells", "Saints", "Fair"],
        "hpnEnd": ["bridge", "bury", "ton", "fright", "borough", "ford", "blood", "ly", "brox", "bray", "bay", "smith", "town", "lyn", "ferry", "ghost", "haven", "brook", "oaks", "ox", "wood"],
        "hpn": ["#hpnStart##hpnEnd#"],
        "name": ["Gabriel", "Lucia", "Hollis", "Holly", "Maisie", "Jasper", "Lane", "Lincoln", "Sterling", "Summer", "Miranda", "Maria", "Min", "Minnie", "Mariah", "Gus", "Dani", "Darius", "Elena", "Eduardo", "Elías", "Rajesh", "Ranjit", "Rex", "Rez", "Rey", "Yew", "Reba", "Jae-woo", "Ken", "Kira", "Jae", "Shah", "Josef", "Jørn", "Autumn", "Brandy", "Copper", "Cooper", "Harrow", "Manhattan", "Jo", "Jodi", "Karim", "Raf", "January", "Aku", "Juraj", "Yuri", "Kåre", "Lyn", "Jahan", "Mitch", "Alda", "Aimee", "Zoe", "London", "Paris", "Zuzu", "Zara", "Micah", "Song", "Sparrow", "Miguel", "Mikey", "Monette", "Michelina", "Agave", "Robyn", "Saffron", "Zeke", "Garth", "Rae", "Sebastian", "Seb", "Jake", "Bastion", "Luna", "Apple", "Delilah", "Jeremiah", "Finn", "Milo", "Finley", "April", "May", "September", "Kim", "Phineas", "Quincy", "Saul", "Rudy", "Cleo", "Noel", "Frankie", "June", "Rocky", "Pearl", "Harris", "Braxton", "Hamilton", "Ace", "Duke", "Rowan", "Stella", "Stevie", "Juniper", "Ryder", "Kai", "Judd", "Rhody", "Rho", "Sven", "Hazel", "Byron", "Edie", "Lola", "Poppy", "Jo", "Whisper", "Kaya", "Karim", "Kit", "Luca", "Rafa", "Miriam", "Aya", "Carmen", "Omar", "Anika", "Shan", "Luka", "Theo", "Emma", "Julian", "Adrian", "Ari", "Noah", "Maya", "Ariel"],
        "surnameBase": ["Chao", "Fillmore", "García", "Bond", "Wong", "Wei", "Goldsmith", "Tran", "Chu", "Baudin", "Montagne", "Moulin", "Villeneuve", "Victor", "Rodríguez", "Smith", "Johnson", "Williams", "Miller", "Stockton", "Patel", "Chaudri", "Jahan", "Christiansen", "Jones", "Stein", "Hirviniemi", "Kiuru", "Øvregard", "Singh", "Noriega", "Pine", "Clarion", "Belden", "Jaware", "Keita", "Kanu", "Geary", "Norton", "Kearny", "Aliyev", "Sato", "Tanaka", "Kim", "Lee", "Gray", "Yang", "Li", "Çelik", "Davis", "Knox", "Griffin", "Leon", "Finch", "Yoo", "Gupta", "Flores", "Lopez", "Moon", "Sun", "Castro", "Suzuki", "Torres", "Pineda", "Tsao", "Romero", "Wolf"],
        "surname": ["#surnameBase#", "#surnameBase#-#surnameBase#", "#hpn#"],


        "flavorAdj": ["special", "dark", "light", "bitter", "burnt", "savory", "flavorful", "aromatic", "fermented", "herbal", "pleasant", "harsh", "smoky", "sweet", "fresh", "refreshing", "somber", "bright", "perky", "sullen", "acidic", "sour", "peaty", "juicy", "perfumed", "buttery", "lush", "brisk", "strong", "weak", "tart", "tangy", "bold", "overpowering", "light", "faint", "subtle", "bright", "zesty", "austere", "round", "big", "buttery", "oaky", "peaty", "seedy", "gritty", "creamy", "smooth", "rustic", "complex", "chewy", "sweet", "crisp", "dense", "bold", "elegant", "sassy", "opulent", "massive", "wide", "flamboyant", "fleshy", "approachable", "jammy", "juicy", "refined", "silky", "structured", "steely", "rich", "toasty", "burnt", "velvety", "unctuous", "oily"],


        "toasted": ["toasted", "burnt", "singed", "fried"],
        "spread": ["splashed", "spread", "layered", "drizzled", "layered"],
        "sauce": ["salsa", "reduction", "vinagrette", "sauce", "jam", "puree", "butter", "jelly", "preserves"],
        "herbPrep": ["dried", "shredded", "minced", "fried"],

        "preparedMeat": ["duck fat<poultry><duck>", "roast duck<poultry><duck>", "crispy bacon<pork><bacon>", "pancetta", "salami", "prosciutto", "corned beef", "pastrami", "roast game hen", "seared ahi"],


        "herb": ["fennel", "cilantro", "mint", "basil", "thyme", "Thai basil", "oregano", "peppermint", "spearmint", "rosemary"],
        "spice": ["vanilla", "nutmeg", "allspice", "turmeric", "cardamom", "saffron", "cinnamon", "chili powder", "cayenne", "coriander", "black pepper", "white pepper", "ginger", "za’atar"],


        "largeFruit": ["kumquat<citrus>", "honeydew<melon>", "bittermelon<melon>", "cherimoya", "peach", "sugar apple", "persimmon", "green apple", "jackfruit", "damson plum", "kiwi", "lime<citrus>", "key lime<citrus>", "meyer lemon<citrus>", "pomegranate", "green apple", "pineapple", "mandarin orange<citrus>", "blood orange<citrus>", "plum", "bosque pear", "fig", "persimmon", "durian", "mango", "lychee"],
        "smallFruit": ["black cherry", "raisin", "cranberry", "blueberry", "raspberry", "lingonberry", "boysenberry", "elderberry", "black grape", "champagne grape", "blackberry", "marionberry", "açaí berry", "blackcurrant", "currant", "pomegranate seed"],
        "fruit": ["#largeFruit#", "#smallFruit#"],

        "greens": ["baby spinach", "endive", "radicchio", "arugula", "beet greens", "mustard greens", "green onion", "watercress"],

        "nut": ["almond<nut>", "macademia nut<nut>", "cacao nib<chocolate>", "walnut<nut>", "pumpkin seed<seed>", "cashew<nut>", "pecan", "pistachio"],
        "vegetable": ["kale", "summer squash", "rampion", "napa cabbage", "rutabaga", "carrots", "fennel", "spring onions", "arugula", "kabocha", "artichokes"],
        "ingredient": ["#vegetable#", "#fruit#", "#nut#", "#greens#"],

        "cream": ["coconut milk<coconut><nut>", "whipped cream<dairy>", "almond milk<nut>", "hemp milk", "organic milk<dairy>", "soy", "fermented dairy", "yoghurt", "goat's milk"],

        "bread": ["challah", "raisin bread", "pumpernickel", "wheat bread", "sourdough", "white bread", "rye"],

        "fancyBread": ["#bread# french toast", "toast", "grilled #bread#", "fresh-baked #bread#", "#bread#", "toasted #bread#"],
        "fancySauce": ["#fruit# #sauce#", "#nut# #sauce#", "#ingredient.a#-#ingredient# reduction"],

        "topping": ["#herbPrep# #herb#", "#spice# and #spice#", "#nut.s#", "#smallFruit#"],
        "sprinkled": ["topped", "accessorize", "sprinkled", "accented"],
        "smallIngredient": ["#smallFruit.s#", "chopped #nut.s#", "shredded #herb#"],

        "toastName": ["#hpn# Toast", "#ingredient.capitalizeAll# Toast", "#name#'s Toast", "#name#'s #flavorAdj.capitalize# Toast"],
        "toastDesc": ["#fancySauce.capitalize# #spread# on #fancyBread#", "#fancySauce.capitalize# #spread# on #toasted# #fancyBread#", "#topping.capitalize# on a slice of #fancyBread#", "#topping.capitalize# on #fancyBread#, #sprinkled# with #smallIngredient#"],

        "redWineType": ["rioja", "burgundy", "merlot", "pinot noir", "syrah", "shiraz", "grenache", "malbec", "petit sirah", "zinfandel"],
        "whiteWineType": ["white zinfandel", "champagne", "riesling", "chardonnay", "chenin blanc", "gewürztraminer", "muscat"],

        "coffeeServing": ["with a dollop of #cream#", "as a #cream# latte", "topped with #cream# foam", "black", "as a pourover", "clover-style", "French Press", "in a teacup", "in a moka pot", "in a teapot", "in a pile of discarded Keurig cups", "with #cream#"],
        "coffeeServingInstruction": ["Served #coffeeServing#", "Available #coffeeServing# or #coffeeServing#", "Try it #coffeeServing#", "Available #coffeeServing#"],
        "coffeeType": ["arabica", "decaf", "mocha", "grind", "espresso", "french roast", "dark roast", "light roast", "#flavorMod# roast", "extra #flavorMod# roast"],

        "vinyard": ["vinyard", "vines", "estate", "cellars", "barrels"],

        "flavorMod": ["special", "dark", "light", "bitter", "burnt", "savory", "flavorful", "aromatic", "fermented", "herbal", "pleasant", "harsh", "smoky", "sweet", "fresh", "refreshing", "somber", "bright", "perky", "sullen", "acidic", "sour", "peaty", "juicy", "perfumed", "buttery", "lush", "brisk", "strong", "weak", "tart", "tangy", "bold", "overpowering", "light", "faint", "subtle"],
        "flavor": ["spearmint", "tobacco", "agave", "coffee", "cocoa powder", "chocolate", "sea salt", "kosher salt", "brown sugar", "cinnamon", "motor oil", "lavender", "spice", "black pepper", "cardamom", "pumpkin spice", "caramel", "toffee", "butterscotch", "peppermint", "walnut", "acid", "pear", "citrus", "grenadine", "smoke", "iodine", "coriander", "cinnamon", "acid", "salt", "sugar", "maple", "coffee", "whiskey", "regret", "sorrow", "blood", "gasoline", "grass", "cigarettes", "pine", "tar", "saltwater", "rosewater", "jasmine", "espresso", "green apple", "#fruit#", "#fruit#", "#fruit#", "#fruit#", "#fruit#"],

        "they": ["she", "he", "they", "I"],
        "them": ["her", "him", "them", "me"],
        "their": ["her", "his", "their", "my", "your"],

        "texture": ["silky", "rough", "textured", "rippling", "creased", "pleated", "ruffled", "starched", "supple", "satiny", "velvety"],
        "fabric": ["leather", "taffeta", "satin", "silk", "lamé", "calico", "jersey", "sateen", "lace", "alpaca", "wool", "burlap", "cashmere", "angora", "pleather", "cotton", "rayon", "nylon"],
        "suprising": ["welcome", "unexpected", "unfamiliar", "surpising"],
        "knowledge": ["awareness", "a realization", "a dream", "the fantasy", "the dream", "the illusion", "the hope"],
        "love": ["love", "know", "kiss", "see", "fear", "hear", "agree with", "forgive", "be forgiven by", "fight with", "reconcile with", "hold"],
        "relative": ["grandmother", "mother", "grandfather", "father", "son", "daughter", "child", "first child"],
        "memory": ["remembrance", "a sense of peace", "serenity", "the inevitability of death", "the immateriality of all things", "fall leaves", "newfallen snow", "the ocean", "your first kiss", "mother's perfume", "your future", "your dreams", "your past", "destiny", "faint hope", "false hope", "loss", "sunscreen in the summer", "the heat of the sun", "bitter cold", "forgiveness", "a newborn child", "the first day of school", "the day #they# left", "the first day you saw #them#", "autumn leaves", "the sea at night", "your #relative#'s smile", "father's aftershave", "grass after the rain", "disappointment", "Christmas morning", "birthday cake", "wedding cake", "#knowledge# that you will never #love# your #relative#", "what it is to #love# someone", "#knowledge#, just #knowledge#"],
        "gone": ["gone", "lost", "past", "forgotten", "forgiven"],
        "rhetoricalQuestion": ["#they# will not return this time.", "that time is #gone#", "could #they# even #love# you?", "what would #they# say if #they# knew?", "you can never #love# #them# again.", "it is #gone#, all is #gone#.", "#gone#, it is too late to #love# #them#.", "this is not what #they# wanted.", "all you wanted was #memory#.", "this was not #their# #intention#.", "what did you think would happen?"],
        "intention": ["intention", "plan"],
        "adj": ["#landscapeAdj#", "#color#", "#flavorMod#"],

        "landscapeAdj": ["rainy", "windy", "old", "grey", "dark", "creaky", "quiet", "silent", "fair", "shadow", "verdant", "sunny", "far", "near", "dry", "dead"],
        "landscapeFeature": ["river", "mountain", "forest", "mines", "pines", "falls", "glen", "garden", "mansion", "village", "isle", "bayou", "swamp", "hill", "creek", "rainforest", "desert"],
        "landscapeComplex": ["#landscapeAdj# #landscapeFeature#"],

        "hint": ["echo", "reminder", "hint", "overtone", "insinuation", "note", "undertone", "counterpoint"],

        "blendsWith": ["mingles with", "counterbalances", "contrasts with", "complements", "clashes with", "harmonizes with", "accents"],
        "flavorAttr": ["#hint.a# of #flavor#", "#texture# on your tongue", "#flavorMod# and #flavorMod# as #memory#", "it is #flavorMod# and #flavorMod# as #memory#", "#flavor#, #flavor#, and #flavor# #hint.s#", "#flavorMod# #flavor#, with #hint.s# of #flavor#", "#flavor# #blendsWith# #flavorMod# #flavor#", "#flavorMod# #flavor# #blendsWith# #flavorMod# #flavor#", "#flavorMod# #flavor#", "#flavorMod# #fruit.s#", "#hint.s# of #flavorMod# #flavor#", "#flavorMod# and #flavorMod#", "#flavorMod# #flavor# #hint.s#", "it smells of #memory#", "it reminds you of  #memory#", "you smell #memory#", "you remember #memory#", "you taste #memory#", "all you can taste is #memory#", "you #areDrowningIn# #flavorMod# #flavor#"],

        "areDrowningIn": ["drown in a sea of", "struggle against a tide of", "are overpowered by", "smell nothing but", "are in a sea of", "are becoming one with", "are lost in"],
        "weirdAdj": ["shadow", "rusty", "wild", "weird", "sweet", "fairy", "flame", "last", "ever", "never", "dead", "kings", "gods", "queens", "other", "dire", "fallow", "naked", "monster", "black", "new", "star", "white", "chosen", "forbidden", "great", "lost", "fallen", "idle", "joyful"],
        "weirdNoun": ["hand", "head", "song", "harp", "fate", "dancer", "rider", "fire", "jack", "spring", "wind", "hair", "fall", "heart", "spirit", "mind", "soul", "one", "being", "star", "blood", "bone"],
        "animal": ["horse", "goat", "impala", "wombat", "fox", "wolf", "coyote", "dingo", "centaur", "amoeba", "mongoose", "capybara yeti", "dragon", "unicorn", "gryphon", "sphinx", "kangaroo", "boa"],

        "wineType": ["#redWineType#", "#whiteWineType#"],

        "wineBrand": ["#adj.capitalizeAll# #landscapeFeature.capitalizeAll#", "#hpn.capitalizeAll#", "#weirdAdj.capitalize##weirdNoun#", "#adj.capitalizeAll# #animal.capitalizeAll#"],

        "servedWith": ["served with", "on a bed of", "rolled in", "topped with"],
        "prep": ["crumbled", "sauteed", "broken", "shredded", "smashed", "layered", "pureed", "burnt", "gellied"],

        "coreDessert": ["#prep# #dessertNoun.s#", "#flavor# #dessertNoun.s#", "#flavorMod# #flavor# #dessertNoun.s#"],

        "dessertMod": [" in the shape of #animal.a#", "in a #fruit#-#flavor# #sauce#", "#servedWith# #coreDessert#", "topped with #fruit# jam", "sprinkled with #nut.s#"],

        "dessertNoun": ["#fruit#", "#fruit#", "#fruit#", "#nut#", "gingersnap", "meringue", "macaron", "spongecake", "macaroon", "cookie", "cake", "biscuit", "cupcake", "scone", "financier"],
        "dessertNick": ["trifle", "fluff", "kiss", "decadence", "seduction", "big idea", "invention", "sweetness", "happiness", "flurry", "fancy", "frivolity", "jam"],


        "dessertDesc": ["#coreDessert# #dessertMod#"],
        "dessertName": ["#weirdAdj.capitalize#cake", "The #color.capitalize# #animal.capitalize# #dessertNick.capitalize#", "#name#'s #dessertNick.capitalize#", "#name#'s #weirdAdj.capitalize# #dessertNick.capitalize#", "#name#'s #flavorMod.capitalize# #dessertNick.capitalize#", "#frenchPlaceName.capitalize# #dessertNick.capitalize#", "#hpn.capitalize# #dessertNick.capitalize#"],

        "coffeeName": ["#hpn# #coffeeType.capitalizeAll#", "#landscapeComplex.capitalizeAll# #coffeeType.capitalizeAll#", "#name#'s #coffeeType.capitalizeAll#"],
        "coffeeDesc": ["#flavorAttr.capitalize#.  #coffeeServingInstruction#.", "#flavorAttr.capitalize# and #flavorAttr#.  #coffeeServingInstruction#."],

        "wineName": ["#wineBrand# #vinyard.capitalize# #wineType.capitalizeAll#", "#frenchPlaceName.capitalize#", "#frenchPlaceName.capitalize# #vinyard.capitalize#"],
        "wineDesc": ["#flavorAttr.capitalize#, #flavorAttr#", "#flavorAttr.capitalize#. #flavorAttr.capitalize#", "#flavorAttr.capitalize# and #rhetoricalQuestion#", "#rhetoricalQuestion.capitalize# #rhetoricalQuestion.capitalize# #flavorAttr.capitalize#", "#flavorAttr.capitalize#, #flavorAttr#.  #flavorAttr.capitalize#. #rhetoricalQuestion.capitalize#", "#flavorAttr.capitalize#. #flavorAttr.capitalize#. #rhetoricalQuestion.capitalize#"],
        "descStyle": "style='10px;'",
        "food": ["<b>#dessertName#</b><br><i>#dessertDesc#</i>", "<b>#toastName#</b><br><i>#toastDesc#</i>"],
        "drink": ["Coffee:<b>#coffeeName#</b><br><i>#coffeeDesc#</i>", "Wine:<b>#wineName#</b><br><i>#wineDesc#</i>"],
        "dessert": ["<b>#dessertName#</b><br><i>dessertDesc</i>"],
        "origin": "Le Menu<hr>Dessert:#food#<br><p style='font-size:10px;'><br>with<br></p> #drink#"

    },
    horridhp: {
        usable: ["wand", "magic mirror", "pensieve", "timeturner", "crystal ball", "broomstick", "quill"],
        wearable: ["cloak", "hat", "crown", "ring", "diadem", "robes", "gloves", "necklace", "pendant", "amulet"],
        container: ["chest", "cabinet", "box", "closet"],
        fancyBaseObj: ["mirror", "vase", "necklace", "sword", "urn", "chest", "box", "crown", "coronet", "ring", "goblet"],

        mysterious: ["sinister", "glowing", "hidden", "secret", "pulsing", "mysterious", "enigmatic", "forbidden", "enchanted"],
        baseObject: ["potion", "necklace", "circlet", "ring", "wand", "cauldron", "cloak"],
        aMagicalObject: ["the #mysterious# #fancyBaseObj# of #metal# inset with #preciousStone#", "a working cellphone", "a flying motorcycle", "#aFamousObject#", "#aFamousObject#", "#aFamousObject#", "the #baseObject# of #ancientCharacter#", "#baseObject.a# of #potionPower#"],
        aFamousObject: ["the Philosopher's Stone", "Ravenclaw's diadem", "Slytherin's locket", "Hufflepuff's cup", "the sword of Godric Gryffindor", "a time turner", "a phoenix feather", "an invisibility cloak", "one of Voldemort's horcruxes", "the diary of Tom Riddle", "the Sorting Hat"],

        color: ["blue", "red", "yellow", "orange", "violet", "grey", "silver", "green", "bright pink", "pink"],

        // Wands

        bird: ["grackle", "parakeet", "cockatiel", "hyacinth macaw", "barn owl", "long-eared owl", "magpie", "raven", "common crow", "spectacled owl", "Eastern screech owl", "snowy owl", "Eurasian eagle owl", "great horned owl", "Northern pygmy owl", "tawny fish owl", "sea eagle", "bald eagle", "red-tailed hawk", "mountain buzzard", "turkey vulture", "feral chicken", "peregrine falcon", "long-tailed honey buzzard", "pelican", "hornbill", "house sparrow", "American flamingo", "white-breasted woodswallow", "leucistic Indian peacock", "kingfisher", "long-wattled umbrellabird", "mandarin duck", "greater bird-of-paradise", "scissor-tailed flycatcher", "golden pheasant", "domestic duck", "Canadian goose"],

        metal: ["bronze", "gold", "gilt", "silver", "brass", "iron", "aluminum"],

        stoneModifier: ["sea", "water", "fire", "ember", "sun", "soul"],
        preciousStone: ["mirrors", "#monster#bone", "rubies", "pearls", "diamonds", "sapphires", "opals", "#stoneModifier#stones", "#stoneModifier# opals"],

        wandAdj: ["blunt", "austere", "solid", "sharply curved", "curvy", "gnarled", "twisted", "curled", "misshapen", "crooked", "straight", "narrow", "thin", "wiggly", "stubby", "bent", "whippy", "flexible", "lithe", "stocky"],
        plainWood: ["cherry", "yew", "rowan", "ash", "redwood", "pearwood", "driftwood", "dogwood", "maple", "oak", "pine", "bamboo", "boxwood", "cherrywood", "mahogany", "ebony"],
        wandWood: ["old broomsticks", "deeply-carved #plainWood#", "a baseball bat", "recycled railway ties", "recycled #plainWood#", "smooth #plainWood#", "polished #plainWood#", "rough-hewn #plainWood#", "#metal#-wrapped #plainWood#", "#metal#-inlaid #plainWood#", "#plainWood# inlaid with #preciousStone#", "sentient #plainWood#", "burled #plainWood#", "#monster# ivory", "#monster#bone", "cursed #plainWood#", "an old umbrella handle", "a cricket bat", "a vintage cigarette holder", "#metal#", "whalebone", "recycled plastic", "old pencils", "rolled up newspaper", "pages from an old phonebook", "fiberglass", "reclaimed Ikea furniture", "wood from a gallows", "an old axe handle", "the stickshift of an '89 Miata", "wood from a broken guitar", "wood from a sunken ship", "holly", "sentient pearwood"],
        wandCore: ["creamy nougat", "a twizzler", "licorice", "coffee grounds", "chocolate ganache", "hairs from Dumbledore's beard", "mermaid hair", "melted #color# crayon", "heartstring of a dragon, just not a very impressive one", "#color# yarn", "#color# and #color# ribbons", "braided #monster# hair", "#monster# hair", "#monster# hair", "braided #monster# whiskers", "#bird# feathers", "compressed #substance#", "#substance#", "liquid #substance#", "#metal#"],
        wand: ["#wandAdj#, made of #wandWood# with a core of #wandCore#"],

        cockneyEnd: ["onks", "inks", "ilbo", "uggle", "iggles", "ippo", "inky", "anks", "ox", "obbles", "oks", "ago", "illy", "imby", "ips", "ix", "ixie", "oxie", "ozzer", "izz", "incy", "ancy"],
        cockneyStart: ["t", "phl", "ph", "w", "m", "n", "dr", "b", "gr", "p", "sph", "z", "qu"],
        cockney: ["#cockneyStart##cockneyEnd#"],

        latinStart: ["aqu", "port", "fidel", "fer", "fin", "incant", "corp", "lib", "collo", "ment", "conv", "cruc", "naus", "def", "del", "descr", "merc", "nih", "bomb", "emend", "asc", "av", "kedavr", "baubl", "bill", "augm", "quant", "hept", "fract", "al", "mor", "ant", "aparec", "eruct", "exult", "exum", "arr", "moment"],
        latinEnd: ["ilo", "um", "is", "ito", "o", "ingo", "a", "era", "ivo", "io", "ato", "arda", "ium", "ai", "ia", "esto", "ious"],
        latin: ["#latinStart##latinEnd#"],

        britNameStart: ["Gild", "Col", "Bust", "Lup", "Rem", "Pen", "Herm", "Row", "Hel", "Min", "Amel", "Xers", "Luc", "Nig", "Niv", "Amyr", "Reg", "Bart", "Barth", "Marv", "Wilhelm", "Call", "Anton", "Ever", "Fil", "Aug", "Arg", "Nicol", "Marc", "Alb", "Aber", "Vern", "Elph", "Rod", "Oll", "Olph", "Angel", "Prisc", "Rub", "Lucr", "Godr", "Bath", "Phin", "Phil", "Sir", "Ser", "Vinc"],
        britNameEnd: ["a", "in", "us", "eus", "ore", "etia", "eas", "us", "ivia", "en", "o", "eroy", "iope", "ephina", "erva", "ione", "ient", "yll", "yllis", "illa", "inda", "ius", "ecta", "el", "ella", "una", "inald", "ina", "icent", "iana", "usta", "astan"],
        britName: ["#britNameStart##britNameEnd#"],
        surnamePre: ["O'", "Mc", "Mac", "d'", "von "],
        britSurnameStart: "Chest Quell Quick Cress Mal West Slug Rook Sprout Witch Scrim Love Lang Short Clear Long East North River South Snith Cross Aft Aver Ever Down Whit Rob Rod Hesel Kings Queens Ed Sift For Farring Coven Craig Cath Chil Clif Grit Grand Orla Prat Milt Wrath Wilt Berk Draft Red Black".split(" "),
        britSurnameEnd: "castle hammer well wand foy master branch corn hill water haven witch bane good end scour horn wrench bottom hammer wick shire gren glen swith bury every stern deroy heart ner brath mill bly ham tine field groat well bow bone wind storm horn thorne cart bry roy ton man watch leath heath ley".split(" "),
        britSurname: ["#britSurnameStart##britSurnameEnd#", "#britSurnameEnd.capitalize#", "#surnamePre##britSurnameStart##britSurnameEnd#", "#britSurnameStart##britSurnameEnd#"],

        setName: ["[mcName:#britName#][mcSurname:#britSurname#]"],

        latinConj: ["ad", "ex", "si", "et", "aut"],

        dangerousObject: ["a long-forgotten curse", "Hagrid's pet #monster#", "a hatching #monster# egg", "dementors", "the Ministry of Magic", "magically-enhanced sexual tension", "a poorly-mixed potion", "a malfunctioning broomstick", "a mispronounced spell", "the wrong wand gesture", "an ancient curse", "drinking #drink# made with #plants# and #substance#"],

        killed: ["cursed into oblivion by #dangerousObject#", "killed by deatheaters", "#devoured# by #monster.a#", "imprisoned in Azkhaban", "blown up by #dangerousObject#"],

        professor: ["Alastor Moody", "Argus Filch", "Dolores Umbridge", "Sybill Trelawny", "Prof Sprout", "Prof McGonagall", "Dumbledore", "Snape", "Remus Lupin", "Gilderoy Lockheart", "Prof Flitwick", "Hagrid"],
        otherAdult: ["Madam Rosmerta", "Stan Shunpike", "Cornelius Fudge", "Nymphadora Tonks", "Arthur Weasley", "Rita Skeeter", "Sirius Black", "Lucius Malfoy", "Igor Karkaroff", "Peter Pettigrew", "Madame Maxine"],
        adult: ["#professor#", "#otherAdult#"],

        ancientCharacter: ["Beedle the Bard", "Nicolas Flamel", "Uric the Oddball", "Gaspard Shingleton, inventor of the self-stirring cauldron", "Egbert the Egregious", "Bathilda Bagshot", "the Bloody Baron", "Nearly Headless Nick", "Grindelwald", "The Grey Lady", "Regulus Black"],
        character: ["Victor Krum", "Dudsley Dursley", "Draco Malfoy", "Ron Weasley", "Cho Chang", "Harry Potter", "Ginny Weasley", "Hermione Granger", "Colin Creevey", "Seamus Finnigan", "Dean Thomas", "Lavender Brown", "Lee Jordan", "Neville Longbottom", "Parvati Patil", "Fred Weasley", "George Weasley", "Percy Weasley", "Oliver Wood", "Hannah Abbott", "Susan Bones", "Cedric Diggory", "Ernie Macmillan", "Justin Finch-Fletchley", "Luna Lovegood", "Millicent Bulstrode", "Vincent Crabbe", "Gregory Goyle", "Marcus Flint"],

        toLocation: ["into the Forbidden Forest", "to the Room of Requirement", "to the library", "to the dungeons", "into the secret tunnels", "into the Prefects Bathroom", "to #professor#'s office", "behind the Quiddich stands", "into Hogsmeade", "into the Shrieking Shack"],

        misbehaveWith: ["make out with", "fool around with", "smoke a joint with", "smoke muggle cigarettes with", "buy #aMagicalObject# from", "trade #fieldOfStudy# notes with", "buy illegal potions from", "practice #fieldOfStudy# with", "practice hexes on", "sell illicit hexes to", "trade smutty magazines with"],

        situation: ["attempting to apparate into #coolLocation#", "sneaking #toLocation# to #misbehaveWith# #character#", "while drunk on butterbeer", "breaking into #professor#'s office to look for #desirables#", "looking for #desirables# in #hogwartsLocation#", "fleeing from #threat#"],

        plants: ["Horklumps", "flobberworms", "goosegrass", "agapanthus flowers", "ashphodel blossoms", "baneberries", "hemlock", "silverweed", "shrivelfig", "hellebore", "cobra lilies", "starthistles", "bloodroot", "tormentil", "valeria", "mistletoe", "witch hazel", "hornbeam", "gillyweed", "gurdyroot", "Devil's Snare", "dandelion root", "fire seed", "flitterblossoms", "sneezewort", "fluxweed", "starthistle", "moondew petals", "venomous Tentacula", "puffapods", "#plainWood# bark", "vervain"],
        seaMonster: ["grindylow", "merperson", "sea serpent", "shrake", "hippocampus", "kelpie"],
        landMonster: ["manticore", "centaur", "ghoul", "troll", "unicorn", "bowtruckle", "basilisk", "chimaera"],
        flyingMonster: ["hippogriff", "griffin", "phoenix", "sphinx", "chimaera", "thestral", "common Welsh dragon", "Norwegian Ridgeback", "Hungarian Horntail"],
        monster: ["#seaMonster#", "#flyingMonster#", "#landMonster#"],

        purchaseSource: ["on ebay", "from Craigslist", "from a #personalityTrait# stranger at #shop#", "from an antique shop", "from Wizarding Wheezes", "as a birthday present"],
        monsterOrigin: ["had been living there for years", "had been summoned by #fieldOfStudy.a# class", "had been bought by Hagrid #purchaseSource#"],

        threat: ["an escaped #monster#", "#monster.a# that #monsterOrigin#", "a plague of ambulatory #plants#", "magical fallout from #dangerousObject#"],

        coolLocation: ["the Romanian Dragon Sanctuary", "the Quidditch World Cup", "a Weird Sisters concert", "a strip club", "the girls bathroom", "Hogsmeade", "a Gringott's vault", "Burning Man"],

        potionPower: ["#personalityTrait#", "fire-breathing", "water-breathing", "forgetfulness", "flying", "poison", "invisiblity", "love", "memory-enhacement"],

        second: ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"],
        duringHogwarts: ["In your #second# year,", "Just before final exams"],

        deathPre: ["#duringHogwarts.capitalize#"],
        devoured: ["mauled", "devoured", "eaten", "eviscerated"],

        incorrect: ["mislabeled", "cursed", "the wrong kind of", "too much", "expired"],
        potion: ["potion"],
        deathCause: ["you brew #potion.a# of #potionPower#. Unfortunately you made it with #incorrect# #substance# and you die horribly of #malady#", "you are trampled by a herd of #monster.s# #normalSituation#", "you are #devoured# by #angry.a# #monster# that #monsterOrigin#", "you were #devoured# by #flyingMonster.a# while attempting to fly it to #coolLocation#", "you are dragged into the lake by #angry.a# #seaMonster# #normalSituation#"],

        deathAfterwards: ["You could have been saved by #aMagicalObject#, but noone had one.", "#noOneNotices.capitalize#", "#professor# fails to revive you.", "You die later in St Mungo's Hospital.", "Your remains were used for many years by students in #fieldOfStudy#.", "Only #character# cries at your funeral", "Everyone except #character# cries at your funeral", "Years later, #character# still leaves flowers at your grave."],

        youDieAtHogwarts: ["#deathPre# #deathCause#. #deathAfterwards#. "],

        normalSituation: ["during a school picnic", "on #fieldOfStudy.a# field trip", "during #fieldOfStudy.a# lesson", "while watching the Triwizard tournament", "while trying to complete your #fieldOfStudy# final", "while gathering #plants#"],
        angry: ["enraged", "hungry", "angry", "irritable", "rabid", "confused"],

        spellName: ["#latin# #latin#", "#latin# #latin#", "#latin# ex #latin#", "#latin##latin#"],

        creature: ["#pet#", "#monster#"],
        substance: ["#color# paint", "Bertie Bott's Everyflavor beans", "#creature# milk", "#creature# blood", "butterbeer", "magic", "parchment", "milk", "broken mirrors", "quill ink", "enriched uranium", "peppermint oil", "dust", "#creature# dander", "#metal#", "garlic", "gluten", "green cheese"],
        personalityAdj: ["untrustworthy", "unreliable", "well-adjusted", "ambitious", "athletic", "charismatic", "intellectual", "artistic", "brilliant", "gifted", "distant", "wealthy", "aristocratic", "domineering", "proud", "impoverished", "gloomy", "insincere", "exuberant", "quiet", "obnoxious", "studious", "easily-distracted", "morose", "imaginative", "pleasant", "sinister"],
        personAdj: ["tall", "raven-haired", "asthmatic", "#color#-haired", "flame-haired", "silver-haired", "short", "waifish", "attractive", "unassuming", "athletic", "bespectacled", "allergic to #substance#", "#personalityAdj#", "#personalityAdj#", "#personalityAdj#", "#personalityAdj#", "#personalityAdj#", "#personalityAdj#"],

        monsterAdj: ["damaged", "baby", "balding", "elderly", "fearful", "enormous", "invisible", "#color#", "affectionate", "aggressive", "immobile", "dead", "stuffed", "playful", "enchanted", "fat", "mottled", "magical", "secretly human", "friendly", "tame", "ginger"],

        inYourYear: [" ever", "of your family", " in the last 20 years", " since #professor#", " in your year", " in the wizarding world"],

        somewhat: ["quite", "very", "tragically", "rather", "distressingly", "unfortunately", "passably", "insufficiently"],
        destiny: ["the most #personalityAdj# student #inYourYear#", "secretly the child of #adult#", " #somewhat# #personalityAdj#", "the only surviving descendent of #ancientCharacter#", "foretold as the chosen one by an ancient prophesy"],

        nicknamed: ["but people call you", "nicknamed", "but everyone insists on calling you"],

        petName: ["#britName#", "#britName#", "#britSurname#", "#britName#", "#britName#", "#britSurname#", "Mr #cockney.capitalize#", "Mrs #cockney.capitalize#"],

        noOneNotices: ["nothing changes", "this makes little difference", "this just makes things difficult", "no one notices", "no one knows this", "no one cares", "in the end it doesn't matter"],
        introduction: [", #nicknamed# #cockney.capitalize#. You are #personalityAdj# and #somewhat# #personalityAdj#. ", ", #personAdj# and #personAdj#. You have #monsterAdj.a# #pet# named #petName#. ", ". You were raised by your #personalityAdj# #relative##relativeDetail#.", ". You are #destiny#, but #noOneNotices#."],

        relativeDetail: [", the last of an ancient wizarding family", ", a famous #statusOcc#", ", #occupation#", ", #occupation#", ", who works as #occupation#", ", member of an ancient and sinister order", ", secretly a Deatheater", ", a spy for #organization#"],

        // Occupation
        deptAdj: ["misplaced", "forbidden", "hidden", "magical", "lost", "flying", "cursed", "disappearing", "sinister"],
        deptNoun: ["muggles", "artifacts", "vehicles", "medicine", "disease control", "infrastructure", "prophesy", "justice"],
        dept: ["#deptAdj.capitalizeAll# #deptNoun.capitalizeAll#", "#monster.capitalize# Services"],
        director: ["secretary", "undersecretary", "director"],
        shopclerk: ["accountant", "accounts manager", "shopclerk", "manager"],
        magicalJob: ["the #director.capitalize# of #dept#", "#shopclerk# at #shop#"],
        ranch: ["ranch", "farm", "sanctuary"],
        muggleJob: ["music teacher", "sysadmin", "physical therapist", "hairdresser", "accountant", "dentist", "insurance actuary", "veterinarian", "plumber", "lumberjack", "pinball repairman", "advertising executive", "waitress", "waiter", "short-order cook", "zoologist"],
        statusOcc: ["classical musician", "#fieldOfStudy# scholar", "Quidditch player", "writer of magical books", "author", "adventurer"],

        organization: ["the Order of the Phoenix", "the House Elf Liberation Front", "the Ministry of Magic"],
        publication: ["The Quibbler", "Witch Weekly", "Transfiguration Today", "The Daily Mail", "The Daily Prophet"],
        writer: ["editor", "correspondent", "writer"],
        occupation: ["writer for #publication#", "a muggle #muggleJob#", "a spy for #organization#", "a #shopclerk# at #shop#", "#director# at #dept#"],

        relative: ["aunt", "uncle", "grandmother", "grandfather", "mother", "father", "godfather", "godmother"],

        pet: ["owl", "rat", "cat", "#bird#", "frog", "toad", "hamster"],
        animal: ["okapi", "deer", "dolphin", "lemur", "slow loris", "three-toed sloth", "jaguar", "gnu", "yak", "coati", "wolf", "coyote", "rattlesnake", "cobra", "panda", "red panda", "opossum", "stick bug", "millipede", "centipede", "butterfly", "housecat", "sea otter", "river otter", "ostrich", "emu", "wallaby", "sheep", "ram", "stag", "doe", "donkey", "stallion", "mare", "#pet#"],
        creature: ["#pet#", "#monster#", "#animal#"],

        cause: ["bringing down the Ministry of Magic", "banning Quidditch", "freeing house elves", "enslaving house elves", "harassing muggles", "bringing back the Dark Lord", "defeating Voldemort"],

        drink: ["beer", "bootleg gin", "herbal tea", "#potionPower# potions"],

        hobby: ["looking for #aMagicalObject#", "playing Quidditch", "sneaking #toLocation# to #misbehaveWith# #character#", "photography", "collecting Chocolate Frog Cards", "playing practical jokes", "studying", "feeling superior to others", "unraveling mysteries", "playing chess"],
        voiceRange: ["mezzo-soprano", "baritone", "tenor", "bass", "alto-soprano"],
        lifestyleTrait: ["brew #drink# from #plants#", "run a secret society devoted to #cause#", "publish a newsletter", "spy for the Ministry of Magic", "#misbehaveWith# #character#", "#misbehaveWith# #character#", "#misbehaveWith# #character#", "write smutty fanfic", "write editorials for the Daily Prophet", "collect gossip for the Quibbler", "publish anonymous articles about #cause#", "try out for the Quidditch Team", "watch Quidditch", "sing #voiceRange# in the school choir", "collect Muggle artifacts", "practice dark magic", "enjoy #hobby#", "hate #hobby#", "pretend to enjoy #hobby#", "like #hobby#", "have many friends", "have no real friends"],

        side: ["right", "left"],
        bodyPart: ["head", "whole body", "liver", "heart", "blood", "skin", "#side# hand", "#side# ear", "#side# eye", "hair", "nose", "#side# foot", "#side# leg"],

        fieldOfStudy: ["Care of Magical Creatures", "Divination", "Herbology", "Transfiguration", "History of Magic", "Astronomy", "Charms", "Potions", "Arithmancy", "Muggle Studies", "Study of Ancient Runes", "Alchemy"],

        uselessPower: ["make your #bodyPart# #fallOff#", "make an enemy's #bodyPart# #fallOff#", "turn any #color# object #color#", "turn your #bodyPart# #color#", "turn #substance# into #substance#", "cause a mild garlic allergy", "cause mild exema", "find a lost umbrella, but only after buying a new one", "calculate the correct tip on a restaurant bill", "translate lost languages into other lost languages", "turn your #bodyPart# into #substance#"],

        shop: ["The Leaky Cauldron", "Ollivanders", "Honeydukes", "Weasleys' Wizard Wheezes", "Flourish & Blotts", "Borgin & Burkes", "The Three Broomsticks", "Zonko's Joke Shop", "The Hog's Head", "Scrivenshaft's Quill Shop", "St Mungo's Hospital", "Knockturn Alley"],
        realEstateLocation: ["above #shop#", "behind #shop#", "across from #shop#", "on Diagon Alley", "outside of Little Whinging", "near the Ministry of Magic", "in Hogsmeade", "outside of Hogsmeade", "near Cornwall"],
        apartment: ["cupboard under the stairs", "vast and empty mansion", "ancient ruin", "crumbling castle", "cheap flat", "pleasant cottage", "abandoned house"],

        direction: ["western", "eastern", "northern", "southern"],
        geography: ["Scotland", "Lincolnshire", "Ireland", "Yorkshire", "British Columbia", "#direction# Wales", "#direction# France", "#direction# England", "#direction# Australia"],
        location: ["#monster# farm in #geography#", "#apartment# in #geography#", "grim orphanage", "#apartment#", "bleak island off of #geography#"],

        subroom: ["hallway", "bathroom", "broom closet", "office", "dormitory", "stairwell", "alcove"],
        house: ["Ravenclaw", "Griffindor", "Hufflepuff", "Slytherin"],
        famousLocation: ["Room of Requirement", "Prefects Bathroom", "Chamber of Secrets", "Moaning Myrtle's bathroom", "passage beneath the Whomping Willow", "tunnel to Hogsmeade"],
        hogwartsLocation: ["the #famousLocation#", "#professor#'s office", "#subroom.a# in #house#", "#subroom.a# in #famousLocation#"],
        hiddenIn: ["in", "hidden in", "behind the wall of", "in a false drawer in", "in the closet", "on a shelf in"],

        hex: ["curse", "enchantment", "spell", "hex", "charm"],

        postschool: ["join a band", "work at a muggle coffeeshop", "become a moderately successful muggle #muggleJob#"],

        personalityTraitAdv: ["insufficient", "unbearable", "intense", "unfailing", "unseemly", "inappropriate", "unfortunate", "lack of", "meager"],
        personalityTrait: ["pride", "curiosity", "paranoia", "charisma", "intellect", "hard work", "lactose intolerance", "fear", "bravery", " violence", "indecisiveness", "malevolence", "mercy", "naivete", "persuasivness", "cynicism", "sarcasm", "cheerfulness", " enthusiasm", "sentimentality"],

        grades: ["mediocre NEWTs in #fieldOfStudy#", "failing grades in #fieldOfStudy#"],
        someDeliberation: ["no thought at all", "much deliberation", "minutes of argument"],
        firstYear: ["#bird.a.capitalize# delivers your Hogwarts letter to the #location# where you live. ", "Your wand is #wand#. ", "Your wand is #wand#. ", "Your wand is #wand#. ", "Your wand is #wand#. "],
        enterHogwarts: ["You are #mcName# #mcSurname##introduction# #firstYear#"],

        but: ["until", "but", "then one day"],

        isDamaged: ["never grows back", "never grows back, but you get a magical new one", "is never the same", "is deeply scarred"],

        negativeEffect: ["#character# made fun of you", "#character# snitched on you", "#professor# caught you", "#professor# deducts 10 points from your house", "are interrupted by #monster.a#", "#dangerousObject# spoils the moment", "#character# told everyone you faked it", "that only made the #monster# #angry#"],
        positiveEffect: ["winning the House Cup", "#character# was impressed", "earning the admiration of your peers"],
        effect: ["and you #doSomething#", "until interrupted by #dangerousObject#", "#positiveEffect#", "but #negativeEffect#", "though #negativeEffect#", "earning you momentary fame", "allowing you to pass #fieldOfStudy#", "though this does not help you pass #fieldOfStudy#", "though this does not help you defeat #angry.a# #monster#", "#magicalEffect#"],
        magicalEffect: ["causing you to immediately #fallOff#", "but your #bodyPart# #fallOff.firstS#"],

        desirables: ["proof of a conspiracy", "test answers", "loose change", "a secret chamber", "hidden passageways", "beer", "exam solutions", "a map to secret treasure", "a secret prophecy", "weed", "muggle cigarettes", "dirty magazines", "a potion of #potionPower#", "naked pictures of #professor#", "a stack of Chocolate Frog Cards", "signed photos of Gilderoy Lockheart"],
        butYouLoseIt: [", which you sell to #character# for #desirables#", ", but misplace it #situation#", ". Unfortunately, it is cursed, and just touching it causes your #bodyPart# to #fallOff#", " which is immediately confiscated by #professor#"],

        fallOff: ["turn invisible", "turn to #substance#", "teleport to a new dimension", "burst into flames", "turn #color#", "float to the ceiling", "disapparate", "fall to the floor", "fly away", "turn into a flock of #bird.s#", "melt"],

        lick: ["kiss", "lick", "eat", "touch"],

        provenance: ["was #hiddenIn# #hogwartsLocation#", "you found in #hogwartsLocation#", "you stole from #professor#", "you had inherited from your #relative#", "you bought on ebay", "you bought at #shop#"],
        interactWithMagicObject: ["#lick# #aMagicalObject#", "open the #mysterious# #container# #hiddenIn# #hogwartsLocation#", "put on the #mysterious# #wearable# you found #hiddenIn# #hogwartsLocation#", "use #usable.a# that #provenance#", "drink #mysterious.a# #color# potion", "mix #substance# and #substance# and drink the result"],

        instantly: ["regrettably", "unsurprisingly", "to the amusement of your peers", "to your delight, ", "unexpectedly ", "irreversibly ", "inevitably", "instantly ", "sadly"],

        respect: ["love", "envy", "respect"],
        friends: ["best friends", "cautious friends", "bitter rivals", "close friends", "secret allies", "sworn enemies", "secret lovers", "co-conspirators"],
        doSomething: ["discover a terrible secret about #character#", "fall out of love with #character#", "#fallOff#", "fail #fieldOfStudy#", "pass #fieldOfStudy#", "become #friends# with #character#", "are banned from #shop#", "gain the #respect# of your peers", "gain the #respect# of #character#", "lose the #respect# of #character#", "transmogrify into #creature.a#"],
        youDoButEffect: [".  This causes your #bodyPart# to #fallOff#. ", ". #instantly.capitalize# this causes you to #doSomething#. ", ". As a result you #doSomething#. ", ", and you #doSomething#. ", " and #instantly# you #fallOff#. ", ".  #instantly.capitalize# you #doSomething#. ", " and you learn the value of #personalityTrait#. "],

        dare: ["#character# dares you to #interactWithMagicObject##youDoButEffect#"],

        youOrSomeone: ["you", "you", "everyone at school"],

        doMagic: ["brew a potion", "cast a spell", "cast a curse", "perform a ritual"],

        reason: ["seeking power", "to impress #character#", "on a dare", "for #fieldOfStudy.a# assignment", "to amuse your friends", "when bored", "out of curiosity"],
        atSchool: ["After an encounter with #dangerousObject#, you and #character# become #friends#. ", "#reason.capitalize#, you #interactWithMagicObject##youDoButEffect#", "#reason.capitalize#, you #interactWithMagicObject##youDoButEffect#", "#reason.capitalize#, you #interactWithMagicObject##youDoButEffect#", "#dare#", "#dare#", "#dare#", "You find #aMagicalObject# #hiddenIn# #hogwartsLocation##butYouLoseIt#. ", "You summon a patronus once, #creature.a#, #effect#.", "You and #character# #doMagic# to #doSomething##youDoButEffect#. ", "At Hogwarts, you master only one spell: '#spellName#', a #hex# to #uselessPower#. ", "You find #aMagicalObject##butYouLoseIt#. ", "After an encounter with #dangerousObject#, your #bodyPart# #isDamaged#. ", "You and #character# #lifestyleTrait#. ", "You and #character# #lifestyleTrait#. ", "You and #character# #lifestyleTrait#, #effect#. ", "Your #personalityTraitAdv# #personalityTrait# leads you to #dangerousObject##youDoButEffect#", "You and #character# #lifestyleTrait# and #lifestyleTrait#. ", "Between classes, you #lifestyleTrait# and #lifestyleTrait#. ", "You #lifestyleTrait# and #lifestyleTrait#, #effect#.", "Like most students, you #lifestyleTrait# and #lifestyleTrait#. ", "Unknown to your classmates, you secretly #lifestyleTrait#. ", "Your entire #fieldOfStudy# class is #killed#, but you escape by #trick#. "],
        trick: ["hiding behind a desk", "being in on the conspiracy", "missing class", "being at a Quidditch match", "using a counter-hex", "being saved by #professor#", "sneaking away", "playing dead", "crying"],

        hookupWith: ["marry", "hook up with", "drunkenly make out with", "get in an online flamewar with", "start a band with", "do tequila shots with"],

        gettingGrades: ["long hours of study", "extensive bribery", "encouragement from #professor#", "excelling at #fieldOfStudy#"],

        youLeaveHogwarts: ["Despite #gettingGrades# you drop out of Hogwarts to #postschool#. ", "#professor# catches you sneaking #toLocation# to #misbehaveWith# #character# and you are expelled.", "You graduate with #grades# and move back into your ancestral home, #apartment.a# #realEstateLocation#. "],

        maladyStart: ["doom", "dread", "gribble", "expulso", "dragon", "flobbo", "narco", "melto", "mumble", "phlargle", "fire", "ash"],
        maladyEnd: ["bones", "blood", "gout", "cancer", "worms", "pox", "mumps", "fever", "flu", "mange", "death"],
        malady: ["accute #maladyStart##maladyEnd#", "lycanthropy", "completely non-magical cancer"],

        betterPotion: ["more powerful", "better-tasting", "faster-acting", "cheaper"],
        fancyThing: ["a cure for #maladyStart##maladyEnd#", "#betterPotion# potion of #potionPower#", "a faster-acting #drink#", "immortality#"],

        postSchool: ["After graduation you rent #apartment.a# #realEstateLocation# and work as #magicalJob#. ", "After graduation you work at your #relative#'s #monster# #ranch#. "],

        postSchoolDeath: ["Years later, you #hookupWith# a recently-divorced #character#.", "#eventually.capitalize#, you die in an incident involving #dangerousObject#.", "#eventually.capitalize#, you die in an incident involving #dangerousObject# that #provenance#.", "#eventually.capitalize#, you and #character# die in an incident involving #dangerousObject#.", "#eventually.capitalize#, you perish from #malady#."],

        eventually: ["eventually", "many years later", "years later"],

        // Structure
        origin: ["#setName##enterHogwarts#<p>#atSchool##atSchool#<p>#youDieAtHogwarts#", "#setName##enterHogwarts#<p>#atSchool##atSchool##youLeaveHogwarts#<p>#postSchoolDeath#", "#setName##enterHogwarts#<p>#atSchool##atSchool#<p>#postSchool##postSchoolDeath#"],


    },

    webtest: {
        hashtag: ["tracery", "botally", "fiction", "games", "ftw", "literature", "bobross", "twitch", "procjam", "icids15", "nanogenmo"],
        digit: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        emoji: ["&\\#128169;", "&\\#12816#digit#;", "&\\#128#digit##digit##digit#;", "&\\#128#digit##digit##digit#;", "&\\#128#digit##digit##digit#;", "&\\#128#digit##digit##digit#;"],
        imgURL: ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Cucciolo_gatto_Bibo.jpg/1920px-Cucciolo_gatto_Bibo.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Young_cats.jpg/1920px-Young_cats.jpg", "https://upload.wikimedia.org/wikipedia/commons/c/cf/Stray_kitten_Rambo001.jpg"],
        img: "<img src='#imgURL#' width=200 /><br>",
        style: 'style="color:blue;display:inline-block;"',
        origin: "<div #style#>#img# \\##hashtag# \\##hashtag# #emoji# #emoji# #emoji# #emoji#</div>"
    },

    art: {
        hexDigit: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
        digit: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],

        color: ["\\##hexDigit##hexDigit##hexDigit##hexDigit##hexDigit##hexDigit#"],
        shape: ['rect width="#num#" height="#num#" x="#num#" y="#num#"', 'circle cx="#num#" cy="#num#" r="#num#"', 'polygon points="#num#,#num# #num#,#num# #num#,#num#"'],

        num: ["#digit##digit#"],
        stroke: ['stroke="#color#" stroke-width="#digit#" stroke-opacity="0.#digit#"', ""],
        fill: ['fill="#color#" fill-opacity="0.#digit#"'],
        makeShape: ["<#shape# #stroke# #fill# />"],
        bg: ["<rect width='300' height='300' x='-100' y='-100' fill='#color#' />"],
        origin: ['<svg width="100" height="100">#bg##makeShape##makeShape##makeShape##makeShape##makeShape##makeShape##makeShape#</svg>']
    },

    landscape: {
        origin: "[myPlace:#path#]#line#",
        line: ["#mood.capitalize# and #mood#, the #myPlace# was #mood# with #substance#", "#nearby.capitalize# #myPlace.a# #move.ed# through the #path#, filling me with #substance#"],

        nearby: ["beyond the #path#", "far away", "ahead", "behind me"],
        substance: ["light", "reflections", "mist", "shadow", "darkness", "brightness", "gaiety", "merriment"],
        mood: ["overcast", "alight", "clear", "darkened", "blue", "shadowed", "illuminated", "silver", "cool", "warm", "summer-warmed"],
        path: ["stream", "brook", "path", "ravine", "forest", "fence", "stone wall"],
        move: ["spiral", "twirl", "curl", "dance", "twine", "weave", "meander", "wander", "flow"],
    },

    nightvale: {
        introTheWeather: ["And now, the weather."],
        instrument: ["ukulele", "vocals", "guitar", "clarinet", "piano", "harmonica", "sitar", "tabla", "harp", "dulcimer", "violin", "accordion", "concertina", "fiddle", "tamborine", "bagpipe", "harpsichord", "euphonium"],
        musicModifier: ["heavy", "soft", "acoustic", "psychedelic", "light", "orchestral", "operatic", "distorted", "echoing", "melodic", "atonal", "arhythmic", "rhythmic", "electronic"],
        musicGenre: ["metal", "electofunk", "jazz", "salsa", "klezmer", "zydeco", "blues", "mariachi", "flamenco", "pop", "rap", "soul", "gospel", "buegrass", "swing", "folk"],
        musicPlays: ["echoes out", "reverberates", "rises", "plays"],
        musicAdv: ["too quietly to hear", "into dissonance", "into a minor chord", "changing tempo", "to a major chord", "staccatto", "into harmony", "without warning", "briskly", "under the melody", "gently", "becoming #musicGenre#"],
        song: ["melody", "dirge", "ballad", "poem", "beat poetry", "slam poetry", "spoken word performance", "hymn", "song", "tone poem", "symphony"],
        musicAdj: ["yielding", "firm", "joyful", "catchy", "folksy", "harsh", "strong", "soaring", "rising", "falling", "fading", "frantic", "calm", "childlike", "rough", "sensual", "erotic", "frightened", "sorrowful", "gruff", "smooth"],
        themeAdj: ["lost", "desired", "redeemed", "awakened", "forgotten", "promised", "broken", "forgiven", "remembered", "betrayed"],
        themeNoun: ["the future", "love", "drinking", "space travel", "the railroad", "your childhood", "summertime", "the ocean", "sexuality", "wanderlust", "war", "divorce", "nature", "pain", "hope", "a home", "a lover", "a friend", "a marriage", "family", "death"],
        theme: ["#themeNoun# #themeAdj#"],
        weatherSentence: ["You recall #themeNoun# and #themeNoun#.", "It reminds you of the time you had #themeAdj# #themeNoun#.", "This is #musicAdj.a# #song# about #musicTopic#.", "#musicTopic.capitalize# is like #theme#, #musicAdj#.", "The singer's voice is #musicAdj#, #musicAdj#, yet #musicAdj#.", "#musicModifier.capitalize# #musicGenre# #instrument# #musicPlays# #musicAdv#."],
        weatherDescription: ["#weatherSentence# #weatherSentence#"],
        theWeather: ["#introTheWeather#<p class='weather'>Music plays. #[musicTopic:#theme#]weatherDescription#"],
        react: ["shake", "moan", "cry", "scream", "wail", "rejoice", "dance", "cower", "howl"],

        color: "orange blue white black grey purple indigo".split(" "),
        animal: "spider raven crow scorpion coyote eagle owl lizard deer".split(" "),
        concept: "#substance# #emotion# darkness love childhood time loss victory memory art thought belief life death caring".split(" "),
        transitiveEmotion: ["fear", "regret", "long for", "love", "distrust", "trust", "envy", "care for"],
        sense: ["feel", "hear", "see", "know"],

        natureNoun: ["ocean", "mountain", "forest", "cloud", "river", "tree", "sky", "earth", "void", "desert"],
        concreteNoun: ["#animal#", "#natureNoun#"],
        verb: ["#transitiveEmotion#", "#react#"],
        never: ["never", "never again", "hardly ever", "barely", "almost always", "always", "probably never", "even"],

        glowing: ["glowing", "rising", "hovering", "pulsing", "blinking", "glistening"],
        beingWith: ["talking to", "walking with", "listening to"],
        weirdAdj: ["weird", "arcane", "dark"],
        truly: ["safely", "truly", "legally", "ever", "already"],
        person: ["angel", "woman", "man", "figure"],
        character: ["#charAdj# #person#"],
        charAdj: ["old", "young", "hooded", "headless", "dead-eyed", "faceless"],
        charDescription: ["#never# #react.s# when they #sense# the #natureNoun#"],
        arentReal: ["are illegal", "don't exist"],
        ofCourse: ["obviously", "well, clearly", "seriously", "as we #truly# know", "as everybody knows"],

        youKnow: ["#ofCourse#", "I mean", "well", "I guess", "you know", "#maybe#"],
        episode: ["This is a story about #mc.a#. You know, the #mc# who #mcDesc#. Well, I was #beingWith# the #mc#, when we both saw this #myNoun#.  #glowing.capitalize#, #color#...well, more of #color.a#ish #color#.   We backed away because #ofCourse#, #myNoun.s# #arentReal#. That was the last we saw of it. #theWeather#  <p>You know, I miss the #myNoun#.  It was #evaluationAdj#.  I mean, #evaluationAdj#, for a #myNoun#.  #someday.capitalize#, I hope it comes back.  We'll see it, #glowing#, #color#...well, more of #color.a#ish #color#.  But it'll be back. #youKnow.capitalize#, #someday#. If not, #vagueReaction#. "],

        anyway: ["anyway", "in such a world as this", "if it were truly so", "if anything ever was"],
        butThen: ["but then", "if you could imagine", "for certain"],
        ominousStatement: ["who could you #truly# #transitiveEmotion#, #anyway#?", "if you understand my meaning.", "everyone knows that.", "you had known that for years.", "you knew that already."],
        recommend: ["mandate", "recommend", "advise", "suggest"],
        asMyGrandmotherSaid: ["as #authority# always said", "as #authority# tells us", "as #recommend.ed# by #authority#"],
        substance: "blood sand dust nothingness darkness light soil earth mud tar water bones flies honey".split(" "),
        emotion: "fear love trust desire pride sorrow regret confusion glee happiness contentment terror anger rage jealousy".split(" "),
        evaluationAdjBare: ["good", "great", "wonderful", "terrifying", "bewildering", "perfect", "beautiful", "terrible"],
        evaluationAdj: ["just #evaluationAdjBare#", "pretty #evaluationAdjBare#", "#evaluationAdjBare#", "really #evaluationAdjBare#"],
        maybe: ["I think", "maybe", "probably", "almost certainly"],
        someday: ["in the end", "if the sun rises again", "when the time comes", "in a while", "eventually", "sooner or later"],
        relative: ["mother", "father", "grandmother", "grandfather"],
        authority: ["the government", "the sheriff's secret police", "the law", "the radiochip implanted in your mind", "the Constitution", "a secret, yet menacing government society", "your own #relative#", "my own #relative#"],
        fullOf: ["full of", "covered in", "made of"],

        vagueReaction: ["we all #react# and #react# in #emotion#", "it's about time", "it's #evaluationAdj#", "it's just so #evaluationAdj#", "I couldn't be happier", "isn't that #evaluationAdj#", "there's nothing that can be done", "but it hasn't always been that way", "but it won't always be that way"],
        foo: ["#never# trust a #concreteNoun#. You can trust a #concreteNoun#, #maybe#", "I #verb#, therefore I am", "it's #concreteNoun.s# all the way down", "#concept# is the new #concept#", "the only good #concreteNoun# is a dead #concreteNoun#"],

        saying: ["Don't #transitiveEmotion# the #myThing# because the #myThing# is #fullOf# #mySub#.  You will be #fullOf# #mySub#, too, #someday#.", "The #myThing# #react.s#.  The #myThing# #react.s#. The #myThing# #react.s# with #emotion# because it #sense.s# the #concept# that it will never have.", "We #sense# the #myThing# and #react# with #emotion#.  You #sense# the #myThing# and #react# with #emotion#.  The #myThing# #sense.s# you but does not #react#.", "The #natureNoun# is made of #mySub#. The #natureNoun# is made of #mySub#. We are all made of #mySub# and #vagueReaction#.", "[emo1:#transitiveEmotion#]#never.capitalize# #emo1# #concept#. Only ever #emo1# #concept#.  How could you #emo1# what you can #never# #sense#?"],
        origin: ["[myThing:#concreteNoun#][mySub:#substance#]#saying#<p>Welcome to Night Vale. <p>...</p>[mc:#character#][mcDesc:#charDescription#][myNoun:#concreteNoun#]#episode#<p>...</p>Goodnight, Night Vale, goodnight."]
    },

    poem: {
        move: ["flock", "race", "glide", "dance", "flee", "lie"],

        bird: ["swan", "heron", "sparrow", "swallow", "wren", "robin"],
        agent: ["cloud", "wave", "#bird#", "boat", "ship"],

        transVerb: ["forget", "plant", "greet", "remember", "embrace", "feel", "love"],
        emotion: ["sorrow", "gladness", "joy", "heartache", "love", "forgiveness", "grace"],
        substance: ["#emotion#", "mist", "fog", "glass", "silver", "rain", "dew", "cloud", "virtue", "sun", "shadow", "gold", "light", "darkness"],
        adj: ["fair", "bright", "splendid", "divine", "inseparable", "fine", "lazy", "grand", "slow", "quick", "graceful", "grave", "clear", "faint", "dreary"],
        doThing: ["come", "move", "cry", "weep", "laugh", "dream"],

        verb: ["fleck", "grace", "bless", "dapple", "touch", "caress", "smooth", "crown", "veil"],
        ground: ["glen", "river", "vale", "sea", "meadow", "forest", "glade", "grass", "sky", "waves"],

        poeticAdj: ["#substance#-#verb.ed#"],
        poeticDesc: ["#poeticAdj#", "by #substance# #verb#'d", "#adj# with #substance#", "#verb.ed# with #substance#"],

        ah: ["ah", "alas", "oh", "yet", "but", "and"],
        on: ["on", "in", "above", "beneath", "under", "by"],

        punctutation: [",", ":", " ", "!", ".", "?"],

        noun: ["#ground#", "#agent#"],
        line: ["My #noun#, #poeticDesc#, my #adj# one", "More #adj# than #noun# #poeticDesc#", "#move.capitalize# with me #on# #poeticAdj# #ground#", "The #agent.s# #move#, #adj# and #adj#", "#poeticDesc.capitalize#, #poeticDesc#, #ah#, #poeticDesc#", "How #adj# is the #poeticDesc# #sub#", "#poeticDesc.capitalize# with #emotion#, #transVerb.s# the #noun#"],
        poem: ["#line##punctutation#<br>#line##punctutation#<br>#line##punctutation#<br>#line#."],
        origin: "#[sub:#noun#]poem#",
    },

    conference: {
        "greetings": ["Salud", "Bonjour", "Shalom", "Nihao", "Hello", "Aloha"],
        "subjectAdj": ["Digital", "Electronic", "Telekinetic", "Virtual", "Interactive"],
        "subjectNoun": ["Storytelling", "Narrative", "Intelligence", "Art", "Media", "Games"],
        "subject": ["#subjectAdj# #subjectNoun#", "#reimagining# #subjectAdj# #subjectNoun#"],
        "reimagining": ["Advancing", "The Future of", "Reimagining", "Inventing", "Reinventing", "New Directions in"],
        "area": ["Brazil", "Kauai", "Cape Verde", "Shanghai", "Barsoom", "Utopia", "Anchorage", "Europa", "Discworld", "world", "Miami", "Santa Cruz"],
        "institute": ["Academy", "Guild", "Symposium", "Hall", "Center", "University", "Laboratory", "Library", "Association"],
        "conference": ["Conference", "Workshop", "Symposium", "Forum"],
        "place": ["#area# #institute# of #subject#", "#subject# #institute# of #area#", "#conference# on #subject#"],

        "controls": ["keyboard", "mouse", "interpretive dance", "set of mechanical levers", "series of yelps and howls", "pattern of vocal ululations", "joystick", "Kinect", "EEG headset", "DDR mat", "Powerglove", "midi keyboard", "plastic guitar"],
        "hardware": ["Arduino", "Raspberry PI", "XBox360", "Android", "Altair 8800", "Commodore 64", "hacked toaster", "jail-broken iPhone", "Apple Lisa", "computer running Windows 95"],
        "display": ["shadow puppetry screen", "a set of teleprescence robots", "70mm film projector", "Sony Aibo", "vintage VCR", "Atari 2600", "Soviet-era military screen", "VirtualBoy", "Oculus Rift", "1957 oscilloscope", "1977 Apple II", "40ft projection"],
        "showSpace": ["the outside of DANM", "the inside of the DARC lab", "the DANM stairwell", "the women's restroom", "the UCSC cattle pens"],
        "useCase": ["exploring themes of #abstractThing#", "using the lens of #litDevice# from #field#", "in a one-time performance", "for the blind", "to be projected on #showSpace#", "played on a #hardware#", "running on a #hardware#", "shown on a #display#"],
        "culturalProduction": ["drama", "reality television show", "children's game", "playground rhyme", "poem", "novel", "jazz perfomance", "folk song", "puppet show", "opera", "theater performance", "poem", "musical production", "religious ceremony"],
        "digitalArtifact": ["webapp", "tabletop RPG", "open world game", "interactive #culturalProduction#", "digitally-enhanced #culturalProduction#", "hypertext fiction", "chose-your-own-adventure", "text adventure", "Flash-animated #culturalProduction#", "interactive #culturalProduction#", "Twine game"],
        "litDevice": ["iambic pentameter", "intersectional feminism", "alliteration", "parody", "the feeling of agency", "first-person narration", "magical realism", "unreliable narration", "foreshadowing", "irony", "frame stories", "breaking the fourth wall", "oral storytelling", "the 'hero' journey'", "the American dream", "gender roles", "plot structure", "character development", "the myth of Sisyphus", "the 'other'", "technological literacy", "narrative structure"],
        "field": ["the #nationality# diaspora", "contemporary American #culturalProduction.s#", "the #nationality#-American experience", "traditional #nationality# #culturalProduction.s#"],
        "setting": ["Edo Japan", "Medieval France", "graduate school", "the basement of the British Museum", "a neighborhood bar", "a suburban home", "a coffeeshop at closing time", "Weimar Germany", "a prison in an unnamed country", "1950s San Francisco", "pre-Columbian Mesoamerica", "ancient Egypt", "an era of space exploration", "a time far in the future", "a time before #abstractThing#", "London in the 60s", "high school in the 1980s", "the height of the drug wars"],
        "abstractThing": ["internal turmoil", "regret", "alcoholism", "body dysmorphia", "first dates", "coming-of-age", "passion", "love", "quiet desperation", "deperate loneliness", "hatred", "world-changing choices", "#nationality# imperialism", "#nationality# pride", "deep sorrows", "immeasurable loss", "rising hope", "boundless despair", "laughter", "societal disapproval", "instability", "difficult choices", "sacrifice", "cruel betrayal"],
        "someDramaticStuff": ["#abstractThing# in a time of #abstractThing#"],
        "influence": ["influence"],
        "person": ["a Mary-Sue character", "a strugging artist", "a teenage girl", "a nameless child", "an elderly woman", "an invisible observer", "an old man", "a young boy", "the author", "a cat", "a famous historical figure", "a high-ranking official"],
        "aProtagonist": ["#person#", "#person# lost in #setting#", "#person# in #setting#"],
        "tellTheStory": ["relate a tale", "paint a picture", "simulate the experience", "spin a story", "describe a world", "tell"],
        "examination": ["examination", "reimagining", "interpretation", "appropriation", "mythologization", "colonization", "deconstruction", "(de)#examination#", "(re)#examination#"],
        "complexTopic": ["#litDevice# in #field#"],
        "system": ["a neural network", "a procedural system", "an advanced AI", "a decision tree"],
        "explore": ["navigate", "control", "explore", "interact"],
        "implementedOn": ["as instantiated on", "proceduralized with", "controlled by", "simulated on"],
        "project": ["#litDevice.capitalize# and #litDevice# #tellTheStory# of #abstractThing# in this #digitalArtifact# about #aProtagonist#.", "#abstractThing.capitalize# in #setting# is explored with #litDevice# #implementedOn# a #digitalArtifact#.", "#useCase.capitalize#, #aProtagonist# is used to #tellTheStory# of #abstractThing# using #litDevice#, as #implementedOn# a #hardware#.", "A #examination# of #litDevice# to explore #abstractThing# in a #digitalArtifact#", "The user #explore.s# with #aProtagonist# and must defeat #abstractThing# using a #controls# to activate #abstractThing#, but can only experience their world through a #display#.", "A #culturalProduction# performed on #display#, which the user #explore.s# with a #controls#.", "A project to #tellTheStory# of #aProtagonist# and their #abstractThing#, with a #digitalArtifact#.", "#system.capitalize# to implement #litDevice# for #digitalArtifact.s#, #useCase#.", "A #examination# of themes of #abstractThing#,  using #litDevice# in a #digitalArtifact#.", "A #digitalArtifact# about #complexTopic#, #useCase#.", "A #digitalArtifact# using #litDevice# and #litDevice# to #tellTheStory# of #someDramaticStuff#"],
        "nationality": ["North #nationality#", "West #nationality#", "Outer #nationality#", "New #nationality#", "Mongolian", "Merovingian", "Californian", "Texan", "Viennese", "Indonesian", "Malaysian", "Gibraltan", "Roman", "Hungarian", "Transylvanian", "Iowan", "Minnesotan", "Guatemalan", "Cantonese", "Irish", "Caspian", "Eurasian", "Pan-American", "Frankish", "Byzantine", "Alexandrian", "Persian", "Mongolian"],
        "titlePart": ["#subjectAdj# ", "Psycho", "Out", "Neuro", "Tele", "Cyber", "Flash", "Re:", "De", "Un", "Dys"],
        "titleNoun": ["#culturalProduction#", " Spaces", "the Praxis", "Text", "the Text", "Academia", "Presence", "Experience", "the Divine", "the diaspora", "#field#", "#field#"],
        "titleMod": ["No", "Only", "New", "#titleVerb#"],
        "titleVerb": ["finding", "interrogating", "stabilizing", "navigating", "being", "uncovering", "mixing", "freeing", "appropriating", "searching"],
        "title": ["#titleMod# #titleNoun#", "#titlePart.capitalize##titlePart.capitalize##titleVerb# #titleNoun#", "#titlePart.capitalize##titleVerb.capitalize#"],

        "projectDesc": "<b>#title#:</b> #project#",
        "origin": "<h3>#greetings#, and welcome to the #place#</h3><p>Schedule:</p><p>#projectDesc#<p>#projectDesc#<p>#projectDesc#"
    },

    scifi: {

        firstSyl: "B C D F G Z St Fl Bl Pr Kr Ll Chr Sk Br Sth  H J K L M N P Qu R S T V W X Y Z  Ch Dhr Dr Sl Sc Sh Thl Thr Pl Fr Phr Phl Wh".split(" "),
        middleSyl: "an all ar art air aean af av ant app ab er en eor eon ent enth irt ian ion iont ill il ipp in is it ik ob ov orb oon ion uk uf un ull urk estr antr okl ackl".split(" "),
        lastSyl: "a ia ea u y en am is on an o io i el ios ax ox ix ex izz ius ian ean ekang anth".split(" "),

        butchName: ["Chesty", "Manley", "Brock", "Stone", "Brick", "Butch", "Bruce", "Steel", "Saber", "Tex", "Rock", "Drake", "Ace", "Knute", "Wolf", "Thorax", "Brad", "Abs", "Burt", "Slate", "Bret", "Duke"],
        alienName: ["#firstSyl##middleSyl##lastSyl#", "#firstSyl##lastSyl#", "#firstSyl##lastSyl#-#firstSyl##lastSyl#"],

        physicsParticle: ["quark", "photon", "lepton", "muon"],
        scienceVerb: ["evaporate", "decay", "phase-shift", "teleport", "destabilize", "sublimate"],
        scienceBlargleStart: ["holo", "hyper", "transmuto", "digi", "nano", "electro", "transma", "magna"],

        communicationDevice: ["#physicsParticle#-transmitter", "#scienceBlargleStart#phone", "#scienceBlargleStart#pager", "#scienceBlargleStart#beeper", "#scienceBlargleStart#view", "#scienceBlargleStart#scope", "#scienceBlargleStart#cam"],

        shortTime: ["in a sec", "right now", "two clicks", "a moment's time", "the blink of an eye", "no time at all", "the time it takes a single unstable #physicsParticle# to #scienceVerb#", "#firstSyl##middleSyl#sday"],
        conversationally: ["expressively", "noncommitally", "with relief", "dispassionately"],
        mcResponded: ["'That was unexpected,' #mc# said.", "#mc# shrugged #conversationally#", "#mc# sighed #conversationally#"],

        transitPlain: ["bus", "plane", "jet", "tram", "rail", "tube", "beam"],
        transitMod: ["nonstop", "express", "commuter", "prismatic", "red-eye", "pneumatic", "crosstown"],
        transportSystem: ["#scienceBlargleStart##transitPlain#", "#transitMod# #scienceBlargleStart# #transitPlain#"],
        travelPlot: ["#mc# punched '#mcDestinationSystem#' into the #communicationDevice#. There was still one ticket left on the #transportSystem#, but he'd have to take a #transportSystem# the rest of the way to Planet #mcDestination#.'"],

        sexy: ["muscled", "sexy", "dark", "well-dressed", "masculine", "dramatic", "dramatically lit", "boyish", "burly", "handsome", "erotic", "many-bossomed", "supple", "nude"],
        occupation: ["lumberjack", "firefighter", "scientist", "spy", "wizard", "radio broadcaster", "smuggler", "mechanic", "astronaut", "adventurer", "pirate", "cowboy", "vampire", "detective", "soldier", "marine", "doctor", "ninja", "waitress", "burlesque dancer", "ballerina", "opera singer", "gogo dancer", "rollerskater"],

        vipTitle: ["Vice President", "Mr.", "Detective", "Senator", "Chairman", "Princess", "Lord", "Lady", "Professor", "Grand Inquisistor", "High Priest", "President"],
        boss: ["#vipTitle# #alienName#"],

        artFormBasic: ["novel", "sculpture", "film", "painting", "poem", "play"],
        artForm: ["prisma#artFormBasic#", "holo#artFormBasic#", "photo#artFormBasic#", "hyper#artFormBasic#"],
        artDemand: ["'Your #mcArt# is late, #mc#', shrieked #mcBoss# over the #communicationDevice#.", "'I need that #mcArt# by #shortTime#' yelled #mcBoss#.", "'Where's the #mcArt#, #mc#? You promised it'd be finished by last #firstSyl##middleSyl#sday,' #mcBoss#'s voice came through the #communicationDevice#."],
        artQuest: ["The only thing that could really, I mean really, inspire a #mcArt# would be the famously #sexy# #occupation.s# of Planet #mcDestination# and for that, he'd have to go to the #mcDestinationSystem# system. #travelPlot#"],
        artPlot: ["#artDemand#  'Yeah, I'll have it done in #shortTime#', #mc# promised, hanging up the #communicationDevice#. #mcResponded#.#[mcDestination:#alienName#][mcDestinationSystem:#alienName#]artQuest#"],

        plot: ["#[mcArt:#artForm#][mcBoss:#boss#]artPlot#"],

        origin: ["#[mc:#butchName#]plot#"]

    },

};