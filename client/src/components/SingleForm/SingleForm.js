import React, { Component } from 'react';
import { Field, reduxForm, initialize , SubmissionError} from 'redux-form';
import { reducer as formReducer } from 'redux-form'
import { connect } from 'react-redux';
import * as actions from '../../actions/FormSubmit';
import {Input, Button, Message} from 'semantic-ui-react'



class SingleForm extends Component {
    constructor(props) {
        super(props);

    }

    submit({location},dispatch) {
        return new Promise((resolve, reject) => {
            dispatch({
                type: 'FETCH_WEATHER',
                location,
                resolve,
                reject
            });
        }).catch((error)=>{
            throw new SubmissionError(Error);
        });
    }



    locationInput(
        {
            input,
            meta: {
                touched,
                error
            },
            ...custom
        }
        ){
        const hasError= touched && error !== undefined;
        return(
            <div>
                {hasError && <Message error header='Error' content={error}/>}
                <Input error={hasError} fluid placeholder="Location..." {...input} {...custom} />
            </div>
        )
    }

  render() {
      const { handleSubmit } = this.props;
    return (

        <div>
        <div className="row">
          <div className="col-lg-12">


              <form onSubmit={handleSubmit(this.submit.bind(this))}>
                <Field name="location" component={this.locationInput} />
<br />
                  <Button fluid type="submit">Submit</Button>
    </form>
          </div>
          </div>
        </div>

    )
  }
}

const validate = values => {
    const {location} = values;
    const errors={};
    if(!location || location.trim() === ''){
        errors.location='Location required';
    }
    return errors;
}

export default reduxForm({
    form: 'single', validate
})(SingleForm);


