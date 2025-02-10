require('dotenv').config('../.env');

const mongoose = require("mongoose");

const Book = require("../models/bookModel");


const MONGODB_URL = "mongodb://localhost:27017/book0_db";

console.log(MONGODB_URL)

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const bookData =  [
  {
    title: "The Priory of the Orange Tree",
    author: "Samantha Shannon",
    genre: "Fantasy",
    description: "A standalone epic fantasy with dragons and forbidden magic.",
    cover_image: "/images/priory-of-the-orange-tree.jpg",
    publication_date: new Date("2019-02-26"),
    number_of_reviews: 23312,
    average_rating: 4.3
  },
  {
    title: "Circe",
    author: "Madeline Miller",
    genre: "Fantasy",
    description: "A retelling of the mythological life of Circe, a sorceress.",
    cover_image: "/images/circe.jpg",
    publication_date: new Date("2018-04-10"),
    number_of_reviews: 34567,
    average_rating: 4.5
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    genre: "Science Fiction",
    description: "A stranded astronaut struggles to survive on Mars.",
    cover_image: "/images/the-martian.jpg",
    publication_date: new Date("2014-02-11"),
    number_of_reviews: 56432,
    average_rating: 4.6
  },
  {
    title: "The Power",
    author: "Naomi Alderman",
    genre: "Science Fiction",
    description: "A speculative novel about a sudden shift in gender power dynamics.",
    cover_image: "/images/the-power.jpg",
    publication_date: new Date("2016-10-27"),
    number_of_reviews: 22412,
    average_rating: 4.1
  },
  {
    title: "Into Thin Air",
    author: "Jon Krakauer",
    genre: "Adventure",
    description: "A personal account of the 1996 Mount Everest disaster.",
    cover_image: "/images/into-thin-air.jpg",
    publication_date: new Date("1997-05-19"),
    number_of_reviews: 45533,
    average_rating: 4.4
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    description: "A fable about following your dreams and discovering your destiny.",
    cover_image: "/images/the-alchemist.jpg",
    publication_date: new Date("1988-05-01"),
    number_of_reviews: 90512,
    average_rating: 4.3
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    genre: "Fiction",
    description: "A coming-of-age mystery set in the marshlands of North Carolina.",
    cover_image: "/images/where-the-crawdads-sing.jpg",
    publication_date: new Date("2018-08-14"),
    number_of_reviews: 76532,
    average_rating: 4.6
  },
  {
    title: "The Road",
    author: "Cormac McCarthy",
    genre: "Fiction",
    description: "A dystopian story of a father and son trying to survive.",
    cover_image: "/images/the-road.jpg",
    publication_date: new Date("2006-09-26"),
    number_of_reviews: 38214,
    average_rating: 4.2
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    genre: "Non-Fiction",
    description: "A memoir of the former First Lady of the United States.",
    cover_image: "/images/becoming.jpg",
    publication_date: new Date("2018-11-13"),
    number_of_reviews: 234512,
    average_rating: 4.8
  },
  {
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    genre: "Non-Fiction",
    description: "The story of a woman whose cells revolutionized medicine.",
    cover_image: "/images/henrietta-lacks.jpg",
    publication_date: new Date("2010-02-02"),
    number_of_reviews: 41235,
    average_rating: 4.5
  },
  {
    title: "The Water Dancer",
    author: "Ta-Nehisi Coates",
    genre: "Fiction",
    description: "A magical realism tale of a man with a mysterious power.",
    cover_image: "/images/the-water-dancer.jpg",
    publication_date: new Date("2019-09-24"),
    number_of_reviews: 15673,
    average_rating: 4.2
  },
  {
    title: "The Rosie Project",
    author: "Graeme Simsion",
    genre: "Fiction",
    description: "A romantic comedy featuring a socially awkward professor.",
    cover_image: "/images/the-rosie-project.jpg",
    publication_date: new Date("2013-01-30"),
    number_of_reviews: 29401,
    average_rating: 4.3
  },
  {
    title: "The Fifth Season",
    author: "N.K. Jemisin",
    genre: "Fantasy",
    description: "A world-ending cataclysm changes the fate of three women.",
    cover_image: "/images/the-fifth-season.jpg",
    publication_date: new Date("2015-08-04"),
    number_of_reviews: 34123,
    average_rating: 4.6
  },
  {
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    genre: "Fantasy",
    description: "A whimsical story of a government worker visiting a magical orphanage.",
    cover_image: "/images/cerulean-sea.jpg",
    publication_date: new Date("2020-03-17"),
    number_of_reviews: 56312,
    average_rating: 4.7
  },
  {
    title: "Leviathan Wakes",
    author: "James S.A. Corey",
    genre: "Science Fiction",
    description: "A thrilling space opera set in a colonized solar system.",
    cover_image: "/images/leviathan-wakes.jpg",
    publication_date: new Date("2011-06-15"),
    number_of_reviews: 42345,
    average_rating: 4.5
  },
  {
    title: "Recursion",
    author: "Blake Crouch",
    genre: "Science Fiction",
    description: "A mind-bending thriller about time, memory, and alternate realities.",
    cover_image: "/images/recursion.jpg",
    publication_date: new Date("2019-06-11"),
    number_of_reviews: 37654,
    average_rating: 4.6
  },
  {
    title: "The Lying Game",
    author: "Ruth Ware",
    genre: "Mystery",
    description: "Four friends are bound by a deadly secret from their past.",
    cover_image: "/images/the-lying-game.jpg",
    publication_date: new Date("2017-07-25"),
    number_of_reviews: 23412,
    average_rating: 4.1
  },
  {
    title: "The Couple Next Door",
    author: "Shari Lapena",
    genre: "Mystery",
    description: "A domestic thriller about secrets and betrayal.",
    cover_image: "/images/couple-next-door.jpg",
    publication_date: new Date("2016-07-14"),
    number_of_reviews: 42134,
    average_rating: 4.0
  },
  {
    title: "Before We Were Strangers",
    author: "Renée Carlino",
    genre: "Fiction",
    description: "A heartwarming second-chance romance.",
    cover_image: "/images/before-we-were-strangers.jpg",
    publication_date: new Date("2015-08-18"),
    number_of_reviews: 18234,
    average_rating: 4.4
  }
  ,
    {
      title: "An Absolutely Remarkable Thing",
      author: "Hank Green",
      genre: "Science Fiction",
      description: "A mysterious sculpture appears, triggering global intrigue and chaos.",
      cover_image: "/images/absolutely-remarkable-thing.jpg",
      publication_date: new Date("2018-09-25"),
      number_of_reviews: 25123,
      average_rating: 4.2
    },
    {
      title: "Red Queen",
      author: "Victoria Aveyard",
      genre: "Fantasy",
      description: "A world divided by blood—red or silver—determines your fate.",
      cover_image: "/images/red-queen.jpg",
      publication_date: new Date("2015-02-10"),
      number_of_reviews: 53412,
      average_rating: 4.1
    },
    {
      title: "The City We Became",
      author: "N.K. Jemisin",
      genre: "Fantasy",
      description: "Five New Yorkers must defend their city from a dark force.",
      cover_image: "/images/city-we-became.jpg",
      publication_date: new Date("2020-03-24"),
      number_of_reviews: 18324,
      average_rating: 4.3
    },
    {
      title: "Verity",
      author: "Colleen Hoover",
      genre: "Mystery",
      description: "A struggling writer uncovers disturbing truths while ghostwriting a novel.",
      cover_image: "/images/verity.jpg",
      publication_date: new Date("2018-12-07"),
      number_of_reviews: 76234,
      average_rating: 4.5
    },
    {
      title: "The Shadows",
      author: "Alex North",
      genre: "Mystery",
      description: "A murder case resurfaces after a dark event from 25 years ago.",
      cover_image: "/images/the-shadows.jpg",
      publication_date: new Date("2020-07-21"),
      number_of_reviews: 22345,
      average_rating: 4.1
    },
    {
      title: "One of Us Is Lying",
      author: "Karen M. McManus",
      genre: "Mystery",
      description: "Five students walk into detention, but only four make it out alive.",
      cover_image: "/images/one-of-us-is-lying.jpg",
      publication_date: new Date("2017-05-30"),
      number_of_reviews: 54234,
      average_rating: 4.2
    },
    {
      title: "A Man Called Ove",
      author: "Fredrik Backman",
      genre: "Fiction",
      description: "A grumpy man’s life changes when new neighbors arrive.",
      cover_image: "/images/a-man-called-ove.jpg",
      publication_date: new Date("2012-08-27"),
      number_of_reviews: 82345,
      average_rating: 4.6
    },
    {
      title: "The Midnight Bargain",
      author: "C.L. Polk",
      genre: "Fantasy",
      description: "A sorceress must choose between love and her magical freedom.",
      cover_image: "/images/midnight-bargain.jpg",
      publication_date: new Date("2020-10-13"),
      number_of_reviews: 14321,
      average_rating: 4.3
    },
    {
      title: "The Light We Lost",
      author: "Jill Santopolo",
      genre: "Fiction",
      description: "A story of love, choices, and the paths we didn’t take.",
      cover_image: "/images/the-light-we-lost.jpg",
      publication_date: new Date("2017-05-09"),
      number_of_reviews: 33212,
      average_rating: 4.1
    },
    {
      title: "Beneath a Scarlet Sky",
      author: "Mark Sullivan",
      genre: "Fiction",
      description: "The true story of a forgotten WWII hero.",
      cover_image: "/images/beneath-a-scarlet-sky.jpg",
      publication_date: new Date("2017-05-01"),
      number_of_reviews: 56234,
      average_rating: 4.4
    },
    {
      title: "The Giver of Stars",
      author: "Jojo Moyes",
      genre: "Fiction",
      description: "A story of friendship and courage set in 1930s Kentucky.",
      cover_image: "/images/the-giver-of-stars.jpg",
      publication_date: new Date("2019-10-08"),
      number_of_reviews: 48123,
      average_rating: 4.5
    },
    {
      title: "Daisy Jones & The Six",
      author: "Taylor Jenkins Reid",
      genre: "Fiction",
      description: "The rise and fall of a fictional 1970s rock band.",
      cover_image: "/images/daisy-jones.jpg",
      publication_date: new Date("2019-03-05"),
      number_of_reviews: 65234,
      average_rating: 4.6
    },
    {
      title: "Dark Matter",
      author: "Blake Crouch",
      genre: "Science Fiction",
      description: "A man is thrust into alternate realities after an abduction.",
      cover_image: "/images/dark-matter.jpg",
      publication_date: new Date("2016-07-26"),
      number_of_reviews: 73234,
      average_rating: 4.5
    },
    {
      title: "Skyward",
      author: "Brandon Sanderson",
      genre: "Science Fiction",
      description: "A girl dreams of becoming a pilot in a hostile world.",
      cover_image: "/images/skyward.jpg",
      publication_date: new Date("2018-11-06"),
      number_of_reviews: 55234,
      average_rating: 4.7
    },
    {
      title: "The Chain",
      author: "Adrian McKinty",
      genre: "Mystery",
      description: "A mother is forced into a sinister chain of abductions.",
      cover_image: "/images/the-chain.jpg",
      publication_date: new Date("2019-07-09"),
      number_of_reviews: 44234,
      average_rating: 4.3
    },
    {
      title: "Home Before Dark",
      author: "Riley Sager",
      genre: "Mystery",
      description: "A woman returns to a haunted house from her past.",
      cover_image: "/images/home-before-dark.jpg",
      publication_date: new Date("2020-06-30"),
      number_of_reviews: 37234,
      average_rating: 4.4
    },
    {
      title: "We Were Liars",
      author: "E. Lockhart",
      genre: "Fiction",
      description: "A suspenseful tale of love, betrayal, and a dark family secret.",
      cover_image: "/images/we-were-liars.jpg",
      publication_date: new Date("2014-05-13"),
      number_of_reviews: 67234,
      average_rating: 4.1
    },
    {
      title: "The Inheritance Games",
      author: "Jennifer Lynn Barnes",
      genre: "Mystery",
      description: "A teenage girl inherits a billionaire's fortune with strings attached.",
      cover_image: "/images/inheritance-games.jpg",
      publication_date: new Date("2020-09-01"),
      number_of_reviews: 46234,
      average_rating: 4.3
    },
    {
      title: "Mexican Gothic",
      author: "Silvia Moreno-Garcia",
      genre: "Mystery",
      description: "A young woman investigates a haunting in a Mexican manor.",
      cover_image: "/images/mexican-gothic.jpg",
      publication_date: new Date("2020-06-30"),
      number_of_reviews: 55234,
      average_rating: 4.4
    }
  ,
    {
      title: "The House in the Cerulean Sea",
      author: "TJ Klune",
      genre: "Fantasy",
      description: "A magical story about love, acceptance, and family.",
      cover_image: "/images/house-in-the-cerulean-sea.jpg",
      publication_date: new Date("2020-03-17"),
      number_of_reviews: 87324,
      average_rating: 4.8
    },
    {
      title: "Circe",
      author: "Madeline Miller",
      genre: "Fantasy",
      description: "A retelling of the story of Circe, the witch of Aiaia.",
      cover_image: "/images/circe.jpg",
      publication_date: new Date("2018-04-10"),
      number_of_reviews: 134234,
      average_rating: 4.6
    },
    {
      title: "Before We Were Strangers",
      author: "Renée Carlino",
      genre: "Fiction",
      description: "A second-chance romance set in New York City.",
      cover_image: "/images/before-we-were-strangers.jpg",
      publication_date: new Date("2015-08-18"),
      number_of_reviews: 64234,
      average_rating: 4.3
    },
    {
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      genre: "Fiction",
      description: "A coming-of-age mystery set in the marshes of North Carolina.",
      cover_image: "/images/where-the-crawdads-sing.jpg",
      publication_date: new Date("2018-08-14"),
      number_of_reviews: 213245,
      average_rating: 4.7
    },
    {
      title: "The Paris Library",
      author: "Janet Skeslien Charles",
      genre: "Fiction",
      description: "A tale of courage and the power of books during WWII.",
      cover_image: "/images/the-paris-library.jpg",
      publication_date: new Date("2021-02-09"),
      number_of_reviews: 34231,
      average_rating: 4.4
    },
    {
      title: "Scythe",
      author: "Neal Shusterman",
      genre: "Science Fiction",
      description: "In a world without death, Scythes control life and death.",
      cover_image: "/images/scythe.jpg",
      publication_date: new Date("2016-11-22"),
      number_of_reviews: 93234,
      average_rating: 4.6
    },
    {
      title: "Legend",
      author: "Marie Lu",
      genre: "Science Fiction",
      description: "A dystopian story of two teens on opposite sides of a war.",
      cover_image: "/images/legend.jpg",
      publication_date: new Date("2011-11-29"),
      number_of_reviews: 104321,
      average_rating: 4.5
    },
    {
      title: "The Woman in the Window",
      author: "A.J. Finn",
      genre: "Mystery",
      description: "An agoraphobic woman believes she witnessed a crime.",
      cover_image: "/images/woman-in-the-window.jpg",
      publication_date: new Date("2018-01-02"),
      number_of_reviews: 189345,
      average_rating: 4.3
    },
    {
      title: "Behind Closed Doors",
      author: "B.A. Paris",
      genre: "Mystery",
      description: "A psychological thriller about a seemingly perfect couple.",
      cover_image: "/images/behind-closed-doors.jpg",
      publication_date: new Date("2016-08-09"),
      number_of_reviews: 139212,
      average_rating: 4.4
    },
    {
      title: "A Discovery of Witches",
      author: "Deborah Harkness",
      genre: "Fantasy",
      description: "A witch and a vampire uncover ancient secrets in a magical world.",
      cover_image: "/images/discovery-of-witches.jpg",
      publication_date: new Date("2011-02-08"),
      number_of_reviews: 124345,
      average_rating: 4.5
    },
    {
      title: "The Song of Achilles",
      author: "Madeline Miller",
      genre: "Fantasy",
      description: "A modern retelling of the story of Achilles and Patroclus.",
      cover_image: "/images/song-of-achilles.jpg",
      publication_date: new Date("2011-09-20"),
      number_of_reviews: 223234,
      average_rating: 4.8
    },
    {
      title: "The Perfect Nanny",
      author: "Leïla Slimani",
      genre: "Mystery",
      description: "A chilling tale of a seemingly perfect nanny gone wrong.",
      cover_image: "/images/perfect-nanny.jpg",
      publication_date: new Date("2016-08-18"),
      number_of_reviews: 45234,
      average_rating: 4.1
    },
    {
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      genre: "Fiction",
      description: "A Hollywood icon recounts her glamorous yet scandalous life.",
      cover_image: "/images/seven-husbands.jpg",
      publication_date: new Date("2017-06-13"),
      number_of_reviews: 234234,
      average_rating: 4.7
    },
    {
      title: "The Bone Season",
      author: "Samantha Shannon",
      genre: "Fantasy",
      description: "A young clairvoyant battles a dystopian government.",
      cover_image: "/images/bone-season.jpg",
      publication_date: new Date("2013-08-20"),
      number_of_reviews: 89234,
      average_rating: 4.3
    },
    {
      title: "Lovecraft Country",
      author: "Matt Ruff",
      genre: "Fantasy",
      description: "A blend of historical fiction and cosmic horror in Jim Crow America.",
      cover_image: "/images/lovecraft-country.jpg",
      publication_date: new Date("2016-02-16"),
      number_of_reviews: 78234,
      average_rating: 4.2
    },
    {
      title: "The Long Way to a Small, Angry Planet",
      author: "Becky Chambers",
      genre: "Science Fiction",
      description: "A character-driven space adventure about a motley crew.",
      cover_image: "/images/long-way-to-small-planet.jpg",
      publication_date: new Date("2014-07-29"),
      number_of_reviews: 93234,
      average_rating: 4.5
    },
    {
      title: "The Priory of the Orange Tree",
      author: "Samantha Shannon",
      genre: "Fantasy",
      description: "A sprawling epic of dragons, queens, and ancient prophecies.",
      cover_image: "/images/priory-orange-tree.jpg",
      publication_date: new Date("2019-02-26"),
      number_of_reviews: 65234,
      average_rating: 4.6
    },
    {
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      genre: "Science Fiction",
      description: "A dystopian future where books are banned and burned.",
      cover_image: "/images/fahrenheit-451.jpg",
      publication_date: new Date("1953-10-19"),
      number_of_reviews: 232123,
      average_rating: 4.5
    },
    {
      title: "The Hunting Party",
      author: "Lucy Foley",
      genre: "Mystery",
      description: "A New Year's Eve reunion turns deadly for a group of friends.",
      cover_image: "/images/hunting-party.jpg",
      publication_date: new Date("2019-01-24"),
      number_of_reviews: 67324,
      average_rating: 4.2
    },
    {
      title: "The Power",
      author: "Naomi Alderman",
      genre: "Science Fiction",
      description: "Women gain the power to produce electricity, changing the world.",
      cover_image: "/images/the-power.jpg",
      publication_date: new Date("2016-10-27"),
      number_of_reviews: 102234,
      average_rating: 4.4
    }
  
  ,
    {
      title: "The Light We Lost",
      author: "Jill Santopolo",
      genre: "Fiction",
      description: "A story of love, loss, and the choices we make.",
      cover_image: "/images/the-light-we-lost.jpg",
      publication_date: new Date("2017-05-09"),
      number_of_reviews: 76321,
      average_rating: 4.2
    },
    {
      title: "The Giver of Stars",
      author: "Jojo Moyes",
      genre: "Fiction",
      description: "The story of a group of women delivering books in rural Kentucky.",
      cover_image: "/images/the-giver-of-stars.jpg",
      publication_date: new Date("2019-10-08"),
      number_of_reviews: 124567,
      average_rating: 4.6
    },
    {
      title: "Verity",
      author: "Colleen Hoover",
      genre: "Mystery",
      description: "A psychological thriller about a writer uncovering dark secrets.",
      cover_image: "/images/verity.jpg",
      publication_date: new Date("2018-12-07"),
      number_of_reviews: 234789,
      average_rating: 4.7
    },
    {
      title: "The Couple Next Door",
      author: "Shari Lapena",
      genre: "Mystery",
      description: "A suspenseful thriller about a couple with dark secrets.",
      cover_image: "/images/the-couple-next-door.jpg",
      publication_date: new Date("2016-07-14"),
      number_of_reviews: 187654,
      average_rating: 4.3
    },
    {
      title: "Shatter Me",
      author: "Tahereh Mafi",
      genre: "Science Fiction",
      description: "A dystopian story of a girl whose touch is lethal.",
      cover_image: "/images/shatter-me.jpg",
      publication_date: new Date("2011-11-15"),
      number_of_reviews: 198234,
      average_rating: 4.4
    },
    {
      title: "Red Rising",
      author: "Pierce Brown",
      genre: "Science Fiction",
      description: "A story of rebellion set in a future society on Mars.",
      cover_image: "/images/red-rising.jpg",
      publication_date: new Date("2014-01-28"),
      number_of_reviews: 245678,
      average_rating: 4.5
    },
    {
      title: "The Paper Palace",
      author: "Miranda Cowley Heller",
      genre: "Fiction",
      description: "A woman faces a life-changing decision one summer morning.",
      cover_image: "/images/the-paper-palace.jpg",
      publication_date: new Date("2021-07-06"),
      number_of_reviews: 64321,
      average_rating: 4.3
    },
    {
      title: "A Man Called Ove",
      author: "Fredrik Backman",
      genre: "Fiction",
      description: "A grumpy yet loveable old man finds new meaning in life.",
      cover_image: "/images/a-man-called-ove.jpg",
      publication_date: new Date("2012-08-27"),
      number_of_reviews: 345678,
      average_rating: 4.8
    },
    {
      title: "The Rosie Project",
      author: "Graeme Simsion",
      genre: "Fiction",
      description: "A quirky love story about a genetics professor seeking a wife.",
      cover_image: "/images/the-rosie-project.jpg",
      publication_date: new Date("2013-01-30"),
      number_of_reviews: 178345,
      average_rating: 4.5
    },
    {
      title: "Recursion",
      author: "Blake Crouch",
      genre: "Science Fiction",
      description: "A mind-bending thriller about memory and time.",
      cover_image: "/images/recursion.jpg",
      publication_date: new Date("2019-06-11"),
      number_of_reviews: 143234,
      average_rating: 4.6
    },
    {
      title: "The Chain",
      author: "Adrian McKinty",
      genre: "Mystery",
      description: "A chilling thriller about a chain of kidnappings.",
      cover_image: "/images/the-chain.jpg",
      publication_date: new Date("2019-07-09"),
      number_of_reviews: 109876,
      average_rating: 4.4
    },
    {
      title: "The 5th Wave",
      author: "Rick Yancey",
      genre: "Science Fiction",
      description: "A post-apocalyptic story of an alien invasion.",
      cover_image: "/images/the-5th-wave.jpg",
      publication_date: new Date("2013-05-07"),
      number_of_reviews: 213567,
      average_rating: 4.2
    },
    {
      title: "Anxious People",
      author: "Fredrik Backman",
      genre: "Fiction",
      description: "A heartwarming story of eight strangers and a hostage situation.",
      cover_image: "/images/anxious-people.jpg",
      publication_date: new Date("2019-09-24"),
      number_of_reviews: 154234,
      average_rating: 4.5
    },
    {
      title: "The Sun Down Motel",
      author: "Simone St. James",
      genre: "Mystery",
      description: "A ghost story and mystery set in a creepy motel.",
      cover_image: "/images/the-sun-down-motel.jpg",
      publication_date: new Date("2020-02-18"),
      number_of_reviews: 97321,
      average_rating: 4.3
    },
    {
      title: "Lock In",
      author: "John Scalzi",
      genre: "Science Fiction",
      description: "A futuristic mystery involving a locked-in syndrome.",
      cover_image: "/images/lock-in.jpg",
      publication_date: new Date("2014-08-26"),
      number_of_reviews: 74321,
      average_rating: 4.4
    },
    {
      title: "Little Fires Everywhere",
      author: "Celeste Ng",
      genre: "Fiction",
      description: "A story of secrets, motherhood, and social class.",
      cover_image: "/images/little-fires-everywhere.jpg",
      publication_date: new Date("2017-09-12"),
      number_of_reviews: 321567,
      average_rating: 4.7
    },
    {
      title: "The Night Watchman",
      author: "Louise Erdrich",
      genre: "Fiction",
      description: "A historical novel based on the life of the author's grandfather.",
      cover_image: "/images/the-night-watchman.jpg",
      publication_date: new Date("2020-03-03"),
      number_of_reviews: 65321,
      average_rating: 4.5
    },
    {
      title: "Sleeping Giants",
      author: "Sylvain Neuvel",
      genre: "Science Fiction",
      description: "A mysterious discovery of giant metal body parts.",
      cover_image: "/images/sleeping-giants.jpg",
      publication_date: new Date("2016-04-26"),
      number_of_reviews: 97345,
      average_rating: 4.4
    },
    {
      title: "The Great Alone",
      author: "Kristin Hannah",
      genre: "Fiction",
      description: "A family struggles to survive in the harsh Alaskan wilderness.",
      cover_image: "/images/the-great-alone.jpg",
      publication_date: new Date("2018-02-06"),
      number_of_reviews: 134567,
      average_rating: 4.6
    },
    {
      title: "The Water Dancer",
      author: "Ta-Nehisi Coates",
      genre: "Fiction",
      description: "A story of a young man with a mysterious power in the antebellum South.",
      cover_image: "/images/the-water-dancer.jpg",
      publication_date: new Date("2019-09-24"),
      number_of_reviews: 78432,
      average_rating: 4.3
    }
  ,
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      genre: "Non-Fiction",
      description: "An exploration of how habits shape our lives and how to change them.",
      cover_image: "/images/the-power-of-habit.jpg",
      publication_date: new Date("2012-02-28"),
      number_of_reviews: 512345,
      average_rating: 4.6
    },
    {
      title: "Outliers: The Story of Success",
      author: "Malcolm Gladwell",
      genre: "Non-Fiction",
      description: "An analysis of the factors contributing to high levels of success.",
      cover_image: "/images/outliers.jpg",
      publication_date: new Date("2008-11-18"),
      number_of_reviews: 637891,
      average_rating: 4.5
    },
    {
      title: "Grit: The Power of Passion and Perseverance",
      author: "Angela Duckworth",
      genre: "Non-Fiction",
      description: "A study of how grit and determination contribute to success.",
      cover_image: "/images/grit.jpg",
      publication_date: new Date("2016-05-03"),
      number_of_reviews: 456732,
      average_rating: 4.4
    },
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      genre: "Non-Fiction",
      description: "A deep dive into how humans think and make decisions.",
      cover_image: "/images/thinking-fast-and-slow.jpg",
      publication_date: new Date("2011-10-25"),
      number_of_reviews: 893210,
      average_rating: 4.3
    },
    {
      title: "The Body: A Guide for Occupants",
      author: "Bill Bryson",
      genre: "Non-Fiction",
      description: "A fascinating tour of the human body and its functions.",
      cover_image: "/images/the-body.jpg",
      publication_date: new Date("2019-10-15"),
      number_of_reviews: 243567,
      average_rating: 4.7
    },
    {
      title: "The Immortal Life of Henrietta Lacks",
      author: "Rebecca Skloot",
      genre: "Non-Fiction",
      description: "The true story of Henrietta Lacks and the immortal cell line derived from her cancer cells.",
      cover_image: "/images/the-immortal-life.jpg",
      publication_date: new Date("2010-02-02"),
      number_of_reviews: 512789,
      average_rating: 4.6
    },
    {
      title: "Becoming",
      author: "Michelle Obama",
      genre: "Non-Fiction",
      description: "A memoir by the former First Lady of the United States.",
      cover_image: "/images/becoming.jpg",
      publication_date: new Date("2018-11-13"),
      number_of_reviews: 1023456,
      average_rating: 4.8
    },
    {
      title: "The Wright Brothers",
      author: "David McCullough",
      genre: "Non-Fiction",
      description: "A biography of the pioneering aviators, the Wright Brothers.",
      cover_image: "/images/the-wright-brothers.jpg",
      publication_date: new Date("2015-05-05"),
      number_of_reviews: 178932,
      average_rating: 4.6
    },
    {
      title: "Born a Crime",
      author: "Trevor Noah",
      genre: "Non-Fiction",
      description: "The comedian's memoir about growing up in apartheid South Africa.",
      cover_image: "/images/born-a-crime.jpg",
      publication_date: new Date("2016-11-15"),
      number_of_reviews: 943876,
      average_rating: 4.9
    },
    {
      title: "Quiet: The Power of Introverts in a World That Can't Stop Talking",
      author: "Susan Cain",
      genre: "Non-Fiction",
      description: "An exploration of the power and strengths of introverts.",
      cover_image: "/images/quiet.jpg",
      publication_date: new Date("2012-01-24"),
      number_of_reviews: 678921,
      average_rating: 4.7
    },
    {
      title: "The Road to Character",
      author: "David Brooks",
      genre: "Non-Fiction",
      description: "A reflection on the importance of character in a modern world.",
      cover_image: "/images/the-road-to-character.jpg",
      publication_date: new Date("2015-04-14"),
      number_of_reviews: 176432,
      average_rating: 4.3
    },
    {
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      genre: "Non-Fiction",
      description: "A no-nonsense guide to living a meaningful life.",
      cover_image: "/images/the-subtle-art.jpg",
      publication_date: new Date("2016-09-13"),
      number_of_reviews: 1543211,
      average_rating: 4.5
    },
    {
      title: "Why We Sleep",
      author: "Matthew Walker",
      genre: "Non-Fiction",
      description: "An exploration of the science of sleep and its impact on our lives.",
      cover_image: "/images/why-we-sleep.jpg",
      publication_date: new Date("2017-10-03"),
      number_of_reviews: 347812,
      average_rating: 4.8
    },
    {
      title: "Can't Hurt Me",
      author: "David Goggins",
      genre: "Non-Fiction",
      description: "A memoir of mental toughness and overcoming obstacles.",
      cover_image: "/images/cant-hurt-me.jpg",
      publication_date: new Date("2018-11-15"),
      number_of_reviews: 532789,
      average_rating: 4.7
    },
    {
      title: "Man's Search for Meaning",
      author: "Viktor E. Frankl",
      genre: "Non-Fiction",
      description: "A reflection on finding purpose through suffering, by a Holocaust survivor.",
      cover_image: "/images/mans-search-for-meaning.jpg",
      publication_date: new Date("1946-01-01"),
      number_of_reviews: 1345678,
      average_rating: 4.9
    },
    {
      title: "The Warmth of Other Suns",
      author: "Isabel Wilkerson",
      genre: "Non-Fiction",
      description: "A historical study of the Great Migration in the United States.",
      cover_image: "/images/the-warmth-of-other-suns.jpg",
      publication_date: new Date("2010-09-07"),
      number_of_reviews: 267890,
      average_rating: 4.8
    },
    {
      title: "The Art of Happiness",
      author: "Dalai Lama",
      genre: "Non-Fiction",
      description: "A guide to happiness based on Buddhist principles.",
      cover_image: "/images/the-art-of-happiness.jpg",
      publication_date: new Date("1998-10-01"),
      number_of_reviews: 567891,
      average_rating: 4.6
    },
    {
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      genre: "Non-Fiction",
      description: "A classic guide on building relationships and effective communication.",
      cover_image: "/images/how-to-win-friends.jpg",
      publication_date: new Date("1936-10-01"),
      number_of_reviews: 2547891,
      average_rating: 4.7
    },
    {
      title: "Factfulness",
      author: "Hans Rosling",
      genre: "Non-Fiction",
      description: "A data-driven look at the world, challenging common misconceptions.",
      cover_image: "/images/factfulness.jpg",
      publication_date: new Date("2018-04-03"),
      number_of_reviews: 314567,
      average_rating: 4.8
    },
    {
      title: "The Happiness Project",
      author: "Gretchen Rubin",
      genre: "Non-Fiction",
      description: "An account of a year-long quest to find true happiness.",
      cover_image: "/images/the-happiness-project.jpg",
      publication_date: new Date("2009-12-29"),
      number_of_reviews: 198765,
      average_rating: 4.5
    }
    ,
    {
      "title": "The Power of Now",
      "author": "Eckhart Tolle",
      "genre": "Non-Fiction",
      "description": "A spiritual guide to living in the present moment and letting go of the past and future.",
      "cover_image": "/images/the-power-of-now.jpg",
      "publication_date": new Date("1997-06-16"),
      "number_of_reviews": 876123,
      "average_rating": 4.6
    },
    {
      "title": "Man's Search for Meaning",
      "author": "Viktor E. Frankl",
      "genre": "Non-Fiction",
      "description": "A Holocaust survivor’s exploration of finding purpose through suffering.",
      "cover_image": "/images/mans-search-for-meaning.jpg",
      "publication_date": new Date("1946-01-01"),
      "number_of_reviews": 1345678,
      "average_rating": 4.9
    },
    {
      "title": "The 7 Habits of Highly Effective People",
      "author": "Stephen R. Covey",
      "genre": "Non-Fiction",
      "description": "A self-help guide on how to achieve personal and professional effectiveness.",
      "cover_image": "/images/the-7-habits.jpg",
      "publication_date": new Date("1989-08-15"),
      "number_of_reviews": 1234567,
      "average_rating": 4.7
    },
    {
      "title": "Daring Greatly",
      "author": "Brené Brown",
      "genre": "Non-Fiction",
      "description": "A study of the power of vulnerability in leading a wholehearted life.",
      "cover_image": "/images/daring-greatly.jpg",
      "publication_date": new Date("2012-09-11"),
      "number_of_reviews": 562876,
      "average_rating": 4.7
    },

    {
      "title": "The Subtle Art of Not Giving a F*ck",
      "author": "Mark Manson",
      "genre": "Non-Fiction",
      "description": "A no-nonsense guide to focusing on what really matters in life.",
      "cover_image": "/images/the-subtle-art.jpg",
      "publication_date": new Date("2016-09-13"),
      "number_of_reviews": 1543211,
      "average_rating": 4.5
    },
    {
      "title": "The 5 AM Club",
      "author": "Robin Sharma",
      "genre": "Non-Fiction",
      "description": "A guide on how waking up early can improve your life and productivity.",
      "cover_image": "/images/the-5am-club.jpg",
      "publication_date": new Date("2018-12-04"),
      "number_of_reviews": 456780,
      "average_rating": 4.6
    },
    {
      "title": "Start with Why",
      "author": "Simon Sinek",
      "genre": "Non-Fiction",
      "description": "An exploration of how leaders inspire action by starting with the question 'Why?'.",
      "cover_image": "/images/start-with-why.jpg",
      "publication_date": new Date("2009-10-29"),
      "number_of_reviews": 542123,
      "average_rating": 4.7
    },
    {
      "title": "Quiet",
      "author": "Susan Cain",
      "genre": "Non-Fiction",
      "description": "An exploration of the power and strengths of introverts in a world that cannot stop talking.",
      "cover_image": "/images/quiet.jpg",
      "publication_date": new Date("2012-01-24"),
      "number_of_reviews": 678921,
      "average_rating": 4.7
    },
    {
      "title": "The 48 Laws of Power",
      "author": "Robert Greene",
      "genre": "Non-Fiction",
      "description": "A guide to the art of power and manipulation in social and political spheres.",
      "cover_image": "/images/the-48-laws.jpg",
      "publication_date": new Date("1998-09-01"),
      "number_of_reviews": 945123,
      "average_rating": 4.6
    },
    {
      "title": "You Are a Badass",
      "author": "Jen Sincero",
      "genre": "Non-Fiction",
      "description": "A self-help book on how to unlock your full potential and live a life you love.",
      "cover_image": "/images/you-are-a-badass.jpg",
      "publication_date": new Date("2013-04-23"),
      "number_of_reviews": 312876,
      "average_rating": 4.6
    },
    {
      "title": "The Lean Startup",
      "author": "Eric Ries",
      "genre": "Non-Fiction",
      "description": "A guide for entrepreneurs on how to build a startup using lean principles.",
      "cover_image": "/images/the-lean-startup.jpg",
      "publication_date": new Date("2011-09-13"),
      "number_of_reviews": 872634,
      "average_rating": 4.5
    }  
]


   async function insertBooks() {
    try {
        const result = await Book.insertMany(bookData);
        console.log(`${result.length} books inserted successfully`);
    }
    catch(error)
    {
        console.log("Error inserting books:", error);
    }
    finally {
        mongoose.connection.close();
    }
   }

   insertBooks();


//   data

// {
//   title: "The Midnight Library",
//   author: "Matt Haig",
//   genre: "Fiction",
//   description: "A novel about life's infinite possibilities and second chances",
//   cover_image: "/images/midnight-library.jpg",
//   publication_date: new Date("2020-09-29"),
//   number_of_reviews: 25346,
//   average_rating: 4.3
// },
// {
//   title: "Normal People",
//   author: "Sally Rooney",
//   genre: "Fiction",
//   description: "A complex love story exploring class, social dynamics, and personal growth",
//   cover_image: "/images/normal-people.jpg", 
//   publication_date: new Date("2018-08-28"),
//   number_of_reviews: 18752,
//   average_rating: 4.1
// },

// {
//   title: "Sapiens: A Brief History of Humankind",
//   author: "Yuval Noah Harari",
//   genre: "Non-Fiction",
//   description: "An exploration of human history and evolution",
//   cover_image: "/images/sapiens.jpg",
//   publication_date: new Date("2014-02-10"),
//   number_of_reviews: 45231,
//   average_rating: 4.6
// },
// {
//   title: "Atomic Habits",
//   author: "James Clear",
//   genre: "Non-Fiction",
//   description: "A guide to building good habits and breaking bad ones",
//   cover_image: "/images/atomic-habits.jpg",
//   publication_date: new Date("2018-10-16"),
//   number_of_reviews: 38291,
//   average_rating: 4.7
// },

// {
//   title: "The Name of the Wind",
//   author: "Patrick Rothfuss",
//   genre: "Fantasy",
//   description: "First book in the Kingkiller Chronicle about a legendary wizard",
//   cover_image: "/images/name-of-wind.jpg",
//   publication_date: new Date("2007-03-27"),
//   number_of_reviews: 32456,
//   average_rating: 4.5
// },
// {
//   title: "The Way of Kings",
//   author: "Brandon Sanderson",
//   genre: "Fantasy",
//   description: "Epic fantasy novel set in the complex world of Roshar",
//   cover_image: "/images/way-of-kings.jpg",
//   publication_date: new Date("2010-08-31"),
//   number_of_reviews: 28716,
//   average_rating: 4.7
// },
// // Mystery Books
// {
//   title: "Gone Girl",
//   author: "Gillian Flynn",
//   genre: "Mystery",
//   description: "A psychological thriller about a missing woman and her husband",
//   cover_image: "/images/gone-girl.jpg",
//   publication_date: new Date("2012-06-05"),
//   number_of_reviews: 29384,
//   average_rating: 4.2
// },
// {
//   title: "The Girl with the Dragon Tattoo",
//   author: "Stieg Larsson",
//   genre: "Mystery",
//   description: "A dark investigative thriller featuring Lisbeth Salander",
//   cover_image: "/images/dragon-tattoo.jpg",
//   publication_date: new Date("2005-08-01"),
//   number_of_reviews: 36521,
//   average_rating: 4.1
// },

// {
//   title: "Project Hail Mary",
//   author: "Andy Weir",
//   genre: "Science Fiction",
//   description: "A space exploration novel about saving humanity",
//   cover_image: "/images/hail-mary.jpg",
//   publication_date: new Date("2021-05-04"),
//   number_of_reviews: 22145,
//   average_rating: 4.6
// },
// {
//   title: "Dune",
//   author: "Frank Herbert",
//   genre: "Science Fiction",
//   description: "A complex science fiction epic set on a desert planet",
//   cover_image: "/images/dune.jpg",
//   publication_date: new Date("1965-08-01"),
//   number_of_reviews: 45231,
//   average_rating: 4.4
// },

// {
//   title: "Into the Wild",
//   author: "Jon Krakauer",
//   genre: "Adventure",
//   description: "A true story of survival and self-discovery in the Alaskan wilderness",
//   cover_image: "/images/into-wild.jpg",
//   publication_date: new Date("1996-01-20"),
//   number_of_reviews: 18273,
//   average_rating: 4.3
// },
// {
//   title: "The Lost City of Z",
//   author: "David Grann",
//   genre: "Adventure",
//   description: "A narrative of exploration and mystery in the Amazon rainforest",
//   cover_image: "/images/lost-city-z.jpg",
//   publication_date: new Date("2009-02-24"),
//   number_of_reviews: 15632,
//   average_rating: 4.2
// }
// ,
// {
//   title: "A Little Life",
//   author: "Hanya Yanagihara",
//   genre: "Fiction",
//   description: "An intense exploration of friendship, trauma, and human resilience",
//   cover_image: "/images/little-life.jpg",
//   publication_date: new Date("2015-03-10"),
//   number_of_reviews: 19845,
//   average_rating: 4.4
// },
// {
//   title: "The Goldfinch",
//   author: "Donna Tartt",
//   genre: "Fiction",
//   description: "A Pulitzer Prize-winning novel about loss, survival, and art",
//   cover_image: "/images/goldfinch.jpg",
//   publication_date: new Date("2013-10-22"),
//   number_of_reviews: 16732,
//   average_rating: 4.2
// },

// {
//   title: "Educated",
//   author: "Tara Westover",
//   genre: "Non-Fiction",
//   description: "A memoir of self-discovery and educational transformation",
//   cover_image: "/images/educated.jpg",
//   publication_date: new Date("2018-02-20"),
//   number_of_reviews: 24561,
//   average_rating: 4.5
// },
// {
//   title: "Bad Blood",
//   author: "John Carreyrou",
//   genre: "Non-Fiction",
//   description: "Investigative account of the Theranos startup fraud",
//   cover_image: "/images/bad-blood.jpg",
//   publication_date: new Date("2018-05-21"),
//   number_of_reviews: 18234,
//   average_rating: 4.6
// },

// {
//   title: "The Night Circus",
//   author: "Erin Morgenstern",
//   genre: "Fantasy",
//   description: "A magical competition between two illusionists in a mystical circus",
//   cover_image: "/images/night-circus.jpg",
//   publication_date: new Date("2011-09-13"),
//   number_of_reviews: 22456,
//   average_rating: 4.3
// },
// {
//   title: "Good Omens",
//   author: "Neil Gaiman & Terry Pratchett",
//   genre: "Fantasy",
//   description: "A comedic tale about preventing the apocalypse",
//   cover_image: "/images/good-omens.jpg",
//   publication_date: new Date("1990-05-01"),
//   number_of_reviews: 18765,
//   average_rating: 4.4
// },

// {
//   title: "The Silent Patient",
//   author: "Alex Michaelides",
//   genre: "Mystery",
//   description: "A psychological thriller about a woman's mysterious silence",
//   cover_image: "/images/silent-patient.jpg",
//   publication_date: new Date("2019-02-05"),
//   number_of_reviews: 21987,
//   average_rating: 4.3
// },
// {
//   title: "Big Little Lies",
//   author: "Liane Moriarty",
//   genre: "Mystery",
//   description: "A complex narrative about secrets among suburban mothers",
//   cover_image: "/images/big-little-lies.jpg",
//   publication_date: new Date("2014-07-29"),
//   number_of_reviews: 19456,
//   average_rating: 4.2
// },

// {
//   title: "The Three-Body Problem",
//   author: "Cixin Liu",
//   genre: "Science Fiction",
//   description: "A complex sci-fi novel exploring first contact and cosmic civilizations",
//   cover_image: "/images/three-body.jpg",
//   publication_date: new Date("2008-01-01"),
//   number_of_reviews: 24321,
//   average_rating: 4.5
// },
// {
//   title: "Neuromancer",
//   author: "William Gibson",
//   genre: "Science Fiction",
//   description: "A cyberpunk classic exploring virtual reality and artificial intelligence",
//   cover_image: "/images/neuromancer.jpg",
//   publication_date: new Date("1984-07-01"),
//   number_of_reviews: 29876,
//   average_rating: 4.4
// }