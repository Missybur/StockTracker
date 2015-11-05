'use strict';

$(document).ready(init)

function init(){
  $('#getStock').on('click', getStock)
  $('.cardHolder').on('click', 'tr', getQuote)
}

var sData;
var sQuote;
function getStock(){
  var stockName = $('#stockName').val();
  $.ajax('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input='+ stockName , {
     dataType: 'jsonp'
  })
  .done(function(data){
    console.log(data);
    sData = data;
    updateTable();

  })
  .fail(function(err){
    console.error(err)
  })
}

function getQuote(){
  var targetRow = $(event.target).closest('tr')
  var symbol = targetRow.children('.symbol').text();

  console.log(symbol)
  $.ajax('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol='+ symbol,{
      dataType: 'jsonp'
    })
    .done(function(quote){
      quoteDisplay(targetRow, quote);

      
    })
    .fail(function(err){
      console.log(err)
    })
}

function quoteDisplay(target, data){
  console.log(target)
  console.log(data)
  target.children('.percent').remove();
  target.children('.ytd').remove();
  target.children('.open').remove();
  var changeP = data.ChangePercent
  var changeYTD = data.ChangeYTD
  var openP = data.Open
  target.append($('<td>').text(changeP).addClass('percent'))
  target.append($('<td>').text(changeYTD).addClass('ytd'))
  target.append($('<td>').text(openP).addClass('open'))
}

function updateTable(){
  sData.forEach(function(input){
    var exchange = input.Exchange
    var name = input.Name
    var symbol = input.Symbol
    console.log(symbol)
    var sCard = $('<tr/>', {
      class: 'stockCard'
    })
    var sName = $('<td>').text(name)
    var sExchange = $('<td>').text(exchange)
    var sSymbol = $('<td>').text(symbol)
    sSymbol.addClass('symbol')
    sName.appendTo(sCard);
    sExchange.appendTo(sCard);
    sSymbol.appendTo(sCard);
    sCard.appendTo($('.cardHolder'))
  })
}
