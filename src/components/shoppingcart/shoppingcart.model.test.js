require('./shoppingcart.model');

const NAMESPACE = 'nn',
  MODULE_NAME = 'shoppingcartModel';

const _ = {
  productA: {
    name: 'a',
    price: 1.50,
    quantity: 1
  },
  productB: {
    name: 'b',
    price: 2.50,
    quantity: 2
  },
  productC: {
    name: 'c',
    price: 3.50,
    quantity: 3
  },
  emptyCart: {
    total: {
      beforeVAT: 0,
      afterVAT: 0,
      VAT: 0
    },
    products: []
  },
  getVAT: function(beforeVAT, VATRate) {
    return (beforeVAT / 100) * VATRate;
  },
  getAfterVAT: function(beforeVAT, VAT) {
    return beforeVAT + VAT;
  }
};

describe(`Instance of ${MODULE_NAME.toUpperCase()} initialized WITHOUT state`, () => {
  beforeEach(() => {
    this.instance = window[NAMESPACE][MODULE_NAME]();
    this.instance.init();
    this.productWithoutQuantity = Object.assign({}, _.productA);
    delete this.productWithoutQuantity.quantity;
    this.productWithQuantity = Object.assign({}, _.productB);
  });

  test(`the cart should be empty`, () => {
    expect(this.instance.getCart()).toEqual(_.emptyCart);
  });

  describe(`and ONE product WITH defined QUANTITY was ADDED`, () => {
    beforeEach(() => {
        this.cart = this.instance.addProducts(this.productWithQuantity);
    });

    test(`the cart's products should be the same`, () => {
        expect(this.cart.products).toEqual([this.productWithQuantity]);
    });

    test(`the cart's beforeVAT should be correct`, () => {
        const result = this.productWithQuantity.price * this.productWithQuantity.quantity;

        expect(this.cart.total.beforeVAT).toBe(result);
    });

    test(`the cart's afterVAT should be the cart's beforeVAT as no
      taxes are defined`, () => {
        expect(this.cart.total.afterVAT).toBe(this.cart.total.beforeVAT);
    });

    test(`the cart's VAT should be correct`, () => {
        expect(this.cart.total.VAT).toBe(0);
    });
  });

  describe(`and ONE product WITHOUT defined QUANTITY was ADDED`, () => {
    beforeEach(() => {
        this.cart = this.instance.addProducts(this.productWithoutQuantity);
    });

    test(`the cart's products should be the same`, () => {
        const result = Object.assign({}, this.productWithoutQuantity, {'quantity': 1});

        expect(this.cart.products).toEqual([result]);
    });
  });

  describe(`and TWO TIMES the SAME product WITHOUT defined QUANTITY was ADDED`, () => {
    beforeEach(() => {
      this.instance.addProducts(this.productWithoutQuantity);
      this.cart = this.instance.addProducts(this.productWithoutQuantity);
    });

    test(`the cart's products should be the same`, () => {
      const result = Object.assign({}, this.productWithoutQuantity, {'quantity': 2});
      expect(this.cart.products).toEqual([result]);
    });
  });

  describe(`and TWO TIMES the SAME product WITH defined QUANTITY was ADDED`, () => {
    beforeEach(() => {
      this.instance.addProducts(this.productWithQuantity);
      this.cart = this.instance.addProducts(this.productWithQuantity);

      this.expectedBeforeVAT =
          this.productWithQuantity.price * this.productWithQuantity.quantity * 2;

      this.expectedAfterVAT = this.expectedBeforeVAT;
    });

    test(`the cart's products should be the same`, () => {
      var result = Object.assign({}, this.productWithQuantity);

      result.quantity += this.productWithQuantity.quantity;
      expect(this.cart.products).toEqual([result]);
    });

    test(`the cart's beforeVAT should be correct`, () => {
       expect(this.cart.total.beforeVAT).toBe(this.expectedBeforeVAT);
    });

    test(`the cart's afterVAT should be the beforeVAT as no tax was set`, () => {
      expect(this.cart.total.afterVAT).toBe(this.expectedAfterVAT);
    });

    test(`the cart's VAT should be 0 as it was not set`, () => {
      expect(this.cart.total.VAT).toBe(0);
    });
  });
});

describe(`Instance of ${MODULE_NAME.toUpperCase()} initialized WITH state ` +
  `of TWO DIFFERENT products AND a VATRATE`, () => {
  beforeEach(() => {
    this.instance = window[NAMESPACE][MODULE_NAME]();

    this.productA = Object.assign({}, _.productA);
    this.productB = Object.assign({}, _.productB);
    this.products = [this.productA, this.productB];
    this.VATRate = 20;
    this.instance.init({
      'products': this.products,
      'VATRate': this.VATRate
    });
    this.cart = this.instance.getCart();

    this.expectedBeforeVAT = (this.productA.price * this.productA.quantity) +
        (this.productB.price * this.productB.quantity);

    this.expectedVAT = _.getVAT(this.expectedBeforeVAT, this.VATRate);

    this.expectedAfterVAT = _.getAfterVAT(
      this.expectedBeforeVAT, this.expectedVAT
    );
  });

  it(`the cart's products should be the same`, () => {
    expect(this.cart.products).toEqual(this.products);
  });

  test(`the cart's beforeVAT should be correct`, () => {
    expect(this.cart.total.beforeVAT).toEqual(this.expectedBeforeVAT);
  });

  test(`the cart's afterVAT should be correct`, () => {
    expect(this.cart.total.afterVAT).toEqual(this.expectedAfterVAT);
  });

  test(`the cart's VAT should be correct`, () => {
    expect(this.cart.total.VAT).toEqual(this.expectedVAT);
  });

  describe(`and INCREMENTED one product's QUANTITY`, () => {
    beforeEach(() => {
      this.cart = this.instance.changeProductQuantity(
          this.productA, this.productA.quantity + 1);

      this.expectedBeforeVAT += this.productA.price;
      this.expectedVAT = _.getVAT(this.expectedBeforeVAT, this.VATRate);
      this.expectedAfterVAT = _.getAfterVAT(
        this.expectedBeforeVAT,this.expectedVAT
      );
    });

    test(`the cart's beforeVAT should be correct`, () => {
      expect(this.cart.total.beforeVAT).toEqual(this.expectedBeforeVAT);
    });

    test(`the cart's afterVAT should be correct`, () => {
      expect(this.cart.total.afterVAT).toEqual(this.expectedAfterVAT);
    });

    test(`the cart's VAT should be correct`, () => {
      expect(this.cart.total.VAT).toEqual(this.expectedVAT);
    });
  });

  describe(`and DECREMENTED one product's QUANTITY`, () => {
    beforeEach(() => {
      this.cart = this.instance.changeProductQuantity(
          this.productB, this.productB.quantity - 1);

      this.expectedBeforeVAT -= this.productB.price;
      this.expectedVAT = _.getVAT(this.expectedBeforeVAT, this.VATRate);
      this.expectedAfterVAT = _.getAfterVAT(
        this.expectedBeforeVAT, this.expectedVAT
      );
    });

    test(`the cart's beforeVAT should be correct`, () => {
      expect(this.cart.total.beforeVAT).toEqual(this.expectedBeforeVAT);
    });

    test(`the cart's afterVAT should be correct`, () => {
      expect(this.cart.total.afterVAT).toEqual(this.expectedAfterVAT);
    });

    test(`the cart's VAT should be correct`, () => {
      expect(this.cart.total.VAT).toEqual(this.expectedVAT);
    });
  });

  describe(`and tried to DECREMENT one product's QUANTITY to lower than 1`, () => {
    beforeEach(() => {
      this.cart = this.instance.changeProductQuantity(
          this.productA, 0);
    });

    test(`the cart's beforeVAT should be still be same`, () => {
      expect(this.cart.total.beforeVAT).toEqual(this.expectedBeforeVAT);
    });
  });

  describe(`and ONE product was REMOVED`, () => {
    beforeEach(() => {
      this.cart = this.instance.removeProducts(this.productA);

      this.expectedBeforeVAT -= this.productA.price;
      this.expectedVAT = _.getVAT(this.expectedBeforeVAT, this.VATRate);
      this.expectedAfterVAT = _.getAfterVAT(
        this.expectedBeforeVAT, this.expectedVAT
      );
    });

    test(`the cart's products should reflect this`, () => {
      expect(this.cart.products).toEqual([this.productB]);
    });

    test(`the cart's beforeVAT should be correct`, () => {
      expect(this.cart.total.beforeVAT).toEqual(this.expectedBeforeVAT);
    });

    test(`the cart's afterVAT should be correct`, () => {
      expect(this.cart.total.afterVAT).toEqual(this.expectedAfterVAT);
    });

    test(`the cart's VAT should be correct`, () => {
      expect(this.cart.total.VAT).toEqual(this.expectedVAT);
    });
  });

  describe(`and TWO products were REMOVED`, () => {
    beforeEach(() => {
      this.cart = this.instance.removeProducts(this.products);
    });

    test(`the cart should be empty`, () => {
      expect(this.cart).toEqual(_.emptyCart);
    });
  });

  describe(`and a NON EXISTING product was tried to be REMOVED`, () => {
    beforeEach(() => {
      this.product = Object.assign({}, _.productC);
      this.cart = this.instance.removeProducts(this.product);
    });

    test(`the cart's products should be the same`, () => {
      expect(this.cart.products).toEqual(this.products);
    });
  });

  test(`destroying the instance should empty the cart `, () => {
    this.instance.destroy();
    expect(this.instance.getCart()).toEqual(_.emptyCart);
  });
});
