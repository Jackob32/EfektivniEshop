/**
 * Created by Jakub on 23.04.2017.
 */
// main server function which gets call once the app starts
// on our index.js file
var TodoAPI = () => {

    // serving html/js files through the server
    app.use(express.static('client/public'))

    // routes that gets all todos in a list
    // empty is return if nothing is found
    app.get('/get/all', (request, response) => {
        todoModel.find((error, todos) => {
            logError(error);
            response.send(todos);
        })
    })

    // saves a todo
    // :todo is a paramater passed in the url
    app.get('/save/:todo', (request, response) => {
        let {todo} = request.params

        new todoModel({todo}).save((error, savedTodo) => {
            logError(error);
            response.send(savedTodo);
        })

    })

    // removes a specific todo
    // :date is a parameter passsed in the url
    // using date to find a todo since it's a unique timestamp
    app.get('/remove/:date', (request, response)=>{
        let {date} = request.params

        todoModel.remove({date}, (error, deletedTodo) => {
            logError(error);
            response.send(deletedTodo);
        })
    })

    // finds a specific todo
    // updates it a new todo text and completed value
    app.get('/update/:date/:completed/:todo', (request, response) => {
        let {date, completed, todo} = request.params
        todoModel.findOneAndUpdate({date}, { completed, todo }, { new: true }, (error, updatedTodo) => {
            logError(error);
            response.send(updatedTodo);
        })
    })
}

export default TodoAPI;