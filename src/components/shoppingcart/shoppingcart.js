(function($) {
  'use strict';

  const vat = 20;
  var shoppingCart = [];
  $('#vat__label strong').text(vat);
  $('#section-shoppingcart').hide();

  function arrayObjectIndexOf(arr, item, property) {
    for(let i = 0; i < arr.length; i++) {
      if(arr[i][property] === item[property]) {
        return i;
      }
    }
    return -1;
  }

  window.addProducts = function (elem) {
    let product = JSON.parse(elem.getAttribute('data-shop-listing'));
    let index = arrayObjectIndexOf(shoppingCart, product, 'name');
    let price = parseFloat(product.price);

     if(index < 0) {
      shoppingCart.push(product);
      let id = shoppingCart.indexOf(product);

      if(shoppingCart.length === 1) {
        $('#section-shoppingcart').show();
      }

      $('#shoppingcart-form table tbody')
        .append('<tr id="item-'+
          id +'"><td class="section-shoppingcart__product"><h3>'+
          product.name +'</h3><p>'+
          product.description +'</p><div><button id="remove-'+
          id +'" type="button" onclick="removeProducts(this)">'+
          'Remove</button></div></td><td class="section-shoppingcart__price">'+
          '<span>&euro;</span><output id="price-' +id +'">'+
          price.toFixed(2) +'</output></td><td class="section-shoppingcart__quantity">'+
          '<input id="amount-' + id +'" type="number" min="1" value="1" disabled><span><button '+
          'id="dec-' + id +'" onclick="decreaseProductAmount(this)" '+
          'type="button" aria-label="decrease">-</button><button id="inc-'+
          id +'" onclick="increaseProductAmount(this)" type="button" aria-label="step up">+'+
          '</button></span></td></tr>');
    } else {
      let amount = parseInt($('#amount-' + index).val());
      $('#amount-' + index).val(++amount);
    }

    let noVatValue = parseFloat($('#novat__value').html()) + price || price;
    $('#novat__value').html(noVatValue.toFixed(2));
    let vatValue = noVatValue * (vat/100);
    $('#vat__value').val(vatValue.toFixed(2));
    var total = noVatValue + vatValue;
    $('#total__value').val(total.toFixed(2));
  }

  window.removeProducts = function(elem) {
    let id = elem.getAttribute('id').split('-')[1];
    let price = parseFloat($('#price-' + id).html());
    let amount = parseInt($('#amount-' + id).val());
    let noVatValue = parseFloat($('#novat__value').html()) - amount * price;
    $('#novat__value').html(noVatValue.toFixed(2));
    let vatValue = noVatValue * (vat/100);
    $('#vat__value').val(vatValue.toFixed(2));
    var total = noVatValue + vatValue;
    $('#total__value').val(total.toFixed(2));

    let productName = $('#item-' + id + ' td h3').html();
    let index = arrayObjectIndexOf(shoppingCart, {
      name: productName
    }, 'name');

    $('#item-' + id).remove();
    shoppingCart.splice(index, 1);

    if(shoppingCart.length === 0) {
      $('#section-shoppingcart').hide();
    }
  }

  window.increaseProductAmount = function(elem) {
    let id = elem.getAttribute('id').split('-')[1];
    let price = parseFloat($('#price-' + id).html());
    let amount = parseInt($('#amount-' + id).val());

    $('#amount-' + id).val(++amount);

    let noVatValue = parseFloat($('#novat__value').html()) + price;
    $('#novat__value').html(noVatValue.toFixed(2));
    let vatValue = noVatValue * (vat/100);
    $('#vat__value').val(vatValue.toFixed(2));
    var total = noVatValue + vatValue;
    $('#total__value').val(total.toFixed(2));
  }

  window.decreaseProductAmount = function(elem) {
    let id = elem.getAttribute('id').split('-')[1];
    let amount = parseInt($('#amount-' + id).val());

    if(amount > 1) {
      $('#amount-' + id).val(--amount);
      let price = parseFloat($('#price-' + id).html());
      let noVatValue = parseFloat($('#novat__value').html()) - price;
      $('#novat__value').html(noVatValue.toFixed(2));
      let vatValue = noVatValue * (vat/100);
      $('#vat__value').val(vatValue.toFixed(2));
      var total = noVatValue + vatValue;
      $('#total__value').val(total.toFixed(2));
    } else {
      window.removeProducts(elem);
    }
  }

  $('#shoppingcart-form').on('submit', function(e) {
    e.preventDefault();
    $('#submit-btn').html('Sending your order…');
    $('#submit-btn').prop('disabled', true);
  });

})(jQuery);
