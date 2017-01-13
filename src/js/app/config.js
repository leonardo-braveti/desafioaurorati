function config($stateProvider,$urlRouterProvider){

    $stateProvider
        .state('home',{
            url:'/home',
            controller:'UsuarioController',
            templateUrl:'../../views/home.html'
        })
        .state('localizacao',{
            url:'/localizacao',
            controller:'UsuarioController',
            templateUrl:'../../views/localizacao.html'
        })
        .state('alimentos',{
            url:'/alimentos',
            controller:'AlimentoController',
            templateUrl:'../../views/alimentos.html'
        })
        .state('form',{
            url:'/form',
            controller:'AlimentoController',
            templateUrl:'../../views/form.html'
        });        
                
    $urlRouterProvider.otherwise('/home');
}

angular.module('desafioaurorati')
        .config(config)
        .run(function($rootScope,$state){
            console.log('aplicação rodando');
            $rootScope.state = $state;
        });

