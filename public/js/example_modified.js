var Submission = React.createClass({
  render: function() {
    return (
      <div className="submission">
        <div className="text">
            &ldquo;{this.props.content}&rdquo;
        </div>
        <div className="date">
            {this.props.date}
        </div>
      </div>
    );
  }
});

var SubmissionArea = React.createClass({
  loadSubmissionsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadSubmissionsFromServer();
    animateDiv();
    setInterval(this.loadSubmissionsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="submissionArea">
        <SubmissionList data={this.state.data} />
      </div>
    );
  }
});

var SubmissionList = React.createClass({
  render: function() {
    var submissionNodes = this.props.data.map(function(submission) {
      return (
        <Submission content={submission.content} date={submission.date} key={submission.id}>
          {submission.content}
        </Submission>
      );
    });
    return (
      <div className="SubmissionList">
        {submissionNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <SubmissionArea url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
