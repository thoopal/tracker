const React = require('react');
const Layout = require ('./layout.jsx');

class Details extends React.Component {
  render () {

const income = this.props.details.map(item => {
      return (
        <tbody>
            <tr>  
                  <td>{item.id}</td>
                  <td>{item.salary}</td>
                  <td>{item.rent_rec}</td>
                  <td>{item.misc_income}</td>
            </tr>
        </tbody>
      );        
    });

const expense = this.props.details.map(item => {
      return (
        <tbody>
            <tr>
                  <td>{item.id}</td>
                  <td>{item.rent_pay}</td>
                  <td>{item.tax}</td>
                  <td>{item.utilities}</td>
                  <td>{item.dining}</td>
                  <td>{item.Grocery}</td>
                  <td>{item.travel}</td>
                  <td>{item.shopping}</td>
                  <td>{item.misc_exp}</td>
                
            </tr>
        </tbody>
      );        
    });

const invest = this.props.details.map(item => {
      return (
        <tbody>
            <tr>
                  <td>{item.id}</td>
                  <td> {item.invest}</td>

            </tr>
        </tbody>
      );        
    });

    return (
      <Layout>
        <head><link rel="stylesheet" type="text/css" href="/home.css"/></head>
          <h2>Client Details</h2>
          <h3> Income </h3>
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">id</th>
      <th scope="col">Salary</th>
      <th scope="col">Rent Received</th>
      <th scope="col">Misc Income</th>
 
    </tr>
  </thead>
  <tbody>
    <tr>
        {income}
    </tr>

  </tbody>
</table>


<h3> Expenses </h3>
  <table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">id</th>
      <th scope="col">Rent</th>
      <th scope="col">Tax</th>
      <th scope="col">Utilities</th>
      <th scope="col">Dining</th>
      <th scope="col">Grocery</th>
      <th scope="col">Travel</th>
      <th scope="col">Shopping</th>
      <th scope="col">Misc Expense</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
        {expense}
    </tr>

  </tbody>
</table>

<table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">id</th>
      <th scope="col">Investments</th>
 
    </tr>
  </thead>
  <tbody>
    <tr>
        {invest}
    </tr>

  </tbody>
</table>

      </Layout>
    );
  }
}



module.exports = Details;


