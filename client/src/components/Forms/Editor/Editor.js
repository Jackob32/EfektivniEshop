
import React, {Component} from 'react';
import 'react-select-plus/dist/react-select-plus.css';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Input extends Component {
    constructor(props) {
        super(props)



    }
    render() {
        const {input, meta: {touched, error, warning}}=this.props;
        return (

            <div>
                    <Editor
                        {...input}
                        {...this.props}
                        wrapperClassName="card-block"
                        onEditorStateChange={() => {this.props.input.onChange()}}
                        value={this.props.input.value}
                        editorState={this.props.input.value}
                    />

                    {touched &&
                    ((error && <span className="help-block">{error}</span>) ||
                    (warning && <span className="help-block">{warning}</span>))}
                 </div>

        );
    }
}

export default Input;

