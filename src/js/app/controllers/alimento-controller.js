class AlimentoController{
    constructor(scope, alimentoService, usuarioService){        
        this._scope = scope;
        this._alimentoService = alimentoService;
        this._usuarioService = usuarioService;
        this._registrarMetodos();
    }

    listar(){
        this._scope.alimentos = this._alimentoService.listar();
    }

    distanciar(){        
	this._scope.alimentos = this._alimentoService.listar();

        var usuario = this._usuarioService.obterLocalizacao();
        if(usuario == null){
		alert("Você precisa informar a sua localizacao");
		return;
	}

	this._scope.alimentos.forEach(function(alimento, index){	
        	this._alimentoService.distanciar(alimento, usuario)
        }.bind(this));
    }
  
    salvar(){
        var testaData = this._scope.validade.ano+"-"+this._scope.validade.mes+"-"+this._scope.validade.dia;
        
        if(new Date(testaData) < new Date())
            alert("A data informada é menor que a data corrente");
        else{
            this._scope.alimento.validade = testaData;
            this._alimentoService.salvar(this._scope.alimento);
            this._scope.state.go("alimentos");
        }
    }
  
    _registrarMetodos(){
        this._scope.listar = angular.bind(this,this.listar);
        this._scope.distanciar = angular.bind(this,this.distanciar);
        this._scope.buscarPeloId = angular.bind(this,this.buscarPeloId);        
        this._scope.salvar = angular.bind(this,this.salvar);
        this._scope.excluir = angular.bind(this,this.excluir);
        this._scope.alarme = angular.bind(this, this.alarme);
    }
}

AlimentoController.$inject = ['$scope','alimentoService', 'usuarioService'];

angular.module('desafioaurorati')
        .controller('AlimentoController', AlimentoController);
