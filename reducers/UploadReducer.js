
export function excelDataGrid(state = {}, action) {
    switch(action.type) {
        case 'UPLOAD_FILE_RESULT':
            return action.excelDataGrid;
        default:
            return state;
    }
}