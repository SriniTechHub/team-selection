import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import 'expose?$!expose?jQuery!jquery';
import 'angular-ui-bootstrap';
import 'ui-select';
import "bootstrap-less";
import './styles.less';


var app = angular.module('myApp', [uiRouter,ngSanitize, 'ui.select', 'ui.bootstrap']);
var homeTplUrl = require('!ngtemplate?requireAngular!html!./home.html');
var dialogTplUrl = require('!ngtemplate?requireAngular!html!./dialog-tpl.html');
var modalTplUrl = require('!ngtemplate?requireAngular!html!./modal.html');
var cancelConfirmationTplUrl = require('!ngtemplate?requireAngular!html!./cancel-confirmation.html');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: '/',
        templateUrl: homeTplUrl
    });
    $locationProvider.html5Mode(true);

});

app.controller('HomeController', ['$uibModal', '$log', function($uibModal, $log) {
    var homeCtrl = this;
     homeCtrl.isEmployeeNotSelected = false;
     homeCtrl.isTeamNotSelected = false;
    homeCtrl.companyData = [{
            team: 'Engineering',
            employees: ['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway']
        },
        {
            team: 'Executive',
            employees: ['Rohan Gupta', 'Ronda Dean', 'Robby Maharaj']
        },
        {
            team: 'Finance',
            employees: ['Caleb Brown', 'Carol Smithson', 'Carl Sorensen']
        },
        {
            team: 'Sales',
            employees: ['Ankit Jain', 'Anjali Maulingkar']
        }
    ];


    homeCtrl.open = function() {
    homeCtrl.team = undefined;
    homeCtrl.employee = undefined;
        homeCtrl.dialogSelectTeamEmployeeModalInstance = $uibModal.open({
            templateUrl: modalTplUrl,
            backdrop: 'static',
            controller: function() {
                return homeCtrl;

            },
            controllerAs: 'homeCtrl',
            resolve: {
                items: function() {
                    return homeCtrl.companyData;
                }
            }
        });

    };
    homeCtrl.cancelSelectTeamEmployeeModal = function() {
        homeCtrl.confirmationModalInstance = $uibModal.open({
                    backdrop: 'static',
                    templateUrl:cancelConfirmationTplUrl,
                    controller: function(){
                        return homeCtrl;
                    },
                    controllerAs:'homeCtrl'
                });
    };
    homeCtrl.onCancelConfirmationModal = function() {
        homeCtrl.confirmationModalInstance.close(false);
    };
    homeCtrl.onConfirmationModal = function() {
            homeCtrl.dialogSelectTeamEmployeeModalInstance.close(false);
            homeCtrl.confirmationModalInstance.close(false);
        };
    homeCtrl.onTeamEmployeeSelectionCompleted = function(){
       if(angular.isDefined(homeCtrl.employee)){
            homeCtrl.dialogSelectTeamEmployeeModalInstance.close(false);
       }else{
            if(angular.isDefined(homeCtrl.team)){
                homeCtrl.isEmployeeNotSelected = true;
            }else{
                homeCtrl.isTeamNotSelected = true;
            }

       }

    };
    homeCtrl.onTeamSelection = function(){
        if(angular.isDefined(homeCtrl.employee)){
            homeCtrl.employee.selected = '';
        }

        homeCtrl.employeesData = homeCtrl.team.selected.employees;
        homeCtrl.isTeamNotSelected = false;
    };
    homeCtrl.onEmployeeSelection = function(){
        homeCtrl.isEmployeeNotSelected = false;
    };

}]);

app.directive('appDialog', function() {
    return {
        restrict: 'E',
        controller: 'HomeController',
        controllerAs: 'homeCtrl',
        scope: true,
        templateUrl: dialogTplUrl
    };
});