import { Component } from 'react';
import IssueRow from './IssueRow';

class IssueTable extends Component {
   
    render() { 
        const issues = this.props.issues.map((issue) => {
            return(
                <IssueRow issue={issue} key={issue.id} />
            );
        });
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Owner</th>
                            <th>Created</th>
                            <th>Effort</th>
                            <th>Due Date</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues}
                    </tbody>
                </table>
            </div>
          );
    }
}
 
export default IssueTable;