
<img src="https://raw.githubusercontent.com/graphhack/baryon/materials/screen_shots/alice_perry_grew.jpg" width="600">


Baryon is a react component that allows you to inspect neo4j graph in a simple and intuitive manner.
This enables users to explore further relations from one node to another.

## Steps to Run sample app

1. Create your [neo4j sandbox](https://neo4j.com/sandbox-v2/)

2. Import sampledata.txt data into your neo4j sandbox

Sample Graph data is here

```
sampledata.txt
```

3. git clone this project

```
$ git clone git@github.com:graphhack/baryon.git
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
* Enter "The Matrix" in the form
* Go explore



## How to implement Baryon into your app

Install Baryon as a node_module

```bash
# npm registryに bit を登録
$ npm config set '@bit:registry' https://node.bit.dev

# Install Baryon
$ npm i --save @bit/euonymus.baryon.baryon
```

In your React Application

```js
import Baryon from '@bit/euonymus.baryon.baryon';

function App() {
  return (
			<Baryon quark_name="The Matrix" connection={{
				uri: 'bolt://100.26.232.160:38652',
				user: 'neo4j',
				password:'wingnuts-additives-lids'
			}} graphPath={false} />
  );
}
```
