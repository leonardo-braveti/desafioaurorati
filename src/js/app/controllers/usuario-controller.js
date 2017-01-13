class UsuarioController{
    constructor(scope, usuarioService){
        this._scope = scope;        
        this._usuarioService = usuarioService;
        //this._alertaVisual = alertaVisual
        this._registrarMetodos();
        this._scope.viewState = this._scope.state.current.name;

        /*if(this._scope.viewState == "colaboradores.editar" || this._scope.viewState == "colaboradores.visualizar")
            this._scope.buscar(scope.state.params.id);*/
    }
    
    localizar(){
        this._usuarioService.localizar();
    }

    obterLocalizacao(){
        this._scope.localizacao = this._usuarioService.obterLocalizacao();
    }

    salvarLocalizacao(){        
        this._usuarioService.salvarLocalizacao(this._scope.localizacao);
    }  
    
    _registrarMetodos(){
        this._scope.localizar = angular.bind(this,this.localizar);
        this._scope.obterLocalizacao = angular.bind(this,this.obterLocalizacao);
        this._scope.salvarLocalizacao = angular.bind(this,this.salvarLocalizacao);        
    }
}

UsuarioController.$inject = ['$scope', 'usuarioService'];

angular.module('desafioaurorati')
        .controller('UsuarioController', UsuarioController);