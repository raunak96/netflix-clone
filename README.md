# Netflix Clone using DataStax & GraphQl,bootstrapped with React.js

### Tech Stack
1. Data Stax - Its product Astra DB is a cloud database-as-a-service based on Apache Cassandra.
2. Graphql - We connect to DataStax db using graphql with Pagination & Infinite Scrolling.
3. React.js
4. Netlify serverless functions

## Table of content

- [Netflix Clone using DataStax \& GraphQl,bootstrapped with React.js](#netflix-clone-using-datastax--graphqlbootstrapped-with-reactjs)
    - [Tech Stack](#tech-stack)
  - [Table of content](#table-of-content)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Create Astra Instance](#2-create-astra-instance)
  - [3. Create a security token](#3-create-a-security-token)
  - [4. Create table **genre** with GraphQL](#4-create-table-genre-with-graphql)
  - [5. Insert data in the Table with GraphQL](#5-insert-data-in-the-table-with-graphql)
  - [6. Retrieving list of values](#6-retrieving-list-of-values)
  - [7. Creating a Movies Table](#7-creating-a-movies-table)
  - [8. Insert Values in Movie table](#8-insert-values-in-movie-table)
  - [9. Retrieve values from Movie tables](#9-retrieve-values-from-movie-tables)

## 1. Prerequisites

1. Make sure to install Netlify CLI
```
npm install netlify-cli -g
```

## 2. Create Astra Instance

**`ASTRA`** is the simplest way to run Cassandra with zero operations at all - just push the button and get your cluster.  

- **Create the database**. Review all the fields to make sure they are as shown, and click the `Create Database` button. Leveraging [Database creation guide](https://awesome-astra.github.io/docs/pages/astra/create-instance/#c-procedure) create a database. **Right-Click** the following button and *Open in a new TAB.*
  
<a href="https://astra.dev/yt-01-04" target="blank"><img src="https://github.com/datastaxdevs/workshop-graphql-netflix/raw/master/images/create_astra_db.png?raw=true" /></a>


You will see your new database `pending` in the Dashboard.

![my-pic](https://github.com/datastaxdevs/shared-assets/blob/master/astra/dashboard-pending-1000-update.png?raw=true)

The status will change to `Active` when the database is ready, this will only take 2-3 minutes. You will also receive an email when it is ready.

[🏠 Back to Table of Contents](#table-of-content)


## 3. Create a security token

> Note: this step is very important, as the token generated automatically for you with the database lacks some permissions.

[Create a token for your app](https://awesome-astra.github.io/docs/pages/astra/create-token/#c-procedure), _using the **"Database Administrator"** role_.
Keep it handy for later use (best to download it in CSV format, as the values
will not be visible afterward).
This will provide authentication later when interacting with the database.
Today, in particular, you'll need the string labeled "token" (the one starting with `AstraCS:...`).

[🏠 Back to Table of Contents](#table-of-content)

## 4. Create table **genre** with GraphQL

✅ Open **GraphQL Playground** by 
1. Click on your active database
2. Click `Connect` TAB
3. Click `GRAPHQL API`
4. Click link to you playground.

*as show on the picture below*
![image](img/open-playground.png?raw=true)


✅ Populate HTTP HEADER variable `x-cassandra-token` on the bottom of the page with your token as shown below

![image](img/graphql-playground.png?raw=true)

✅ In GraphQL Playground, create a table with the following mutation, making sure to replace `netflix`:
```yaml
mutation {
  reference_list: createTable(
    keyspaceName:"netflix",
    tableName:"reference_list",
    ifNotExists:true
    partitionKeys: [ 
      { name: "label", type: {basic: TEXT} }
    ]
    clusteringKeys: [
      { name: "value", type: {basic: TEXT}, order: "ASC" }
    ]
  )
}
```

[🏠 Back to Table of Contents](#table-of-content)

## 5. Insert data in the Table with GraphQL

✅ In graphQL playground, change tab to now use `graphql`. Edit the end of the URl to change from `system` to the name of your keyspace: `netflix`

✅ Populate HTTP HEADER variable `x-cassandra-token` on the bottom of the page with your token as shown below (again !! yes this is not the same tab)

![image](img/graphql-playground-2.png?raw=true)

✅ In GraphQL Playground,populate the `reference_list` table with the following values:

```yaml
mutation insertGenres {
  action: insertreference_list(value: {label:"genre", value:"Action"}) {
    value{value}
  }
  anime: insertreference_list(value: {label:"genre", value:"Anime"}) {
     value{value}
  }
  award: insertreference_list(value: {label:"genre", value:"Award-Winning"}) {
     value{value}
  }
  children: insertreference_list(value: {label:"genre", value:"Children & Family"}) {
     value{value}
  }
  comedies: insertreference_list(value: {label:"genre", value:"Comedies"}) {
     value{value}
  }
  documentaries: insertreference_list(value: {label:"genre", value:"Documentaries"}) {
     value{value}
  }
  drama: insertreference_list(value: {label:"genre", value:"Dramas"}) {
     value{value}
  }
  fantasy: insertreference_list(value: {label:"genre", value:"Fantasy"}) {
     value{value}
  }
  french: insertreference_list(value: {label:"genre", value:"French"}) {
     value{value}
  }
  horror: insertreference_list(value: {label:"genre", value:"Horror"}) {
     value{value}
  }
  independent: insertreference_list(value: {label:"genre", value:"Independent"}) {
     value{value}
  }
  music: insertreference_list(value: {label:"genre", value:"Music"}) {
     value{value}
  }
  romance: insertreference_list(value: {label:"genre", value:"Romance"}) {
     value{value}
  }
  scifi: insertreference_list(value: {label:"genre", value:"Sci-Fi"}) {
     value{value}
  }
  thriller: insertreference_list(value: {label:"genre", value:"Thriller"}) {
     value{value}
  }  
}
```

[🏠 Back to Table of Contents](#table-of-content)

## 6. Retrieving list of values

✅ In GraphQL Playground, not changing tab (yeah) list values from the table with the following command.

```yaml
query getAllGenre {
    reference_list (value: {label:"genre"}) {
      values {
      	value
      }
    }
}
```

*👁️ Expected output*
![image](img/graphql-playground-3.png?raw=true)

[🏠 Back to Table of Contents](#table-of-content)

## 7. Creating a Movies Table

✅ Move to tab `GRAPHQL-SCHEMA`, everything should be set, use the following mutation to create a new table:

```yaml
mutation {
  movies_by_genre: createTable(
    keyspaceName:"netflix",
    tableName:"movies_by_genre",
    ifNotExists: true,
    partitionKeys: [
      { name: "genre", type: {basic: TEXT} }
    ]
    clusteringKeys: [ 
      { name: "year", type: {basic: INT}, order: "DESC" },
      { name: "title", type: {basic: TEXT}, order: "ASC" }
    ]
    values: [
      { name: "synopsis", type: {basic: TEXT} },
      { name: "duration", type: {basic: INT} },
      { name: "thumbnail", type: {basic: TEXT} }
    ]
  )
}
```

[🏠 Back to Table of Contents](#table-of-content)

## 8. Insert Values in Movie table

✅ Move to tab `GRAPHQL`, everything should be set, use the following mutation to populate movies table: 

```yaml
mutation insertMovies {
  inception: insertmovies_by_genre(
    value: { 
      genre:"Sci-Fi", 
      year:2010,
      title:"Inception",
      synopsis:"Cobb steals information from his targets by entering their dreams.",
      duration:121,
      thumbnail:"https://i.imgur.com/RPa4UdO.mp4"}) {
    value{title}
    }
  
  prometheus: insertmovies_by_genre(value: { 
      genre:"Sci-Fi", 
      year:2012,
      title:"Prometheus",
      synopsis:"After a clue to mankind's origins is discovered, explorers are sent to the darkest corner of the universe.",
      duration:134,
      thumbnail:"https://i.imgur.com/L8k6Bau.mp4"}) {
    value{title}
   }
  
  aliens: insertmovies_by_genre(value: { 
      genre:"Sci-Fi", 
      year:1986,
      title:"Aliens",
      synopsis:"Ellen Ripley is sent back to the planet LV-426 to establish contact with a terraforming colony.",
      duration:134,
      thumbnail:"https://i.imgur.com/QvkrnyZ.mp4"}) {
    value{title}
   }
  
   bladeRunner: insertmovies_by_genre(value: { 
      genre:"Sci-Fi", 
      year:1982,
      title:"Blade Runner",
      synopsis:"Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
      duration:145,
      thumbnail:"https://i.imgur.com/xhhvmj1.mp4"}) {
    value{title}
   }
 }
```


[🏠 Back to Table of Contents](#table-of-content)

## 9. Retrieve values from Movie tables

✅ In GraphQL Playground, not changing tab (yeah) list values from the table with the following command.

```
query getMovieAction {
    movies_by_genre (
      value: {genre:"Sci-Fi"},
       orderBy: [year_DESC]) {
      values {
      	year,
        title,
        duration,
        synopsis,
        thumbnail
      }
    }
}
```