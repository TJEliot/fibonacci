class MyClass extends React.Component {
  constructor() {
    super();
    this.state = {
      whichNumber: ``,
      display: ``
    }
    this.calculate = this.calculate.bind(this);
    this.calculateNthFibHelper = this.calculateNthFibHelper.bind(this);
    this.formatToStringHelper = this.formatToStringHelper.bind(this);
    this.wasThatEnter = this.wasThatEnter.bind(this);
  }
  
  wasThatEnter(event) {
    if (event.key === "Enter") {
      this.calculate()
      document.getElementById('input').value = '';
    }
  }
  
  calculate() {
    var whichString = document.getElementById(`input`).value;
    var whichNumber = parseFloat(whichString);
    /* take in the input from the field, then check to make sure it's valid input */
    if (isNaN(whichString) || ((whichNumber%1) !== 0) || whichNumber < 0) {
      this.setState(() => {return {display: `Positive integers or zero only, please`}});
    } else {
      /* calculate the fibonacci number, then format what we want to display, using two helper functions,
      then display it by setting the state */
      var answer = this.calculateNthFibHelper(whichNumber);
      if (answer === Infinity) {
        this.setState(() => {return {display: `That Fibonacci number is too big for this machine to calculate!`}})
      } else {
        var toDisplay = this.formatToStringHelper(whichNumber, answer);
        this.setState(() => {return {display: toDisplay}}) 
      }
    }
  }
 
  formatToStringHelper(num, fib){
    var prefixes = {'1':'st', '2':'nd', '3':'rd'}
    var onesDigit = `${num % 10}`;
    var tensDigit = Math.floor(num/10) % 10;
    if (onesDigit === '0'){
      return `The 0th Fibonacci number is 1. Good job on figuring out that the sequence is zero-indexed!`
    } else if (tensDigit !== 1 && prefixes[onesDigit] !== undefined) {
      return `The ${num}${prefixes[onesDigit]} Fibonacci number is ${fib}`
    } else {
      return `The ${num}th Fibonacci number is ${fib}`
    }
  }
  
  calculateNthFibHelper(n) {
    /*
    The below formula explicitly calculates the nth Fibonacci number. 
    This is the ideal way to calculate the value, as it is done in O(1) time 
    and uses only a single spot in memory. Can't beat that! Below the explicit 
    calculation, I have included two more methods, both commented out, 
    along with my comments on them, since I'm guessing you wanted to test 
    my algorithm design skills, not my maths knowledge. But hey, maybe 
    being able to figure out how to replace complex algorithms with 
    simple mathematical equivalents is a thing you value, and it's 
    definitely the best way to do this particular problem, so I'm including it
    */
    n++;
    return (Math.ceil(((1 / Math.sqrt(5)) * (((1 + Math.sqrt(5))/2)**n - ((1 - Math.sqrt(5))/2)**n))));
    
    /*
    Next up is the naive solution: recursion based on the definition
    of the Fibonacci Sequence. While this works for lower bounds, it is 
    unfortunately far too slow for large numbers, moving at O(2^n) time
    
    I'm leaving actual comments in between these star slashes and putting
    commented out code behind double slashes, for ease of swapping out 
    which algorithm is active
    */
    
    // if (n === 0) {
    //   return 0
    // } else if (n === 1) {
    //   return 1
    // } else {
    //   return this.calculateNthFibHelper(n-1) + this.calculateNthFibHelper(n-2);
    // }
    
    /*    
    And finally (though there are still more ways to do this, of course), 
    we have a while loop. This is also fast and effective, but not as 
    beautiful as the explicit formula. Gets the job done in O(n) time
    */
    
    // var firstFib = 1;
    // var secondFib = 0;
    // var holder = 0;
    // var counter = 0;
    
    // while (counter < n) {
    //   holder = firstFib;
    //   firstFib = firstFib + secondFib;
    //   secondFib = holder;
    //   counter++;
    // }
    
    // return secondFib;
     
  }
  
  render () {
    return (
      <div id="wrapper">
        <h1>What Fibonacci number would you like to see?</h1>
        <div id="inputDiv">
          <textArea id="input" placeholder="Please enter a positive integer (or zero)" onKeyPress={this.wasThatEnter}></textArea>
          <button onClick={this.calculate}>CALCULATE</button>
        </div>
        <div id="theAnswer">
          {this.state.display}
        </div>
       </div>
    )
  }
}

ReactDOM.render(<MyClass />, document.getElementById('root'))
