import {Item} from './Item'

class Todo {

    items
    static itemId = 0
    id
    title

    constructor(id) {
        // TODO check for Todo datatype
        // if (todo) {
        //     this = todo
        // }
        // else {
            this.items = []
            this.title = ''
            this.id = id
        // }
    }

    addItem = (value) => {
        this.items.push(new Item(++Todo.itemId, value))
    }

    updateTitle = (title) => {
        this.title = title
    }

    removeItem = (id) => {
        const findIndex = this.items.findIndex(a => a.id === id)
        findIndex !== -1 && this.items.splice(findIndex, 1)
    }

}

export {Todo}