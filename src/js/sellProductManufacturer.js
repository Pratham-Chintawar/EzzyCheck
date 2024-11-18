App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: function () {
    if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }

    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("product.json", function (data) {
      var productArtifact = data;
      App.contracts.product = TruffleContract(productArtifact);
      App.contracts.product.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-register", App.registerProduct);
  },

  registerProduct: function (event) {
    event.preventDefault();

    var productInstance;

    var productSN = document.getElementById("productSN").value;
    var sellerCode = document.getElementById("sellerCode").value;

    // Sell Product to Manufacturer only when All Input Fields have length > 0

    if (productSN.length != 0 && sellerCode.length != 0) {
      //window.ethereum.enable();
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error);
        }

        console.log(accounts);
        var account = accounts[0];
        // console.log(account);

        App.contracts.product
          .deployed()
          .then(function (instance) {
            productInstance = instance;
            return productInstance.manufacturerSellProduct(
              web3.fromAscii(productSN),
              web3.fromAscii(sellerCode),
              { from: account }
            );
          })
          .then(function (result) {
            // console.log(result);
            window.location.reload();
            document.getElementById("sellerName").innerHTML = "";
            document.getElementById("sellerBrand").innerHTML = "";
          })
          .catch(function (err) {
            console.log(err.message);
          });
      });
    } else {
      console.log("Please Enter All Details!!!");
      alert("Please Enter All Details!!!");
      window.location.reload();
    }
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
