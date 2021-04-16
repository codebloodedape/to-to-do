import {STATUS} from './Enums/Status'

class Item {
    id
    value
    status

    constructor(id, value) {
        this.id = id
        this.value = value
        this.status = STATUS.Undone
    }

    toggle = () => {
        this.status = this.status === STATUS.Undone ? STATUS.Done : STATUS.Undone
    }

    change = (value) => {
        this.value = value
    }
}

export {Item}