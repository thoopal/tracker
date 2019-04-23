var React = require("react");
const Layout = require ('./layout.jsx');

class New extends React.Component {
  render() {
    return (
      <Layout>
        <head> <link rel="stylesheet" type="text/css" href="/tracker.css"/></head>
        <h2>Post new expense/income</h2>
          
          <form method="post" action="/tracker">
              <div class="form-row">

                    <div class="form-group col-md-4">
                      <label>Salary</label>
                      <input type="number" name ="salary" class="form-control" value= "0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Rent recievable</label>
                      <input type="number" name ="rent_rec" class="form-control" value= "0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Miscellaneous Income</label>
                      <input type="number" name ="misc_income" class="form-control" value="0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Rent payable</label>
                      <input type="number" name ="rent_pay" class="form-control" value= "0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Tax</label>
                      <input type="number" name ="tax" class="form-control" value= "0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Utilities</label>
                      <input type="number" name ="utilities" class="form-control" value="0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Dining</label>
                      <input type="number" name ="dining" class="form-control" value= "0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Grocery</label>
                      <input type="number" name ="Grocery" class="form-control" value= "0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Travel</label>
                      <input type="number" name ="travel" class="form-control" value="0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Shopping</label>
                      <input type="number" name ="shopping" class="form-control" value= "0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Miscellaneous Expenses</label>
                      <input type="number" name ="misc_exp" class="form-control" value= "0"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label>Investments</label>
                      <input type="number" name ="invest" class="form-control" value="0"/>
                    </div>
              </div>
                <button type="submit" class="btn btn-primary">Submit</button>
          </form>
         
       </Layout>
    );
  }
}

module.exports = New;
