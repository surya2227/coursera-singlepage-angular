(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
.config(Config);

Config.$inject = ['ShoppingListCheckOffServiceProvider'];
function Config(ShoppingListCheckOffServiceProvider) {
  ShoppingListCheckOffServiceProvider.defaults.maxItems=10;
}


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.errorMessage="Everything is bought!";
  toBuy.toBuyItems = ShoppingListCheckOffService.getItems();
  /*
  toBuy.newItemname = "";
  toBuy.newItemquantity = "";

  toBuy.addItem = function () {
    try {
      ShoppingListCheckOffService.addItem(toBuy.newItemname, toBuy.newItemquantity);
    } catch (error) {
      toBuy.errorMessage = error.message;
    }
  };*/

  toBuy.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
  toBuy.moveToQueue = function (index,name,quantity) {
    ShoppingListCheckOffService.moveToQueue(index,name,quantity);
  };
}
ToBuyController.$inject = ['ShoppingListCheckOffService'];

function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alrdyBgt = this;
  alrdyBgt.errorMessage="Nothing bought yet";
  alrdyBgt.alrdyBgtItems = ShoppingListCheckOffService.getQueuedItems();

}

function ShoppingListCheckOffService(maxItems) {
  var service = this;
  var items = [{name:"Pepsi-Max",quantity:"2"},{name:"Pepsi-Regular",quantity:"4"},{name:"Coke-Zero",quantity:"3"},{name:"Coke-Diet",quantity:"1"},{name:"Coke-Classic",quantity:"5"}];
  var boughtItems=[];
  service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };
  service.moveToQueue=function functionName(index,name,quantity) {
    var item = {
      name: name,
      quantity: quantity
    };
    boughtItems.push(item);
  };
  service.getItems = function () {
    return items;
  };
  service.getQueuedItems = function () {
    return boughtItems;
  };
}


function ShoppingListCheckOffServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems:5
  };

  provider.$get = function () {
    var ShoppingCart = new ShoppingListCheckOffService(provider.defaults.maxItems);

    return ShoppingCart;
  };
}

})();
