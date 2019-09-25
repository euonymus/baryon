
<img src="https://raw.githubusercontent.com/euonymus/baryon/materials/screen_shots/alice_perry_grew.jpg" width="600">


Baryon is a react component that allows you to inspect neo4j graph in a simple and intuitive manner.
This enables users to explore further relations from one node to another.

## Features

* Baryon provide you a simple ui to inspect neo4j graph data
* Subject node appears in the main area
* Relationships appear in the list
* Each relationships are written in sentences powered by RDF triple
* Each nodes and relationships can have start-date and end-date
* Relationships are sorted by start-date of relationships then start-date of nodes
* A list of secondary relationships on each connected nodes is available
* Configuration of On / Off secondary relationship list
* Each node-label have their node-label-properties
* Relations are categorized depending on relationship types
	* Each node-label-property is a collection of relationship types
	* ex: Both BROTHER_OF and SISTER_OF go into sibling
* Configuration of URL path to Baryon ui

## Steps to Run sample app

1. Create your [neo4j sandbox](https://neo4j.com/sandbox-v2/)

2. Import [sampledata.txt](https://github.com/euonymus/baryon/blob/master/sampledata.txt) data into your neo4j sandbox

3. git clone this project

```
$ git clone git@github.com:euonymus/baryon.git
$ cd baryon
```

4. Setup your neo4j connection in .env.local

sample .env.local settings

```
# neo4j connection
REACT_APP_NEO4J_URI=bolt://100.26.232.160:38283
REACT_APP_NEO4J_USER=neo4j
REACT_APP_NEO4J_PASSWORD=measurement-intakes-bells
```

5. Install node modules

```
$ npm install
```

6. Start npm project


```
$ npm start
```

## How to Use sample app

* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
* Enter "**The Matrix**" in the form. (In the case you use the [sampledata.txt](https://github.com/euonymus/baryon/blob/master/sampledata.txt))
* Go explore



## How to implement Baryon into your app

Install Baryon as a node_module

```bash
# Configuring Bit as a scoped registry for NPM
$ npm config set '@bit:registry' https://node.bit.dev

# Install Baryon
$ npm i --save @bit/euonymus.baryon.baryon
```

In your React Application, call Baryon in JSX

```js
import Baryon from '@bit/euonymus.baryon.baryon';

function App() {
  return (
    <Baryon quark_name="The Matrix"
            connection={{
              uri: 'bolt://100.26.232.160:38652',
              user: 'neo4j',
              password:'wingnuts-additives-lids'
            }}
	    graphPath={false} />
  );
}
```

## Configurations

### On / Off secondary relationships

Set ***hasSecondLevel*** props in boolean when you call Baryon Component in your JSX

```js
function App() {
  return (
    <Baryon quark_name="The Matrix"
            connection={{
              uri: 'bolt://100.26.232.160:38652',
              user: 'neo4j',
              password:'wingnuts-additives-lids'
            }}
	    hasSecondLevel={false} />
  );
}
```

### Set path to Baryon ui

You can configure the path to the Baryon ui by setting graphPath props.

for example, if you set graphPath like this

```js
function App() {
  return (
    <Baryon quark_name="The Matrix"
            connection={{
              uri: 'bolt://100.26.232.160:38652',
              user: 'neo4j',
              password:'wingnuts-additives-lids'
            }}
	    graphPath="/graph" />
  );
}
```

Each links to other nodes in Baryon component will point to following path

```
/graph/{node-name}
```

graphPath props configuration

|graphPath props|URL|
|---|---|
|false|No URL change|
|string| /{path to string}/{node-name}|
|empty string| /{node-name} |


