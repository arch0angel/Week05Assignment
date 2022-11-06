class ToDo {
    constructor(name) {
    this.name = name;
    this.items = [];
    }
    addItem(item) {
        if (item instanceof Item) {
            this.items.push(item);
        } else {
            throw new Error(`You can only add an instance of Item. Argument is not an item: ${item}`);
        }
    }
    describe() {
        return `${this.name} has ${this.items.length} items.`
    }
}

class Item {
    constructor(item, timeDue) {
        this.item = item;
        this.timeDue = timeDue;
    }
    describe() {
        return `${this.item} is due ${this.timeDue}.`;
    }
}

class Menu {
    constructor() {
        this.lists = [];
        this.selectedList = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createList();
                    break;
                case '2':
                    this.viewList();
                    break;
                case '3':
                    this.deleteList();
                    break;
                case '4':
                    this.displayLists();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }
    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create new list
        2) View list
        3) Delete list
        4) View all lists
        `);
    }
    showListMenuOptions(listInfo) {
        return prompt(`
        0) Back
        1) Create item
        2) Delete Item
        ----------------------
        ${listInfo}
        `);
    }
    displayLists() {
        let listString = '';
        for (let i = 0; i < this.lists.length; i++) {
            listString += i + ') ' + this.lists[i].name + '\n';
        }
        alert(listString);
    }
    createList() {
        let name = prompt('Enter name for new list:');
        this.lists.push(new ToDo(name));
    }
    viewList() {
        let index = prompt('Enter the index of the lists you wish to view:');
        if(index > -1 && index < this.lists.length) {
            this.selectedList = this.lists[index];
            let description = 'List Name: ' + this.selectedList.name + '\n';
            for (let i = 0; i < this.selectedList.items.length; i++) {
                description += i + ') ' + this.selectedList.items[i].item + ' - ' + this.selectedList.items[i].timeDue + '\n';
            }
            let selection = this.showListMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem();
            }
        }
    }
deleteList() {
    let index = prompt('Enter index of list you wish to delete:');
    if (index > -1 && index < this.lists.length) {
        this.lists.splice(index, 1);
    }
}
createItem() {
    let item =  prompt('Enter name for new list item:');
    let timeDue = prompt('Enter time due for new item:');
    this.selectedList.items.push(new Item(item, timeDue))
}
deleteItem() {
    let index = prompt('Enter the index of the item you wish to delete:');
    if (index > -1 && index < this.selectedList.items.length) {
        this.selectedList.items.splice(index, 1);
    }
}
}
let menu = new Menu();
menu.start();