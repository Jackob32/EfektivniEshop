import React, {Component} from 'react';

import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';



class Select2Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            options: props.options,
            name: props.name
        };
        this.getOptions=this.getOptions.bind(this);
        this.onClose=this.onClose.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onUnselect=this.onUnselect.bind(this);
    }

    getOptions(){

}
onClose(){

}
onSelect(){

}
onChange(){

}
onUnselect(){

}

    render() {
        return (
            <div>
                <Select.Async
                    multiple

                    name={this.state.name}
                    data={this.state.data}
                    options={this.state.options}

                    onChange={this.onChange}

                    loadOptions={this.getOptions}
                    isLoading={this.isLoadingExternally}
                />
            </div>
        )
    }
}

export default Select2Example;
