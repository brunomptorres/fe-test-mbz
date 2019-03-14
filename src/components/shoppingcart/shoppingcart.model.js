(function() {
  var MODULE_NAME = 'shoppingcartModel',
    NAMESPACE = 'nn',
    cart;

  window[NAMESPACE] = window[NAMESPACE] || {};

  window[NAMESPACE][MODULE_NAME] = function() {
    function _getCart() {
      return cart;
    }

    function arrayObjectIndexOf(arr, item, property) {
      for(let i = 0; i < arr.length; i++) {
        if(arr[i][property] === item[property]) {
          return i;
        }
      }
      return -1;
    }

    function addExistingProduct(newOrExistingProducts, index) {
      if(newOrExistingProducts.quantity) {
        cart.products[index].quantity = 0;
        cart.total.beforeVAT = 0;
      } else {
        cart.products[index].quantity++;
      }
    }

    function addNewProduct(newOrExistingProducts) {
      if(newOrExistingProducts.quantity) {
        cart.products.push(newOrExistingProducts);
      } else {
        cart.products.push(Object.assign({}, newOrExistingProducts, {quantity: 1}));
      }
    }

    function _destroy() {
      cart = {
        total: {
          beforeVAT: 0,
          afterVAT: 0,
          VAT: 0
        },
        products: []
      };
    }

  return {
      init: function(initialState) {
        if(initialState) {
          cart.products = initialState.products;
          cart.total.beforeVAT = 0;
          cart.VATRate = initialState.VATRate

          cart.products.forEach(function(item) {
            cart.total.beforeVAT += item.price * item.quantity;
          });

          cart.total.VAT = (cart.total.beforeVAT / 100) * cart.VATRate;
          cart.total.afterVAT = cart.total.VAT + cart.total.beforeVAT;
        } else {
          cart = {
            products: [],
            total: {
              beforeVAT: 0,
              afterVAT: 0,
              VAT: 0
            }
          };
        }
      },

      getCart: _getCart,

      addProducts: function (newOrExistingProducts) {
        var index = arrayObjectIndexOf(cart.products, newOrExistingProducts, name);
        if(index > -1) {
          addExistingProduct(newOrExistingProducts, index);
        } else {
          addNewProduct(newOrExistingProducts);
        }

        cart.total.beforeVAT += (newOrExistingProducts.price * newOrExistingProducts.quantity) || 0;
        cart.total.afterVAT = cart.total.beforeVAT + (cart.total.beforeVAT * cart.total.VAT);

        return _getCart();
      },

      changeProductQuantity: function(product, newQuantity) {
        var index = arrayObjectIndexOf(cart.products, product, 'name');

        if(newQuantity > 0) {
          cart.total.beforeVAT -= cart.products[index].quantity * cart.products[index].price;
          cart.products[index].quantity = newQuantity;
          cart.total.beforeVAT += cart.products[index].quantity * cart.products[index].price;
          cart.total.VAT = (cart.total.beforeVAT / 100) * cart.VATRate;
          cart.total.afterVAT = cart.total.beforeVAT + cart.total.VAT;
        }

        return _getCart();
      },

      removeProducts: function(productsToDelete) {
        if(!productsToDelete.length) {
          productsToDelete = [productsToDelete];
        }

        if(productsToDelete === cart.products) {
          _destroy();
          return _getCart();
        }

        productsToDelete.forEach(function(product) {
          var index = arrayObjectIndexOf(cart.products, product, 'name');

          if(index > -1) {
            cart.total.beforeVAT -= cart.products[index].price * cart.products[index].quantity;
            cart.total.VAT = (cart.total.beforeVAT / 100) * cart.VATRate;
            cart.total.afterVAT = cart.total.beforeVAT + cart.total.VAT;
            cart.products.splice(index, 1);
          }
        });

        return _getCart();
      },

      destroy: _destroy
    };
  };
})();
