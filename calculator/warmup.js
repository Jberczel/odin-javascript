

function my_max(array) {
  var max = array[0];
  for (var i = 1, iCnt = array.length; i < iCnt; i += 1) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}


function vowel_count(array) {
  var count = 0,
      re = /[aeiou]/i;

  for(var i = 0, iCnt = array.length; i < iCnt; i += 1) {
    if (re.test(array[i])) {
      count++;
    }
  }
  return count;
}


function reverse(string) {
  var rev = '';
  for (var i = string.length-1; i >= 0; i -= 1) {
    rev += string[i];
  }
  return rev;
}


