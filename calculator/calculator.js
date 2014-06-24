function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function subtract(x, y) {
  return x - y;
}

var num1 = [];
var num2 = [];
var operand = null;


$(".numpad").click(function() {
  var input = $(this).html(); 
  $( this ).fadeOut(100).fadeIn(100);
    if (!operand) { 
      num1.push(input);
      $("#screen").html(num1.join('')); 
    }
    else { 
      num2.push(input);
      $("#screen").html(num1.join('') + operand + num2.join('')); 
    }
});

$("#add").click(function() {
  if (!operand) {
  operand = "+";
  $("#screen").html(num1.join('')+operand);
  $( this ).fadeOut(100).fadeIn(100);
  }
});

$("#subtract").click(function() {
  if (!operand) {
  operand = "-";
  $("#screen").html(num1.join('')+operand);
  $( this ).fadeOut(100).fadeIn(100);
}
});

$("#multiply").click(function() {
  if (!operand) {
  operand = "*";
  $("#screen").html(num1.join('')+operand);
  $( this ).fadeOut(100).fadeIn(100);
  }
});

$("#divide").click(function() {
  if (!operand) {
  operand = "/";
  $("#screen").html(num1.join('')+operand);
  $( this ).fadeOut(100).fadeIn(100);
  }
});

$('#clear').click(function() {

  num1 = [];
  num2 = [];
  operand = null;
  $("#screen").html(0);
  $( this ).fadeOut(100).fadeIn(100);
})

$("#equals").click(function() {
  if (num1 && num2 && operand) {
    $( this ).fadeOut(100).fadeIn(100);
    var n1 = +num1.join('');
    var n2 = +num2.join('');
    var result = null;
    switch (operand) {
      case '+':
        result = add(n1,n2);
        break;
      case '-':
        result = subtract(n1,n2);
        break;
      case '*':
        result = multiply(n1,n2);
        break;
      case '/':
        result = divide(n1,n2);
        break;
      }
      console.log(result);
      $("#screen").html(result);
  num1 = [result]; //user can keep hitting 'enter' to continue calculations.
  num2 = [];
  operand = null;
  }
});


