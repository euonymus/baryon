Baryon is a react component that allows you to inspect neo4j graph in a simple and intuitive manner.
This enables users to explore further relations from one node to another.

## Steps to Run

1. Setup your neo4j [sandbox](https://neo4j.com/sandbox-v2/)
1. Import my sample graph data into your neo4j sandbox
1. git clone this project
1. Set your neo4j connection infomation in .env.local
1. Install node modules
1. Start npm project


### Sample Graph data is here

```
sampledata.txt
```

### sample .env.local settings

```
# neo4j connection
REACT_APP_NEO4J_URI=bolt://100.26.232.160:38283
REACT_APP_NEO4J_USER=neo4j
REACT_APP_NEO4J_PASSWORD=measurement-intakes-bells
```

## Installation

```
$ git clone git@github.com:graphhack/baryon.git
$ cd baryon
$ vim .env.local
$ npm install
$ npm start
```

## How to begin

* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
* Enter "The Matrix" in the form
* Go explore

