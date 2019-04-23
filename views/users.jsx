var React = require("react");

class Users extends React.Component {
  render() {
    // const seeSingleArtistPath = `/artists/${this.props.artists[0].id}`
    const tablebody = this.props.track.map(item => {
      return (
        <tbody>
          <tr>
            <td>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.password}</td>
          </tr>
        </tbody>        
      );        
    });

    return (
      <html>
        <head />
        <body>
          <h1>Welcome to your tracker</h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Password</th>
              </tr>
            </thead>
            {tablebody}
          </table>
        </body>
      </html>
    );
  }
}

module.exports = Users;