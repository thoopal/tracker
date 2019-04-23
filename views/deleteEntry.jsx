const React = require('react');
const Layout = require ('./layout.jsx');

class deleteEntry extends React.Component {
  render () {
    console.log("delete entry jsx");

    return (

      <Layout>
        <head> <link rel="stylesheet" type="text/css" href="/loginstyle.css"/></head>
        <h2> Delete Entry </h2>
          <form method="post" action="?_method=delete">
          <div class="form-group">
            <label>Delete Entry</label>
                <input type="number" name="delete" class="form-control" placeholder="Enter id for deletion"/>
          </div>

           <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          </form>      
      </Layout>
    );

  }
}

module.exports = deleteEntry;