const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// const uri = `mongodb+srv://Nato:${process.env.MONGODB_PASSWORD}@cluster0.odrafji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb://Nato:${process.env.MONGODB_PASSWORD}@ac-loq2tou-shard-00-00.odrafji.mongodb.net:27017,ac-loq2tou-shard-00-01.odrafji.mongodb.net:27017,ac-loq2tou-shard-00-02.odrafji.mongodb.net:27017/?replicaSet=atlas-up6p48-shard-0&ssl=true&authSource=admin`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    family: 4,
});

async function main() {
    // console.log(process.env.MONGODB_PASSWORD);
    try {
        await client.connect();
        console.log('Database Connected!');

        console.log();

        await listDatabases(client);

        // // create 1 single document in the movie collection
        // await createMovieList(client, {
        //     directors: ['Naty'],
        //     writers: ['Tedy', 'Naty'],
        //     awards: {
        //         wins: 0,
        //         nominations: 2,
        //         text: "2 nominations."
        //     },
        //     year: 2025,
        //     type: "movie",
        //     title: "Mongodb vs MySql"
        // });

        // // create an array (multiple) documents in then movie collection
        // await createMultipleMovieList(client, [{
        //     directors: ['Doty'],
        //     writers: ['Ermi', 'Doty'],
        //     awards: {
        //         wins: 1,
        //         nominations: 3,
        //         text: "3 nominations."
        //     },
        //     year: 2020,
        //     type: "movie",
        //     title: "Postgresql"
        // },

        // {
        //     directors: ['N'],
        //     writers: ['T', 'N'],
        //     awards: {
        //         wins: 0,
        //         nominations: 2,
        //         text: "2 nominations."
        //     },
        //     year: 1950,
        //     type: "movie",
        //     title: "Abacus"
        // },

        // {
        //     directors: ['Abel'],
        //     writers: ['Tedy', 'Abel'],
        //     awards: {
        //         wins: 4,
        //         nominations: 7,
        //         text: "7 nominations."
        //     },
        //     year: 1980,
        //     type: "movie",
        //     title: "PC"
        // },

        // {
        //     directors: ['Gashaw'],
        //     writers: ['Kal', 'Mike'],
        //     awards: {
        //         wins: 12,
        //         nominations: 16,
        //         text: "16 nominations."
        //     },
        //     year: 1995,
        //     type: "movie",
        //     title: "JS"
        // },

        // {
        //     directors: ['Ten'],
        //     writers: ['Moss', 'Larry'],
        //     awards: {
        //         wins: 20,
        //         nominations: 40,
        //         text: "40 nominations."
        //     },
        //     year: 1989,
        //     type: "movie",
        //     title: "The Simpsons"
        // }
        // ]);

        await findOneMovieByName(client, 'Abacus');

        await findMaxWinsAndMaxNominations(client, {
            minWins: 10,
            minNominations: 10
        });

        await updateMovieByName(client, 'Abacus', { title: 'ENIAC' });

        await upsertMovieByName(client, 'Abacus', { title: 'ENIAC' });

        await updateMoviesToHaveBoxOfficeEarningsType(client);

        await deleteMovieByName(client, "JS");

        await deleteMovieByDate(client, 1900)

    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

main(); // execute the connection

// ************************************CREATE**************************************************
// List Databased found in the cluster 
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`-${db.name}`);
    });
}

// create a new single movie in the database movie collection
async function createMovieList(client, newMovie) {
    const result = await client.db("sample_mflix").collection("movies").insertOne(newMovie);
    console.log(`New movie created with the following id: ${result.insertedId}`);
}

// create multiple new movies in the database movie collection
async function createMultipleMovieList(client, newMovies) {
    const results = await client.db("sample_mflix").collection("movies").insertMany(newMovies);
    console.log(`${results.insertedCount} new movies created with the following ids:`);
    console.log(results.insertedIds);
}


// **********************************READ**************************************************************
// Read one movie document in the collection by name

async function findOneMovieByName(client, nameOfMovie) {
    const result = await client.db("sample_mflix").collection("movies").findOne({ title: nameOfMovie });
    if (result) {
        console.log(`Found a movie in the collection by the name ${nameOfMovie}:`);
        console.log(result);
    } else {
        console.log(`No movie found  by the name ${nameOfMovie}`);
    }

}

// Find movies the maximum number of wins and nominations
async function findMaxWinsAndMaxNominations(client, {
    minWins = 0,
    minNominations = 0
} = {}) {
    const results = await client.db("sample_mflix").collection("movies").find({
        "awards.wins": { $gte: minWins },// 'gte' greater than or equal to
        "awards.nominations": { $gte: minNominations }
    }).sort({ wins: -1 }).toArray();

    console.log('Number of movies are: ', results.length);
}

// ***********************************UPDATE**********************************************
// update one movie by title(WIll update the first one like queryselector)

async function updateMovieByName(client, oldName, updateName) {
    const result = await client.db("sample_mflix").collection("movies").updateOne({ title: oldName }, { $set: updateName });

    if (result) {
        console.log(`${result.matchedCount} document(s) matched the query citeria!`);
        console.log(`${result.modifiedCount} document(s) was/ were updated!`);
    } else {
        console.log('No match found!');
    }

}

// using upsert /update or insrert if non exists

async function upsertMovieByName(client, oldName, updateName) {
    const result = await client.db("sample_mflix").collection("movies").updateOne({ title: oldName }, { $set: updateName }, { upsert: true });

    if (result) {
        console.log(`${result.matchedCount} document(s) matched the query citeria!`);

    } else {
        console.log('No match found!');
    }


    if (result.upsertedCount > 0) {
        console.log(`One document inserted with an id of ${result.upsertedId}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/ were updated!`);
    }
}

// Update Many to have a Box office Earnings field type

async function updateMoviesToHaveBoxOfficeEarningsType(client) {
    const results = await client.db("sample_mflix").collection("movies").updateMany({
        Box_office_Earnings: { $exists: false }
    }, { $set: { Box_office_Earnings: "unknown" } });

    console.log(`${results.matchedCount} documents matched the query criteria!`)
    console.log(`${results.modifiedCount} document(s) was/ were updated!`);
}

// **********************************DELETE*****************************************************

// delete one document in the movie collection by name

async function deleteMovieByName(client, nameOfMovie) {
    const result = await client.db("sample_mflix").collection("movies").deleteOne({ title: nameOfMovie });

    if (result) {
        console.log(`${result.deletedCount} movie was deleted!`)
    }
}

// delete many document in the movie collection based on date that were relaesed before 1900

async function deleteMovieByDate(client, date) {
    const result = await client.db("sample_mflix").collection("movies").deleteMany({ year: { $lt: date } });

    if (result) {
        console.log(`${result.deletedCount} movie(s) was/were deleted!`)
    }
}
