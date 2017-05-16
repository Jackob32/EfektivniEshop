import React, { Component } from 'react';
import marked from 'marked';

//style.js
const style = {
    commentBox: {
        width:'80vw',
        margin:'0 auto',
        fontFamily:'Helvetica, sans-serif'
    },
    title: {
        textAlign:'center',
        textTransform:'uppercase'
    },
    commentList: {
        border:'1px solid #f1f1f1',
        padding:'0 12px',
        maxHeight:'70vh',
        overflow:'scroll'
    },
    comment: {
        backgroundColor:'#fafafa',
        margin:'10px',
        padding:'3px 10px',
        fontSize:'.85rem'
    },
    commentForm: {
        margin:'10px',
        display:'flex',
        flexFlow:'row wrap',
        justifyContent:'space-between'
    },
    commentFormAuthor: {
        minWidth:'150px',
        margin:'3px',
        padding:'0 10px',
        borderRadius:'3px',
        height:'40px',
        flex:'2'
    },
    commentFormText: {
        flex:'4',
        minWidth:'400px',
        margin:'3px',
        padding:'0 10px',
        height:'40px',
        borderRadius:'3px'
    },
    commentFormPost: {
        minWidth:'75px',
        flex:'1',
        height:'40px',
        margin:'5px 3px',
        fontSize:'1rem',
        backgroundColor:'#A3CDFD',
        borderRadius:'3px',
        color:'#fff',
        textTransform:'uppercase',
        letterSpacing:'.055rem',
        border:'none'
    },
    updateLink: {
        textDecoration:'none',
        paddingRight:'15px',
        fontSize:'.7rem'
    },
    deleteLink: {
        textDecoration:'none',
        paddingRight:'15px',
        fontSize:'.7rem',
        color:'red'
    }
};

class CommentList extends Component {
    render() {
        let commentNodes = this.props.data.map(comment => {
            if(
                comment.author !== undefined &&
                comment.text !== undefined &&
                comment['_id'] !== undefined
            )
                return (
                    <Comment
                        author={ comment.author }
                        uniqueID={ comment['_id'] }
                        onCommentDelete={ this.props.onCommentDelete }
                        onCommentUpdate={ this.props.onCommentUpdate }
                        key={ comment['_id'] }>
                        { comment.text }
                    </Comment>
                )
        });
        return (
            <div style={ style.commentList }>
                { commentNodes }
            </div>
        )
    }
}

/*
 const url = 'https://randomuser.me/api';
 // The data we are going to send in our request
 let data = {
 name: 'Sara'
 }
 // The parameters we are gonna pass to the fetch function
 let fetchData = {
 method: 'POST',
 body: data,
 headers: new Headers()
 }
 fetch(url, fetchData)
 .then(function() {
 // Handle response you get from the server
 });
* */


class CommentBox extends Component {
    //konstruktor, pocatecni nastaveni, vztvoreni prazdne data promene
    constructor(props){
        console.log("constructor\n");
        super(props);
        this.state = {
            data: []
        };
        console.log(this.state.data);
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    }
    handleCommentSubmit(comment) {

        let fetchData = {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/comments',fetchData)
            .then(res => {
                this.setState({ data: res });
            })
            .catch(err => {
                console.error(err);
            });


    }
    loadCommentsFromServer() {
        fetch('/comments').then(res => res.json())
            .then(res => {
                this.setState({ data: res });
            });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, 2000);
        console.log(this.state.data);
    }
    handleCommentUpdate(id, comment) {
        let fetchData = {
            method: 'PUT',
            body: JSON.stringify(comment),
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch('/comments/'+id,fetchData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    }
    handleCommentDelete(id) {
        let fetchData = {
            method: 'DELETE',
            body: "",
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch('/comments/'+id,fetchData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    }
    render(){
        return(
          <div>
              <h2>Comments:</h2>
              <CommentList
                  onCommentDelete={ this.handleCommentDelete }
                  onCommentUpdate={ this.handleCommentUpdate }
                  data={ this.state.data }/>
              <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>

          </div>
        );
    }
}
/*
url='http://localhost:3001/api/comments'
pollInterval={2000}
*/
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = { author: '', text: ''};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleAuthorChange(e){
        this.setState({author: e.target.value });
    }
    handleTextChange(e){
        this.setState({text: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        let author = this.state.author.trim();
        let text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    }
    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <input
                    type='text'
                    placeholder='Your name...'
                    value={ this.state.author }
                    onChange={ this.handleAuthorChange }
                    name='author'
                />

                <input
                    type='text'
                    placeholder='Say something...'
                    value={ this.state.text }
                    onChange={ this.handleTextChange }
                    name='text'
                />

                <input
                    type='submit'
                    value='Post' />
            </form>
        )
    }
}

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state= {
            toBeUpdated: false,
            author: '',
            text: '',
            actualauthor: this.props.author,
            actualtext: ''

        };
        //binding all our functions to this class
        this.deleteComment = this.deleteComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    }
    updateComment(e) {
        e.preventDefault();
        //brings up the update field when we click on the update link.
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }
    handleCommentUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        //if author or text changed, set it. if not, leave null and our PUT request
        //will ignore it.
        let author = (this.state.author) ? this.state.author : null;
        let text = (this.state.text) ? this.state.text : null;
        let comment = { author: author, text: text};
        this.props.onCommentUpdate(id, comment);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            author: '',
            text: '',
            actualauthor: this.state.author
        })
    }
    deleteComment(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onCommentDelete(id);
        console.log('oops deleted');
        this.state.author=  undefined;
        this.state.text= undefined;
    }
    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div style={ style.comment }>
                <h3>{this.state.actualauthor}</h3>
                <span dangerouslySetInnerHTML={ this.rawMarkup() } />
                <a style={ style.updateLink } href='#' onClick={ this.updateComment }>update</a>
                <a style={ style.deleteLink } href='#' onClick={ this.deleteComment }>delete</a>
                { (this.state.toBeUpdated)
                    ? (<form onSubmit={ this.handleCommentUpdate }>
                        <input
                            type='text'
                            placeholder='Update name...'
                            style={ style.commentFormAuthor }
                            value={ this.state.author }
                            onChange= { this.handleAuthorChange } />
                        <input
                            type='text'
                            placeholder='Update your comment...'
                            style= { style.commentFormText }
                            value={ this.state.text }
                            onChange={ this.handleTextChange } />
                        <input
                            type='submit'
                            style={ style.commentFormPost }
                            value='Update' />
                    </form>)
                    : null}
            </div>
        )
    }
}


class Users extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-6 col-lg-3">

              <CommentBox />

          </div>
        </div>
      </div>
    )
  }
}

export default Users;
