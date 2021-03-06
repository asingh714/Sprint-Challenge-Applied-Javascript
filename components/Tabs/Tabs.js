class TabLink {
  constructor(tabElement) {
    // assign this.tabElement to the tabElement DOM reference
    this.tabElement = tabElement; // DOM Reference will be each individual tab div

    // Get the `data-tab` value from this.tabElement and store it here
    this.tabData = this.tabElement.dataset.tab; // Strings inside of data-tab (all, javascript etc)

    // We need to find out if a user clicked 'all' cards or a specific category.  Follow the instructions below to accomplish this task:
    // Check to see if this.tabData is equal to 'all'
    if (this.tabData === "all") {
      // If `all` is true, select all cards regardless of their data attribute values
      this.cards = document.querySelectorAll(".card"); // NodeList
    } else {
      // else if `all` is false, only select the cards with matching this.tabData values
      this.cards = document.querySelectorAll(
        `.card[data-tab='${this.tabData}']`
      );
    }

    // Map over the newly converted NodeList we just created in our if statement above. Convert each this.cards element into a new instance of the TabCard class. Pass in a card object to the TabCard class.
    this.cards = Array.from(this.cards).map(card => new TabCard(card));
    // cards will be an array but it will depend on how many items per array depending on the logic above

    // Add a click event that invokes this.selectTab
    this.tabElement.addEventListener("click", () => {
      // console.log(this.cards); // each click will display items according the card arrays
      this.selectTab(); 
    });
  }

  selectTab() {
    // Select all elements with the .tab class on them
    const tabs = document.querySelectorAll(".tab");

    // Iterate through the NodeList removing the .active-tab class from each element
    tabs.forEach(tab => tab.classList.remove("active-tab")); 
    // always remove all the tabs before we add any in order to prevent duplicates.

    // Select all of the elements with the .card class on them
    const cards = document.querySelectorAll(".card");

    // Iterate through the NodeList setting the display style each one to 'none'
    cards.forEach(card => (card.style.display = "none"));
    // when a new tab is clicked, we want to remove the display on all cards.

    // Add a class of ".active-tab" to this.tabElement
    this.tabElement.classList.add("active-tab"); 
    // now we add .active-tab to the tab link that is clicked

    // Notice we are looping through the this.cards array and invoking selectCard() from the TabCard class. Just un-comment the code and study what is happening here.
    this.cards.forEach(card => card.selectCard());
    // we are invoking the selectCard method in TabCard
  }
}

class TabCard {
  constructor(cardElement) {
    // Assign this.cardElement to the cardElement DOM reference
    this.cardElement = cardElement;
  }
  selectCard() {
    // Update the style of this.cardElement to display = "flex"
    this.cardElement.style.display = "flex";
  }
}

// First step! Create a reference to all ".tab" classes.
let tabs = document.querySelectorAll(".tab"); // NodeList

// Map over the array and convert each tab reference into a new TabLink object.  Pass in the tab object to the Tabs class.  After you finish this line of code, it's time to build out your TabLink class at the top of the page!
tabs = Array.from(tabs).map(tab => new TabLink(tab)); // Array of 6 TabLink Items
