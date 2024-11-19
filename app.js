    document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    e.preventDefault();

    const issueDesc = document.getElementById('issueDescInput').value;
    const issueSeverity = document.getElementById('issueSeverityInput').value;
    const issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    const issueId = crypto.randomUUID();
    const issueStatus = 'Open';

    const issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };

    let issues = JSON.parse(localStorage.getItem('issues')) || [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
}

function setStatusClosed(id) {
    const issues = JSON.parse(localStorage.getItem('issues'));
    issues.forEach(issue => {
        if (issue.id === id) {
            issue.status = 'Closed';
        }
    });
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    issues = issues.filter(issue => issue.id !== id);
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function fetchIssues() {
    const issues = JSON.parse(localStorage.getItem('issues')) || [];
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';

    issues.forEach(issue => {
        const { id, description, severity, assignedTo, status } = issue;

        issuesList.innerHTML += `
            <div class="card mb-3 p-3">
                <h6>Issue ID: ${id}</h6>
                <p><span class="badge bg-info">${status}</span></p>
                <h5>${description}</h5>
                <p><i class="bi bi-exclamation-triangle-fill"></i> Severity: ${severity}</p>
                <p><i class="bi bi-person-fill"></i> Assigned To: ${assignedTo}</p>
                <div class="button-container">
                <button onclick="setStatusClosed('${id}')" class="btn btn-warning me-2" style="height: 40px; width: 80px;">Close</button> 
                <button onclick="deleteIssue('${id}')" class="btn btn-danger" style="height: 40px; width: 80px;">Delete</button>
            </div>
            </div>
        `;
    });
}
