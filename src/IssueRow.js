const IssueRow = (props) => {
    return (  
        <tr>
            <td>{props.issue.id}</td>
            <td>{props.issue.status}</td>
            <td>{props.issue.owner}</td>
            <td>{props.issue.created ? props.issue.created.toDateString() : ''}</td>
            <td>{props.issue.effort}</td>
            <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
            <td>{props.issue.title}</td>
        </tr>
    );
}
 
export default IssueRow;