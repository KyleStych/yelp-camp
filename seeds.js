var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var seeds = [
    {
        name: "Salmon Creek", 
        image: "http://cdn.pixabay.com/photo/2017/07/17/16/21/nature-2512944_960_720.jpg",
        description: "No cold bodies found face down here since '93!"
    },
    {
        name: "Death's Pass", 
        image: "http://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg",
        description: "Bring extra warm clothes so your meat's warm!"
    },
    {
        name: "Stabbin' Cabin", 
        image: "http://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197_960_720.jpg",
        description: "The name's a total misnomer. Don't you worry about that!"
    },
    {
        name: "Bloody Body Cave", 
        image: "http://cdn.pixabay.com/photo/2017/09/01/22/05/recycle-2705682_960_720.jpg",
        description: "The perfect spot to let wildlife clean up the leftovers"
    },
    {
        name: "TeePee for PeePee", 
        image: "http://cdn.pixabay.com/photo/2019/01/23/13/46/camping-tipi-3950296_960_720.jpg",
        description: "The smell comes from scared people wetting themselves"
    },
    {
        name: "Totally Normal Forest", 
        image: "http://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
        description: "Just a normal forest. Perfect for camping without cell phones or radios."

    }
    // Totally safe for college kids!  Flip flops are all you'll need for running (should you need to).
];

async function seedDB(){
    try {
        await Campground.deleteMany({});
        console.log('Campgrounds removed');
        await Comment.deleteMany({});
        console.log('Comments removed');

        // for(const seed of seeds) {
        //     let campground = await Campground.create(seed);
        //     console.log('Campground created');
        //     let comment = await Comment.create(
        //         {
        //             text: "Hey guys, I'm fine.  No need to come looking for me!",
        //             author: 'Family Member'
        //         }
        //     )
        //     console.log('Comment created');
        //     campground.comments.push(comment);
        //     campground.save();
        //     console.log('Comment added to campground');
        // }
    } catch(err) {
        console.log(err);
    }
}

module.exports = seedDB;