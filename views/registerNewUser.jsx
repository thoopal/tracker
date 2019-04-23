

const React = require('react');
const Layout = require ('./layout.jsx');

class registerNewUser extends React.Component {
	render () {

		return (

			<Layout>
				<head> <link rel="stylesheet" type="text/css" href="/loginstyle.css"/></head>
				<h2> Register User </h2>
			    <form method="post" action="/register">
			    <div class="form-group">
			    	<label>Username</label>
			      	  <input type="text" name="username" class="form-control" placeholder="Enter username"/>
			    </div>
			    <div class="form-group">
			    	<label>Password</label>
			      	  <input type= "password" name="password" class="form-control" placeholder="Password" />
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

module.exports = registerNewUser;