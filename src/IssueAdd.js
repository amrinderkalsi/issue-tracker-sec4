import { Component } from 'react';

class IssueAdd extends Component {
   
    handleSubmit = (event) => {
        event.preventDefault();
        const form = document.forms.issueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            created: new Date(),
            status: 'New'
        });

        // clear the values after submit
        form.owner.value = '';
        form.title.value = '';
    }

    render() { 
        return (
            <div>
                <form name='issueAdd' onSubmit={this.handleSubmit}>
                    <input type="text" name='owner' placeholder="Owner"/>
                    <input type="text" name='title' placeholder="Title" />
                    <button>Add</button>
                </form>
            </div>
          );
    }
}
 
export default IssueAdd;