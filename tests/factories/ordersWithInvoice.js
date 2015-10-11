Factory.define('orderWithInvoice', ReactionCore.Collections.Orders, Factory.extend('order', {
  invoice: [
    {
      shipping: 0,
      subtotal: '99.95',
      taxes: '0.00',
      discounts: '0.00',
      total: '99.95'
    }
  ]
}));
