export default function lists(lists =[], action) {
    switch (action.type){
        case 'FETCH_LISTS':
            return action.payload
        case 'UPDATE_LIST':
            return lists.map(list => list._id === action.payload._id ? action.payload : list)
        case 'CREATE_LIST':
            return [...lists, action.payload]
        case 'MOVE_TASKS':
            return lists.map(list => list._id === action.payload._id ? action.payload : list)
        default: 
            return lists
    }
}