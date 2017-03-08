"use strict";

(function(){

  let instas = [
  { photo_url: "https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/16908601_1857220607890490_3724722405050941440_n.jpg", author: "@_foodstories", body: "Happy friday guys! Get the recipe for this delicious pommegranate breakfast bowl on the blog, link is in profile  #ourfoodstories"},
  { photo_url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/16789190_1832554793629676_456038695481376768_n.jpg", author: "@crumbs_whisker", body: "Our fave snuggler, lil man, was adopted last weekend and we're pretty stoked about it 😸💛 #crumbsandwhiskers #catcafe"},
  { photo_url: "http://68.media.tumblr.com/6b5eff405127a77a9df54d146421234f/tumblr_n0j93hFARI1svx5guo1_1280.jpg", author: "@NatGeoTravel", body: "Staggering trees grace @NatGeoTravel's first #natgeotravelpic Instagram feature photo in Kitasaga Bamboo Grove in"}
  ]

  angular
    .module("wdinstagram", [
    "ui.router",
    "ngResource"
    ])
    .config([
    "$stateProvider",
    RouterFunction
    ])
    .factory("WdinstagramFactory", [
      "$resource",
      WdinstagramFactoryFunction
    ])
    .controller("WdinstagramIndexController", [
      "WdinstagramFactory",
      WdinstagramIndexControllerFunction
    ])
    .controller("WdinstagramNewController", [
      "WdinstagramFactory",
      "$state",
      WdinstagramNewControllerFunction
    ])
    .controller("WdinstagramShowController", [
      "WdinstagramFactory",
      "$stateParams",
      WdinstagramShowControllerFunction
    ])
    .controller("WdinstagramEditController", [
      "WdinstagramFactory",
      "$stateParams",
      "$state",
      WdinstagramEditControllerFunction
    ])



    function RouterFunction($stateProvider) {
      $stateProvider
        .state("wdinstagramIndex", {
          url: "/wdinstagram",
          templateUrl:  "js/ng-views/index.html",
          controller: "WdinstagramIndexController",
          controllerAs: "vm"
        })
        .state("wdinstagramNew", {
          url: "/wdinstagram/new",
          templateUrl:  "js/ng-views/new.html",
          controller: "WdinstagramNewController",
          controllerAs: "vm"
        })
        .state("wdinstagramShow", {
          url: "/wdinstagram/:id",
          controller: "WdinstagramShowController",
          controllerAs: "vm",
          templateUrl: "js/ng-views/show.html"
        })
        .state("wdinstagramEdit", {
          url: "/wdinstagram/:id/edit",
          controller: "WdinstagramEditController",
          controllerAs: "vm",
          templateUrl: "js/ng-views/edit.html"
        });

    }

function WdinstagramFactoryFunction($resource) {
  return $resource("http://localhost:3000/entries/:id", {}, {
  update: {method: "PUT"}
});
}

function WdinstagramIndexControllerFunction(WdinstagramFactory) {
  // this.instas = instas
  this.instas = WdinstagramFactory.query();
}

function WdinstagramNewControllerFunction(WdinstagramFactory,$state) {
  this.insta = new WdinstagramFactory()
  this.create = function() {
    this.insta.$save(function(insta) {
      $state.go("wdinstagramShow", {id: insta.id})
    })
  }
}

function WdinstagramShowControllerFunction(WdinstagramFactory,$stateParams) {
  // this.insta = instas[$stateParams.id];
  this.insta = WdinstagramFactory.get({id: $stateParams.id});
  console.log(this.insta)
}

function WdinstagramEditControllerFunction(WdinstagramFactory,$stateParams,$state) {
  this.insta = WdinstagramFactory.get({id: $stateParams.id})
  this.update = function() {
    this.insta.$update({id: $stateParams.id}, function(insta) {
      $state.go("wdinstagramShow", {id: insta.id})
    })
  }
}





})();
