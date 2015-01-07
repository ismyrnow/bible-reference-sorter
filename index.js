var sword = require('sword');
var $ = require('jquery');

$(function () {
  $('body').append('<input id="reference1" placeholder="Reference 1" value="1jn 1:2-5" />');
  $('body').append('<input id="reference2" placeholder="Reference 2" value="2 Chronicles 2:1" />');
  $('body').append('<a href="#" id="sort">Which comes first?</a>');
  $('body').append('<p id="result"></p>');
  
  $('#sort').on('click', function () {
    var reference1 = $('#reference1').val();
    var reference2 = $('#reference2').val();    
    var comparison = compareReferences(reference1, reference2);
    var result = comparison < 0 ? 'Reference 1' : comparison > 0 ? 'Reference 2' : 'Equal';    
    $('#result').text(result);
  });
});

function compareReferences(a, b) {   
    var swordA = sword(a);
    var swordB = sword(b);
  
    var numA = refToNumber(swordA[0].start);
    var numB = refToNumber(swordB[0].start);
    
    return numA < numB ? -1 : numA > numB ? 1 : 0;
}

function refToNumber(ref) {
  return +('' + pad(ref.book, 3) + pad(ref.chapter, 3) + pad(ref.verse, 3));
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}