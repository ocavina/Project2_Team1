# Magic Digital Collection

## A digital tool to search and add Magic the Gathering cards to a collection.

### Features

**Card Search**: Search for Magic the Gathering cards using the search bar or various filters such as name, mana cost, power, toughness, and color.

**Card Info**: View information like price, mana cost, type, power/toughness, and set name when a card is clicked on from your search. 

**Add**: If you like a card enough to add to your collection, the add button will send that card to your collection with all the other cards you have added.

**Collection**: Using the "My Collection" button you are directed to the collection page where you are able to view all the cards you have added to your collection using the "Add" button. A total price of all the cards in your collection will be displayed along with "Delete" and "Delete All" buttons so you are able to add and delete as you please.

## Roadmap

Wireframe for the basic original intention of the application:

![Wireframe Homepage](/public/images/magichomewireframe.png)
![Wireframe Details](/public/images/cardinfowireframe.png)
![Wireframe Collection](/public/images/cardcollectionwireframe.png)

[Kanban Board](https://trello.com/invite/b/67c609a7266ddaaa8897b75b/ATTI52db1f3e47ca84627f904160936b3d334AB9B15F/group-1-magic-card-game-app)

### Demo

![Homepage](/public/images/magichome.png)
![Search](/public/images/magicsearch.png)
![Card Info](/public/images/magiccardinfo.png)
![Collection](/public/images/magiccollection.png)

### Installation

1. **Clone the repository**:
   git clone https://github.com/yourusername/Project2_Team1.git

2. **Navigate to the project directory**:
   cd Project2_Team1

3. **Install dependencies**:
   npm install
   npm install react-router-dom
   npm i @uidotdev/usehooks
   npm install -g vitest
   npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom


4. **Start the development server**:
   npm start

5. **Open your browser** and navigate to whatever localhost port it opened on to view the application.

### Run Tests

    npm test

### Acknowledgements

**React**: Used as a baseline and structure for our project.

**React Router**: Used to handle the routing in our application

**Scryfall API**: This is the API we fetched all our data from. Where the images and all the details used came from.

**readme.so**: Used to structure ReadMe.md

### Authors

**Ethan Diem, Lorena Longoria, Damon Hayes, Oscar Avina**