const React = require('react');
const Layout = require ('./layout.jsx');
import {Pie} from 'react-chartjs-2';



class Home extends React.Component {
  render () {

<canvas id="myChart"></canvas>
const income = this.props.clientDetails.map(item => {
      return (
        <tbody>
            <tr>
                  <td>{item.total_salary}</td>
                  <td>{item.total_rent_rec}</td>
                  <td>{item.total_misc_income}</td>
                  <td class = "total">{item.total_income}</td>

            </tr>
        </tbody>
      );        
    });

const expense = this.props.clientDetails.map(item => {
      return (
        <tbody>
            <tr>

                  <td>{item.total_rent_pay}</td>
                  <td>{item.total_tax}</td>
                  <td>{item.total_utilities}</td>
                  <td>{item.total_dining}</td>
                  <td>{item.total_grocery}</td>
                  <td>{item.total_travel}</td>
                  <td>{item.total_shopping}</td>
                  <td>{item.total_misc_exp}</td>
                  <td class = "total">{item.total_expense}</td>
            </tr>
        </tbody>
      );        
    });

const invest = this.props.clientDetails.map(item => {
      return (
        <tbody>
            <tr>
                  <td class = "total">{item.total_invest}</td>

            </tr>
        </tbody>
      );        
    });
 
 data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 18, label: "Direct" },
          { y: 49, label: "Organic Search" },
          { y: 9, label: "Paid Search" },
          { y: 5, label: "Referral" },
          { y: 19, label: "Social" }
        ]
      }]
    } 
 

    return (
      <Layout userId={this.props.userId}>
        <head><link rel="stylesheet" type="text/css" href="/home.css"/></head>
          <h2>Client Details</h2>
          <h3> Income </h3>
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Salary</th>
      <th scope="col">Rent Received</th>
      <th scope="col">Misc Income</th>
      <th scope="col">Total Income</th>
 
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
      <th scope="col">Rent</th>
      <th scope="col">Tax</th>
      <th scope="col">Utilities</th>
      <th scope="col">Dining</th>
      <th scope="col">Grocery</th>
      <th scope="col">Travel</th>
      <th scope="col">Shopping</th>
      <th scope="col">Misc Expense</th> 
      <th scope="col">Total Expense</th> 
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
      <th scope="col">Investments</th>
 
    </tr>
  </thead>
  <tbody>
    <tr>
        {invest}
    </tr>

  </tbody>
</table>

    <Pie
       data={expense}
       height = '50%'

   />
      </Layout>
    );
  }
}




module.exports = Home;


