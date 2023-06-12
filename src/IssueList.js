import { Component } from 'react';
import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';

const issues = [
    {
      id: 1, 
      status: 'Open', 
      owner: 'Ravan',
      created: new Date('2016-08-15'), 
      effort: 5, 
      completionDate: undefined,
      title: 'Error in console when clicking Add',
    },
    {
      id: 2, 
      status: 'Assigned', 
      owner: 'Eddie',
      created: new Date('2016-08-16'), 
      effort: 14, 
      completionDate: new Date('2016-08-30'),
      title: 'Missing bottom border on panel',
    },
  ];


class IssueList extends Component {
  constructor(){
    super();
    this.state = {
      issues: []
    }
  }
  
  componentDidMount() {

    fetch('/graphql', { 
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: `query Query {
          issueList {
            completionDate
            created
            effort
            id
            owner
            status
            title
          }
        }`
      })
    }).then(res => {
      if (res.ok) {
        res.json().then(body => {
          console.log(body);

          body.data.issueList.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate) {
              issue.completionDate = new Date(issue.completionDate);
            }
          });
          this.setState({ issues: body.data.issueList});
        })
      } else {
        res.json().catch(err => console.log(err))
      }
    }).catch(error => console.log(error));

    // Express GET fetch request
    // fetch('/api/issues')
    //   .then(res => res.json())
    //   .then(data => {
    //     // console.log(data);
    //     data.records.forEach(issue => {
    //       issue.created = new Date(issue.created);
    //       if (issue.completionDate) {
    //         issue.completionDate = new Date(issue.completionDate);
    //       }
    //     });
    //     this.setState({ issues: data.records});
    //   }).catch(err => console.error(err));
  }

  createIssue = (issue) => {
    // GraphQL Mutation for creating the issue
    fetch('/graphql', { 
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: `mutation Mutation($issue: IssueInputs) {
          issueAdd(issue: $issue) {
            completionDate
            created
            effort
            id
            owner
            status
            title
          }
        }`, 
        variables: {issue}
      })
    })
      .then(res => res.json())
      .then(body => {
        console.log(body);
        body.data.issueAdd.created = new Date(body.data.issueAdd.created);
          if (body.data.issueAdd.completionDate) {
            body.data.issueAdd.completionDate = new Date(body.data.issueAdd.completionDate);
          }
          const newIssueArray = [...this.state.issues, body.data.issueAdd];
          this.setState({ issues: newIssueArray});
      });

    // Rest API POST call for creating the issue
    // fetch('/api/issues', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(issue)
    // }).then(res => {
    //   if (res.ok) {
    //     res.json().then(data => {
    //       console.log(data)
    //       data.created = new Date(data.created);
    //       if (data.completionDate) {
    //         data.completionDate = new Date(data.completionDate);
    //       }
    //       const newIssueArray = [...this.state.issues, data];
    //       this.setState({ issues: newIssueArray});
    //     })
    //   } else {
    //     res.json().catch(err => {console.log(err)});
    //   }
    // }).catch(error => console.log(error));
  }

    render() { 
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues}/>
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </div>

          );
    }
}
 
export default IssueList;