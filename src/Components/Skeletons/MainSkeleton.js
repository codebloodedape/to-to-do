import React from 'react'
import TodoPanel from '../TodoPanel/TodoPanel'
import { Item } from '../../Models/Item'
import { Todo } from '../../Models/Todo'
import './MainSkeleton.css'
import removeIcon from '../../img/remove.png'
import addIcon from '../../img/plus.png'

class MainSkeleton extends React.Component {
    static id = 0
    constructor(props) {
        super(props)
        // let list = new Todo(++MainSkeleton.id)
        // let list1 = new Todo(++MainSkeleton.id)
        // list.addItem('Apple')
        // list.addItem('Sugar')
        this.state = {
            lists: [],
            selectedList: null
        }
    }

    closePanel = (list) => {
        const todos = [...this.state.lists]
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === list.id) {
                todos[i] = list
                break
            }
        }
        this.setState({
            selectedList: null,
            lists: todos
        })
    }

    onTodoSelect = (list) => {
        console.log(list)
        this.setState({
            selectedList: list
        })
    }

    onNewTodoSelect = () => {
        const list = new Todo(++MainSkeleton.id)
        const lists = [...this.state.lists]
        lists.push(list)
        this.setState({
            lists,
            selectedList: list
        })
    }

    deleteList = (e, list) => {
        e.stopPropagation()
        // console.log(e)
        const lists = []
        this.state.lists.map(l => {
            if (list.id !== l.id) {
                lists.push(l)
            }
        })
        this.setState({
            lists
        })
    }
    render() {
        let panel = null
        if (this.state.selectedList) {
            panel = (
                <div className='panelBackground'>
                    <div className='panel'>
                        <TodoPanel closePanel={this.closePanel} list={this.state.selectedList}></TodoPanel>
                    </div>
                </div>
            )
        }
        // else {
        return (
            <div className='mainBackground'>

                <div className='tilesContainer'>
                    {
                        this.state.lists.map(list => {
                            return (
                                <div>
                                    <div className='tile' onClick={() => { this.onTodoSelect(list) }}>{list.title}
                                        <img draggable="false" onClick={(e) => { this.deleteList(e, list) }} width="30" height="30" className='icon deleteIcon'
                                            src={removeIcon} /></div>
                                    {/* <img draggable="false" onClick={this.deleteList} width="30" height="30" className='icon' src={removeIcon} /> */}
                                </div>
                            )
                        })
                    }
                    <div className='tile' onClick={() => { this.onNewTodoSelect() }}>
                        <img draggable="false" width="30" height="30" className='icon addIcon' src={addIcon} />
                    </div>
                    {/* </div> */}
                </div>

                {panel}
            </div>
        )
        // }
    }
}

export default MainSkeleton