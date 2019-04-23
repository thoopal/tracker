
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');
const SALT = 'apple';
var Chart = require('chart.js');

// Initialise postgres client
const configs = {
  user: 'Admin',
  // password: 'postgres',
  host: '127.0.0.1',
  database: 'tracker',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
app.use(cookieParser());


//************get user details*****************************//

app.get('/users', (req, res)=>{
	const querystring = 'SELECT * FROM users ORDER BY id';
	pool.query(querystring, (err, result)=>{
		if(err){
			console.log("error");
		}else{
			const data = {track: result.rows};
			res.render("users", data);
		}
	});
});


//************get tracker details*****************************//

app.get('/wealth', (req, res)=>{
	const querystring = 'SELECT * FROM tracker ORDER BY id';
	pool.query(querystring, (err, result)=>{
		if(err){
			console.log("error");
		}else{
			res.send(result.rows);
		}
	});
});


//***************register***********************//
app.get('/register', (request, response) => {
  response.render('registerNewUser');
});

app.post('/register', (request, response) => {

  
  const queryString = "INSERT INTO users (username, password) VALUES ($1, $2)";
  const hash = sha256(request.body.password + SALT);
  const values = [request.body.username, hash];
  console.log(values);

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log(err);
      response.send( 'query error' );
    }else{

      console.log("query done");
      response.send('Registration complete');

    }

  });
});


//*********************login************************//
app.get('/login', (request, response) => {
  response.render('login');
})

app.post('/login', (request, response) => {

  const usernameInput = request.body.username;
  const passwordInput = request.body.password;
  const passwordInputHash = sha256(passwordInput + SALT);
  console.log("363");
  console.log(usernameInput);
  console.log(passwordInput);
  const queryString = `SELECT * from users WHERE username='${usernameInput}'`;

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('370 query error:', err.stack);
      response.send( 'query error' );
    }
    console.log("373");
    console.log(result.rows[0].password);
    console.log("375");
    console.log(passwordInputHash);
    if (result.rows.length === 1) {
      if (passwordInputHash === result.rows[0].password) {

        const hashLoggedIn = sha256(SALT+usernameInput);

        response.cookie('username', usernameInput);
        response.cookie('loggedIn', hashLoggedIn);
        response.cookie('id', result.rows[0].id);
        response.redirect('/tracker');

      } else {
        response.send('Incorrect password. Please refresh page and try again')
      }

    } else {
      response.send('Incorrect username. Please refresh page and try again')
    }

  });
})



//***************post****************************//
app.get('/tracker', (request, response) => {

  response.render('new');
});

app.post('/tracker', (request, response) => {

//Retrieve username and id//
	console.log(request.cookies.id);
 	let cookie_id = request.cookies.id;

//post items other than date and user_id//
  	const queryString = `INSERT INTO tracker (salary, rent_rec, misc_income, rent_pay, tax, utilities, dining, Grocery, travel, shopping, misc_exp, invest, user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, ${cookie_id}) RETURNING id`;

  	const values = Object.values(request.body);

  	pool.query(queryString, values, (err, result) => {
    	if (err) {
      		console.error('80 query error:', err.stack);
      		response.send ('query error');
    	} 	else {
      console.log(result.rows)
      response.redirect(`/tracker/${cookie_id}`);
    	}
 	 });
	});



//*************get summary by username*************//
app.get('/tracker/:id', (req, res)=>{
	const index = req.params.id;
	const querystring = `SELECT SUM(salary) AS total_salary, SUM(rent_rec) AS total_rent_rec, SUM(misc_income) AS total_misc_income, SUM(rent_pay) AS total_rent_pay, SUM(tax) AS total_tax, SUM(utilities) AS total_utilities, SUM(dining) AS total_dining, SUM(Grocery) AS total_grocery, SUM(travel) AS total_travel, SUM(shopping) AS total_shopping, SUM(misc_exp) AS total_misc_exp, SUM(invest) AS total_invest, SUM(salary + rent_rec + misc_income) AS total_income, SUM(rent_pay + tax + utilities + dining + Grocery + travel +shopping + misc_exp) AS total_expense FROM tracker WHERE user_id = ${index}`;
	console.log(querystring);
	pool.query(querystring,(err, result)=>{
		if(err) {
			console.log('240 query error', err.stack )
			res.send("error in tracker for single user")
		} else {
			console.log('workeddddd');
			const data = {clientDetails: result.rows, userId:index}
			console.log(data);
			res.render('home', data);
		}
	});

});

//*****************get detailed entries by user******************

app.get('/tracker/:id/details', (req, res)=>{
	const index = req.params.id;
	const querystring = `SELECT * FROM tracker WHERE user_id = ${index}`;
	pool.query(querystring, (err, result)=>{
		if(err){
			console.log("error");
		}else{
			const data = {details: result.rows, userId:index};
			res.render('details', data);
		}
	});
});

//*****************delete entries by user******************

app.get('/delete', (request, response) => {
  response.render('deleteEntry');
});


app.delete('/delete', (request,response)=>{
	console.log("app delete");

	console.log(request.body.delete)
	const querystring = `DELETE FROM tracker WHERE id = ${request.body.delete}`;
	pool.query(querystring, (err, res)=>{
		if (err) {
			console.log("error 250");
		}else{
			console.log("deleted")
			response.send("deleted")
		}
	})
})

//*****************Search by date range*****************

app.get('/tracker/:id/datesearch', (req,res)=>{
	const index = req.params.id;
	const querystring = `SELECT * from tracker WHERE user_id = ${index} AND datecreated >='2019-04-19'`;
	console.log(querystring);
	pool.query(querystring, (err, result)=>{
		if (err) {
			console.log("error 250");
		}else{
			console.log("date works")
			res.send(result.rows)
		}
	})
})




 /**
 * ===================================
 * Listen to requests on port 8080
 * ===================================
 */

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));
let onClose = function(){
  
  console.log("closing");
  
  server.close(() => {
    
    console.log('Process terminated');
    
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);